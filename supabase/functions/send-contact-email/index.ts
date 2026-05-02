// @ts-nocheck
// Supabase Edge Function — send-contact-email
// Deploy via: Supabase Dashboard → Edge Functions → New Function → paste this

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RATE_LIMIT_MAX = 20
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, subject, message, fingerprint } = await req.json()

    // ── Basic validation ────────────────────────────────────────────────────
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── Rate limit check ────────────────────────────────────────────────────
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const fp = fingerprint || 'unknown'
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()

    const { count } = await supabase
      .from('contact_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('fingerprint', fp)
      .gte('created_at', windowStart)

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      // Find oldest to calculate retry window
      const { data: oldest } = await supabase
        .from('contact_submissions')
        .select('created_at')
        .eq('fingerprint', fp)
        .gte('created_at', windowStart)
        .order('created_at', { ascending: true })
        .limit(1)
        .single()

      const oldestTs = oldest ? new Date(oldest.created_at).getTime() : Date.now() - RATE_LIMIT_WINDOW_MS
      const retryAfterMs = oldestTs + RATE_LIMIT_WINDOW_MS - Date.now()

      return new Response(
        JSON.stringify({ error: 'RATE_LIMITED', retryAfterMs: Math.max(retryAfterMs, 60_000) }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── Send email via Resend ───────────────────────────────────────────────
    const resendKey = Deno.env.get('RESEND_API_KEY')!

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
        <div style="background: linear-gradient(135deg, #0044ff, #00a2ff); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">New Contact Form Submission</h1>
          <p style="color: rgba(255,255,255,0.75); margin: 4px 0 0; font-size: 13px;">
            Electrolights FTC 30686 · ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT
          </p>
        </div>
        <div style="background: #f8f9ff; padding: 28px 32px; border-radius: 0 0 12px 12px; border: 1px solid #e0e4ff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e4ff; font-size: 13px; color: #666; width: 100px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e4ff; font-size: 14px; font-weight: 600; color: #111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e4ff; font-size: 13px; color: #666;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e4ff; font-size: 14px; color: #111;">
                <a href="mailto:${email}" style="color: #0044ff;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e4ff; font-size: 13px; color: #666;">Subject</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e4ff; font-size: 14px; color: #111;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 16px 0 0; font-size: 13px; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 16px 0 0; font-size: 14px; color: #111; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>
          <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e0e4ff; font-size: 12px; color: #999;">
            Reply directly to this email to respond to ${name}.
          </div>
        </div>
      </div>
    `

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Electrolights Contact Form <onboarding@resend.dev>',
        to: ['mithun1214.d01@gmail.com'],
        reply_to: email,
        subject: `[Contact] ${subject} — ${name}`,
        html: htmlBody,
      }),
    })

    if (!emailRes.ok) {
      const body = await emailRes.json().catch(() => ({}))
      console.error('Resend error:', body)
      return new Response(
        JSON.stringify({ error: 'EMAIL_ERROR', detail: body?.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── Log submission (best-effort) ────────────────────────────────────────
    await supabase.from('contact_submissions').insert({ name, email, subject, message, fingerprint: fp })

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

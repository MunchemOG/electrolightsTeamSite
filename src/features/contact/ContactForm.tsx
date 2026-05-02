import { useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { NeonInputTracer } from './NeonInputTracer'
import { PlaneAnimation } from './PlaneAnimation'
import { ConfettiCannon } from './ConfettiCannon'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { submitContactForm, formatRetryTime } from '@/lib/contact'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const SUBJECTS = [
  'Sponsorship Inquiry',
  'Outreach Collaboration',
  'Technical Question',
  'Media Request',
  'General Inquiry',
]

/**
 * Full-featured contact form with validation, neon input tracing,
 * paper airplane submit animation, and confetti on success.
 * Rate-limited to 20 submissions per hour per client fingerprint.
 */
export function ContactForm() {
  const prefersReduced = useReducedMotion()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [fireConfetti, setFireConfetti] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const submitRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      setIsSubmitting(true)
      setFormError(null)

      const result = await submitContactForm(data)

      setIsSubmitting(false)

      if (!result.ok) {
        if ('code' in result && result.code === 'RATE_LIMITED') {
          setFormError(
            `You've sent too many messages. Please try again in ${formatRetryTime(result.retryAfterMs as number)}.`
          )
        } else {
          setFormError('Something went wrong sending your message. Please try again or email us directly.')
          console.error('[ContactForm]', result)
        }
        return
      }

      setIsSuccess(true)
      setFireConfetti(true)

      // Reset after celebration
      setTimeout(() => {
        setFireConfetti(false)
      }, 3000)

      setTimeout(() => {
        setIsSuccess(false)
        reset()
      }, 5000)
    },
    [reset]
  )

  const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  }

  return (
    <div className="relative">
      <ConfettiCannon fire={fireConfetti} originRef={submitRef} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {/* Name + Email row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fieldVariants}
          >
            <label
              htmlFor="contact-name"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
            >
              Full Name
            </label>
            <NeonInputTracer>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3.5 text-sm text-white placeholder:text-white/20 outline-none backdrop-blur-sm transition-all duration-300 focus:bg-white/[0.05]"
                {...register('name')}
              />
            </NeonInputTracer>
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-2 text-xs font-medium text-red-400/80"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fieldVariants}
          >
            <label
              htmlFor="contact-email"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
            >
              Email Address
            </label>
            <NeonInputTracer color="#0044ff">
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3.5 text-sm text-white placeholder:text-white/20 outline-none backdrop-blur-sm transition-all duration-300 focus:bg-white/[0.05]"
                {...register('email')}
              />
            </NeonInputTracer>
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-2 text-xs font-medium text-red-400/80"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Subject */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fieldVariants}
        >
          <label
            htmlFor="contact-subject"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
          >
            Subject
          </label>
          <NeonInputTracer color="#ff5e00">
            <select
              id="contact-subject"
              className="w-full appearance-none rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3.5 text-sm text-white outline-none backdrop-blur-sm transition-all duration-300 focus:bg-white/[0.05] cursor-pointer"
              defaultValue=""
              {...register('subject')}
            >
              <option value="" disabled className="bg-[#0d0d1f] text-white/40">
                Select a topic...
              </option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s} className="bg-[#0d0d1f] text-white">
                  {s}
                </option>
              ))}
            </select>
          </NeonInputTracer>
          <AnimatePresence>
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-2 text-xs font-medium text-red-400/80"
              >
                {errors.subject.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Message */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fieldVariants}
        >
          <label
            htmlFor="contact-message"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
          >
            Message
          </label>
          <NeonInputTracer>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Tell us what you're looking for..."
              className="w-full resize-none rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3.5 text-sm text-white placeholder:text-white/20 outline-none backdrop-blur-sm transition-all duration-300 focus:bg-white/[0.05]"
              {...register('message')}
            />
          </NeonInputTracer>
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-2 text-xs font-medium text-red-400/80"
              >
                {errors.message.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
        {/* Submit */}
        <motion.div
          ref={submitRef}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fieldVariants}
        >
          <PlaneAnimation
            onLaunch={() => {}}
            isSubmitting={isSubmitting}
            isSuccess={isSuccess}
            disabled={!isValid && !prefersReduced}
          />
        </motion.div>

        {/* Success overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-4 text-center backdrop-blur-sm"
            >
              <p className="text-sm font-medium text-emerald-400">
                Message sent successfully. We will get back to you soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error overlay */}
        <AnimatePresence>
          {formError && !isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-4 text-center backdrop-blur-sm"
            >
              <p className="text-sm font-medium text-red-400">{formError}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}

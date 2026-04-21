import { Helmet } from 'react-helmet-async'

interface PageMetaProps {
  title: string
  description: string
  ogImage?: string
  ogUrl?: string
  noIndex?: boolean
}

const SITE_NAME = 'Electrolights FTC Team 30686'
const DEFAULT_OG_IMAGE = '/og/og-default.jpg'
const SITE_URL = 'https://electrolights30686.com'

/**
 * Drop-in SEO component for every page.
 * Sets <title>, <meta description>, Open Graph, and Twitter Card tags.
 */
export function PageMeta({
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogUrl,
  noIndex = false,
}: PageMetaProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const resolvedUrl = ogUrl ?? SITE_URL

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical */}
      <link rel="canonical" href={resolvedUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`} />
      <meta property="og:url" content={resolvedUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`} />
    </Helmet>
  )
}

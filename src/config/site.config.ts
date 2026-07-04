// ─────────────────────────────────────────────────────────────────
// Site-wide configuration
// Backend team: replace API_BASE_URL with your production URL
// ─────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Throne8',
  legalName: 'Thronet Technology Private Limited',
  tagline: 'Empowering Professional Networking for Millions',
  description: 'AI-powered professional networking built for scale, security, and meaningful connections.',
  url: 'https://throne8.com',
  locale: 'en-IN',
  founded: '2022',
  headquarters: 'Bhopal, Madhya Pradesh, India',

  social: {
    linkedin: 'https://linkedin.com/company/throne8',
    twitter: 'https://twitter.com/throne8hq',
    github: 'https://github.com/throne8',
    instagram: 'https://instagram.com/throne8hq',
  },

  seo: {
    defaultTitle: 'Throne8 — AI Professional Networking',
    titleTemplate: '%s | Throne8',
    defaultDescription: 'AI-powered professional networking built for scale, security, and meaningful connections. Join 50,000+ professionals.',
    keywords: ['professional networking', 'AI networking', 'career growth', 'Throne8', 'India'],
    ogImage: '/og-image.png',
  },
} as const;

// ── API Config (backend integration point) ────────────────────────
export const apiConfig = {
  // Replace with real URL when backend is ready
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '/api',
  version: 'v1',
  timeout: 10_000,     // ms

  endpoints: {
    company: '/company',
    jobs: '/jobs',
    follow: '/company/follow',
    applyJob: '/jobs/:id/apply',
    analytics: '/analytics/company',
  },
} as const;

// ── Feature Flags ─────────────────────────────────────────────────
export const featureFlags = {
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableNotifications: true,
  enableApplyFlow: false,   // flip to true when apply API is ready
  enableShare: true,
} as const;

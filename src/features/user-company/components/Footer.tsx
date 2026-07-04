export function Footer() {
  const links = {
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press Kit', href: '#' },
    ],
    Product: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Enterprise', href: '#' },
    ],
    Support: [
      { label: 'Help Centre', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  }

  const socials = [
    {
      label: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-9.5 8.5H7v6h2.5v-6zM8.25 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7.25 3c-1.1 0-1.75.6-2 1.17V12.5H11v6h2.5v-3.25c0-.9.15-1.75 1.25-1.75s1.25.85 1.25 1.75V18.5H18.5v-3.65c0-2.3-1.2-2.85-2-2.85z"/>
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer className="mt-12 pb-20 md:pb-0 bg-[#2d1f14]">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#9d8876] to-transparent" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#e0d8cf] flex items-center justify-center shadow-sm">
                <span className="text-[#4a3728] font-black text-xs">T8</span>
              </div>
              <span className="font-black text-[#e0d8cf] text-lg tracking-tight">throne8</span>
            </div>
            <p className="text-sm text-[#9d8876] leading-relaxed mb-5 max-w-[220px]">
              AI-powered professional networking built for scale, security, and meaningful connections.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-[#3a2a1e] border border-[#4a3728] text-[#9d8876] flex items-center justify-center hover:bg-[#4a3728] hover:text-[#e0d8cf] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading} className="col-span-1 md:col-span-2 md:col-start-auto">
              <p className="text-[10px] font-bold text-[#6b5847] uppercase tracking-widest mb-4">{heading}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-[#9d8876] hover:text-[#e0d8cf] transition-colors duration-150 inline-flex items-center gap-1 group"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter column */}
          <div className="col-span-2 md:col-span-2">
            <p className="text-[10px] font-bold text-[#6b5847] uppercase tracking-widest mb-4">Newsletter</p>
            <p className="text-xs text-[#9d8876] mb-3 leading-relaxed">Get updates on new features and career tips.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 rounded-lg bg-[#3a2a1e] border border-[#4a3728] text-sm text-[#e0d8cf] placeholder:text-[#6b5847] focus:outline-none focus:border-[#9d8876] transition-colors"
              />
              <button className="w-full px-3 py-2 rounded-lg bg-[#4a3728] hover:bg-[#5a4535] border border-[#6b5847] text-sm font-semibold text-[#e0d8cf] transition-colors duration-150">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#3a2a1e] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-[#6b5847]">
            <p>© {new Date().getFullYear()} Thronet Technology Private Limited.</p>
            <span className="hidden sm:inline text-[#4a3728]">·</span>
            <p>All rights reserved.</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#6b5847]">
            <span>Made with</span>
            <span className="text-[#9d8876]">♥</span>
            <span>in Bhopal, India</span>
            <span className="ml-1">🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
'use client';
import { Check, ArrowRight } from 'lucide-react';
import { Badge, Button } from '../ui';
import { cn } from '@/shared/utils/cn';
import type { Product } from '@/features/company/type/company.types';

interface Props { product: Product; wide?: boolean; }

export function ProductCard({ product, wide = false }: Props) {
  return (
    <article className={cn(
      'group relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl border border-brand-beige/60 shadow-sm p-6',
      'transition-all duration-300 hover:shadow-lg hover:border-brand-beige hover:-translate-y-0.5',
      wide && 'md:col-span-2',
    )}>
      {/* Glow */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand-beige/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" aria-hidden="true" />

      <div className={cn('flex gap-6', wide ? 'flex-col sm:flex-row' : 'flex-col')}>
        {/* Icon + meta */}
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-brand-brown rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-brand-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={product.iconPath} />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-lg font-bold text-brand-brown font-display">{product.name}</h3>
              {product.badge && <Badge label={product.badge} variant={product.badge} />}
            </div>
            <p className="text-sm font-semibold text-brand-medium mb-2">{product.tagline}</p>
            <p className="text-sm text-brand-brown/70 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Features */}
        <div className={cn(wide && 'sm:w-56 flex-shrink-0')}>
          <p className="text-xs font-bold text-brand-brown/45 uppercase tracking-wide mb-3">Key Features</p>
          <ul className="space-y-2" aria-label={`${product.name} features`}>
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-brand-brown">
                <div className="w-4 h-4 rounded-full bg-brand-brown/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-brand-brown" aria-hidden="true" />
                </div>
                {f}
              </li>
            ))}
          </ul>
          {product.ctaLabel && (
            <Button
              variant="ghost" size="sm"
              className="mt-4 -ml-2 group/btn"
              rightIcon={<ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />}
              onClick={() => product.ctaUrl && window.open(product.ctaUrl, '_blank')}
            >
              {product.ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

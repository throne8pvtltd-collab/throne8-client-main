'use client';
import { Quote } from 'lucide-react';
import { Avatar, Card } from '../ui';
import { cn } from '@/shared/utils/cn';
import type { Testimonial } from '@/features/company/type/company.types';

interface Props { testimonial: Testimonial; isActive: boolean; onClick: () => void; }

export function TestimonialCard({ testimonial: t, isActive, onClick }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={cn(
        'p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300',
        'bg-white/60 backdrop-blur-sm shadow-sm',
        isActive ? 'border-brand-brown bg-brand-beige/60 shadow-md' : 'border-brand-beige/60 hover:border-brand-tan',
      )}
    >
      <div className="flex mb-2">
        {Array.from({ length: t.rating }).map((_, i) => (
          <span key={i} className="text-amber-500 text-xs" aria-hidden="true">★</span>
        ))}
      </div>
      <Quote className="w-5 h-5 text-brand-light mb-3 opacity-60" aria-hidden="true" />
      <p className="text-sm text-brand-brown/80 leading-relaxed italic mb-4">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-3 pt-3 border-t border-brand-beige">
        <Avatar initials={t.initials} src={t.avatarUrl} size="md" />
        <div>
          <p className="text-sm font-semibold text-brand-brown">{t.author}</p>
          <p className="text-xs text-brand-brown/60">{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
}

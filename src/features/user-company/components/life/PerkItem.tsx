'use client';
import {
  Monitor, Coffee, BookOpen, Plane, Heart, Award,
  Zap, Globe, Users, Shield,
} from 'lucide-react';
import type { Perk } from '@/features/company/type/company.types';

const ICON_MAP: Record<string, React.ElementType> = {
  Monitor, Coffee, BookOpen, Plane, Heart, Award,
  Zap, Globe, Users, Shield,
};

export function PerkItem({ perk }: { perk: Perk }) {
  const Icon = ICON_MAP[perk.iconName] ?? Zap;
  return (
    <div className="group flex items-start gap-3 p-3 rounded-xl hover:bg-brand-beige/40 transition-colors">
      <div className="w-8 h-8 bg-brand-beige rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-brown transition-colors duration-200">
        <Icon className="w-4 h-4 text-brand-brown group-hover:text-brand-cream transition-colors duration-200" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-semibold text-brand-brown">{perk.label}</p>
        <p className="text-xs text-brand-brown/60 mt-0.5">{perk.desc}</p>
      </div>
    </div>
  );
}

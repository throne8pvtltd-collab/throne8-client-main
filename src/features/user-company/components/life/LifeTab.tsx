'use client';
import Image from 'next/image';
import { useLife } from '../../hooks/useLife';
import { TeamCard } from './TeamCard';
import { CultureValueCard } from './CultureValueCard';
import { PerkItem } from './PerkItem';
import { Card, SectionHeading } from '../ui';

export function LifeTab() {
  const { team, values, perks, gallery } = useLife();

  return (
    <div className="space-y-8 animate-slide-up">

      {/* Hero banner */}
      <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&auto=format&fit=crop"
          alt="Throne8 team culture"
          fill className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(61,46,33,0.88) 0%, rgba(74,55,40,0.55) 60%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(246,237,232,0.6)' }}>
            Life at Throne8
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-cream leading-tight max-w-sm font-display">
            We build differently.<br />We live differently.
          </h2>
        </div>
      </div>

      {/* Culture values */}
      <Card padding="lg">
        <SectionHeading subtitle="What drives every decision we make" className="mb-6">Our Values</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v) => <CultureValueCard key={v.id} value={v} />)}
        </div>
      </Card>

      {/* Perks */}
      <Card padding="lg">
        <SectionHeading subtitle="We take care of our people" className="mb-6">Perks & Benefits</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {perks.map((p) => <PerkItem key={p.id} perk={p} />)}
        </div>
      </Card>

      {/* Team */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-6">
          <SectionHeading subtitle="The people building Throne8">Meet the Team</SectionHeading>
          <span className="text-xs text-brand-brown/45 font-medium hidden sm:block">{team.length} members shown</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member) => <TeamCard key={member.id} member={member} />)}
        </div>
      </Card>

      {/* Gallery */}
      <Card padding="lg">
        <SectionHeading subtitle="Snapshots from our journey" className="mb-5">Gallery</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map((photo) => (
            <div key={photo.id} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
              <Image
                src={photo.src} alt={photo.alt} fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(42,31,23,0.8), transparent)' }}>
                  <p className="text-xs text-brand-cream font-medium">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

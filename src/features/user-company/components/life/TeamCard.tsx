'use client';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { Avatar, Card } from '../ui';
import { Badge } from '../ui';
import type { TeamMember } from '@/features/company/type/company.types';

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card hoverable padding="md" className="group flex flex-col items-center text-center">
      <div className="relative mb-3">
        <Avatar
          src={member.avatarUrl} initials={member.initials}
          alt={member.name} size="lg" rounded="2xl"
        />
        {member.isFounder && (
          <div className="absolute -top-1.5 -right-1.5">
            <Badge label="Founder" variant="Core" size="sm" />
          </div>
        )}
      </div>
      <h3 className="text-sm font-bold text-brand-brown">{member.name}</h3>
      <p className="text-xs text-brand-medium font-semibold mt-0.5">{member.role}</p>
      <p className="text-xs text-brand-brown/55 mt-2 leading-relaxed line-clamp-2">{member.bio}</p>
      <div className="flex gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {member.socialLinks.linkedin && (
          <a href={member.socialLinks.linkedin} aria-label="LinkedIn" className="p-1.5 rounded-lg hover:bg-brand-beige transition-colors">
            <Linkedin className="w-3.5 h-3.5 text-brand-brown" />
          </a>
        )}
        {member.socialLinks.twitter && (
          <a href={member.socialLinks.twitter} aria-label="Twitter" className="p-1.5 rounded-lg hover:bg-brand-beige transition-colors">
            <Twitter className="w-3.5 h-3.5 text-brand-brown" />
          </a>
        )}
        {member.socialLinks.github && (
          <a href={member.socialLinks.github} aria-label="GitHub" className="p-1.5 rounded-lg hover:bg-brand-beige transition-colors">
            <Github className="w-3.5 h-3.5 text-brand-brown" />
          </a>
        )}
      </div>
    </Card>
  );
}

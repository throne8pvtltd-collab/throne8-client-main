// app/mentorship/mentor-card/[mentorname]/[mentorid]/page.tsx
import MentorProfile from '@/features/mentorship/components/MentorProfile';
import { Metadata } from 'next';
import React from 'react'

interface PageProps {
  params: Promise<{
    mentorname: string;
    mentorid: string;
  }>
}

export const metadata: Metadata = {
  title: "Dhananjay Sharma – Mentor Profile",
  description: "Book 1:1 sessions, download resources, and get career guidance.",
};

const page = async ({ params }: PageProps) => {
  const { mentorname, mentorid } = await params;

  return (
    <MentorProfile mentorId={mentorid} />
  )
}

export default page
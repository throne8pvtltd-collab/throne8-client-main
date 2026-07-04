"use client";

import { useParams } from "next/navigation";
import DashboardLayout from "../../../../features/mentorship/components/dashboard/DashboardLayout";

export default function MentorLanding() {
  const params = useParams();
  const userId = params.userId as string;

  return <DashboardLayout userId={userId} />;
}
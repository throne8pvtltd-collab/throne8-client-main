// src/app/studyGroup/study/my-groups/[id]/page.tsx
'use client';

import { use } from 'react';
<<<<<<< HEAD
import GroupRoom from '@/features/studyGroup/components/GroupRoom';
=======
import GroupRoom from '../../../../../features/study-group/components/my-groups/GroupRoom';
>>>>>>> ed5e7918466befd6e71595a48758cdf47a8b9a31

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GroupRoomPage({ params }: PageProps) {
  const resolvedParams = use(params);
  
  return <GroupRoom groupId={resolvedParams.id} />;
}


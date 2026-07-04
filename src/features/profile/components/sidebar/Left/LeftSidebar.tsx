//left sidebar component
import React from 'react';
import ProfileCard from './ProfileCard';
import CompanyCard from './CompanyCard';
import MyGroups from './MyGroups';

interface LeftSidebarProps {
  currentUserId: string;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({currentUserId, isSidebarOpen, isDarkMode }) => {
  if (!isSidebarOpen) return null;

  return (
    <aside className="w-full md:w-[320px] space-y-6 flex-shrink-0">
      <ProfileCard currentUserId={currentUserId} isDarkMode={isDarkMode} />
      {/* <CompanyCard isDarkMode={isDarkMode} />
      <MyGroups isDarkMode={isDarkMode} /> */}
    </aside>
  );
};

export default LeftSidebar;
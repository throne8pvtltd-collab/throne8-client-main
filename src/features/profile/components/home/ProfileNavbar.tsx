// src/profile/components/ProfileNavbar.tsx
'use client';
import React, { useState } from 'react';
import AuthService from '@/lib/api/auth.service';
import SearchBar from './SearchBar';
import ProfileSidePanel from './ProfileSidePanel';
import { useRouter } from 'next/navigation';
import { MessageNotificationBadge } from './MessageNotificationBadge';
import { NetworkNotificationBadge } from '@/features/networks/components/notifications/NetworkNotificationBadge';

interface ProfileNavbarProps {
    profileImage: string;
    userName: string;
    currentUserId?: string;
    companyId?: string;
    onOpenLeftPanel?: () => void;
}

const ProfileNavbar: React.FC<ProfileNavbarProps> = ({ profileImage, userName, currentUserId, companyId, onOpenLeftPanel }) => {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);

    console.log('👤 [ProfileNavbar] Props with companyId:', { companyId });

    const handleMenuClick = async (item: string) => {
        switch (item) {
            case 'View Profile':
                // On mobile dashboard, open the left sidebar panel
                if (onOpenLeftPanel && window.innerWidth < 1024) {
                    onOpenLeftPanel();
                    setIsProfilePanelOpen(false);
                    setIsDropdownOpen(false);
                } else {
                    // On desktop or other pages, navigate directly
                    router.push(`/profile`);
                    setIsDropdownOpen(false);
                }
                break;
            case 'Study Groups':
                console.log('Navigating to Study Groups page...');
                router.push(`/study/groups`);
                setIsDropdownOpen(false);
                break;
            case 'Update Profile':
                setIsDropdownOpen(false);
                break;
            case 'Create Company Page':
                router.push(`/create-company/${currentUserId}`);
                setIsDropdownOpen(false);
                break;
            case 'Company Page':
                router.push(`/company/${currentUserId}`);
                setIsDropdownOpen(false);
                break;
            case 'Settings':
                setIsDropdownOpen(false);
                break;
            case 'Sign Out':
                setIsLoggingOut(true);
                // console.log('🚪 User clicked Sign Out');
                await AuthService.logout();
                break;
            default:
                break;
        }
    };

    const handleHomePage = () => {
        router.push('/dashboard');
    };

    const handleNavigation = (item: string) => {
        switch (item) {
            case 'Home':
                handleHomePage();
                break;
            case 'Network':
                router.push(`/profile/network/${currentUserId}`);
                break;
            case 'Jobs':
                router.push('/#');
                break;
            case 'Messaging':
                router.push(`/message/${currentUserId}`);
                break;
            case 'Notifications':
                router.push(`/notifications/${currentUserId}`);
                break;
            case 'Mentorship':
                router.push(`/mentorship/${currentUserId}`);
                break;
            default:
                break;
        }
        setIsMobileMenuOpen(false);
    };

    // const getIconPath = (index: number): string => {

    //     const paths = [
    //         'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    //         'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    //         'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    //         'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    //         'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    //     ];
    //     return paths[index] || '';
    // };


    const getIconPath = (index: number): string => {
    const paths = [
        // 0: Home
        'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        // 1: Network
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        // 2: Jobs
        'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        // 3: Messaging
        'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
        // 4: Notifications
        'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
        // 5: Mentorship ← THIS WAS MISSING
        'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    ];
    return paths[index] || '';
};


    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-[#e0d8cf] text-[#4a3728] shadow-md z-50">
                <div className="w-full px-3 sm:px-6 lg:px-8">
                    {/* <div className="flex items-center justify-between h-16 gap-2"> */}

                    <div className="flex items-center h-16 gap-2 w-full">

                        {/* Left Section: Mobile Menu Button + Logo */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Mobile Menu Button */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="text-[#4a3728] hover:bg-[#f6ede8] rounded-lg p-2 transition-colors duration-300"
                                >
                                    <svg className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
                                    </svg>
                                </button>
                            </div>

                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <button onClick={handleHomePage} className="text-2xl font-bold text-[#4a3728] whitespace-nowrap">Throne8</button>
                            </div>
                        </div>

                        {/* Middle Section: Desktop Navigation */}

<div className="flex items-center justify-center gap-3 flex-1 min-w-0 overflow-hidden">


    {['Home', 'Network', 'Jobs', 'Messaging', 'Notifications', 'Mentorship'].map((item, idx) => (
            <button
                key={item}
                onClick={() => handleNavigation(item)}
                className="relative flex items-center gap-2 text-sm font-medium 
                           text-[#4a3728] hover:text-[#7a5c3e] transition-colors 
                           duration-300 whitespace-nowrap"
            >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={getIconPath(idx)} />
                </svg>
                {item}
                {item === 'Network' && <NetworkNotificationBadge />}
                {item === 'Messaging' && <MessageNotificationBadge />}
            </button>
        ))}
    </div>
    
                        {/* <div className="hidden lg:flex items-center space-x-6 flex-1 ml-8">
                            {['Home', 'Network', 'Jobs', 'Messaging', 'Notifications', 'Mentorship'].map((item, idx) => (
                                <button
                                    key={item}
                                    onClick={() => handleNavigation(item)}
                                    className="relative flex items-center gap-2 text-sm font-medium text-[#4a3728] hover:text-[#7a5c3e] transition-colors duration-300 whitespace-nowrap"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={getIconPath(idx)} />
                                    </svg>
                                    {item}
                                    {item === 'Network' && <NetworkNotificationBadge />}
                                    {item === 'Messaging' && <MessageNotificationBadge />}
                                </button>
                            ))}
                        </div> */}

                        {/* Right Section: Search Bar + Profile Icon */}
                        {/* <div className="flex items-center gap-2 ml-auto"> */}
                       <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                            {/* Search Bar - Responsive */}
<div className="flex items-center flex-shrink-0 w-40 xl:w-56">
    <SearchBar currentUserId={currentUserId} />
</div>

                            {/* Mobile Search Icon Button */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="sm:hidden text-[#4a3728] hover:bg-[#f6ede8] rounded-lg p-2 transition-colors duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            {/* User Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 hover:bg-[#f6ede8] rounded-lg px-2 py-1 transition-colors duration-300"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#e0d8cf] shadow-sm flex-shrink-0">
                                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    {/* Hide username and dropdown arrow on mobile */}
                                    <span className="text-sm font-medium hidden md:inline text-[#4a3728] whitespace-nowrap">{userName}</span>
                                    <svg
                                        className={`w-4 h-4 text-[#4a3728] transition-transform duration-300 flex-shrink-0 hidden md:block ${isDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-[#f6ede8] rounded-lg shadow-lg py-2 border border-[#e0d8cf] z-50">
                                        {['View Profile', 'Study Groups', 'Update Profile', 'Company Page', 'Create Company Page', 'Settings', 'Sign Out']
                                            .map((item, idx) => (
                                                <button
                                                    key={`${item}-${idx}`}
                                                    onClick={() => handleMenuClick(item)}
                                                    disabled={item === 'Sign Out' && isLoggingOut}
                                                    className="w-full text-left px-4 py-2 text-sm text-[#4a3728] hover:bg-[#e0d8cf] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {item === 'Sign Out' && isLoggingOut ? 'Signing out...' : item}
                                                </button>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search Section */}
                    {isSearchOpen && (
                        <div className="sm:hidden border-t border-[#d9d1c8] bg-[#f6ede8] -mx-3 px-3 py-4">
                            <SearchBar currentUserId={currentUserId} />
                        </div>
                    )}

                    {/* Mobile Navigation Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden border-t border-[#d9d1c8] bg-[#f6ede8] -mx-3 sm:-mx-6">
                            <div className="px-3 sm:px-6 py-4 space-y-2">
                                {/* Mobile Nav Links */}
                                {['Home', 'Network', 'Jobs', 'Messaging', 'Notifications', 'Mentorship'].map((item, idx) => (
                                    <button
                                        key={item}
                                        onClick={() => handleNavigation(item)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#4a3728] hover:bg-[#e0d8cf] rounded-lg transition-colors duration-300"
                                    >
                                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={getIconPath(idx)} />
                                        </svg>
                                        <span>{item}</span>
                                        {item === 'Network' && <div className="ml-auto"><NetworkNotificationBadge /></div>}
                                        {item === 'Messaging' && <div className="ml-auto"><MessageNotificationBadge /></div>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Profile Side Panel for Mobile */}
            <ProfileSidePanel
                isOpen={isProfilePanelOpen}
                onClose={() => setIsProfilePanelOpen(false)}
                profileImage={profileImage}
                userName={userName}
                currentUserId={currentUserId}
                onOpenLeftPanel={onOpenLeftPanel}
            />
        </>
    );
};

export default ProfileNavbar;
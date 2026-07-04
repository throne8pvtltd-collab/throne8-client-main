'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';

// Network components
import { NetworkSidebar } from '@/features/networks/components/layout/NetworkSidebar';
import { NetworkTab } from '@/features/networks/components/ui/NetworkTab';
import { ConnectionRequestsList } from '@/features/networks/components/connections/ConnectionRequestsList';
import { SuggestionsSection } from '@/features/networks/components/suggestions/SuggestionsSection';
import { SuggestionsForCompaniesSection } from '@/features/networks/components/suggestions/SuggestionsForCompaniesSection';
import { PremiumSpotlight } from '@/features/networks/components/premium/PremiumSpotlight';
import { ProfileViewerCard } from '@/features/networks/components/profile/ProfileViewerCard';
import { ProfileCompletionCard } from '@/features/networks/components/profile/ProfileCompletionCard';

// Hooks
import { useNetworkConnections } from '@/features/networks/hooks/useNetworkConnections';
import { useNetworkUsers } from '@/features/networks/hooks/useNetworkUsers';
import { useConnectionRequests } from '@/features/networks/hooks/useConnectionRequests';

// Types
import { TabType } from '@/features/networks/types';
import { useSocket } from '@/core/realtime/useSocket';
import { useNetworkCompanies } from '@/features/networks/hooks/useNetworkCompanies';
import { premiumProfiles } from '@/features/networks/constants/mockData';
import { useProfileData } from '@/features/profile/hooks/useProfileData';
import { useHeadlineData } from '@/features/profile/hooks/useHeadlineData';
import { transformToProfileData } from '@/shared/utils/profileTransformers';
import ProfileNavbar from '@/features/profile/components/home/ProfileNavbar';

export default function NetworkPage() {
    const params = useParams();
    const userId = params.userId as string;
    const { user } = useAuth();
    const { isConnected } = useSocket(); // ✅ ADD

    // Network state
    const [activeTab, setActiveTab] = useState<TabType>('grow');
    const {
        companies: realCompanies,
        isLoading: isLoadingCompanies,
        followingCompanies,
        handleFollowCompany
    } = useNetworkCompanies();

    // Custom hooks
    const { connectedUsers, handleConnect } = useNetworkConnections();

    const {
        requests,
        sentRequests,
        isLoading: isLoadingRequests, // ✅ ADD THIS
        showRequestsPanel,
        activeReqTab,
        setActiveReqTab,
        handleAccept,
        handleIgnore,
        handleWithdraw,
        toggleRequestsPanel
    } = useConnectionRequests();

    // Profile data hooks
    const {
        userProfileData,
        profileImageUrl,
        headlineId,
        fetchUserProfile
    } = useProfileData();

    const { headlineData } = useHeadlineData(headlineId);
    const { networkUsers, isLoadingUsers, fetchNetworkUsers } = useNetworkUsers();


    useEffect(() => {
        if (user) {
            fetchUserProfile();
            fetchNetworkUsers(user.userId); // ✅ Pass user ID

            // ✅ Request browser notification permission
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
        }
    }, [user, fetchUserProfile, fetchNetworkUsers]);

    console.log("All network users => ", networkUsers)

    // ✅ ADD CONNECTION STATUS INDICATOR (OPTIONAL)
    {
        isConnected && (
            <div className="fixed top-20 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                🟢 Live
            </div>
        )
    }

    const profileData = transformToProfileData(
        userProfileData,
        profileImageUrl,
        headlineData
    );

    return (
        <>
            <ProfileNavbar
                profileImage={profileData.profileImage}
                userName={profileData.userName}
                currentUserId={user?.userId}
            />

            <div className="min-h-screen mt-12" style={{ backgroundColor: '#f6ede8' }}>
                {/* Floating Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-5"
                        style={{ backgroundColor: '#4a3728' }}
                    ></div>
                    <div
                        className="absolute top-60 right-20 w-24 h-24 rounded-full opacity-5"
                        style={{ backgroundColor: '#4a3728' }}
                    ></div>
                    <div
                        className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full opacity-5"
                        style={{ backgroundColor: '#4a3728' }}
                    ></div>
                </div>

                <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-6">
                    {/* Sidebar */}
                    <NetworkSidebar />

                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        {/* Tabs Section */}
                        <div className="max-w-4xl mx-auto p-6 space-y-8">
                            <NetworkTab activeTab={activeTab} setActiveTab={setActiveTab} />

                            {/* Connection Requests */}
                            <ConnectionRequestsList
                                requests={requests}
                                sentRequests={sentRequests}
                                isLoading={isLoadingRequests} // ✅ ADD THIS PROP
                                showRequestsPanel={showRequestsPanel}
                                activeReqTab={activeReqTab}
                                setActiveReqTab={setActiveReqTab}
                                onTogglePanel={toggleRequestsPanel}
                                onAccept={handleAccept}
                                onIgnore={handleIgnore}
                                onWithdraw={handleWithdraw}
                            />

                            {/* Profile Viewer Card */}
                            <ProfileViewerCard />
                        </div>

                        {/* People You May Know - Section 1 */}
                        <SuggestionsSection
                            people={networkUsers}
                            connectedUsers={connectedUsers}
                            onConnect={handleConnect}
                            isLoading={isLoadingUsers}
                        />

                        {/* Suggestions for Companies */}
                        <SuggestionsForCompaniesSection
                            companies={realCompanies}            
                            followingCompanies={followingCompanies}
                            onFollow={handleFollowCompany}
                            isLoading={isLoadingCompanies}        
                        />

                        {/* Premium Spotlight - Section 1 */}
                        <PremiumSpotlight profiles={premiumProfiles} />

                        {/* Suggestions For You */}
                        {/* <SuggestionsSection
                            title="Suggestions For You"
                            people={suggestionForYou}
                            connectedUsers={connectedUsers}
                            onConnect={handleConnect}
                        /> */}

                        {/* Premium Spotlight - Section 2 */}
                        {/* <PremiumSpotlight profiles={premiumProfiles} /> */}

                        {/* Profile Completion Card */}
                        <ProfileCompletionCard completionPercentage={12} />
                    </div>
                </div>
            </div>
        </>
    );
}

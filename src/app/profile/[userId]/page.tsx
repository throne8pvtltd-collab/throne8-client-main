'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';

// Import components
import ProfileNavbar from '../../../features/profile/components/home/ProfileNavbar';
import ProfileBanner from '../../../features/profile/components/home/ProfileBanner';
import ProfileHeader from '../../../features/profile/components/home/ProfileHeader';
import ProfessionalJourney from '../../../features/profile/components/home/ProfessionalJourney';
import AboutSection from '../../../features/profile/components/home/AboutSection';
import EducationSection from '../../../features/profile/components/home/EducationSection';
import ExperienceSection from '../../../features/profile/components/home/ExperienceSection';
import ActivitySection from '../../../features/profile/components/home/ActivitySection';
import SkillsSection from '../../../features/profile/components/home/SkillsSection';
import InterestsSection from '../../../features/profile/components/home/InterestsSection';
import PeopleYouMayKnow from '../../../features/profile/components/home/PeopleYouMayKnow';
import { transformToProfileData } from '@/shared/utils/profileTransformers';

import { useSearchUserProfileData } from '@/features/profile/hooks/useSearchUserProfileData';
import { usePostsData } from '@/features/profile/hooks/usePostsData';
import { useAboutData } from '@/features/profile/hooks/useAboutData';
import { useHeadlineData } from '@/features/profile/hooks/useHeadlineData';
import { useConnectionsData } from '@/features/profile/hooks/useConnectionsData';
import AnalyticsService from '@/lib/api/analytics.service';
import ConnectionService from '@/lib/api/connection.service';
import FollowService from '@/lib/api/follow.service';

export default function SearchUserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.userId as string;
    const { user } = useAuth();
    const {
        userProfileData,
        profileImageUrl,
        bannerUrl,
        coverPhotoId,
        aboutId,
        headlineId,
        isLoadingProfile,
        profileError,
        fetchUserProfileById,
    } = useSearchUserProfileData(userId);

    // ✅ FIX: stable reference — warna har render pe naya [] array banega
    // aur ExperienceSection ke andar wala useEffect infinite loop mein
    // chala jayega, jo backend ko continuously hit karke 429 rate-limit
    // laga deta hai, jiski wajah se About/Experience dono fail ho jaate hain
    const experienceIds = useMemo(
        () => userProfileData?.experienceIds || [],
        [userProfileData?.experienceIds]
    );

    const {
        followingList,
        followersList,
        totalConnections,
        isLoadingConnections,
        fetchConnectionsData,
    } = useConnectionsData();

    const [isFollowing, setIsFollowing] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionPending, setConnectionPending] = useState(false);
    const [isFollowActionLoading, setIsFollowActionLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            fetchConnectionsData(userId);
        }
    }, [userId, fetchConnectionsData]);

    useEffect(() => {
        if (!userId || !user?.userId || userId === user.userId) return;
        const checkStatus = async () => {
            try {
                const followRes = await FollowService.checkFollowStatus(userId);
                setIsFollowing(!!followRes?.data?.isFollowing);
            } catch {
                setIsFollowing(false);
            }
        };
        checkStatus();
    }, [userId, user?.userId]);

    useEffect(() => {
        if (!user?.userId || !userId) return;
        const checkConnection = async () => {
            try {
                const res = await ConnectionService.getUserConnections(user.userId);
                const connections = res?.data?.data || res?.data || [];
                const connected = connections.some(
                    (c: any) =>
                        (c.fromUserId === userId || c.toUserId === userId) &&
                        c.status === 'active'
                );
                setIsConnected(connected);
            } catch {
                setIsConnected(false);
            }
        };
        checkConnection();
    }, [userId, user?.userId]);

    useEffect(() => {
        if (!user?.userId || !userId || userId === user.userId) return;
        const checkPendingStatus = async () => {
            try {
                const res = await ConnectionService.getOutgoingRequests(user.userId);
                const outgoingRequests = res?.data?.data || res?.data || [];
                const isPending = outgoingRequests.some(
                    (r: any) => r.toUserId === userId
                );
                setConnectionPending(isPending);
            } catch {
                setConnectionPending(false);
            }
        };
        checkPendingStatus();
    }, [userId, user?.userId]);

    const [incomingRequestId, setIncomingRequestId] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.userId || !userId || userId === user.userId) return;
        const checkIncomingRequest = async () => {
            try {
                const res = await ConnectionService.getIncomingRequests(user.userId);
                const incomingRequests = res?.data?.data || res?.data || [];
                const matchedRequest = incomingRequests.find(
                    (r: any) => r.fromUserId === userId
                );
                setIncomingRequestId(matchedRequest?.requestId || null);
            } catch {
                setIncomingRequestId(null);
            }
        };
        checkIncomingRequest();
    }, [userId, user?.userId]);

    const handleConnect = async () => {
        if (!userId || connectionPending) return;
        try {
            setConnectionPending(true);
            await ConnectionService.sendConnectionRequest({ toUserId: userId });
            alert('Connection request sent!');
        } catch (error: any) {
            alert(error.message?.includes('already exists') ? 'Connection request already sent' : (error.message || 'Failed to send connection request'));
        } finally {
            setConnectionPending(false);
        }
    };

    const handleAcceptRequest = async () => {
        if (!incomingRequestId) return;
        try {
            await ConnectionService.acceptConnectionRequest(incomingRequestId);
            setIncomingRequestId(null);
            setIsConnected(true);
        } catch (error: any) {
            alert(error.message || 'Failed to accept request');
        }
    };

    const handleDeclineRequest = async () => {
        if (!incomingRequestId) return;
        try {
            await ConnectionService.declineConnectionRequest(incomingRequestId);
            setIncomingRequestId(null);
        } catch (error: any) {
            alert(error.message || 'Failed to decline request');
        }
    };

    const handleFollow = async () => {
        if (!userId || isFollowActionLoading) return;
        try {
            setIsFollowActionLoading(true);
            if (isFollowing) {
                await FollowService.unfollowUser(userId);
                setIsFollowing(false);
            } else {
                await FollowService.followUser(userId);
                setIsFollowing(true);
            }
        } catch (error: any) {
            alert(error.message || 'Failed to update follow status');
        } finally {
            setIsFollowActionLoading(false);
        }
    };

    const handleMessage = () => {
        router.push(`/message/${userId}`);
    };

    const { userPosts, isLoadingPosts, fetchUserPosts } = usePostsData(userId);

    const {
        aboutData,
        videoUrl,
        isLoadingAbout,
        fetchAboutData,
    } = useAboutData(aboutId);

    const { headlineData, isLoadingHeadline, fetchHeadlineData } = useHeadlineData(headlineId);

    const profileData = transformToProfileData(userProfileData, profileImageUrl, headlineData);

    const fullName = userProfileData
        ? `${userProfileData.firstName} ${userProfileData.lastName}`.trim()
        : 'Loading...';

    useEffect(() => {
        if (userId) {
            fetchUserProfileById();
        }
    }, [userId, fetchUserProfileById]);

    useEffect(() => {
        if (user?.userId && userId && user.userId !== userId) {
            AnalyticsService.recordProfileView(userId, {
                viewerId: user.userId,
                viewerName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
            });
        }
    }, [user, userId]);

    useEffect(() => {
        if (aboutId) {
            fetchAboutData();
        }
    }, [aboutId, fetchAboutData]);

    useEffect(() => {
        if (headlineId) {
            fetchHeadlineData();
        }
    }, [headlineId, fetchHeadlineData]);

    useEffect(() => {
        if (userId) {
            fetchUserPosts(userId);
        }
    }, [userId, fetchUserPosts]);

    const searchParams = useSearchParams();

    useEffect(() => {
        const section = searchParams.get('section');
        if (section) {
            setTimeout(() => {
                const el = document.getElementById(section);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 3000);
        }
    }, [searchParams]);

    if (isLoadingProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f1ed] to-[#e8dfd7]">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-[#4a3728] mx-auto" />
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (profileError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f1ed] to-[#e8dfd7]">
                <div className="text-center">
                    <p className="text-red-600 text-lg">{profileError}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-6 py-2 bg-[#4a3728] text-white rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f6ede8] py-12 px-4 font-sans overflow-x-hidden">
            <ProfileNavbar
                profileImage={profileData.profileImage}
                userName={profileData.userName}
                currentUserId={user?.userId}
            />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                <div className="flex-1 min-w-0 pt-20">
                    <ProfileBanner
                        bannerImage={bannerUrl}
                        onBannerUpdate={() => { }}
                        onDataRefresh={() => { }}
                        coverId={coverPhotoId}
                        isOwnProfile={false}
                    />

                    <ProfileHeader
                        isOwnProfile={false}
                        currentUserId={userId}
                        profileImage={profileImageUrl}
                        name={profileData.name}
                        pronouns={profileData.pronouns}
                        headline={headlineData?.title || profileData.headline}
                        headlineId={headlineId}
                        onHeadlineCreated={() => { }}
                        company={profileData.company}
                        description={profileData.description}
                        location={profileData.location}
                        followers={followersList.length}
                        connections={totalConnections.toString()}
                        firstName={userProfileData?.firstName || ''}
                        lastName={userProfileData?.lastName || ''}
                        currentPosition={userProfileData?.currentPosition || ''}
                        education={userProfileData?.education || ''}
                        contactInfo={userProfileData?.contactInfo || ''}
                        onDataRefresh={() => { }}
                        onProfileImageUpdate={() => { }}
                        isFollowing={isFollowing}
                        isConnected={isConnected}
                        connectionPending={connectionPending}
                        onFollow={handleFollow}
                        onConnect={handleConnect}
                        onMessage={handleMessage}
                    />
                    <div id="about">
                        <AboutSection
                            isOwnProfile={false}
                            aboutData={aboutData}
                            isLoading={isLoadingAbout}
                            onAboutCreated={() => { }}
                            aboutId={aboutId}
                            videoUrl={videoUrl}
                            isUploadingVideo={false}
                        />
                    </div>

                    <EducationSection
                        isOwnProfile={false}
                        userId={userId}
                        collegeName={profileData.education.collegeName}
                        degree={profileData.education.degree}
                        fieldOfStudy={profileData.education.fieldOfStudy}
                        graduationYear={profileData.education.graduationYear}
                    />

                    {/* ✅ FIXED: stable experienceIds reference */}
                    <ExperienceSection
                        experienceIds={experienceIds}
                        userId={userId}
                        isOwnProfile={false}
                    />

                    <div id="activity">
                       <ActivitySection
                           posts={userPosts as any}
                           onPostCreated={() => { }}
                           isLoading={isLoadingPosts}
                           profileImage={profileImageUrl}
                           fullName={fullName}
                           headline={profileData.headline}
                           followers={followersList.length}
                           userId={userId} 
                           currentUserId={user?.userId}
                           isOwnProfile={false}
                       />
                   </div>

                    <SkillsSection userId={userId} isOwnProfile={false} />
                    <InterestsSection />
                </div>

                <div className="w-full md:w-80 md:min-w-[20rem]">
                    <PeopleYouMayKnow />
                </div>
            </div>
        </div>
    );
}
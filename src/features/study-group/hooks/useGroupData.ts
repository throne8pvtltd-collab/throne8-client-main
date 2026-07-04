// hooks/studyGroup/useGroupData.ts

import { useState, useCallback, useRef } from 'react';
import AuthService from '@/lib/api/auth.service';
import StudyGroupService, { GroupResponse, GroupMember, GroupCategory, MyRequestsResponse } from '@/lib/api/studyGroup.service';
import ProfileService from '@/lib/api/profile.service';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserInfo {
  userId: string;
  name: string;           // firstName + lastName (from getUserProfileById)
  avatar: string | null;  // cloudinarySecureUrl (from getMultipleProfilePhotosByIds)
  headline: string;       // from getHeadlineById
  email: string;
}

export interface EnrichedGroupMember {
  userId: string;
  role: 'leader' | 'admin' | 'member';
  joinedAt: string;
  lastActive?: string;
  // Enriched fields
  name: string;
  avatar: string | null;
  headline: string;
}

// Module-level cache — shared across all hook instances
const globalUserCache: Record<string, UserInfo> = {};
const globalJoinRequestsMap: Record<string, MyRequestsResponse> = {};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useGroupData = () => {

  // ── 1. All Groups (my groups) ──
  const [allGroups, setAllGroups] = useState<GroupResponse[]>([]);
  const [isLoadingAllGroups, setIsLoadingAllGroups] = useState(false);

  // ── 2. All Users ──
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  const [isLoadingAllUsers, setIsLoadingAllUsers] = useState(false);

  // ── 4. Group Members ──
  const [groupMembers, setGroupMembers] = useState<EnrichedGroupMember[]>([]);
  const [isLoadingGroupMembers, setIsLoadingGroupMembers] = useState(false);

  // ── 5. Group Count ──
  const [groupCount, setGroupCount] = useState(0);

  // ── 6. Public Groups ──
  const [publicGroups, setPublicGroups] = useState<GroupResponse[]>([]);
  const [isLoadingPublicGroups, setIsLoadingPublicGroups] = useState(false);

  // ── 7. Private Groups ──
  const [privateGroups, setPrivateGroups] = useState<GroupResponse[]>([]);
  const [isLoadingPrivateGroups, setIsLoadingPrivateGroups] = useState(false);

  // ── 8. My Join Requests ──
  const [myJoinRequests, setMyJoinRequests] = useState<MyRequestsResponse[]>([]);
  const [isLoadingMyJoinRequests, setIsLoadingMyJoinRequests] = useState(false);

  // ── Helper: groupId se request status nikalo ──
  // Record<groupId, MyRequestsResponse>
  const myJoinRequestsMap = useRef<Record<string, MyRequestsResponse>>({});

  const [error, setError] = useState<string | null>(null);

  // ── Cache: userId → UserInfo — never re-fetch same user twice ──
  // const userCache = useRef<Record<string, UserInfo>>({});

  // ─────────────────────────────────────────────────────────────────────────────
  // INTERNAL: fetch profile + photo + headline for uncached userIds
  // Exact same 3-step pipeline as useNetworkUsers
  // ─────────────────────────────────────────────────────────────────────────────

  const resolveUserIds = useCallback(async (userIds: string[]): Promise<void> => {
    const uncached = userIds.filter(id => id && !globalUserCache[id]);
    if (uncached.length === 0) return;

    // STEP 1 — getUserProfileById for each user
    // returns: { userId, firstName, lastName, profilePhotoId, headlineId, email, location }
    const profileResponses = await Promise.all(
      uncached.map(id =>
        AuthService.getUserProfileById(id).catch(() => null)
      )
    );
    const profiles = profileResponses
      .filter(r => r !== null)
      .map(r => r!.data);

    // STEP 2 — getMultipleProfilePhotosByIds (batch)
    // returns: { photos: [{ photoId, cloudinarySecureUrl }] }
    const photoIds = profiles.map((p: any) => p.profilePhotoId).filter(Boolean);
    let photosMap: Record<string, string> = {};
    if (photoIds.length > 0) {
      try {
        const res = await ProfileService.getMultipleProfilePhotosByIds(photoIds);
        photosMap = res.data.photos.reduce(
          (acc: Record<string, string>, photo: any) => {
            acc[photo.photoId] = photo.cloudinarySecureUrl;
            return acc;
          },
          {}
        );
      } catch {
        // photos are optional — continue without them
      }
    }

    // STEP 3 — getHeadlineById for each user that has a headlineId
    const headlineIds = profiles.map((p: any) => p.headlineId).filter(Boolean);
    let headlinesMap: Record<string, string> = {};
    if (headlineIds.length > 0) {
      const headlineRes = await Promise.all(
        headlineIds.map((hId: string) =>
          ProfileService.getHeadlineById(hId)
            .then((r: any) => ({ hId, title: r?.data?.title ?? '' }))
            .catch(() => null)
        )
      );
      headlineRes
        .filter((r): r is { hId: string; title: string } => r !== null)
        .forEach(({ hId, title }) => { headlinesMap[hId] = title; });
    }

    // STEP 4 — build UserInfo and write to cache
    profiles.forEach((p: any) => {
      globalUserCache[p.userId] = {
        userId: p.userId,
        name: `${p.firstName ?? ''} ${p.lastName ?? ''}`.trim()
          || p.username
          || p.email?.split('@')[0]
          || p.userId.slice(0, 8),
        avatar: p.profilePhotoId
          ? (photosMap[p.profilePhotoId] ?? null)
          : null,
        headline: p.headlineId
          ? (headlinesMap[p.headlineId] ?? '')
          : '',
        email: p.email ?? '',
      };
    });

    // Placeholder for any that failed — prevents infinite retry
    uncached.forEach(id => {
      if (!globalUserCache[id]) {
        globalUserCache[id] = {
          userId: id,
          name: 'Unknown User',
          avatar: null,
          headline: '',
          email: '',
        };
      }
    });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. fetchAllGroups
  // Calls: StudyGroupService.getMyGroups()
  // Returns: GroupResponse[]
  // ─────────────────────────────────────────────────────────────────────────────

  const fetchAllGroups = useCallback(async () => {
    try {
      setIsLoadingAllGroups(true);
      setError(null);
      // getMyGroups() → returns GroupResponse[] directly
      const groups = await StudyGroupService.getMyGroups();
      setAllGroups(groups);
      setGroupCount(groups.length); // auto-updates count
    } catch (err: any) {
      setError(err.message || 'Failed to fetch groups');
    } finally {
      setIsLoadingAllGroups(false);
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. fetchAllUsers
  // Calls: AuthService.getAllUsers() → then resolves each userId for real name+photo
  // Returns: UserInfo[] (with name, avatar, headline — NOT just userId)
  // ─────────────────────────────────────────────────────────────────────────────

  const fetchAllUsers = useCallback(async () => {
    try {
      setIsLoadingAllUsers(true);
      setError(null);

      // getAllUsers returns: { data: { users: [{ userId, email, ... }], pagination: {} } }
      const res = await AuthService.getAllUsers({ limit: 100 });
      const userIds: string[] = (res.data.users as any[]).map((u: any) => u.userId);

      // Resolve all profiles + photos + headlines for every userId
      await resolveUserIds(userIds);

      // Pull enriched data from cache
      const enriched: UserInfo[] = userIds
        .map(id => globalUserCache[id])
        .filter(Boolean);

      setAllUsers(enriched);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setIsLoadingAllUsers(false);
    }
  }, [resolveUserIds]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. getUserInfo — info of a particular user
  // Async version: always returns correct data (fetches if not cached)
  // Sync version: returns from cache only (use after fetchAllUsers is done)
  // ─────────────────────────────────────────────────────────────────────────────

  const getUserInfo = useCallback(async (userId: string): Promise<UserInfo> => {
    if (globalUserCache[userId]) return globalUserCache[userId];
    await resolveUserIds([userId]);
    return globalUserCache[userId] ?? {
      userId,
      name: 'Unknown User',
      avatar: null,
      headline: '',
      email: '',
    };
  }, [resolveUserIds]);

  // Use this in render when you KNOW fetchAllUsers() has already completed
  const getUserInfoSync = useCallback((userId: string): UserInfo => {
    return globalUserCache[userId] ?? {
      userId,
      name: userId.slice(0, 8) + '...',
      avatar: null,
      headline: '',
      email: '',
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. fetchGroupMembers — all members + leaders of a specific group
  // Calls: StudyGroupService.getGroupMembers(groupId)
  // Returns: { total, members: GroupMember[] }
  // Enriches each member with real name + avatar from profile API
  // ─────────────────────────────────────────────────────────────────────────────

  const fetchGroupMembers = useCallback(async (groupId: string) => {
    try {
      setIsLoadingGroupMembers(true);
      setError(null);

      // getGroupMembers returns: { total: number, members: GroupMember[] }
      const res = await StudyGroupService.getGroupMembers(groupId);
      const rawMembers: GroupMember[] = res.members ?? [];

      // Resolve all member profiles + photos
      const memberUserIds = rawMembers.map(m => m.userId).filter(Boolean);
      await resolveUserIds(memberUserIds);

      // Enrich with real name + avatar
      const enriched: EnrichedGroupMember[] = rawMembers.map(m => {
        const info = globalUserCache[m.userId];
        return {
          userId: m.userId,
          role: m.role as 'leader' | 'admin' | 'member',
          joinedAt: m.joinedAt,
          lastActive: m.lastActive,
          name: info?.name ?? m.userId.slice(0, 8),
          avatar: info?.avatar ?? null,
          headline: info?.headline ?? '',
        };
      });

      setGroupMembers(enriched);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch group members');
    } finally {
      setIsLoadingGroupMembers(false);
    }
  }, [resolveUserIds]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. groupCount + fetchGroupCount
  // groupCount auto-updates when fetchAllGroups() runs
  // fetchGroupCount() for standalone count without loading full group data
  // ─────────────────────────────────────────────────────────────────────────────

  const fetchGroupCount = useCallback(async () => {
    try {
      const groups = await StudyGroupService.getMyGroups();
      setGroupCount(groups.length);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch group count');
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. fetchPublicGroups
  // Calls: StudyGroupService.getGroups({ visibility: 'public' })
  // Returns: GroupListResponse → we extract .groups array
  // ─────────────────────────────────────────────────────────────────────────────

  const fetchPublicGroups = useCallback(async (filters?: {
    category?: GroupCategory;
    search?: string;
    limit?: number;
  }) => {
    try {
      setIsLoadingPublicGroups(true);
      setError(null);
      // getGroups() returns GroupListResponse: { groups, total, page, totalPages }
      const res = await StudyGroupService.getGroups({
        visibility: 'public' as any,
        ...filters,
      });
      setPublicGroups(res.groups ?? []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch public groups');
    } finally {
      setIsLoadingPublicGroups(false);
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. fetchPrivateGroups
  // Calls: StudyGroupService.getGroups({ visibility: 'private' })
  // ─────────────────────────────────────────────────────────────────────────────

  const fetchPrivateGroups = useCallback(async (filters?: {
    category?: GroupCategory;
    search?: string;
    limit?: number;
  }) => {
    try {
      setIsLoadingPrivateGroups(true);
      setError(null);
      const res = await StudyGroupService.getGroups({
        visibility: 'private' as any,
        ...filters,
      });
      setPrivateGroups(res.groups ?? []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch private groups');
    } finally {
      setIsLoadingPrivateGroups(false);
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. fetchMyJoinRequests
  // Calls: StudyGroupService.getMyJoinRequests()
  // App start pe ek baar call karo — cache ho jayega
  // ─────────────────────────────────────────────────────────────────────────────

  const fetchMyJoinRequests = useCallback(async () => {
    try {
      setIsLoadingMyJoinRequests(true);
      const requests = await StudyGroupService.getMyJoinRequests();
      setMyJoinRequests(requests);

      // groupId => request map build karo for O(1) lookup
      myJoinRequestsMap.current = requests.reduce(
        (acc, req) => {
          acc[req.groupId] = req;
          return acc;
        },
        {} as Record<string, MyRequestsResponse>
      );
    } catch (err: any) {
      // silent fail — non-critical
      console.error('Failed to fetch join requests:', err.message);
    } finally {
      setIsLoadingMyJoinRequests(false);
    }
  }, []);

  // Get request status for a specific group — O(1) lookup
  const getJoinRequestForGroup = useCallback(
    (groupId: string): MyRequestsResponse | null => {
      return myJoinRequestsMap.current[groupId] ?? null;
    },
    []
  );

  // Update cache after new request sent
  const addJoinRequestToCache = useCallback(
    (request: MyRequestsResponse) => {
      myJoinRequestsMap.current[request.groupId] = request;
      setMyJoinRequests(prev => {
        const exists = prev.find(r => r.groupId === request.groupId);
        if (exists) {
          return prev.map(r => r.groupId === request.groupId ? request : r);
        }
        return [...prev, request];
      });
    },
    []
  );

  // Remove from cache after cancel
  const removeJoinRequestFromCache = useCallback(
    (groupId: string) => {
      delete myJoinRequestsMap.current[groupId];
      setMyJoinRequests(prev => prev.filter(r => r.groupId !== groupId));
    },
    []
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // Return
  // ─────────────────────────────────────────────────────────────────────────────

  return {
    // 1. All Groups (my groups)
    allGroups,                  // GroupResponse[]
    isLoadingAllGroups,
    fetchAllGroups,             // call on mount: useEffect(() => { fetchAllGroups() }, [])

    // 2. All Users (with real name + avatar + headline)
    allUsers,                   // UserInfo[]
    isLoadingAllUsers,
    fetchAllUsers,              // call on mount: useEffect(() => { fetchAllUsers() }, [])

    // 3. Single User Info
    getUserInfo,                // async — await getUserInfo(userId) → UserInfo
    getUserInfoSync,            // sync  — getUserInfoSync(userId) → UserInfo (use after fetchAllUsers)

    // 4. Group Members (with real name + avatar)
    groupMembers,               // EnrichedGroupMember[]
    isLoadingGroupMembers,
    fetchGroupMembers,          // fetchGroupMembers('group-id') — call when modal opens

    // 5. Group Count
    groupCount,                 // number — auto-updated by fetchAllGroups()
    fetchGroupCount,            // standalone: just updates groupCount without loading groups

    // 6. Public Groups
    publicGroups,               // GroupResponse[]
    isLoadingPublicGroups,
    fetchPublicGroups,          // fetchPublicGroups({ category: 'JEE', search: 'warriors' })

    // 7. Private Groups
    privateGroups,              // GroupResponse[]
    isLoadingPrivateGroups,
    fetchPrivateGroups,         // fetchPrivateGroups({ category: 'NEET' })

    // 8. My Join Requests
    myJoinRequests,            // MyRequestsResponse[]
    isLoadingMyJoinRequests,
    fetchMyJoinRequests,       // call on app start to populate cache
    getJoinRequestForGroup,    // getJoinRequestForGroup(groupId) → MyRequestsResponse | null
    addJoinRequestToCache,     // call after successfully sending a join request
    removeJoinRequestFromCache, // call after successfully canceling a join request


    // Error
    error,
  };
};




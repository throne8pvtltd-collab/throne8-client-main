import { useState, useEffect, useCallback } from 'react';
import CompanyService from '@/lib/api/company.service';
import { Company } from '@/features/networks/types';

export const useNetworkCompanies = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [followingCompanies, setFollowingCompanies] = useState<Set<string>>(new Set());

    // API response ko Company type mein convert karo
    const transformCompany = (raw: any): Company => ({
        id: raw.companyId,
        name: raw.companyName,
        industry: raw.industry || '',
        employees: raw.companySize || '',
        image: raw.media?.logo?.url || '',
        location: raw.headquarters?.city || '',
        description: raw.descriptions?.tagline || '',
        followersCount: raw.stats?.followersCount || 0,
        companySlug: raw.companySlug || '',
    });

    const fetchCompanies = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await CompanyService.getCompaniesForNetwork({
                page: 1,
                pageSize: 20
            });

            // Response structure: data.data.response
            const rawCompanies = response?.data?.response || [];
            const transformed = rawCompanies.map(transformCompany);
            setCompanies(transformed);
        } catch (error) {
            console.error('Failed to fetch companies:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleFollowCompany = useCallback(async (companyId: string) => {
        const isCurrentlyFollowing = followingCompanies.has(companyId);

        // Optimistic UI update
        setFollowingCompanies(prev => {
            const newSet = new Set(prev);
            if (isCurrentlyFollowing) {
                newSet.delete(companyId);
            } else {
                newSet.add(companyId);
            }
            return newSet;
        });

        try {
            if (isCurrentlyFollowing) {
                await CompanyService.unfollowCompany(companyId);
            } else {
                await CompanyService.followCompany(companyId);
            }
        } catch (error) {
            // API fail hone par revert karo
            console.error('Follow/Unfollow failed:', error);
            setFollowingCompanies(prev => {
                const newSet = new Set(prev);
                if (isCurrentlyFollowing) {
                    newSet.add(companyId);    // revert
                } else {
                    newSet.delete(companyId); // revert
                }
                return newSet;
            });
        }
    }, [followingCompanies]);

    // Initial follow status fetch
    const fetchFollowStatuses = useCallback(async (companyList: Company[]) => {
        const followingSet = new Set<string>();

        await Promise.allSettled(
            companyList.map(async (company) => {
                try {
                    const res = await CompanyService.getCompanyFollowStatus(company.id);
                    if (res?.data?.isFollowing) {
                        followingSet.add(company.id);
                    }
                } catch {
                    // Silent fail
                }
            })
        );

        setFollowingCompanies(followingSet);
    }, []);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    // Companies fetch hone ke baad follow status check karo
    useEffect(() => {
        if (companies.length > 0) {
            fetchFollowStatuses(companies);
        }
    }, [companies.length]); // companies.length pe depend karo infinite loop avoid ke liye

    return {
        companies,
        isLoading,
        followingCompanies,
        handleFollowCompany,
    };
};
import { useState, useCallback } from 'react';
import AuthService from '@/lib/api/auth.service';
import ProfileService from '@/lib/api/profile.service';

export const useSkillsData = (userId?: string, isOwnProfile: boolean = true) => {
    const [skillsList, setSkillsList] = useState<any[]>([]);
    const [isLoadingSkills, setIsLoadingSkills] = useState(true);
    const [skillsError, setSkillsError] = useState<string | null>(null);

    const fetchSkillsData = useCallback(async () => {
        try {
            setIsLoadingSkills(true);
            setSkillsError(null);

            // Own profile: normal authenticated fetch
            // Public profile: fetch by target userId, read-only
            const response = isOwnProfile
                ? await ProfileService.getAllSkills(false)
                : await ProfileService.getSkillsByUserId(userId as string);

            if (response?.data?.skillsList) {
                // Sort on fetch as well
                const sorted = response.data.skillsList.sort((a: any, b: any) => {
                    if (a.isPinned && !b.isPinned) return -1;
                    if (!a.isPinned && b.isPinned) return 1;
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });

                setSkillsList(sorted);
            } else {
                setSkillsList([]);
            }
        } catch (error: any) {
            console.error('[HOOK] Failed to fetch skills:', error);
            setSkillsError(error.message || 'Failed to load skills data');
            setSkillsList([]);
        } finally {
            setIsLoadingSkills(false);
        }
    }, [userId, isOwnProfile]);

    const updateSkillInList = useCallback((skillId: string, updatedData: any) => {
        setSkillsList(prevSkills =>
            prevSkills.map(skill =>
                skill.skillId === skillId
                    ? { ...skill, ...updatedData, updatedAt: new Date().toISOString() }
                    : skill
            )
        );
    }, []);

    // Get pinned skills count
    const getPinnedCount = useCallback(() => {
        return skillsList.filter(skill => skill.isPinned).length;
    }, [skillsList]);

    // Update pin status with force re-sort
    const updatePinStatus = useCallback((skillId: string, isPinned: boolean) => {
        setSkillsList(prevSkills => {
            const updatedSkills = prevSkills.map(skill =>
                skill.skillId === skillId
                    ? { ...skill, isPinned, updatedAt: new Date().toISOString() }
                    : skill
            );

            const sorted = updatedSkills.sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            return [...sorted]; // Create new array reference to force re-render
        });
    }, []);

    // Remove skill from local state (for archive/delete)
    const removeSkillFromList = useCallback((skillId: string) => {
        setSkillsList(prevSkills => {
            const filtered = prevSkills.filter(skill => skill.skillId !== skillId);
            return filtered;
        });
    }, []);

    return {
        skillsList,
        isLoadingSkills,
        skillsError,
        fetchSkillsData,
        updateSkillInList,
        getPinnedCount,
        updatePinStatus,
        removeSkillFromList,
    };
};
import { useState, useCallback } from 'react';
import AuthService from '@/lib/api/auth.service';
import ProfileService from '@/lib/api/profile.service';

export const useSkillsData = () => {
    const [skillsList, setSkillsList] = useState<any[]>([]);
    const [isLoadingSkills, setIsLoadingSkills] = useState(true);
    const [skillsError, setSkillsError] = useState<string | null>(null);

    const fetchSkillsData = useCallback(async () => {
        try {
            setIsLoadingSkills(true);
            setSkillsError(null);

            // console.log('💡 [HOOK] Fetching skills data...');
            const response = await ProfileService.getAllSkills(false);

            if (response?.data?.skillsList) {
                // ✅ Sort on fetch as well
                const sorted = response.data.skillsList.sort((a: any, b: any) => {
                    if (a.isPinned && !b.isPinned) return -1;
                    if (!a.isPinned && b.isPinned) return 1;
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });

                setSkillsList(sorted);
                // console.log('✅ [HOOK] Skills data fetched and sorted:', sorted);
            }
        } catch (error: any) {
            console.error('❌ [HOOK] Failed to fetch skills:', error);
            setSkillsError(error.message || 'Failed to load skills data');
        } finally {
            setIsLoadingSkills(false);
        }
    }, []);

    const updateSkillInList = useCallback((skillId: string, updatedData: any) => {
        setSkillsList(prevSkills =>
            prevSkills.map(skill =>
                skill.skillId === skillId
                    ? { ...skill, ...updatedData, updatedAt: new Date().toISOString() }
                    : skill
            )
        );
    }, []);

    // ✅ NEW: Get pinned skills count
    const getPinnedCount = useCallback(() => {
        return skillsList.filter(skill => skill.isPinned).length;
    }, [skillsList]);

    // ✅ NEW: Update pin status in local state
    // ✅ Update pin status with force re-sort
    const updatePinStatus = useCallback((skillId: string, isPinned: boolean) => {
        setSkillsList(prevSkills => {
            // Update the skill
            const updatedSkills = prevSkills.map(skill =>
                skill.skillId === skillId
                    ? { ...skill, isPinned, updatedAt: new Date().toISOString() }
                    : skill
            );

            // Sort: pinned skills on top
            const sorted = updatedSkills.sort((a, b) => {
                // First sort by pinned status
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;

                // Then by creation date (latest first)
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            // console.log('🔄 Skills re-sorted:', sorted.map(s => ({ name: s.skillName, isPinned: s.isPinned })));

            return [...sorted]; // ✅ Create new array reference to force re-render
        });
    }, []);

    // ✅ Remove skill from local state (for archive/delete)
    const removeSkillFromList = useCallback((skillId: string) => {
        setSkillsList(prevSkills => {
            const filtered = prevSkills.filter(skill => skill.skillId !== skillId);
            // console.log('🗑️ Skill removed from local state:', skillId);
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
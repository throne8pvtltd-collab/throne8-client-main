'use client';
import React, { useEffect, useState } from 'react';
import { MoreVertical, Pin, Archive, Trash2, Edit, Loader2 } from 'lucide-react';
import { useSkillsData } from '@/features/profile/hooks/useSkillsData';
import AuthService from '@/lib/api/auth.service';
import AddSkillModal, { SkillFormData } from '@/features/study-group/modals/AddSkillModal';
import UpdateSkillModal, { UpdateSkillFormData } from '@/features/study-group/modals/UpdateSkillModal';
import ViewAllSkillsModal from '@/features/study-group/modals/ViewAllSkillsModal';
import PinLimitModal from './modals/PinLimitModal';
import DeleteSkillConfirmModal from './modals/DeleteSkillConfirmModal';
import ProfileService from '@/lib/api/profile.service';

interface Skill {
    skillId: string;
    skillName: string;
    category: string;
    skillStrength: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    yearsOfExperience: number;
    isPinned: boolean;
    isDeleted: boolean;
    isArchived: boolean;
    createdAt: string;
}

interface SkillsSectionProps {
    userId?: string;          // target user ka id (public profile ke liye)
    isOwnProfile?: boolean;   // default true - purana behavior nahi tootega
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
    userId,
    isOwnProfile = true,
}) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
    const [isUpdateSkillModalOpen, setIsUpdateSkillModalOpen] = useState(false);
    const [isViewAllSkillsModalOpen, setIsViewAllSkillsModalOpen] = useState(false);
    const [selectedSkillForUpdate, setSelectedSkillForUpdate] = useState<Skill | undefined>(undefined);
    const [isPinLimitModalOpen, setIsPinLimitModalOpen] = useState(false);
    const [isPinningSkillId, setIsPinningSkillId] = useState<string | null>(null);

    const [isArchivingSkillId, setIsArchivingSkillId] = useState<string | null>(null);
    const [isDeletingSkillId, setIsDeletingSkillId] = useState<string | null>(null);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

    const [showAllSkills, setShowAllSkills] = useState(false);

    const {
        skillsList,
        isLoadingSkills,
        fetchSkillsData,
        updateSkillInList,
        getPinnedCount,
        updatePinStatus,
        removeSkillFromList,
    } = useSkillsData(userId, isOwnProfile);

    useEffect(() => {
        fetchSkillsData();
    }, [fetchSkillsData]);

    const handleAddSkill = async (skillData: SkillFormData) => {
        try {
            const response = await ProfileService.createSkill(skillData);

            if (response?.data?.skill) {
                await fetchSkillsData();
            }
        } catch (error: any) {
            console.error('Failed to add skill:', error);
            alert(error.message || 'Failed to add skill');
        }
    };

    if (isLoadingSkills) {
        return (
            <div className="bg-[#f6ede8]/95 rounded-3xl p-8 mb-8">
                <div className="flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#4a3728]" />
                    <p className="ml-3 text-[#4a3728]">Loading skills...</p>
                </div>
            </div>
        );
    }

    // Public profile pe agar koi skill nahi, poora section hide
    if (!isOwnProfile && skillsList.length === 0) {
        return null;
    }

    const getStrengthLevel = (strength: string) => {
        const levels = {
            beginner: 2,
            intermediate: 3,
            advanced: 4,
            expert: 5,
        };
        return levels[strength as keyof typeof levels] || 3;
    };

    const getStrengthLabel = (strength: string) => {
        const labels = {
            beginner: 'Beginner',
            intermediate: 'Intermediate',
            advanced: 'Advanced',
            expert: 'Expert',
        };
        return labels[strength as keyof typeof labels] || 'Intermediate';
    };

    const getStrengthPercentage = (strength: string) => {
        const percentages = {
            beginner: 40,
            intermediate: 60,
            advanced: 80,
            expert: 100,
        };
        return percentages[strength as keyof typeof percentages] || 60;
    };

    const handleMenuToggle = (skillId: string) => {
        setOpenMenuId(openMenuId === skillId ? null : skillId);
    };

    const handleUpdateSkill = (skillId: string) => {
        const skillToUpdate = skillsList.find((s) => s.skillId === skillId);
        if (skillToUpdate) {
            setSelectedSkillForUpdate(skillToUpdate);
            setIsUpdateSkillModalOpen(true);
        }
        setOpenMenuId(null);
    };

    const handleArchiveSkill = async (skillId: string) => {
        try {

            setIsArchivingSkillId(skillId);
            setOpenMenuId(null);
            const response = await ProfileService.archiveSkill(skillId);

            if (response?.data?.skill) {

                removeSkillFromList(skillId);

            }

            setIsArchivingSkillId(null);
        } catch (error: any) {
            console.error('Failed to archive skill:', error);
            alert(error.message || 'Failed to archive skill');
            setIsArchivingSkillId(null);
        }
    };

    const handlePinSkill = async (skillId: string, isPinned: boolean) => {
        try {
            if (!isPinned && getPinnedCount() >= 2) {
                setIsPinLimitModalOpen(true);
                setOpenMenuId(null);
                return;
            }


            setIsPinningSkillId(skillId);
            setOpenMenuId(null);
            if (isPinned) {
                const response = await ProfileService.unpinSkill(skillId);

                if (response?.data?.skill) {
                    updatePinStatus(skillId, false);
                }
            } else {
                const pinnedCount = getPinnedCount();
                const response = await ProfileService.pinSkill(skillId, pinnedCount + 1);

                if (response?.data?.skill) {
                    updatePinStatus(skillId, true);
                }
            }

            setTimeout(async () => {
                await fetchSkillsData();
                setIsPinningSkillId(null);
            }, 300);

        } catch (error: any) {
            console.error('Failed to pin/unpin skill:', error);
            alert(error.message || 'Failed to update pin status');
            setIsPinningSkillId(null);
        }
    };

    const handleDeleteSkill = (skillId: string) => {
        const skill = skillsList.find(s => s.skillId === skillId);
        if (skill) {
            setSkillToDelete(skill);
            setIsDeleteConfirmModalOpen(true);
        }
        setOpenMenuId(null);
    };

    const handleDeleteSkillConfirm = async () => {
        if (!skillToDelete) return;

        try {

            setIsDeletingSkillId(skillToDelete.skillId);

            const response = await ProfileService.deleteSkill(skillToDelete.skillId);

            if (response) {

                removeSkillFromList(skillToDelete.skillId);

                setIsDeleteConfirmModalOpen(false);
                setSkillToDelete(null);
            }

            setIsDeletingSkillId(null);
        } catch (error: any) {
            console.error('Failed to delete skill:', error);
            alert(error.message || 'Failed to delete skill');
            setIsDeletingSkillId(null);
        }
    };

    const handleUpdateSkillConfirm = async (skillId: string, updatedData: UpdateSkillFormData) => {
        try {

            const response = await ProfileService.updateSkill(skillId, updatedData);

            if (response?.data?.skill) {

                updateSkillInList(skillId, updatedData);

                await fetchSkillsData();

            }
        } catch (error: any) {
            console.error('Failed to update skill:', error);
            alert(error.message || 'Failed to update skill');
        }
    };

    const getCategoryIcon = (category: string) => {
        return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        );
    };

    const visibleSkills = showAllSkills ? skillsList : skillsList.slice(0, 2);


    return (
        <>
            <div className="relative bg-[#f6ede8]/95 via-[#f6ede8]/85 to-[#e0d8cf]/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-[#e0d8cf]/50 mb-8 overflow-hidd group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#e0d8cf]/30 to-[#4a3728]/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-[#7a5c3e]/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#4a3728]/20 rounded-full animate-bounce"></div>
                <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-[#7a5c3e]/30 rounded-full animate-ping"></div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#4a3728] to-[#7a5c3e] rounded-2xl flex items-center justify-center shadow-lg transform">
                                    <svg className="w-6 h-6 text-[#f6ede8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#4a3728] tracking-tight">Skills</h3>
                                <p className="text-sm text-[#4a3728]/60 font-medium">Professional Expertise</p>
                            </div>
                        </div>
                        {/* Add Skill button sirf apni profile pe */}
                        {isOwnProfile && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsAddSkillModalOpen(true)}
                                    className="AddSkillButton text-sm font-bold text-[#fff] bg-[#4a3728] px-4 py-2 rounded-full backdrop-blur-sm hover:shadow-lg hover:from-[#7a5c3e] transition-all duration-200"
                                >
                                    Add Skill
                                </button>
                            </div>
                        )}
                    </div>
                    

                    <div className="space-y-6">
                        
                    {visibleSkills.map((skill) => {         
                                const isLoading = isPinningSkillId === skill.skillId ||
                                isArchivingSkillId === skill.skillId ||
                                isDeletingSkillId === skill.skillId;

                            return (
                                <div
                                    key={skill.skillId}
                                    className={`group/skill relative ${openMenuId === skill.skillId ? 'z-50' : 'z-0'
                                        } ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}
                                >
                                    <div className="bg-gradient-to-r from-[#e0d8cf]/40 via-[#e0d8cf]/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-[#e0d8cf]/40 hover:border-[#4a3728]/30 transform transition-all duration-500 relative overflow-visib">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a3728]/5 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500"></div>

                                        <div className="flex items-start gap-4 z-10">
                                            <div className="relative">
                                                <div className="w-14 h-14 bg-gradient-to-br from-[#4a3728] to-[#7a5c3e] rounded-2xl flex items-center justify-center text-[#f6ede8] shadow-lg transition-all duration-300">
                                                    {isLoading ? (
                                                        <Loader2 className="w-6 h-6 animate-spin" />
                                                    ) : (
                                                        getCategoryIcon(skill.category)
                                                    )}
                                                </div>
                                                {skill.isPinned && !isLoading && (
                                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#7a5c3e] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                                        <Pin className="w-3 h-3 text-[#f6ede8] fill-current" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0 relative">
                                                <div className="relative flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-lg font-bold text-[#4a3728] group-hover/skill:text-[#7a5c3e] transition-colors duration-300">
                                                            {skill.skillName}
                                                        </h4>
                                                    </div>

                                                    {/* Three Dot Menu sirf apni profile pe */}
                                                    {isOwnProfile && (
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => handleMenuToggle(skill.skillId)}
                                                                className="p-2 hover:bg-[#e0d8cf]/50 rounded-lg transition-colors duration-200"
                                                            >
                                                                <MoreVertical className="w-5 h-5 text-[#4a3728]" />
                                                            </button>

                                                            {openMenuId === skill.skillId && (
                                                                <>
                                                                    {/* Backdrop */}
                                                                    <div
                                                                        className="fixed inset-0 z-[9998]"
                                                                        onClick={() => setOpenMenuId(null)}
                                                                    ></div>

                                                                    {/* Menu */}
                                                                    <div className="absolute right-8 top-2 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#e0d8cf]/50 py-2 z-[9999] animate-in fade-in slide-in-from-top-2 duration-200">
                                                                        <button
                                                                            onClick={() => handleUpdateSkill(skill.skillId)}
                                                                            className="w-full flex cursor-pointer  items-center gap-3 px-4 py-3 hover:bg-[#f6ede8] transition-colors duration-200 text-left"
                                                                        >
                                                                            <Edit className="w-4 h-4 text-[#4a3728]" />
                                                                            <span className="text-sm font-medium text-[#4a3728]">Update Skill</span>
                                                                        </button>

                                                                        <button
                                                                            onClick={() => handlePinSkill(skill.skillId, skill.isPinned)}
                                                                            className="w-full flex cursor-pointer  items-center gap-3 px-4 py-3 hover:bg-[#f6ede8] transition-colors duration-200 text-left"
                                                                        >
                                                                            <Pin className="w-4 h-4 text-[#4a3728]" />
                                                                            <span className="text-sm font-medium text-[#4a3728]">
                                                                                {skill.isPinned ? 'Unpin Skill' : 'Pin Skill'}
                                                                            </span>
                                                                        </button>

                                                                        <button
                                                                            onClick={() => handleArchiveSkill(skill.skillId)}
                                                                            className="w-full flex cursor-pointer  items-center gap-3 px-4 py-3 hover:bg-[#f6ede8] transition-colors duration-200 text-left"
                                                                        >
                                                                            <Archive className="w-4 h-4 text-[#4a3728]" />
                                                                            <span className="text-sm font-medium text-[#4a3728]">Archive Skill</span>
                                                                        </button>

                                                                        <div className="h-px bg-[#e0d8cf] my-2"></div>

                                                                        <button
                                                                            onClick={() => handleDeleteSkill(skill.skillId)}
                                                                            className="w-full flex cursor-pointer  items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors duration-200 text-left"
                                                                        >
                                                                            <Trash2 className="w-4 h-4 text-red-600" />
                                                                            <span className="text-sm font-medium text-red-600">Delete Skill</span>
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <p className="text-sm text-[#4a3728]/70 leading-relaxed mb-3">{skill.category}</p>

                                                <div className="w-full bg-[#e0d8cf]/50 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full transition-all duration-1000"
                                                        style={{ width: `${getStrengthPercentage(skill.skillStrength)}%` }}
                                                    ></div>
                                                </div>

                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-[#4a3728]/60 font-medium">
                                                            {getStrengthLabel(skill.skillStrength)}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-2 h-2 rounded-full ${i < getStrengthLevel(skill.skillStrength)
                                                                        ? 'bg-[#4a3728]'
                                                                        : 'bg-[#e0d8cf]'
                                                                        }`}
                                                                ></div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-[#4a3728]/60 font-medium">
                                                        {skill.yearsOfExperience}+ {skill.yearsOfExperience === 1 ? 'Year' : 'Years'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center">
                        {skillsList.length > 2 && (
                            <button
                            onClick={() => setShowAllSkills(!showAllSkills)}
                                className="group/btn relative inline-flex items-center gap-3 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-[#f6ede8] px-8 py-4 rounded-2xl font-semibold text-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#7a5c3e] to-[#4a3728] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                <span className="showAllSkills relative z-10">{showAllSkills ? 'Show less' : 'Show more'}</span>
                                <svg className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

            </div>

            {/* Modals sirf apni profile pe render honi chahiye */}
            {isOwnProfile && (
                <>
                    <AddSkillModal
                        isOpen={isAddSkillModalOpen}
                        onClose={() => setIsAddSkillModalOpen(false)}
                        onAddSkill={handleAddSkill}
                    />

                    <UpdateSkillModal
                        isOpen={isUpdateSkillModalOpen}
                        onClose={() => {
                            setIsUpdateSkillModalOpen(false);
                            setSelectedSkillForUpdate(undefined);
                        }}
                        onUpdateSkill={handleUpdateSkillConfirm}
                        skill={selectedSkillForUpdate}
                    />

                    <PinLimitModal
                        isOpen={isPinLimitModalOpen}
                        onClose={() => setIsPinLimitModalOpen(false)}
                    />

                    <DeleteSkillConfirmModal
                        isOpen={isDeleteConfirmModalOpen}
                        onClose={() => {
                            setIsDeleteConfirmModalOpen(false);
                            setSkillToDelete(null);
                        }}
                        onConfirm={handleDeleteSkillConfirm}
                        skillName={skillToDelete?.skillName || ''}
                        isDeleting={isDeletingSkillId === skillToDelete?.skillId}
                    />
                </>
            )}

            {/* View All Skills Modal - read-only, dono profiles pe theek hai */}
            <ViewAllSkillsModal
                isOpen={isViewAllSkillsModalOpen}
                onClose={() => setIsViewAllSkillsModalOpen(false)}
                skills={skillsList} />
        </>
    );
};

export default SkillsSection;
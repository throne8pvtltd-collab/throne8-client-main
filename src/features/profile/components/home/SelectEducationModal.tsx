'use client';
import React, { useEffect } from 'react';
import { X, ChevronRight, Award, Calendar, MapPin } from 'lucide-react';
import { EducationData } from '@/features/profile/types/education.types';

interface EducationItem {
    educationId: string;
    degree: string;
    degreeType: string;
    schoolCollegeName: string;
    startDate: string;
    endDate?: string;
    isOngoing?: boolean;
    specialization?: string;
}

interface SelectEducationModalProps {
    isOpen: boolean;
    onClose: () => void;
    educationList: EducationData[];  // ← USE REDUX TYPE
    onSelectEducation: (education: EducationData) => void;  // ← USE REDUX TYPE
}

const SelectEducationModal: React.FC<SelectEducationModalProps> = ({
    isOpen,
    onClose,
    educationList,
    onSelectEducation,
}) => {
    // Lock background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in duration-300">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-white p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Select Education to Update</h2>
                        <p className="text-[#f6ede8]/80 text-sm mt-1">Choose which education you want to update</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 p-6">
                    {educationList.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="p-4 bg-[#4a3728]/10 rounded-full inline-block mb-4">
                                <Award className="w-8 h-8 text-[#4a3728]" />
                            </div>
                            <p className="text-[#4a3728]/60 text-lg">No education records found</p>
                            <p className="text-[#4a3728]/40 text-sm mt-1">Add an education record to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {educationList.map((education) => (
                                <button
                                    key={education.educationId}
                                    onClick={() => {
                                        onSelectEducation(education);
                                        onClose();
                                    }}
                                    className="w-full text-left group"
                                >
                                    <div className="relative p-5 bg-gradient-to-br from-[#f6ede8]/50 to-[#e0d8cf]/50 hover:from-[#4a3728]/5 hover:to-[#8b7355]/5 border border-[#e0d8cf]/40 hover:border-[#4a3728]/30 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 bg-gradient-to-br from-[#4a3728] to-[#8b7355] text-white rounded-lg group-hover:shadow-lg transition-all duration-300">
                                                        <Award className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-[#4a3728] group-hover:text-[#7a5c3e] transition-colors">
                                                            {education.degree}
                                                            {education.specialization && ` in ${education.specialization}`}
                                                        </h3>
                                                        <p className="text-sm text-[#4a3728]/70">
                                                            <span className="inline-block px-2 py-1 bg-[#4a3728]/10 rounded-full text-xs font-medium mr-2">
                                                                {education.degreeType}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 ml-11">
                                                    <div className="flex items-center gap-2 text-sm text-[#4a3728]/70">
                                                        <MapPin className="w-4 h-4 text-[#8b7355]" />
                                                        <span>{education.schoolCollegeName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-[#4a3728]/70">
                                                        <Calendar className="w-4 h-4 text-[#8b7355]" />
                                                        <span>
                                                            {new Date(education.startDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                year: 'numeric',
                                                            })}
                                                            {' - '}
                                                            {education.isOngoing
                                                                ? 'Present'
                                                                : new Date(education.endDate || '').toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4a3728]/10 group-hover:bg-[#4a3728]/20 transition-colors">
                                                <ChevronRight className="w-5 h-5 text-[#4a3728] group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-[#f6ede8]/50 border-t border-[#e0d8cf]/40 p-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-2xl font-semibold text-[#4a3728] bg-[#f6ede8] hover:bg-[#e0d8cf] transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectEducationModal;

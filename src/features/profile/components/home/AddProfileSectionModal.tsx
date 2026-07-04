'use client';

import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface AddProfileSectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SubFeature {
    id: string;
    name: string;
}

interface Section {
    id: string;
    title: string;
    subFeatures: SubFeature[];
}

interface Category {
    id: string;
    name: string;
    icon: string;
    sections: Section[];
}

const AddProfileSectionModal: React.FC<AddProfileSectionModalProps> = ({ isOpen, onClose }) => {
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
        core: true,
        recommended: false,
        additional: false
    });

    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    const categories: Category[] = [
        {
            id: 'core',
            name: 'CORE SECTIONS',
            icon: '⭐',
            sections: [
                {
                    id: 'education',
                    title: 'Education',
                    subFeatures: [
                        { id: 'sch_name', name: 'School/University name' },
                        { id: 'deg_type', name: 'Degree type (Bachelor\'s, Master\'s, PhD, etc.)' },
                        { id: 'field', name: 'Field of study' },
                        { id: 'start_date', name: 'Start date' },
                        { id: 'end_date', name: 'End date' },
                        { id: 'gpa', name: 'Grade/GPA' },
                        { id: 'activities', name: 'Activities and societies' },
                        { id: 'description', name: 'Description' },
                        { id: 'media', name: 'Media attachments' }
                    ]
                },
                {
                    id: 'experience',
                    title: 'Position (Experience)',
                    subFeatures: [
                        { id: 'job_title', name: 'Job title' },
                        { id: 'company', name: 'Company name' },
                        { id: 'emp_type', name: 'Employment type (Full-time, Part-time, Contract, Freelance, etc.)' },
                        { id: 'location', name: 'Location' },
                        { id: 'exp_start', name: 'Start date' },
                        { id: 'exp_end', name: 'End date' },
                        { id: 'job_desc', name: 'Job description' },
                        { id: 'skills_used', name: 'Skills used' },
                        { id: 'exp_media', name: 'Media attachments' }
                    ]
                },
                {
                    id: 'services',
                    title: 'Services',
                    subFeatures: [
                        { id: 'service_cat', name: 'Service categories (up to 10 services)' },
                        { id: 'service_about', name: 'About description' },
                        { id: 'service_location', name: 'Work location & remote work options' },
                        { id: 'service_pricing', name: 'Starting hourly rate/pricing' },
                        { id: 'service_media', name: 'Media (images, videos, documents) - Premium only' },
                        { id: 'service_btn', name: 'Request services button' }
                    ]
                },
                {
                    id: 'career_break',
                    title: 'Career Break',
                    subFeatures: [
                        { id: 'cb_bereavement', name: 'Bereavement' },
                        { id: 'cb_transition', name: 'Career transition' },
                        { id: 'cb_caregiving', name: 'Caregiving' },
                        { id: 'cb_parenting', name: 'Full-time parenting' },
                        { id: 'cb_gap', name: 'Gap year' },
                        { id: 'cb_health', name: 'Health & well-being' },
                        { id: 'cb_layoff', name: 'Layoff/Position eliminated' },
                        { id: 'cb_goal', name: 'Personal goal pursuit' },
                        { id: 'cb_dev', name: 'Professional development' },
                        { id: 'cb_relocation', name: 'Relocation' },
                        { id: 'cb_retirement', name: 'Retirement' },
                        { id: 'cb_travel', name: 'Travel' },
                        { id: 'cb_other', name: 'Other' },
                        { id: 'cb_location', name: 'Location' },
                        { id: 'cb_start', name: 'Start date' },
                        { id: 'cb_end', name: 'End date' },
                        { id: 'cb_desc', name: 'Description (up to 2,000 characters)' },
                        { id: 'cb_media', name: 'Media attachments' }
                    ]
                },
                {
                    id: 'skills',
                    title: 'Skills',
                    subFeatures: [
                        { id: 'skills_add', name: 'Add up to 50 skills' },
                        { id: 'skills_featured', name: 'Top 3 featured skills' },
                        { id: 'skills_endorsements', name: 'Skill endorsements' },
                        { id: 'skills_assessments', name: 'Skill assessments/badges' },
                        { id: 'skills_reorder', name: 'Reorder skills' }
                    ]
                }
            ]
        },
        {
            id: 'recommended',
            name: 'RECOMMENDED SECTIONS',
            icon: '✨',
            sections: [
                {
                    id: 'featured',
                    title: 'Featured',
                    subFeatures: [
                        { id: 'feat_posts', name: 'Posts (your LinkedIn posts)' },
                        { id: 'feat_articles', name: 'Articles (published articles)' },
                        { id: 'feat_links', name: 'Links (external URLs)' },
                        { id: 'feat_media', name: 'Media (images, videos, documents, presentations)' }
                    ]
                },
                {
                    id: 'certifications',
                    title: 'Licenses & Certifications',
                    subFeatures: [
                        { id: 'cert_name', name: 'Certification name' },
                        { id: 'cert_org', name: 'Issuing organization' },
                        { id: 'cert_issue', name: 'Issue date' },
                        { id: 'cert_expire', name: 'Expiration date' },
                        { id: 'cert_id', name: 'Credential ID' },
                        { id: 'cert_url', name: 'Credential URL' },
                        { id: 'cert_skills', name: 'Skills associated' }
                    ]
                },
                {
                    id: 'projects',
                    title: 'Projects',
                    subFeatures: [
                        { id: 'proj_name', name: 'Project name' },
                        { id: 'proj_desc', name: 'Description' },
                        { id: 'proj_start', name: 'Start date' },
                        { id: 'proj_end', name: 'End date' },
                        { id: 'proj_assoc', name: 'Associated with (Company/School)' },
                        { id: 'proj_url', name: 'Project URL' },
                        { id: 'proj_team', name: 'Team members (tag connections)' },
                        { id: 'proj_skills', name: 'Skills used' },
                        { id: 'proj_media', name: 'Media attachments' }
                    ]
                },
                {
                    id: 'courses',
                    title: 'Courses',
                    subFeatures: [
                        { id: 'course_name', name: 'Course name' },
                        { id: 'course_number', name: 'Course number' },
                        { id: 'course_org', name: 'Associated with (School/Organization)' },
                        { id: 'course_complete', name: 'Completion date' },
                        { id: 'course_skills', name: 'Skills learned' }
                    ]
                }
            ]
        },
        {
            id: 'additional',
            name: 'ADDITIONAL SECTIONS',
            icon: '📌',
            sections: [
                {
                    id: 'volunteer',
                    title: 'Volunteer Experience',
                    subFeatures: [
                        { id: 'vol_role', name: 'Role/Position' },
                        { id: 'vol_org', name: 'Organization name' },
                        { id: 'vol_cause', name: 'Cause (Education, Health, Environment, etc.)' },
                        { id: 'vol_start', name: 'Start date' },
                        { id: 'vol_end', name: 'End date' },
                        { id: 'vol_desc', name: 'Description' },
                        { id: 'vol_skills', name: 'Skills used' }
                    ]
                },
                {
                    id: 'publications',
                    title: 'Publications',
                    subFeatures: [
                        { id: 'pub_title', name: 'Publication title' },
                        { id: 'pub_publisher', name: 'Publisher name' },
                        { id: 'pub_date', name: 'Publication date' },
                        { id: 'pub_url', name: 'Publication URL' },
                        { id: 'pub_authors', name: 'Authors (tag co-authors)' },
                        { id: 'pub_desc', name: 'Description' }
                    ]
                },
                {
                    id: 'patents',
                    title: 'Patents',
                    subFeatures: [
                        { id: 'pat_title', name: 'Patent title' },
                        { id: 'pat_office', name: 'Patent office (USPTO, EPO, etc.)' },
                        { id: 'pat_number', name: 'Patent number' },
                        { id: 'pat_status', name: 'Status (Pending/Issued)' },
                        { id: 'pat_issue', name: 'Issue date' },
                        { id: 'pat_app', name: 'Application date' },
                        { id: 'pat_inventors', name: 'Inventors (tag co-inventors)' },
                        { id: 'pat_desc', name: 'Description' },
                        { id: 'pat_url', name: 'Patent URL' }
                    ]
                },
                {
                    id: 'awards',
                    title: 'Honors & Awards',
                    subFeatures: [
                        { id: 'award_title', name: 'Award title' },
                        { id: 'award_issuer', name: 'Issuer/Organization' },
                        { id: 'award_date', name: 'Issue date' },
                        { id: 'award_desc', name: 'Description' },
                        { id: 'award_assoc', name: 'Associated with (Company/School)' }
                    ]
                },
                {
                    id: 'testscores',
                    title: 'Test Scores',
                    subFeatures: [
                        { id: 'test_name', name: 'Test name (GRE, GMAT, TOEFL, IELTS, SAT, etc.)' },
                        { id: 'test_score', name: 'Score' },
                        { id: 'test_date', name: 'Test date' },
                        { id: 'test_desc', name: 'Description' }
                    ]
                },
                {
                    id: 'languages',
                    title: 'Languages',
                    subFeatures: [
                        { id: 'lang_name', name: 'Language name' },
                        { id: 'lang_elementary', name: 'Elementary proficiency' },
                        { id: 'lang_limited', name: 'Limited working proficiency' },
                        { id: 'lang_professional', name: 'Professional working proficiency' },
                        { id: 'lang_full', name: 'Full professional proficiency' },
                        { id: 'lang_native', name: 'Native or bilingual proficiency' }
                    ]
                },
                {
                    id: 'recommendations',
                    title: 'Recommendations',
                    subFeatures: [
                        { id: 'rec_received', name: 'Received recommendations' },
                        { id: 'rec_given', name: 'Given recommendations' },
                        { id: 'rec_request', name: 'Request recommendations' },
                        { id: 'rec_manage', name: 'Manage recommendations (show/hide)' }
                    ]
                }
            ]
        }
    ];

    const toggleCategory = (id: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Transparent Overlay Background */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between sticky top-0 bg-gradient-to-r from-[#4a3728] to-[#6a5748] px-6 py-5 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Add Profile Section</h2>
                        <p className="text-white/70 text-sm mt-1">Choose sections to add to your profile</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Content Body */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                    <div className="space-y-4">
                        {categories.map((category) => (
                            <div key={category.id} className="border-2 border-[#e0d8cf] rounded-2xl overflow-hidden">
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="w-full flex items-center gap-4 p-5 bg-gradient-to-r from-[#4a3728] to-[#6a5748] hover:from-[#6a5748] hover:to-[#7a6758] transition-all duration-200 group"
                                >
                                    <div className="text-3xl flex-shrink-0">{category.icon}</div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-bold text-white">
                                            {category.name}
                                        </h3>
                                        <p className="text-white/70 text-sm mt-0.5">
                                            {category.sections.length} sections available
                                        </p>
                                    </div>
                                    <ChevronDown
                                        className={`w-6 h-6 text-white flex-shrink-0 transition-transform duration-300 ${expandedCategories[category.id] ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {/* Sections List */}
                                {expandedCategories[category.id] && (
                                    <div className="bg-white border-t-2 border-[#e0d8cf]">
                                        <div className="p-4 space-y-3">
                                            {category.sections.map((section) => (
                                                <div key={section.id} className="border border-[#e0d8cf] rounded-xl overflow-hidden">
                                                    {/* Section Header */}
                                                    <button
                                                        onClick={() => toggleSection(section.id)}
                                                        className="w-full flex items-center gap-3 p-4 bg-[#f6ede8]/50 hover:bg-[#f6ede8] transition-colors duration-200 group"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="w-5 h-5 accent-[#4a3728] rounded cursor-pointer flex-shrink-0"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                        <div className="flex-1 text-left">
                                                            <h4 className="text-base font-semibold text-[#4a3728] group-hover:text-[#6a5748] transition-colors">
                                                                {section.title}
                                                            </h4>
                                                            <p className="text-xs text-[#4a3728]/60 mt-0.5">
                                                                {section.subFeatures.length} features
                                                            </p>
                                                        </div>
                                                        <ChevronDown
                                                            className={`w-5 h-5 text-[#4a3728] flex-shrink-0 transition-transform duration-300 ${expandedSections[section.id] ? 'rotate-180' : ''
                                                                }`}
                                                        />
                                                    </button>

                                                    {/* Sub-Features List */}
                                                    {expandedSections[section.id] && (
                                                        <div className="bg-white border-t border-[#e0d8cf]">
                                                            <div className="p-3 space-y-2">
                                                                {section.subFeatures.map((subFeature) => (
                                                                    <div
                                                                        key={subFeature.id}
                                                                        className="flex items-center gap-3 p-2 pl-10 bg-[#f6ede8]/30 rounded-lg hover:bg-[#f6ede8] transition-colors duration-200 text-sm"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            className="w-4 h-4 accent-[#4a3728] rounded cursor-pointer flex-shrink-0"
                                                                        />
                                                                        <label className="text-[#4a3728]/80 cursor-pointer flex-1">
                                                                            {subFeature.name}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 flex gap-3 px-6 py-4 border-t border-[#e0d8cf] bg-white">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-full border-2 border-[#e0d8cf] text-[#4a3728] font-semibold hover:bg-[#f6ede8]/50 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-[#4a3728] to-[#6a5748] text-white font-semibold hover:shadow-lg transition-all duration-200"
                    >
                        Add Selected Sections
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProfileSectionModal;

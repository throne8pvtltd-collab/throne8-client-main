'use client';

import { useState } from 'react';
import CompanyService from '@/lib/api/company.service'; // apna path check karo

interface Props {
    companyId: string;
    onSuccess: (employee: any) => void;
    onClose: () => void;
}

const INITIAL_FORM = {
    firstName: '',
    lastName: '',
    email: '',
    designation: '',
    department: '',
    joinDate: '',
    skillsInput: '',   // comma separated string, baad mein array banayenge
    bio: '',
};

export default function AddEmployeeModal({ companyId, onSuccess, onClose }: Props) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!companyId) {   // ← ADD yeh check sabse pehle
            setError('Company not loaded yet. Please wait and try again.');
            return;
        }

        // Basic validation
        const required = ['firstName', 'lastName', 'email', 'designation', 'department', 'joinDate', 'bio'];
        for (const field of required) {
            if (!form[field as keyof typeof form].trim()) {
                setError(`${field} is required`);
                return;
            }
        }
        if (!form.skillsInput.trim()) {
            setError('At least one skill is required');
            return;
        }

        setLoading(true);
        try {
            const skills = form.skillsInput.split(',').map(s => s.trim()).filter(Boolean);
            const result = await CompanyService.createEmployee({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                company: companyId,
                designation: form.designation,
                department: form.department,
                joinDate: form.joinDate,
                skills,
                bio: form.bio,
            });

            // API se naya employee ka ID milega, usse fetch karo
            const employeeId = result?.data?.employee?.employeeId ?? result?.data?.employeeId;
            if (employeeId) {
                const fetched = await CompanyService.getEmployeeById(employeeId);
                onSuccess(fetched?.data?.employee ?? fetched?.data);
            } else {
                onSuccess(result?.data?.employee ?? result?.data);
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-[#f6ede8] border border-[#e0d8cf] rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0d8cf]">
                    <h2 className="text-lg font-bold text-[#4a3728]">Add Employee</h2>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#e0d8cf] text-[#4a3728] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">First Name *</label>
                            <input name="firstName" value={form.firstName} onChange={handleChange}
                                placeholder="Rahul"
                                className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] placeholder:text-[#4a3728]/30 focus:outline-none focus:border-[#4a3728]" />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Last Name *</label>
                            <input name="lastName" value={form.lastName} onChange={handleChange}
                                placeholder="Sharma"
                                className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] placeholder:text-[#4a3728]/30 focus:outline-none focus:border-[#4a3728]" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Email *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange}
                            placeholder="rahul@company.com"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] placeholder:text-[#4a3728]/30 focus:outline-none focus:border-[#4a3728]" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Designation *</label>
                            <input name="designation" value={form.designation} onChange={handleChange}
                                placeholder="Software Engineer"
                                className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] placeholder:text-[#4a3728]/30 focus:outline-none focus:border-[#4a3728]" />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Department *</label>
                            <input name="department" value={form.department} onChange={handleChange}
                                placeholder="Engineering"
                                className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] placeholder:text-[#4a3728]/30 focus:outline-none focus:border-[#4a3728]" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Join Date *</label>
                        <input name="joinDate" type="date" value={form.joinDate} onChange={handleChange}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] focus:outline-none focus:border-[#4a3728]" />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Skills * <span className="font-normal text-[#4a3728]/40">(comma separated)</span></label>
                        <input name="skillsInput" value={form.skillsInput} onChange={handleChange}
                            placeholder="nodejs, typescript, react"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] placeholder:text-[#4a3728]/30 focus:outline-none focus:border-[#4a3728]" />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Bio *</label>
                        <textarea name="bio" value={form.bio} onChange={handleChange}
                            placeholder="Backend developer with 3 years of experience..."
                            rows={3}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] placeholder:text-[#4a3728]/30 focus:outline-none focus:border-[#4a3728] resize-none" />
                    </div>

                    {error && (
                        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>
                    )}

                    <div className="flex gap-3 pt-1">
                        <button type="button" onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-[#e0d8cf] text-[#4a3728] hover:bg-[#e0d8cf] transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading}
                            className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl bg-[#4a3728] text-[#f6ede8] hover:bg-[#6b4e3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Adding...' : 'Add Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
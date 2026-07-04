'use client';

import { useState, useEffect } from 'react';
import { toggleActive, updateEmployee, type Employee } from '@/features/company/store/slices/employeesslice';
import CompanyService from '@/lib/api/company.service';
import { useAppDispatch } from '@/store/hooks';

interface Props {
    employee: Employee;
    companyId: string;
    onSuccess: (updatedEmployee: any) => void;
    onClose: () => void;
}

const UpdateEmployeeModal = ({ employee, onSuccess, onClose, companyId }: Props) => {
    const dispatch = useAppDispatch();
    const [statusLoading, setStatusLoading] = useState(false);
    const [advocacyLoading, setAdvocacyLoading] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        department: '',
        joinDate: '',
        skillsInput: '',
        bio: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Pre-fill form with employee data
    useEffect(() => {
        const [firstName, lastName] = employee.name.split(' ');
        setForm({
            firstName: firstName || '',
            lastName: lastName || '',
            email: '',
            designation: employee.title || '',
            department: employee.dept || '',
            joinDate: '',
            skillsInput: '',
            bio: '',
        });
    }, [employee]);

    const handleToggleStatus = async () => {
        setStatusLoading(true);
        try {
            await CompanyService.toggleEmployeeStatus(employee.id);
            dispatch(toggleActive(employee.id));
        } catch (err: any) {
            console.error('❌ Status toggle failed:', err);
        } finally {
            setStatusLoading(false);
        }
    };

    const handleToggleAdvocacy = async () => {
        setAdvocacyLoading(true);
        try {
            await CompanyService.toggleEmployeeAdvocacy(
                companyId,
                employee.id,
                !employee.isAdvocate
            );
            dispatch(updateEmployee({
                id: employee.id,
                changes: { isAdvocate: !employee.isAdvocate }
            }));
        } catch (err: any) {
            console.error('❌ Advocacy toggle failed:', err);
        } finally {
            setAdvocacyLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const required = ['firstName', 'lastName', 'designation', 'department'];
        for (const field of required) {
            if (!form[field as keyof typeof form].trim()) {
                setError(`${field} is required`);
                return;
            }
        }

        setLoading(true);
        try {
            const payload: any = {
                firstName: form.firstName,
                lastName: form.lastName,
                designation: form.designation,
                department: form.department,
            };
            if (form.joinDate) payload.joinDate = form.joinDate;
            if (form.bio) payload.bio = form.bio;
            if (form.skillsInput) payload.skills = form.skillsInput.split(',').map(s => s.trim()).filter(Boolean);

            await CompanyService.updateEmployee(employee.id, payload);

            onSuccess({
                id: employee.id,
                name: `${form.firstName} ${form.lastName}`,
                title: form.designation,
                dept: form.department,
                role: employee.role,
                avatar: `${form.firstName?.[0] ?? ''}${form.lastName?.[0] ?? ''}`,
                advocacy: employee.advocacy,
                active: employee.active,
                joined: employee.joined,
            });
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
                    <h2 className="text-lg font-bold text-[#4a3728]">Update Employee</h2>
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
                        <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Email</label>
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
                        <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Join Date</label>
                        <input name="joinDate" type="date" value={form.joinDate} onChange={handleChange}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] focus:outline-none focus:border-[#4a3728]" />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Skills <span className="font-normal text-[#4a3728]/40">(comma separated)</span></label>
                        <input name="skillsInput" value={form.skillsInput} onChange={handleChange}
                            placeholder="nodejs, typescript, react"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] placeholder:text-[#4a3728]/30 focus:outline-none focus:border-[#4a3728]" />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-[#4a3728]/70 block mb-1">Bio</label>
                        <textarea name="bio" value={form.bio} onChange={handleChange}
                            placeholder="Backend developer with 3 years of experience..."
                            rows={3}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#e0d8cf] rounded-xl text-[#4a3728] placeholder:text-[#4a3728]/30 focus:outline-none focus:border-[#4a3728] resize-none" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white border border-[#e0d8cf] rounded-xl">
                        <div>
                            <p className="text-sm font-semibold text-[#4a3728]">Employee Status</p>
                            <p className="text-xs text-[#4a3728]/50 mt-0.5">
                                Currently: <span className={employee.active ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                                    {employee.active ? 'Active' : 'Inactive'}
                                </span>
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleToggleStatus}
                            disabled={statusLoading}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-200 disabled:opacity-50 ${employee.active ? 'bg-[#4a3728]' : 'bg-[#e0d8cf]'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${employee.active ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    {/* Employee Status ke baad add karo */}
                    <div className="flex items-center justify-between p-3 bg-white border border-[#e0d8cf] rounded-xl">
                        <div>
                            <p className="text-sm font-semibold text-[#4a3728]">Advocacy</p>
                            <p className="text-xs text-[#4a3728]/50 mt-0.5">
                                Currently: <span className={employee.isAdvocate ? 'text-purple-600 font-semibold' : 'text-gray-500 font-semibold'}>
                                    {employee.isAdvocate ? 'Advocate' : 'Not Advocate'}
                                </span>
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleToggleAdvocacy}
                            disabled={advocacyLoading}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-200 disabled:opacity-50 ${employee.isAdvocate ? 'bg-purple-600' : 'bg-[#e0d8cf]'
                                }`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${employee.isAdvocate ? 'translate-x-7' : 'translate-x-1'
                                }`} />
                        </button>
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
                            {loading ? 'Updating...' : 'Update Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEmployeeModal;

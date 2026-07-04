'use client';

import { useEffect, useState } from 'react';
import CompanyService from '@/lib/api/company.service';
import type { AboutIdentityData, AboutSection } from '../types';

interface Props {
    companyId: string;
    activeSection: AboutSection;
    onClose: () => void;
    onSave?: () => void;
}

export default function IdentityEditModal({ companyId, activeSection, onClose, onSave }: Props) {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState<AboutIdentityData>({
        story: '',
        mission: '',
        vision: '',
        promises: [''],
        impacts: [{ title: '', metric: '', description: '' }],
    });
    const [timelineForm, setTimelineForm] = useState({
        year: new Date().getFullYear(),
        month: 1,
        title: '',
        description: '',
        type: 'Milestone',
        icon: '🏆',
        isPublished: true,
    });
    const [timelineSaving, setTimelineSaving] = useState(false);
    const [timelineError, setTimelineError] = useState<string | null>(null);
    const [testimonialForm, setTestimonialForm] = useState({
        authorName: '',
        authorTitle: '',
        authorCompany: '',
        authorAvatar: '',
        message: '',
        rating: 5,
        source: 'User' as 'User' | 'Client',
        isPublished: true,
        isFeatured: false,
    });
    const [testimonialSaving, setTestimonialSaving] = useState(false);
    const [testimonialError, setTestimonialError] = useState<string | null>(null);
    const [productForm, setProductForm] = useState({
        name: '',
        tagline: '',
        description: '',
        demoLink: '',
        isPublished: true,
        features: [{ title: '', description: '', icon: '✨', category: 'core' }],
        screenshots: [''],
    });
    const [productSaving, setProductSaving] = useState(false);
    const [productError, setProductError] = useState<string | null>(null);

    const EMPTY_VALUE = { title: '', description: '', icon: '❤️' };
    const EMPTY_PERK = { title: '', description: '', icon: '🎁', category: 'Work Style' };
    const EMPTY_MEMBER = { name: '', designation: '', bio: '', avatar: '', linkedinUrl: '', order: 1 };
    const EMPTY_GALLERY = { url: '', caption: '', type: 'Office', order: 1 };

    const [lifeForm, setLifeForm] = useState({
        values: [{ ...EMPTY_VALUE }],
        perks: [{ ...EMPTY_PERK }],
        teamMembers: [{ ...EMPTY_MEMBER }],
        gallery: [{ ...EMPTY_GALLERY }],
    });
    const [lifeSaving, setLifeSaving] = useState(false);
    const [lifeError, setLifeError] = useState<string | null>(null);

    // Fetch existing data on open
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await CompanyService.getAboutIdentity(companyId);
                if (res.data) setForm(res.data);
            } catch {
                // ignore — fresh form
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [companyId]);

    // existing useEffect ke baad add karo
    useEffect(() => {
        if (activeSection !== 'product' || !companyId) return;
        const fetchProduct = async () => {
            try {
                const res = await CompanyService.getProduct(companyId);
                const d = res?.data ?? res;
                if (d) {
                    setProductForm({
                        name: d.name ?? '',
                        tagline: d.tagline ?? '',
                        description: d.description ?? '',
                        demoLink: d.demoLink ?? '',
                        isPublished: d.isPublished ?? true,
                        features: d.features?.length
                            ? d.features
                            : [{ title: '', description: '', icon: '✨', category: 'core' }],
                        screenshots: d.screenshots?.length ? d.screenshots : [''],
                    });
                }
            } catch {
                console.error('Failed to load product info');
                throw new Error('Failed to load product info');
            }
        };
        fetchProduct();
    }, [companyId, activeSection]);

    useEffect(() => {
        if (activeSection !== 'culture' || !companyId) return;
        const fetchLife = async () => {
            try {
                const res = await CompanyService.getLife(companyId);
                const d = res?.data ?? res;
                if (d) {
                    setLifeForm({
                        values: d.values?.length ? d.values : [{ ...EMPTY_VALUE }],
                        perks: d.perks?.length ? d.perks : [{ ...EMPTY_PERK }],
                        teamMembers: d.teamMembers?.length ? d.teamMembers : [{ ...EMPTY_MEMBER }],
                        gallery: d.gallery?.length ? d.gallery : [{ ...EMPTY_GALLERY }],
                    });
                }
            } catch {
                // fresh form — 404 is fine
            }
        };
        fetchLife();
    }, [companyId, activeSection]);

    const handleSave = async () => {
        try {
            setSaving(true);
            await CompanyService.updateAboutIdentity(companyId, form);
            onSave?.() ?? onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleTimelineSave = async () => {
        if (!timelineForm.title.trim() || !timelineForm.description.trim()) {
            setTimelineError('Title aur Description required hain');
            return;
        }
        setTimelineSaving(true);
        setTimelineError(null);
        try {
            await CompanyService.addTimelineEntry(companyId, timelineForm);
            // form reset karo
            setTimelineForm({
                year: new Date().getFullYear(),
                month: 1,
                title: '',
                description: '',
                type: 'Milestone',
                icon: '🏆',
                isPublished: true,
            });
            onSave?.();   // parent ko refresh trigger karega aur modal band karega
        } catch (err: any) {
            setTimelineError(err.message || 'Failed to save timeline entry');
        } finally {
            setTimelineSaving(false);
        }
    };

    const handleTestimonialSave = async () => {
        if (!testimonialForm.authorName.trim() || !testimonialForm.message.trim()) {
            setTestimonialError('Author Name aur Message required hain');
            return;
        }
        setTestimonialSaving(true);
        setTestimonialError(null);
        try {
            const payload = {
                ...testimonialForm,
                // authorAvatar empty ho toh send mat karo
                ...(testimonialForm.authorAvatar.trim() ? {} : { authorAvatar: undefined }),
            };
            await CompanyService.addTestimonial(companyId, payload);
            setTestimonialForm({
                authorName: '',
                authorTitle: '',
                authorCompany: '',
                authorAvatar: '',
                message: '',
                rating: 5,
                source: 'User',
                isPublished: true,
                isFeatured: false,
            });
            onSave?.();
        } catch (err: any) {
            setTestimonialError(err.message || 'Failed to save testimonial');
        } finally {
            setTestimonialSaving(false);
        }
    };

    const handleProductSave = async () => {
        if (!productForm.name.trim() || !productForm.description.trim()) {
            setProductError('Name aur Description required hain');
            return;
        }
        setProductSaving(true);
        setProductError(null);
        try {
            const payload = {
                ...productForm,
                screenshots: productForm.screenshots.filter(s => s.trim()),
                features: productForm.features.filter(f => f.title.trim()),
            };
            await CompanyService.updateProduct(companyId, payload);
            onSave?.();
        } catch (err: any) {
            setProductError(err.message || 'Failed to save product');
        } finally {
            setProductSaving(false);
        }
    };

    const handleLifeSave = async () => {
        setLifeSaving(true);
        setLifeError(null);
        try {
            const payload = {
                values: lifeForm.values.filter(v => v.title.trim()),
                perks: lifeForm.perks.filter(p => p.title.trim()),
                teamMembers: lifeForm.teamMembers
                    .filter(m => m.name.trim())
                    .map((m, i) => ({ ...m, order: i + 1, avatar: m.avatar?.trim() || undefined })),
                gallery: lifeForm.gallery
                    .filter(g => g.caption.trim())
                    .map((g, i) => ({ ...g, order: i + 1, url: g.url?.trim() || undefined })),
            };
            await CompanyService.updateLife(companyId, payload);
            onSave?.();
        } catch (err: any) {
            setLifeError(err.message || 'Failed to save');
        } finally {
            setLifeSaving(false);
        }
    };

    // ── Life helpers ──────────────────────────────────────────────────────────────
    // Values
    const setValueField = (idx: number, key: string, val: string) => {
        setLifeForm(p => {
            const arr = [...p.values];
            arr[idx] = { ...arr[idx], [key]: val };
            return { ...p, values: arr };
        });
    };

    // Perks
    const setPerkField = (idx: number, key: string, val: string) => {
        setLifeForm(p => {
            const arr = [...p.perks];
            arr[idx] = { ...arr[idx], [key]: val };
            return { ...p, perks: arr };
        });
    };

    // Team Members
    const setMemberField = (idx: number, key: string, val: string | number) => {
        setLifeForm(p => {
            const arr = [...p.teamMembers];
            arr[idx] = { ...arr[idx], [key]: val };
            return { ...p, teamMembers: arr };
        });
    };

    // Gallery
    const setGalleryField = (idx: number, key: string, val: string | number) => {
        setLifeForm(p => {
            const arr = [...p.gallery];
            arr[idx] = { ...arr[idx], [key]: val };
            return { ...p, gallery: arr };
        });
    };

    // Feature helpers
    const setFeature = (idx: number, key: keyof typeof productForm.features[0], val: string) => {
        const arr = [...productForm.features];
        arr[idx] = { ...arr[idx], [key]: val };
        setProductForm(p => ({ ...p, features: arr }));
    };
    const addFeature = () =>
        setProductForm(p => ({ ...p, features: [...p.features, { title: '', description: '', icon: '✨', category: 'core' }] }));
    const removeFeature = (idx: number) =>
        setProductForm(p => ({ ...p, features: p.features.filter((_, i) => i !== idx) }));

    // Screenshot helpers
    const setScreenshot = (idx: number, val: string) => {
        const arr = [...productForm.screenshots];
        arr[idx] = val;
        setProductForm(p => ({ ...p, screenshots: arr }));
    };
    const addScreenshot = () => setProductForm(p => ({ ...p, screenshots: [...p.screenshots, ''] }));
    const removeScreenshot = (idx: number) =>
        setProductForm(p => ({ ...p, screenshots: p.screenshots.filter((_, i) => i !== idx) }));

    // Promises helpers
    const setPromise = (idx: number, val: string) => {
        const arr = [...form.promises];
        arr[idx] = val;
        setForm({ ...form, promises: arr });
    };
    const addPromise = () => setForm({ ...form, promises: [...form.promises, ''] });
    const removePromise = (idx: number) =>
        setForm({ ...form, promises: form.promises.filter((_ : any, i: any) => i !== idx) });

    // Impacts helpers
    const setImpact = (idx: number, key: keyof typeof form.impacts[0], val: string) => {
        const arr = [...form.impacts];
        arr[idx] = { ...arr[idx], [key]: val };
        setForm({ ...form, impacts: arr });
    };
    const addImpact = () =>
        setForm({ ...form, impacts: [...form.impacts, { title: '', metric: '', description: '' }] });
    const removeImpact = (idx: number) =>
        setForm({ ...form, impacts: form.impacts.filter((_: any, i: any) => i !== idx) });

    // Only show identity modal for 'story' section — baaki sections ke liye
    // aap baad mein alag modals add kar sakte ho
    if (activeSection !== 'story' && activeSection !== 'timeline' && activeSection !== 'testimonials' && activeSection !== 'product' && activeSection !== 'culture') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="bg-[#f6ede8] rounded-3xl p-8 max-w-sm w-full mx-4 shadow-xl text-center">
                    <p className="text-sm text-[#4a3728]/60 mb-4">
                        Edit for <strong className="text-[#4a3728] capitalize">{activeSection}</strong> section coming soon.
                    </p>
                    <button onClick={onClose} className="px-5 py-2 bg-[#4a3728] text-[#f6ede8] rounded-2xl text-sm font-semibold">
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-[#f6ede8] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0d8cf]">
                    <div>
                        <h3 className="text-base font-black text-[#4a3728]">
                            {activeSection === 'timeline'
                                ? 'Add Timeline Entry'
                                : activeSection === 'testimonials'
                                    ? 'Add Testimonial'
                                    : activeSection === 'product'
                                        ? 'Edit Product Info'
                                        : activeSection === 'culture'        // ← add karo
                                            ? 'Edit Company Life'
                                            : 'Edit Story & Mission'}
                        </h3>
                        <p className="text-[11px] text-[#4a3728]/45 mt-0.5">Changes will reflect on your public About page</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl bg-[#e0d8cf] flex items-center justify-center hover:bg-[#d4c8be] transition-colors"
                    >
                        <svg className="w-4 h-4 text-[#4a3728]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-[#e0d8cf]/50 rounded-2xl animate-pulse" />)}
                        </div>
                    ) : (
                        <>
                            {/* Story */}
                            <Field label="Company Story">
                                <textarea
                                    rows={4}
                                    value={form.story}
                                    onChange={e => setForm({ ...form, story: e.target.value })}
                                    placeholder="How did your company start..."
                                    className={INPUT_CLS + ' resize-none'}
                                />
                            </Field>

                            {/* Mission */}
                            <Field label="Mission">
                                <textarea
                                    rows={2}
                                    value={form.mission}
                                    onChange={e => setForm({ ...form, mission: e.target.value })}
                                    placeholder="Your mission statement..."
                                    className={INPUT_CLS + ' resize-none'}
                                />
                            </Field>

                            {/* Vision */}
                            <Field label="Vision">
                                <textarea
                                    rows={2}
                                    value={form.vision}
                                    onChange={e => setForm({ ...form, vision: e.target.value })}
                                    placeholder="Your vision for the future..."
                                    className={INPUT_CLS + ' resize-none'}
                                />
                            </Field>

                            {/* Promises */}
                            <Field label="Promises">
                                <div className="space-y-2">
                                    {form.promises.map((p: string, idx: number) => (
                                        <div key={idx} className="flex gap-2">
                                            <input
                                                value={p}
                                                onChange={e => setPromise(idx, e.target.value)}
                                                placeholder={`Promise ${idx + 1}`}
                                                className={INPUT_CLS + ' flex-1'}
                                            />
                                            {form.promises.length > 1 && (
                                                <button
                                                    onClick={() => removePromise(idx)}
                                                    className="w-9 h-9 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button onClick={addPromise} className={ADD_BTN_CLS}>+ Add Promise</button>
                                </div>
                            </Field>

                            {/* Impacts */}
                            <Field label="Impact Metrics">
                                <div className="space-y-3">
                                    {form.impacts.map((imp: any, idx: number) => (
                                        <div key={idx} className="p-3 bg-white/60 rounded-2xl border border-[#e0d8cf] space-y-2">
                                            <div className="flex gap-2">
                                                <input
                                                    value={imp.metric}
                                                    onChange={e => setImpact(idx, 'metric', e.target.value)}
                                                    placeholder="Metric (e.g. 50,000+)"
                                                    className={INPUT_CLS + ' flex-1'}
                                                />
                                                <button
                                                    onClick={() => removeImpact(idx)}
                                                    className="w-9 h-9 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <input
                                                value={imp.title}
                                                onChange={e => setImpact(idx, 'title', e.target.value)}
                                                placeholder="Title (e.g. Professionals Worldwide)"
                                                className={INPUT_CLS}
                                            />
                                            <input
                                                value={imp.description}
                                                onChange={e => setImpact(idx, 'description', e.target.value)}
                                                placeholder="Short description..."
                                                className={INPUT_CLS}
                                            />
                                        </div>
                                    ))}
                                    <button onClick={addImpact} className={ADD_BTN_CLS}>+ Add Impact</button>
                                </div>
                            </Field>

                            {activeSection === 'timeline' && (
                                <div className="space-y-4">

                                    {timelineError && (
                                        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-2xl px-4 py-2.5">
                                            {timelineError}
                                        </p>
                                    )}

                                    <div className="grid grid-cols-2 gap-3">
                                        <Field label="Year">
                                            <input
                                                type="number"
                                                value={timelineForm.year}
                                                onChange={e => setTimelineForm(p => ({ ...p, year: +e.target.value }))}
                                                className={INPUT_CLS}
                                            />
                                        </Field>
                                        <Field label="Month (1–12)">
                                            <input
                                                type="number"
                                                min={1}
                                                max={12}
                                                value={timelineForm.month}
                                                onChange={e => setTimelineForm(p => ({ ...p, month: +e.target.value }))}
                                                className={INPUT_CLS}
                                            />
                                        </Field>
                                    </div>

                                    <Field label="Title">
                                        <input
                                            type="text"
                                            value={timelineForm.title}
                                            onChange={e => setTimelineForm(p => ({ ...p, title: e.target.value }))}
                                            placeholder="e.g. Seed Funding — ₹2.5 Cr"
                                            className={INPUT_CLS}
                                        />
                                    </Field>

                                    <Field label="Description">
                                        <textarea
                                            rows={3}
                                            value={timelineForm.description}
                                            onChange={e => setTimelineForm(p => ({ ...p, description: e.target.value }))}
                                            placeholder="What happened and why it mattered..."
                                            className={INPUT_CLS + ' resize-none'}
                                        />
                                    </Field>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Field label="Type">
                                            <select
                                                value={timelineForm.type}
                                                onChange={e => setTimelineForm(p => ({ ...p, type: e.target.value }))}
                                                className={INPUT_CLS}
                                            >
                                                {['Founding', 'Funding', 'Product Launch', 'Milestone'].map(t => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </Field>
                                        <Field label="Icon (emoji)">
                                            <input
                                                type="text"
                                                value={timelineForm.icon}
                                                onChange={e => setTimelineForm(p => ({ ...p, icon: e.target.value }))}
                                                placeholder="🏆"
                                                className={INPUT_CLS}
                                            />
                                        </Field>
                                    </div>

                                    <div className="flex items-center gap-2 px-1">
                                        <input
                                            id="isPublished"
                                            type="checkbox"
                                            checked={timelineForm.isPublished}
                                            onChange={e => setTimelineForm(p => ({ ...p, isPublished: e.target.checked }))}
                                            className="w-4 h-4 accent-[#4a3728] rounded"
                                        />
                                        <label htmlFor="isPublished" className="text-xs font-semibold text-[#4a3728]/70">
                                            Publish immediately
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'testimonials' && (
                                <div className="space-y-4">

                                    {testimonialError && (
                                        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-2xl px-4 py-2.5">
                                            {testimonialError}
                                        </p>
                                    )}

                                    <div className="grid grid-cols-2 gap-3">
                                        <Field label="Author Name *">
                                            <input
                                                type="text"
                                                value={testimonialForm.authorName}
                                                onChange={e => setTestimonialForm(p => ({ ...p, authorName: e.target.value }))}
                                                placeholder="Rahul Verma"
                                                className={INPUT_CLS}
                                            />
                                        </Field>
                                        <Field label="Author Title">
                                            <input
                                                type="text"
                                                value={testimonialForm.authorTitle}
                                                onChange={e => setTestimonialForm(p => ({ ...p, authorTitle: e.target.value }))}
                                                placeholder="Senior Engineer"
                                                className={INPUT_CLS}
                                            />
                                        </Field>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Field label="Company">
                                            <input
                                                type="text"
                                                value={testimonialForm.authorCompany}
                                                onChange={e => setTestimonialForm(p => ({ ...p, authorCompany: e.target.value }))}
                                                placeholder="Infosys"
                                                className={INPUT_CLS}
                                            />
                                        </Field>
                                        <Field label="Source">
                                            <select
                                                value={testimonialForm.source}
                                                onChange={e => setTestimonialForm(p => ({ ...p, source: e.target.value as 'User' | 'Client' }))}
                                                className={INPUT_CLS}
                                            >
                                                <option value="User">User</option>
                                                <option value="Client">Client</option>
                                            </select>
                                        </Field>
                                    </div>

                                    <Field label="Message *">
                                        <textarea
                                            rows={4}
                                            value={testimonialForm.message}
                                            onChange={e => setTestimonialForm(p => ({ ...p, message: e.target.value }))}
                                            placeholder="What did they say about your product or service..."
                                            className={INPUT_CLS + ' resize-none'}
                                        />
                                    </Field>

                                    <Field label="Rating">
                                        <div className="flex gap-2 mt-1">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    onClick={() => setTestimonialForm(p => ({ ...p, rating: star }))}
                                                    className={`text-2xl transition-transform hover:scale-110 ${star <= testimonialForm.rating ? 'opacity-100' : 'opacity-25'}`}
                                                >
                                                    ⭐
                                                </button>
                                            ))}
                                        </div>
                                    </Field>

                                    <Field label="Avatar URL (optional)">
                                        <input
                                            type="text"
                                            value={testimonialForm.authorAvatar}
                                            onChange={e => setTestimonialForm(p => ({ ...p, authorAvatar: e.target.value }))}
                                            placeholder="https://cdn.example.com/avatar.jpg"
                                            className={INPUT_CLS}
                                        />
                                    </Field>

                                    <div className="flex items-center gap-6 px-1">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={testimonialForm.isPublished}
                                                onChange={e => setTestimonialForm(p => ({ ...p, isPublished: e.target.checked }))}
                                                className="w-4 h-4 accent-[#4a3728] rounded"
                                            />
                                            <span className="text-xs font-semibold text-[#4a3728]/70">Publish immediately</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={testimonialForm.isFeatured}
                                                onChange={e => setTestimonialForm(p => ({ ...p, isFeatured: e.target.checked }))}
                                                className="w-4 h-4 accent-[#4a3728] rounded"
                                            />
                                            <span className="text-xs font-semibold text-[#4a3728]/70">Mark as Featured</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'product' && (
                                <div className="space-y-5">

                                    {productError && (
                                        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-2xl px-4 py-2.5">
                                            {productError}
                                        </p>
                                    )}

                                    <Field label="Product Name *">
                                        <input
                                            type="text"
                                            value={productForm.name}
                                            onChange={e => setProductForm(p => ({ ...p, name: e.target.value }))}
                                            placeholder="Throne8 Platform"
                                            className={INPUT_CLS}
                                        />
                                    </Field>

                                    <Field label="Tagline">
                                        <input
                                            type="text"
                                            value={productForm.tagline}
                                            onChange={e => setProductForm(p => ({ ...p, tagline: e.target.value }))}
                                            placeholder="AI-powered networking, reimagined."
                                            className={INPUT_CLS}
                                        />
                                    </Field>

                                    <Field label="Description *">
                                        <textarea
                                            rows={4}
                                            value={productForm.description}
                                            onChange={e => setProductForm(p => ({ ...p, description: e.target.value }))}
                                            placeholder="What does your product do..."
                                            className={INPUT_CLS + ' resize-none'}
                                        />
                                    </Field>

                                    <Field label="Demo Link">
                                        <input
                                            type="text"
                                            value={productForm.demoLink}
                                            onChange={e => setProductForm(p => ({ ...p, demoLink: e.target.value }))}
                                            placeholder="https://demo.yourproduct.com"
                                            className={INPUT_CLS}
                                        />
                                    </Field>

                                    {/* Features */}
                                    <Field label="Features">
                                        <div className="space-y-3">
                                            {productForm.features.map((f, idx) => (
                                                <div key={idx} className="p-3 bg-white/60 rounded-2xl border border-[#e0d8cf] space-y-2">
                                                    <div className="flex gap-2">
                                                        <input
                                                            value={f.title}
                                                            onChange={e => setFeature(idx, 'title', e.target.value)}
                                                            placeholder="Feature title"
                                                            className={INPUT_CLS + ' flex-1'}
                                                        />
                                                        <button
                                                            onClick={() => removeFeature(idx)}
                                                            className="w-9 h-9 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <textarea
                                                        rows={2}
                                                        value={f.description}
                                                        onChange={e => setFeature(idx, 'description', e.target.value)}
                                                        placeholder="Feature description"
                                                        className={INPUT_CLS + ' resize-none'}
                                                    />
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <input
                                                            value={f.icon}
                                                            onChange={e => setFeature(idx, 'icon', e.target.value)}
                                                            placeholder="Icon emoji 🚀"
                                                            className={INPUT_CLS}
                                                        />
                                                        <select
                                                            value={f.category}
                                                            onChange={e => setFeature(idx, 'category', e.target.value)}
                                                            className={INPUT_CLS}
                                                        >
                                                            {['core', 'key', 'design', 'analytics'].map(c => (
                                                                <option key={c} value={c}>{c}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={addFeature} className={ADD_BTN_CLS}>+ Add Feature</button>
                                        </div>
                                    </Field>

                                    {/* Screenshots */}
                                    <Field label="Screenshot URLs (optional)">
                                        <div className="space-y-2">
                                            {productForm.screenshots.map((s, idx) => (
                                                <div key={idx} className="flex gap-2">
                                                    <input
                                                        value={s}
                                                        onChange={e => setScreenshot(idx, e.target.value)}
                                                        placeholder="https://cdn.example.com/screenshot.jpg"
                                                        className={INPUT_CLS + ' flex-1'}
                                                    />
                                                    {productForm.screenshots.length > 1 && (
                                                        <button
                                                            onClick={() => removeScreenshot(idx)}
                                                            className="w-9 h-9 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button onClick={addScreenshot} className={ADD_BTN_CLS}>+ Add Screenshot URL</button>
                                        </div>
                                    </Field>

                                    <label className="flex items-center gap-2 cursor-pointer px-1">
                                        <input
                                            type="checkbox"
                                            checked={productForm.isPublished}
                                            onChange={e => setProductForm(p => ({ ...p, isPublished: e.target.checked }))}
                                            className="w-4 h-4 accent-[#4a3728] rounded"
                                        />
                                        <span className="text-xs font-semibold text-[#4a3728]/70">Publish immediately</span>
                                    </label>
                                </div>
                            )}

                            {activeSection === 'culture' && (
                                <div className="space-y-6">

                                    {lifeError && (
                                        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-2xl px-4 py-2.5">
                                            {lifeError}
                                        </p>
                                    )}

                                    {/* ── Values ── */}
                                    <Field label="Values">
                                        <div className="space-y-3">
                                            {lifeForm.values.map((v, idx) => (
                                                <div key={idx} className="p-3 bg-white/60 rounded-2xl border border-[#e0d8cf] space-y-2">
                                                    <div className="flex gap-2">
                                                        <input value={v.icon} onChange={e => setValueField(idx, 'icon', e.target.value)}
                                                            placeholder="❤️" className={INPUT_CLS + ' w-16 flex-shrink-0'} />
                                                        <input value={v.title} onChange={e => setValueField(idx, 'title', e.target.value)}
                                                            placeholder="Value title" className={INPUT_CLS + ' flex-1'} />
                                                        <button onClick={() => setLifeForm(p => ({ ...p, values: p.values.filter((_, i) => i !== idx) }))}
                                                            className="w-9 h-9 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <textarea rows={2} value={v.description}
                                                        onChange={e => setValueField(idx, 'description', e.target.value)}
                                                        placeholder="Describe this value..." className={INPUT_CLS + ' resize-none'} />
                                                </div>
                                            ))}
                                            <button onClick={() => setLifeForm(p => ({ ...p, values: [...p.values, { ...EMPTY_VALUE }] }))}
                                                className={ADD_BTN_CLS}>+ Add Value</button>
                                        </div>
                                    </Field>

                                    {/* ── Perks ── */}
                                    <Field label="Perks">
                                        <div className="space-y-3">
                                            {lifeForm.perks.map((perk, idx) => (
                                                <div key={idx} className="p-3 bg-white/60 rounded-2xl border border-[#e0d8cf] space-y-2">
                                                    <div className="flex gap-2">
                                                        <input value={perk.icon} onChange={e => setPerkField(idx, 'icon', e.target.value)}
                                                            placeholder="🎁" className={INPUT_CLS + ' w-16 flex-shrink-0'} />
                                                        <input value={perk.title} onChange={e => setPerkField(idx, 'title', e.target.value)}
                                                            placeholder="Perk title" className={INPUT_CLS + ' flex-1'} />
                                                        <button onClick={() => setLifeForm(p => ({ ...p, perks: p.perks.filter((_, i) => i !== idx) }))}
                                                            className="w-9 h-9 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <textarea rows={2} value={perk.description}
                                                        onChange={e => setPerkField(idx, 'description', e.target.value)}
                                                        placeholder="Describe this perk..." className={INPUT_CLS + ' resize-none'} />
                                                    <input value={perk.category} onChange={e => setPerkField(idx, 'category', e.target.value)}
                                                        placeholder="Category (e.g. Health, Growth)" className={INPUT_CLS} />
                                                </div>
                                            ))}
                                            <button onClick={() => setLifeForm(p => ({ ...p, perks: [...p.perks, { ...EMPTY_PERK }] }))}
                                                className={ADD_BTN_CLS}>+ Add Perk</button>
                                        </div>
                                    </Field>

                                    {/* ── Team Members ── */}
                                    <Field label="Team Members">
                                        <div className="space-y-3">
                                            {lifeForm.teamMembers.map((m, idx) => (
                                                <div key={idx} className="p-3 bg-white/60 rounded-2xl border border-[#e0d8cf] space-y-2">
                                                    <div className="flex gap-2">
                                                        <input value={m.name} onChange={e => setMemberField(idx, 'name', e.target.value)}
                                                            placeholder="Full name" className={INPUT_CLS + ' flex-1'} />
                                                        <button onClick={() => setLifeForm(p => ({ ...p, teamMembers: p.teamMembers.filter((_, i) => i !== idx) }))}
                                                            className="w-9 h-9 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <input value={m.designation} onChange={e => setMemberField(idx, 'designation', e.target.value)}
                                                        placeholder="Designation" className={INPUT_CLS} />
                                                    <textarea rows={2} value={m.bio} onChange={e => setMemberField(idx, 'bio', e.target.value)}
                                                        placeholder="Short bio..." className={INPUT_CLS + ' resize-none'} />
                                                    <input value={m.linkedinUrl} onChange={e => setMemberField(idx, 'linkedinUrl', e.target.value)}
                                                        placeholder="LinkedIn URL" className={INPUT_CLS} />
                                                    <input value={m.avatar} onChange={e => setMemberField(idx, 'avatar', e.target.value)}
                                                        placeholder="Avatar URL (optional)" className={INPUT_CLS} />
                                                </div>
                                            ))}
                                            <button onClick={() => setLifeForm(p => ({ ...p, teamMembers: [...p.teamMembers, { ...EMPTY_MEMBER, order: p.teamMembers.length + 1 }] }))}
                                                className={ADD_BTN_CLS}>+ Add Team Member</button>
                                        </div>
                                    </Field>

                                    {/* ── Gallery ── */}
                                    <Field label="Gallery">
                                        <div className="space-y-3">
                                            {lifeForm.gallery.map((g, idx) => (
                                                <div key={idx} className="p-3 bg-white/60 rounded-2xl border border-[#e0d8cf] space-y-2">
                                                    <div className="flex gap-2">
                                                        <input value={g.caption} onChange={e => setGalleryField(idx, 'caption', e.target.value)}
                                                            placeholder="Caption" className={INPUT_CLS + ' flex-1'} />
                                                        <button onClick={() => setLifeForm(p => ({ ...p, gallery: p.gallery.filter((_, i) => i !== idx) }))}
                                                            className="w-9 h-9 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <input value={g.url} onChange={e => setGalleryField(idx, 'url', e.target.value)}
                                                        placeholder="Image URL (optional)" className={INPUT_CLS} />
                                                    <select value={g.type} onChange={e => setGalleryField(idx, 'type', e.target.value)}
                                                        className={INPUT_CLS}>
                                                        {['Office', 'Team', 'Event'].map(t => (
                                                            <option key={t} value={t}>{t}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ))}
                                            <button onClick={() => setLifeForm(p => ({ ...p, gallery: [...p.gallery, { ...EMPTY_GALLERY, order: p.gallery.length + 1 }] }))}
                                                className={ADD_BTN_CLS}>+ Add Gallery Item</button>
                                        </div>
                                    </Field>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#e0d8cf] flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-[#4a3728]/70 border border-[#e0d8cf] rounded-2xl hover:bg-[#e0d8cf] transition-colors">
                        Cancel
                    </button>
                    {activeSection === 'timeline' ? (
                        <button
                            onClick={handleTimelineSave}
                            disabled={timelineSaving}
                            className="px-5 py-2 text-sm font-semibold bg-[#4a3728] text-[#f6ede8] rounded-2xl hover:bg-[#3a2a1e] disabled:opacity-50 transition-all shadow-md"
                        >
                            {timelineSaving ? 'Adding...' : 'Add Entry'}
                        </button>
                    ) : activeSection === 'testimonials' ? (
                        <button
                            onClick={handleTestimonialSave}
                            disabled={testimonialSaving}
                            className="px-5 py-2 text-sm font-semibold bg-[#4a3728] text-[#f6ede8] rounded-2xl hover:bg-[#3a2a1e] disabled:opacity-50 transition-all shadow-md"
                        >
                            {testimonialSaving ? 'Adding...' : 'Add Testimonial'}
                        </button>
                    ) : activeSection === 'culture' ? (
                        <button
                            onClick={handleLifeSave}
                            disabled={lifeSaving}
                            className="px-5 py-2 text-sm font-semibold bg-[#4a3728] text-[#f6ede8] rounded-2xl hover:bg-[#3a2a1e] disabled:opacity-50 transition-all shadow-md"
                        >
                            {lifeSaving ? 'Saving...' : 'Save Life Info'}
                        </button>
                    ) : activeSection === 'product' ? (
                        <button
                            onClick={handleProductSave}
                            disabled={productSaving}
                            className="px-5 py-2 text-sm font-semibold bg-[#4a3728] text-[#f6ede8] rounded-2xl hover:bg-[#3a2a1e] disabled:opacity-50 transition-all shadow-md"
                        >
                            {productSaving ? 'Saving...' : 'Save Product'}
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-5 py-2 text-sm font-semibold bg-[#4a3728] text-[#f6ede8] rounded-2xl hover:bg-[#3a2a1e] disabled:opacity-50 transition-all shadow-md"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Local helpers ──────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-[11px] font-bold text-[#4a3728] uppercase tracking-widest mb-1.5">
                {label}
            </label>
            {children}
        </div>
    );
}

const INPUT_CLS =
    'w-full px-3.5 py-2.5 text-sm text-[#4a3728] bg-white/80 border border-[#e0d8cf] rounded-2xl outline-none focus:border-[#4a3728]/40 focus:ring-2 focus:ring-[#4a3728]/10 transition-all placeholder:text-[#4a3728]/30';

const ADD_BTN_CLS =
    'text-xs font-semibold text-[#4a3728]/60 hover:text-[#4a3728] border border-dashed border-[#e0d8cf] hover:border-[#4a3728]/30 px-3 py-2 rounded-xl w-full transition-colors';
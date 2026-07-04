'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import CompanyService from '@/lib/api/company.service';
import { z } from 'zod';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { COMPANY_SIZES, companyStep1Schema, CompanyStep1Data, companyStep2Schema, INDUSTRIES, Step1FlatErrors, Step2FlatErrors } from '@/features/profile/validators/company.validation';

/* ─────────────────────────────────────────────
   Types & constants
───────────────────────────────────────────── */
type Step = 1 | 2 | 3;

const STEP_LABELS: Record<Step, string> = {
    1: 'Company Info',
    2: 'Branding',
    3: 'Review & Launch',
};

const LOADER_STEPS = [
    'Creating your company page...',
    'Uploading your company logo...',
    'Uploading your company cover...',
];

/* ─────────────────────────────────────────────
   Error message component
───────────────────────────────────────────── */
function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {message}
        </p>
    );
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function InputField({
    label, placeholder, value, onChange, hint, required, type = 'text', error,
}: {
    label: string; placeholder: string; value: string;
    onChange: (v: string) => void; hint?: string;
    required?: boolean; type?: string; error?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#4a3728]">
                {label}{required && <span className="text-[#b05a2e] ml-0.5">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full px-4 py-3 bg-[#f6ede8] border rounded-xl text-sm text-[#4a3728] placeholder-[#4a3728]/40 focus:outline-none focus:ring-2 transition-all ${error
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-[#d4c8be] focus:border-[#4a3728] focus:ring-[#4a3728]/10'
                    }`}
            />
            {hint && !error && <p className="text-xs text-[#4a3728]/50">{hint}</p>}
            <FieldError message={error} />
        </div>
    );
}

function SelectField({
    label, value, onChange, options, required, error,
}: {
    label: string; value: string; onChange: (v: string) => void;
    options: readonly string[]; required?: boolean; error?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#4a3728]">
                {label}{required && <span className="text-[#b05a2e] ml-0.5">*</span>}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full appearance-none px-4 py-3 bg-[#f6ede8] border rounded-xl text-sm text-[#4a3728] focus:outline-none focus:ring-2 transition-all cursor-pointer ${error
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                        : 'border-[#d4c8be] focus:border-[#4a3728] focus:ring-[#4a3728]/10'
                        }`}
                >
                    <option value="">Select {label.toLowerCase()}</option>
                    {options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                    ))}
                </select>
                <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a3728]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <FieldError message={error} />
        </div>
    );
}

/* ─────────────────────────────────────────────
   Live preview card
───────────────────────────────────────────── */
function PreviewCard({
    name, tagline, industry, logoPreview, coverPreview, website,
}: {
    name: string; tagline: string; industry: string;
    logoPreview: string | null; coverPreview: string | null; website: string;
}) {
    return (
        <div className="bg-[#faf6f2] rounded-2xl overflow-hidden border border-[#e0d8cf] shadow-lg">
            <div className="relative h-28 bg-gradient-to-br from-[#d4c8be] to-[#c4b8ae]">
                {coverPreview && (
                    <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                )}
                {!coverPreview && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-8 gap-1 opacity-20">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <div key={i} className="w-3 h-3 rounded-sm bg-[#4a3728]" />
                            ))}
                        </div>
                    </div>
                )}
                <div className="absolute -bottom-6 left-5">
                    <div className="w-14 h-14 rounded-xl border-2 border-[#faf6f2] shadow-md overflow-hidden bg-[#e0d8cf] flex items-center justify-center">
                        {logoPreview
                            ? <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                            : (
                                <svg className="w-7 h-7 text-[#4a3728]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            )}
                    </div>
                </div>
            </div>
            <div className="pt-9 pb-5 px-5">
                <h3 className="text-base font-bold text-[#4a3728] leading-tight">
                    {name || <span className="text-[#4a3728]/30">Company name</span>}
                </h3>
                {tagline && <p className="text-xs text-[#4a3728]/70 mt-0.5 leading-snug line-clamp-2">{tagline}</p>}
                {industry && (
                    <span className="inline-block mt-2 text-[10px] font-semibold text-[#4a3728]/60 bg-[#e0d8cf]/70 px-2 py-0.5 rounded-full">{industry}</span>
                )}
                {website && (
                    <p className="mt-2 text-xs text-[#b05a2e] truncate">🔗 {website.replace(/^https?:\/\//, '')}</p>
                )}
                <div className="flex items-center gap-2 mt-4">
                    <button className="flex-1 bg-[#4a3728] text-[#f6ede8] text-xs font-semibold py-2 rounded-xl hover:bg-[#6b4e3d] transition-colors">
                        + Follow
                    </button>
                    <button className="px-3 py-2 border border-[#d4c8be] rounded-xl text-xs font-semibold text-[#4a3728] hover:bg-[#e0d8cf] transition-colors">
                        Visit
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Step indicators
───────────────────────────────────────────── */
function StepBar({ current }: { current: Step }) {
    return (
        <div className="flex items-center gap-2 mb-8">
            {([1, 2, 3] as Step[]).map((s) => (
                <div key={s} className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 ${s <= current ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${s < current ? 'bg-[#4a3728] text-[#f6ede8]' : s === current ? 'bg-[#4a3728] text-[#f6ede8] ring-4 ring-[#4a3728]/20' : 'bg-[#e0d8cf] text-[#4a3728]'}`}>
                            {s < current
                                ? <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                : s}
                        </div>
                        <span className={`text-xs font-semibold hidden sm:block ${s === current ? 'text-[#4a3728]' : 'text-[#4a3728]/40'}`}>{STEP_LABELS[s]}</span>
                    </div>
                    {s < 3 && <div className={`h-px flex-1 w-8 mx-1 transition-colors duration-300 ${s < current ? 'bg-[#4a3728]' : 'bg-[#d4c8be]'}`} />}
                </div>
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Loader Overlay
───────────────────────────────────────────── */
function LoaderOverlay({ loaderText }: { loaderText: string }) {
    const currentIdx = LOADER_STEPS.indexOf(loaderText);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center space-y-6">
                {/* Spinner */}
                <div className="relative w-16 h-16 mx-auto">
                    <div className="w-16 h-16 rounded-full border-4 border-[#e0d8cf]" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-[#4a3728] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#4a3728]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                </div>

                {/* Cycling text */}
                <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-[#4a3728] min-h-[20px] transition-all duration-500">
                        {loaderText}
                    </p>
                    <p className="text-xs text-[#4a3728]/50">Please don't close this window</p>
                </div>

                {/* Step dots */}
                <div className="space-y-2">
                    {LOADER_STEPS.map((stepText, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-500 ${currentIdx > i
                                ? 'bg-[#4a3728]'
                                : currentIdx === i
                                    ? 'border-2 border-[#4a3728] bg-[#f6ede8]'
                                    : 'border-2 border-[#d4c8be] bg-white'
                                }`}>
                                {currentIdx > i && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {currentIdx === i && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#4a3728] animate-pulse" />
                                )}
                            </div>
                            <span className={`text-xs transition-all duration-300 ${currentIdx === i ? 'text-[#4a3728] font-semibold' : currentIdx > i ? 'text-[#4a3728]/50 line-through' : 'text-[#4a3728]/30'}`}>
                                {stepText}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function SetupPage() {
    const { user } = useAuth();
    const router = useRouter();

    const {
        userProfileData,
        isLoadingProfile,
        loadProfile
    } = useProfile();

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);


    // UI state
    const [step, setStep] = useState<Step>(1);
    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [loaderText, setLoaderText] = useState(LOADER_STEPS[0]);

    // Validation errors
    const [step1Errors, setStep1Errors] = useState<Step1FlatErrors>({});
    const [step2Errors, setStep2Errors] = useState<Step2FlatErrors>({});

    // ── Step 1 fields ──
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneCountry, setPhoneCountry] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [industry, setIndustry] = useState('');
    const [size, setSize] = useState('');
    const [founded, setFounded] = useState('');
    const [hqAddress, setHqAddress] = useState('');
    const [hqCity, setHqCity] = useState('');
    const [hqState, setHqState] = useState('');
    const [hqCountry, setHqCountry] = useState('India');
    const [hqPincode, setHqPincode] = useState('');

    // ── Step 2 fields ──
    const [tagline, setTagline] = useState('');
    const [about, setAbout] = useState('');

    // ── Logo & cover ──
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const logoRef = useRef<HTMLInputElement>(null);
    const coverRef = useRef<HTMLInputElement>(null);

    /* ── File handler ── */
    const handleFile = (
        e: ChangeEvent<HTMLInputElement>,
        previewSetter: (v: string) => void,
        fileSetter: (f: File) => void
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        fileSetter(file);
        const reader = new FileReader();
        reader.onload = (ev) => previewSetter(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    /* ── Loader cycling ── */
    const cycleLoaderText = () => {
        let i = 0;
        setLoaderText(LOADER_STEPS[0]);
        const id = setInterval(() => {
            i++;
            if (i < LOADER_STEPS.length) {
                setLoaderText(LOADER_STEPS[i]);
            } else {
                clearInterval(id);
            }
        }, 2500);
        return id;
    };

    /* ── canAdvance ── */
    const canAdvance = () => {
        if (step === 1) {
            return (
                companyName.trim() &&
                email.trim() &&
                phoneNumber.trim() &&
                industry &&
                size &&
                hqAddress.trim() &&
                hqCity.trim() &&
                hqState.trim()
            );
        }
        if (step === 2) return true;
        return agreed;
    };

    /* ── handleNext ── */
    const handleNext = async () => {
        // ── Step 1 validation ──
        if (step === 1) {
            const result = companyStep1Schema.safeParse({
                companyName,
                email,
                phone: {               // ✅ nested — validation file ke schema se match
                    country: phoneCountry,
                    number: phoneNumber,
                },
                industry,
                size,
                founded: founded ? parseInt(founded) : undefined,
                website: website || undefined,
                headquarters: {        // ✅ nested — validation file ke schema se match
                    address: hqAddress,
                    city: hqCity,
                    state: hqState,
                    country: hqCountry || 'India',
                    pincode: hqPincode || undefined,
                },
            });

            if (!result.success) {
                const errors: Step1FlatErrors = {};
                result.error.errors.forEach((err) => {
                    const path = err.path;
                    // Nested path se flat key banana:
                    if (path[0] === 'companyName') errors.companyName = err.message;
                    else if (path[0] === 'email') errors.email = err.message;
                    else if (path[0] === 'phone' && path[1] === 'number' && !errors.phoneNumber) errors.phoneNumber = err.message;
                    else if (path[0] === 'phone' && path[1] === 'country' && !errors.phoneCountry) errors.phoneCountry = err.message;
                    else if (path[0] === 'industry') errors.industry = err.message;
                    else if (path[0] === 'size') errors.size = err.message;
                    else if (path[0] === 'founded') errors.founded = err.message;
                    else if (path[0] === 'website') errors.website = err.message;
                    else if (path[0] === 'headquarters' && path[1] === 'address') errors.hqAddress = err.message;
                    else if (path[0] === 'headquarters' && path[1] === 'city') errors.hqCity = err.message;
                    else if (path[0] === 'headquarters' && path[1] === 'state') errors.hqState = err.message;
                });
                setStep1Errors(errors);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            setStep1Errors({});
            setStep(2);
            return;
        }

        // ── Step 2 validation ──
        if (step === 2) {
            const result = companyStep2Schema.safeParse({ tagline, about });
            if (!result.success) {
                const errors: Step2FlatErrors = {};
                result.error.errors.forEach((err) => {
                    if (err.path[0] === 'tagline') errors.tagline = err.message;
                    else if (err.path[0] === 'shortDescription') errors.shortDescription = err.message;
                });
                setStep2Errors(errors);
                return;
            }
            setStep2Errors({});
            setStep(3);
            return;
        }

        // ── Step 3 — Final submit ──
        setIsSubmitting(true);
        setSubmitError(null);
        const timerId = cycleLoaderText();

        try {
            // 1. Create company
            const companyRes = await CompanyService.createCompany({
                companyName,
                email,
                phone: { country: phoneCountry, number: phoneNumber },
                industry,
                size,
                founded: founded ? parseInt(founded) : undefined,
                headquarters: {
                    address: hqAddress,
                    city: hqCity,
                    state: hqState,
                    country: hqCountry || 'India',
                    pincode: hqPincode || undefined,
                },
                website: website || undefined,
                descriptions: {
                    short: about || undefined,
                    tagline: tagline || undefined,
                },
            });

            const companyId =
                companyRes.data?.company?.id ||
                companyRes.data?.company?.companyId ||
                companyRes.data?.companyId;

            if (companyId) {
                localStorage.setItem('activeCompanyId', companyId);
            }

            // 2. Logo upload
            if (logoFile && companyId) {
                setLoaderText(LOADER_STEPS[1]);
                await CompanyService.uploadCompanyLogo(companyId, logoFile);
            }

            // 3. Cover upload
            if (coverFile && companyId) {
                setLoaderText(LOADER_STEPS[2]);
                await CompanyService.uploadCompanyCover(companyId, coverFile);
            }

            clearInterval(timerId);
            router.push(`/company/${user?.userId}`);

        } catch (error: any) {
            clearInterval(timerId);
            // Backend error properly extract karo
            const message =
                error.response?.data?.message ||   // axios error
                error.message ||                    // generic
                'Something went wrong. Please try again.';
            setSubmitError(message);
            console.error('Submit error:', error.response?.data || error);
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ─────────────────────────────────────────────
       Render
    ───────────────────────────────────────────── */
    return (
        <>
            {/* Loader Overlay */}
            {isSubmitting && <LoaderOverlay loaderText={loaderText} />}

            <div className="max-w-5xl mx-auto py-10">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-[#4a3728] flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#f6ede8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-[#4a3728]">Create Company Page</h1>
                    </div>
                    <p className="text-sm text-[#4a3728]/60 ml-11">Set up your company presence on Throne8</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* ── Form panel ── */}
                    <div className="lg:col-span-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#e0d8cf] shadow-sm p-6 sm:p-8">
                        <StepBar current={step} />

                        {/* ════════════════════════════
                            STEP 1 — Company Info
                        ════════════════════════════ */}
                        {step === 1 && (
                            <div className="space-y-5">
                                <div>
                                    <h2 className="text-lg font-bold text-[#4a3728]">Tell us about your company</h2>
                                    <p className="text-sm text-[#4a3728]/55 mt-0.5">This information appears publicly on your company page.</p>
                                </div>

                                {/* Company Name */}
                                <InputField
                                    label="Company Name"
                                    placeholder="e.g. TechCorp India"
                                    value={companyName}
                                    onChange={setCompanyName}
                                    required
                                    error={step1Errors.companyName}
                                />

                                {/* Email */}
                                <InputField
                                    label="Company Email"
                                    placeholder="contact@company.com"
                                    value={email}
                                    onChange={setEmail}
                                    type="email"
                                    required
                                    error={step1Errors.email}
                                />

                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-[#4a3728]">
                                        Phone<span className="text-[#b05a2e] ml-0.5">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={phoneCountry}
                                            onChange={(e) => setPhoneCountry(e.target.value)}
                                            placeholder="+91"
                                            className={`w-20 px-3 py-3 bg-[#f6ede8] border rounded-xl text-sm text-[#4a3728] focus:outline-none focus:ring-2 transition-all text-center ${step1Errors.phoneCountry || step1Errors.phoneNumber
                                                ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                                                : 'border-[#d4c8be] focus:border-[#4a3728] focus:ring-[#4a3728]/10'
                                                }`}
                                        />
                                        <input
                                            type="text"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                            placeholder="9876543210"
                                            className={`flex-1 px-4 py-3 bg-[#f6ede8] border rounded-xl text-sm text-[#4a3728] placeholder-[#4a3728]/40 focus:outline-none focus:ring-2 transition-all ${step1Errors.phoneNumber
                                                ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                                                : 'border-[#d4c8be] focus:border-[#4a3728] focus:ring-[#4a3728]/10'
                                                }`}
                                        />
                                    </div>
                                    <FieldError message={step1Errors.phoneNumber || step1Errors.phoneCountry} />
                                </div>

                                {/* Website */}
                                <InputField
                                    label="Website"
                                    placeholder="https://yourcompany.com"
                                    value={website}
                                    onChange={setWebsite}
                                    type="url"
                                    error={step1Errors.website}
                                />

                                {/* Industry */}
                                <SelectField
                                    label="Industry"
                                    value={industry}
                                    onChange={setIndustry}
                                    options={INDUSTRIES}
                                    required
                                    error={step1Errors.industry}
                                />

                                {/* Size */}
                                <SelectField
                                    label="Company Size"
                                    value={size}
                                    onChange={setSize}
                                    options={COMPANY_SIZES}
                                    required
                                    error={step1Errors.size}
                                />

                                {/* Founded */}
                                <InputField
                                    label="Founded Year"
                                    placeholder={`e.g. ${new Date().getFullYear() - 5}`}
                                    value={founded}
                                    onChange={setFounded}
                                    type="number"
                                    hint="Optional — year your company was established"
                                    error={step1Errors.founded}
                                />

                                {/* Headquarters */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <label className="block text-sm font-semibold text-[#4a3728]">
                                            Headquarters<span className="text-[#b05a2e] ml-0.5">*</span>
                                        </label>
                                        <div className="h-px flex-1 bg-[#e0d8cf]" />
                                    </div>

                                    <InputField
                                        label="Address"
                                        placeholder="123 MG Road"
                                        value={hqAddress}
                                        onChange={setHqAddress}
                                        required
                                        error={step1Errors.hqAddress}
                                    />

                                    <div className="grid grid-cols-2 gap-3">
                                        <InputField
                                            label="City"
                                            placeholder="Bangalore"
                                            value={hqCity}
                                            onChange={setHqCity}
                                            required
                                            error={step1Errors.hqCity}
                                        />
                                        <InputField
                                            label="State"
                                            placeholder="Karnataka"
                                            value={hqState}
                                            onChange={setHqState}
                                            required
                                            error={step1Errors.hqState}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <InputField
                                            label="Country"
                                            placeholder="India"
                                            value={hqCountry}
                                            onChange={setHqCountry}
                                        />
                                        <InputField
                                            label="Pincode"
                                            placeholder="560001"
                                            value={hqPincode}
                                            onChange={setHqPincode}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ════════════════════════════
                            STEP 2 — Branding
                        ════════════════════════════ */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-bold text-[#4a3728]">Brand your page</h2>
                                    <p className="text-sm text-[#4a3728]/55 mt-0.5">Add a logo, cover image, and tagline to make your page stand out.</p>
                                </div>

                                {/* Logo upload */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-[#4a3728]">Logo</label>
                                    <div
                                        onClick={() => logoRef.current?.click()}
                                        className="relative flex flex-col items-center justify-center h-36 border-2 border-dashed border-[#d4c8be] rounded-xl cursor-pointer hover:border-[#4a3728] hover:bg-[#f6ede8]/50 transition-all group"
                                    >
                                        {logoPreview
                                            ? <img src={logoPreview} alt="Logo preview" className="h-28 w-28 object-cover rounded-xl shadow-md" />
                                            : (
                                                <>
                                                    <svg className="w-8 h-8 text-[#4a3728]/40 group-hover:text-[#4a3728]/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-sm text-[#4a3728]/50 mt-2">Click to upload logo</p>
                                                    <p className="text-xs text-[#4a3728]/35">300×300px recommended · PNG, JPG, JPEG</p>
                                                </>
                                            )}
                                        <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e, setLogoPreview, setLogoFile)} />
                                    </div>
                                    {logoPreview && (
                                        <button
                                            onClick={() => { setLogoPreview(null); setLogoFile(null); }}
                                            className="text-xs text-[#b05a2e] hover:underline"
                                        >
                                            Remove logo
                                        </button>
                                    )}
                                </div>

                                {/* Cover upload */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-[#4a3728]">Cover image <span className="text-[#4a3728]/40 font-normal">(optional)</span></label>
                                    <div
                                        onClick={() => coverRef.current?.click()}
                                        className="relative flex flex-col items-center justify-center h-28 border-2 border-dashed border-[#d4c8be] rounded-xl cursor-pointer hover:border-[#4a3728] hover:bg-[#f6ede8]/50 transition-all group overflow-hidden"
                                    >
                                        {coverPreview
                                            ? <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                                            : (
                                                <>
                                                    <svg className="w-7 h-7 text-[#4a3728]/40 group-hover:text-[#4a3728]/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-sm text-[#4a3728]/50 mt-1">Upload cover image</p>
                                                    <p className="text-xs text-[#4a3728]/35">1128×191px recommended</p>
                                                </>
                                            )}
                                        <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e, setCoverPreview, setCoverFile)} />
                                    </div>
                                    {coverPreview && (
                                        <button
                                            onClick={() => { setCoverPreview(null); setCoverFile(null); }}
                                            className="text-xs text-[#b05a2e] hover:underline"
                                        >
                                            Remove cover
                                        </button>
                                    )}
                                </div>

                                {/* Tagline */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-[#4a3728]">Tagline</label>
                                    <textarea
                                        value={tagline}
                                        onChange={(e) => setTagline(e.target.value.slice(0, 150))}
                                        placeholder="e.g. Building the future of AI-powered hiring"
                                        rows={3}
                                        className={`w-full px-4 py-3 bg-[#f6ede8] border rounded-xl text-sm text-[#4a3728] placeholder-[#4a3728]/40 focus:outline-none focus:ring-2 transition-all resize-none ${step2Errors.tagline
                                            ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                                            : 'border-[#d4c8be] focus:border-[#4a3728] focus:ring-[#4a3728]/10'
                                            }`}
                                    />
                                    <div className="flex justify-between">
                                        <div>
                                            {step2Errors.tagline
                                                ? <FieldError message={step2Errors.tagline} />
                                                : <p className="text-xs text-[#4a3728]/50">Shown below your company name</p>
                                            }
                                        </div>
                                        <p className="text-xs text-[#4a3728]/50">{tagline.length}/150</p>
                                    </div>
                                </div>

                                {/* About / Short Description */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-[#4a3728]">
                                        About <span className="text-[#4a3728]/40 font-normal">(optional)</span>
                                    </label>
                                    <textarea
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value.slice(0, 300))}
                                        placeholder="Describe what your company does, your mission, values..."
                                        rows={4}
                                        className={`w-full px-4 py-3 bg-[#f6ede8] border rounded-xl text-sm text-[#4a3728] placeholder-[#4a3728]/40 focus:outline-none focus:ring-2 transition-all resize-none ${step2Errors.shortDescription
                                            ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                                            : 'border-[#d4c8be] focus:border-[#4a3728] focus:ring-[#4a3728]/10'
                                            }`}
                                    />
                                    <div className="flex justify-between">
                                        <FieldError message={step2Errors.shortDescription} />
                                        <p className="text-xs text-[#4a3728]/50 ml-auto">{about.length}/300</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ════════════════════════════
                            STEP 3 — Review & Launch
                        ════════════════════════════ */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-bold text-[#4a3728]">Review & launch</h2>
                                    <p className="text-sm text-[#4a3728]/55 mt-0.5">Double-check your details before creating the page.</p>
                                </div>

                                <div className="space-y-3 bg-[#f6ede8] rounded-xl p-5">
                                    {[
                                        { label: 'Company name', value: companyName },
                                        { label: 'Email', value: email },
                                        { label: 'Phone', value: `${phoneCountry} ${phoneNumber}` },
                                        { label: 'Website', value: website || '—' },
                                        { label: 'Industry', value: industry },
                                        { label: 'Size', value: size },
                                        { label: 'Founded', value: founded || '—' },
                                        { label: 'Headquarters', value: [hqAddress, hqCity, hqState, hqCountry].filter(Boolean).join(', ') },
                                        { label: 'Tagline', value: tagline || '—' },
                                    ].map((r) => (
                                        <div key={r.label} className="flex justify-between items-start gap-4">
                                            <span className="text-xs font-semibold text-[#4a3728]/50 whitespace-nowrap flex-shrink-0">{r.label}</span>
                                            <span className="text-sm text-[#4a3728] text-right break-all">{r.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Terms checkbox */}
                                <div className="flex items-start gap-3 p-4 bg-[#e0d8cf]/50 rounded-xl border border-[#d4c8be]">
                                    <button
                                        onClick={() => setAgreed(!agreed)}
                                        className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${agreed ? 'bg-[#4a3728] border-[#4a3728]' : 'border-[#d4c8be] bg-white'}`}
                                    >
                                        {agreed && (
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                    <p className="text-xs text-[#4a3728]/70 leading-relaxed">
                                        I verify that I am an authorized representative of this organisation and have the right to act on its behalf in the creation and management of this page. The organisation and I agree to the{' '}
                                        <a href="#" className="text-[#b05a2e] hover:underline font-semibold">Throne8 Pages Terms</a>.
                                    </p>
                                </div>

                                {/* Submit error */}
                                {submitError && (
                                    <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl">
                                        <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm text-red-600">{submitError}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Navigation ── */}
                        <div className={`flex items-center mt-8 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
                            {step > 1 && (
                                <button
                                    onClick={() => setStep((s) => (s - 1) as Step)}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-5 py-2.5 border border-[#d4c8be] rounded-xl text-sm font-semibold text-[#4a3728] hover:bg-[#e0d8cf] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>
                            )}

                            <button
                                onClick={handleNext}
                                disabled={!canAdvance() || isSubmitting}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#4a3728] text-[#f6ede8] text-sm font-semibold rounded-xl hover:bg-[#6b4e3d] transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {step === 3 ? 'Create page' : 'Continue'}
                                {step < 3 && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ── Live preview panel ── */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="sticky top-24">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#4a3728] animate-pulse" />
                                <p className="text-xs font-semibold text-[#4a3728]/60 uppercase tracking-widest">Live preview</p>
                            </div>
                            <PreviewCard
                                name={companyName}
                                tagline={tagline}
                                industry={industry}
                                logoPreview={logoPreview}
                                coverPreview={coverPreview}
                                website={website}
                            />
                            <p className="text-xs text-center text-[#4a3728]/40 mt-3">Preview updates as you type</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
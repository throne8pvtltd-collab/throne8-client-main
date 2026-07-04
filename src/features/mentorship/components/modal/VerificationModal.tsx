'use client';

import { useState, useEffect, useRef } from "react";
import { X, Mail, Phone, CreditCard, Briefcase, CheckCircle, ArrowRight, Shield } from "lucide-react";
import VerificationService from "@/lib/api/verification.service";

// ─── Types ────────────────────────────────────────────────────────────────────

type StepKey = 'email' | 'phone' | 'identity' | 'professional';

interface StepState {
    value: string;
    otp: string;
    otpSent: boolean;
    verified: boolean;
    sending: boolean;
    verifying: boolean;
    error: string;
    otpError: string;
    polling: boolean;
    pollProgress: number;
}

type StepsState = Record<StepKey, StepState>;

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAllVerified?: () => void;
}

interface StepDef {
    key: StepKey;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    placeholder: string;
    inputLabel: string;
}

// ─── Circular Progress ────────────────────────────────────────────────────────

interface CircularProgressProps {
    percent: number;
    animating: boolean;
}

function CircularProgress({ percent, animating }: CircularProgressProps) {
    const r = 54;
    const circ = 2 * Math.PI * r;
    const offset = circ - (percent / 100) * circ;
    const allDone = percent === 100;

    return (
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 140, height: 140, flexShrink: 0 }}>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="70" cy="70" r={r} fill="none" stroke="#e0d8cf" strokeWidth="10" />
                <circle
                    cx="70" cy="70" r={r} fill="none"
                    stroke={allDone ? "#22c55e" : "#4a3728"}
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1), stroke 0.4s" }}
                />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {allDone ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <CheckCircle style={{
                            width: 40, height: 40, color: "#22c55e",
                            animation: animating ? "vm-spin-stop 1.8s cubic-bezier(0.4,0,0.2,1) infinite" : "none",
                        }} />
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#16a34a" }}>VERIFIED</span>
                    </div>
                ) : (
                    <>
                        <span style={{ fontSize: 30, fontWeight: 900, color: "#4a3728" }}>{percent}%</span>
                        <span style={{ fontSize: 11, color: "#8a7a6a" }}>complete</span>
                    </>
                )}
            </div>
        </div>
    );
}

// ─── OTP Input ────────────────────────────────────────────────────────────────

interface OtpInputProps {
    value: string;
    onChange: (v: string) => void;
    error?: string;
}

function OtpInput({ value, onChange, error }: OtpInputProps) {
    const digits = value.padEnd(6, " ").split("").slice(0, 6);
    const refs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleKey = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !digits[idx]?.trim() && idx > 0) {
            refs[idx - 1].current?.focus();
        }
    };

    const handleChange = (idx: number, v: string) => {
        if (!/^\d?$/.test(v)) return;
        const arr = [...digits];
        arr[idx] = v;
        onChange(arr.join("").replace(/ /g, ""));
        if (v && idx < 5) refs[idx + 1].current?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        onChange(pasted);
        e.preventDefault();
    };

    return (
        <div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 4 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <input
                        key={i}
                        ref={refs[i]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digits[i] === " " ? "" : digits[i]}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKey(i, e)}
                        onPaste={handlePaste}
                        style={{
                            width: 42, height: 50, textAlign: "center", fontSize: 18, fontWeight: 700,
                            borderRadius: 12, border: `2px solid ${error ? "#f87171" : "#e0d8cf"}`,
                            backgroundColor: error ? "#fef2f2" : "#fbf7f3",
                            color: "#4a3728", outline: "none", transition: "border-color 0.2s",
                        }}
                    />
                ))}
            </div>
            {error && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, textAlign: "center" }}>{error}</p>}
        </div>
    );
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STEPS: StepDef[] = [
    { key: "email", label: "Email Verification", sublabel: "Verify your personal email address", icon: <Mail style={{ width: 20, height: 20 }} />, placeholder: "your@email.com", inputLabel: "Email Address" },
    { key: "phone", label: "Phone Verification", sublabel: "Verify your Indian mobile number", icon: <Phone style={{ width: 20, height: 20 }} />, placeholder: "9876543210", inputLabel: "Phone Number (+91)" },
    { key: "identity", label: "Identity Verification", sublabel: "Verify using your Aadhaar number", icon: <CreditCard style={{ width: 20, height: 20 }} />, placeholder: "1234 5678 9012", inputLabel: "Aadhaar Number" },
    { key: "professional", label: "Professional Credentials", sublabel: "Verify with your company email", icon: <Briefcase style={{ width: 20, height: 20 }} />, placeholder: "you@yourcompany.com", inputLabel: "Company Email" },
];

function validateValue(key: StepKey, value: string): string {
    if (key === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
    }
    if (key === "phone") {
        if (!/^\d{10}$/.test(value)) return "Enter a valid 10-digit phone number";
    }
    if (key === "identity") {
        if (!/^\d{4}\s\d{4}\s\d{4}$/.test(value)) return "Enter valid Aadhaar (XXXX XXXX XXXX)";
    }
    // if (key === "professional") {
    //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid company email";
    //     const domain = value.split("@")[1];
    //     const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    //     if (publicDomains.includes(domain)) return "Use a company email (e.g. alias@microsoft.com)";
    // }
    return "";
}

function formatAadhaar(raw: string): string {
    const d = raw.replace(/\D/g, "").slice(0, 12);
    return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onAllVerified }) => {
    const initialStep = (): StepState => ({
        value: "", otp: "", otpSent: false, verified: false,
        sending: false, verifying: false, error: "", otpError: "",
        polling: false, pollProgress: 0,
    });

    const [steps, setSteps] = useState<StepsState>({
        email: initialStep(), phone: initialStep(),
        identity: initialStep(), professional: initialStep(),
    });
    const [animating, setAnimating] = useState(false);

    const verifiedCount = STEPS.filter((s) => steps[s.key].verified).length;
    const percent = verifiedCount * 25;
    const allVerified = verifiedCount === 4;

    // Reset on every open
    // Reset + pre-fetch status on open
    useEffect(() => {
        if (isOpen) {
            setSteps({
                email: initialStep(), phone: initialStep(),
                identity: initialStep(), professional: initialStep(),
            });
            setAnimating(false);

            // Pre-fetch all statuses
            const fetchStatuses = async () => {
                try {
                    const [emailStatus, phoneStatus, aadhaarStatus, companyStatus] = await Promise.allSettled([
                        VerificationService.checkEmailVerificationStatus(),
                        VerificationService.checkPhoneVerificationStatus(),
                        VerificationService.checkAadhaarVerificationStatus(),
                        VerificationService.checkCompanyEmailVerificationStatus(),
                    ]);

                    setSteps(prev => ({
                        ...prev,
                        email: {
                            ...prev.email,
                            verified: emailStatus.status === 'fulfilled'
                                ? emailStatus.value?.data?.emailVerified === true
                                : false,
                        },
                        phone: {
                            ...prev.phone,
                            verified: phoneStatus.status === 'fulfilled'
                                ? (phoneStatus.value?.data?.phoneVerified === true || phoneStatus.value?.data?.verified === true)
                                : false,
                        },
                        identity: {
                            ...prev.identity,
                            verified: aadhaarStatus.status === 'fulfilled'
                                ? aadhaarStatus.value?.data?.aadhaarVerified === true
                                : false,
                        },
                        professional: {
                            ...prev.professional,
                            verified: companyStatus.status === 'fulfilled'
                                ? companyStatus.value?.data?.companyEmailVerified === true
                                : false,
                        },
                    }));
                } catch (e) {
                    // silent fail
                }
            };

            fetchStatuses();
        }
    }, [isOpen]);

    useEffect(() => {
        if (allVerified) {
            setAnimating(true);
            const timer = setTimeout(() => {
                if (onAllVerified) onAllVerified();
            }, 2200);
            return () => clearTimeout(timer);
        }
    }, [allVerified, onAllVerified]);

    if (!isOpen) return null;

    const update = (key: StepKey, patch: Partial<StepState>) => {
        setSteps((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
    };

    const handleValueChange = (key: StepKey, raw: string) => {
        let val = raw;
        if (key === "phone") val = raw.replace(/\D/g, "").slice(0, 10);
        if (key === "identity") val = formatAadhaar(raw);
        update(key, { value: val, error: "", otpSent: false, otp: "" });
    };

    const handleSendOtp = async (key: StepKey) => {
        const err = validateValue(key, steps[key].value);
        if (err) { update(key, { error: err }); return; }
        update(key, { sending: true, error: "" });

        try {
            if (key === "email") {
                await VerificationService.sendEmailOtp(steps[key].value);
            } else if (key === "phone") {
                await VerificationService.sendPhoneOtp(`+91${steps[key].value}`);
            } else if (key === "identity") {
                await VerificationService.sendAadhaarOtp(steps[key].value);
            } else if (key === "professional") {
                await VerificationService.sendCompanyEmailOtp(steps[key].value);
            }
            update(key, { sending: false, otpSent: true });
        } catch (e: any) {
            update(key, { sending: false, error: e.message || "Failed to send OTP" });
        }
    };

    const handleVerify = async (key: StepKey) => {
        const { otp, value } = steps[key];
        if (otp.length < 6) { update(key, { otpError: "OTP must be 6 digits" }); return; }
        if (!/^\d+$/.test(otp)) { update(key, { otpError: "OTP must be numeric" }); return; }
        update(key, { verifying: true, otpError: "" });

        try {
            if (key === "email") {
                await VerificationService.verifyEmailOtp(value, otp);
                startStatusPolling(key);
            } else if (key === "phone") {
                await VerificationService.verifyPhoneOtp(`+91${value}`, otp);
                startStatusPolling(key);
            } else if (key === "identity") {
                await VerificationService.verifyAadhaarOtp(otp);
                startStatusPolling(key);
            } else if (key === "professional") {
                await VerificationService.verifyCompanyEmailOtp(otp);
                startStatusPolling(key);
            }
        } catch (e: any) {
            update(key, { verifying: false, otpError: e.message || "Invalid OTP. Please try again." });
        }
    };

    const startStatusPolling = (key: StepKey) => {
        update(key, { verifying: false, polling: true, pollProgress: 0 });

        let progress = 0;
        const totalTime = 8000;
        const interval = 300;
        const step = (interval / totalTime) * 100;

        const progressTimer = setInterval(() => {
            progress = Math.min(progress + step, 90);
            update(key, { pollProgress: progress });
        }, interval);

        const pollStatus = async () => {
            try {
                let isVerified = false;

                if (key === "email") {
                    const statusData = await VerificationService.checkEmailVerificationStatus();
                    isVerified = statusData?.data?.emailVerified === true;
                } else if (key === "phone") {
                    const statusData = await VerificationService.checkPhoneVerificationStatus();
                    isVerified = statusData?.data?.phoneVerified === true ||
                        statusData?.data?.verified === true;
                } else if (key === "identity") {
                    const statusData = await VerificationService.checkAadhaarVerificationStatus();
                    isVerified = statusData?.data?.aadhaarVerified === true;
                } else if (key === "professional") {
                    const statusData = await VerificationService.checkCompanyEmailVerificationStatus();
                    isVerified = statusData?.data?.companyEmailVerified === true;
                }

                if (isVerified) {
                    clearInterval(progressTimer);
                    clearInterval(pollInterval);
                    update(key, { polling: false, pollProgress: 100, verified: true });
                }
            } catch (e) {
                // silent fail
            }
        };

        const pollInterval = setInterval(pollStatus, 2000);

        setTimeout(() => {
            clearInterval(progressTimer);
            clearInterval(pollInterval);
            setSteps(prev => {
                if (prev[key].polling && !prev[key].verified) {
                    return { ...prev, [key]: { ...prev[key], polling: false, error: "Verification timeout. Please try again." } };
                }
                return prev;
            });
        }, 20000);

        pollStatus();
    };

    const getDisplayPercent = () => {
        // Koi step polling me hai to uska progress show karo
        const pollingStep = STEPS.find(s => steps[s.key].polling);
        if (pollingStep) {
            const basePercent = verifiedCount * 25;
            return basePercent + (steps[pollingStep.key].pollProgress * 0.25);
        }
        return percent;
    };

    return (
        <>
            <style>{`
        @keyframes vm-spin-stop {
          0%   { transform: rotate(0deg); }
          65%  { transform: rotate(340deg); }
          78%  { transform: rotate(360deg); }
          92%  { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes vm-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .vm-slide-in { animation: vm-slide-up 0.32s ease both; }
        @keyframes vm-checkpop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          60%  { transform: scale(1.3) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        .vm-check-pop { animation: vm-checkpop 0.45s cubic-bezier(0.175,0.885,0.32,1.275) both; }
        @keyframes vm-fadein { from { opacity: 0; } to { opacity: 1; } }
        .vm-fade-in { animation: vm-fadein 0.4s ease both; }
        @keyframes vm-spin { to { transform: rotate(360deg); } }
        .vm-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          display: inline-block;
          animation: vm-spin 0.8s linear infinite;
        }
      `}</style>

            <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Overlay */}
                <div
                    style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="vm-fade-in" style={{
                    position: "relative", zIndex: 10, width: "100%", maxWidth: 620, margin: "0 16px",
                    maxHeight: "92vh", background: "#fff", borderRadius: 28,
                    boxShadow: "0 32px 80px rgba(0,0,0,0.22)", overflow: "hidden", display: "flex", flexDirection: "column",
                }}>

                    {/* Header */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "20px 28px", background: "linear-gradient(135deg, #4a3728 0%, #7a5c3e 100%)", flexShrink: 0,
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Shield style={{ width: 20, height: 20, color: "#fff" }} />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#fff" }}>Identity Verification</h2>
                                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>Complete all 4 steps to get verified</p>
                            </div>
                        </div>
                        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: "50%", lineHeight: 0 }}>
                            <X style={{ width: 20, height: 20, color: "#fff" }} />
                        </button>
                    </div>

                    {/* Progress strip */}
                    <div style={{ display: "flex", height: 6, background: "#e0d8cf", flexShrink: 0 }}>
                        {STEPS.map((s, i) => (
                            <div key={s.key} style={{
                                width: "25%", height: "100%",
                                backgroundColor: steps[s.key].verified ? "#22c55e" : "transparent",
                                transition: `background-color 0.7s ease ${i * 120}ms`,
                            }} />
                        ))}
                    </div>

                    {/* Body */}
                    <div style={{ overflowY: "auto", flex: 1, padding: "24px 28px" }}>

                        {/* Summary card */}
                        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, padding: 20, borderRadius: 20, background: "#fbf7f3", border: "2px solid #e0d8cf" }}>
                            <CircularProgress percent={Math.round(getDisplayPercent())} animating={animating} />

                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontWeight: 800, fontSize: 17, color: allVerified ? "#15803d" : "#4a3728" }}>
                                    {allVerified ? "🎉 All Steps Verified!" : `${verifiedCount} of 4 Steps Verified`}
                                </p>
                                <p style={{ margin: "4px 0 12px", fontSize: 13, color: "#8a7a6a" }}>
                                    {allVerified ? "Your profile is now fully verified and trusted." : "Complete each step below to get your verified badge."}
                                </p>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {STEPS.map((s) => (
                                        <div key={s.key} style={{
                                            display: "flex", alignItems: "center", gap: 6,
                                            padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                                            background: steps[s.key].verified ? "#dcfce7" : "#e0d8cf",
                                            color: steps[s.key].verified ? "#15803d" : "#8a7a6a",
                                            transition: "all 0.5s",
                                        }}>
                                            {steps[s.key].verified
                                                ? <CheckCircle className="vm-check-pop" style={{ width: 13, height: 13 }} />
                                                : <span style={{ width: 13, height: 13, borderRadius: "50%", border: "2px solid currentColor", display: "inline-block" }} />}
                                            {s.label.split(" ")[0]}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Steps */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {STEPS.map((step, idx) => {
                                const s = steps[step.key];
                                return (
                                    <div key={step.key} style={{
                                        borderRadius: 20, border: `2px solid ${s.verified ? "#86efac" : "#e0d8cf"}`,
                                        background: s.verified ? "#f0fdf4" : "#fff", overflow: "hidden", transition: "all 0.5s",
                                    }}>
                                        {/* Step header */}
                                        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px" }}>
                                            <div style={{
                                                width: 36, height: 36, borderRadius: 12, flexShrink: 0,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                background: s.verified ? "#22c55e" : "#4a3728", transition: "background 0.5s",
                                            }}>
                                                {s.verified
                                                    ? <CheckCircle className="vm-check-pop" style={{ width: 20, height: 20, color: "#fff" }} />
                                                    : <span style={{ color: "#fff", display: "flex" }}>{step.icon}</span>}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: s.verified ? "#15803d" : "#4a3728" }}>
                                                    Step {idx + 1}: {step.label}
                                                </p>
                                                <p style={{ margin: 0, fontSize: 12, color: "#8a7a6a" }}>{step.sublabel}</p>
                                            </div>
                                            {s.verified && (
                                                <span style={{ fontSize: 11, fontWeight: 700, color: "#15803d", background: "#dcfce7", padding: "4px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>

                                        {/* Step form */}
                                        {!s.verified && (
                                            <div className="vm-slide-in" style={{ padding: "0 20px 20px" }}>
                                                <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                                                    <div style={{ flex: 1 }}>
                                                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6, color: "#4a3728" }}>
                                                            {step.inputLabel}
                                                        </label>
                                                        <div style={{ display: "flex" }}>
                                                            {step.key === "phone" && (
                                                                <span style={{
                                                                    padding: "10px 12px", borderRadius: "12px 0 0 12px",
                                                                    border: "2px solid #e0d8cf", borderRight: "none",
                                                                    fontSize: 13, fontWeight: 800, background: "#f0ebe4", color: "#4a3728",
                                                                }}>
                                                                    +91
                                                                </span>
                                                            )}
                                                            <input
                                                                type={step.key === "email" || step.key === "professional" ? "email" : "text"}
                                                                inputMode={step.key === "phone" || step.key === "identity" ? "numeric" : undefined}
                                                                value={s.value}
                                                                onChange={(e) => handleValueChange(step.key, e.target.value)}
                                                                placeholder={step.placeholder}
                                                                disabled={s.otpSent}
                                                                style={{
                                                                    flex: 1, padding: "10px 14px", fontSize: 13, outline: "none",
                                                                    border: `2px solid ${s.error ? "#f87171" : "#e0d8cf"}`,
                                                                    borderRadius: step.key === "phone" ? "0 12px 12px 0" : 12,
                                                                    background: s.error ? "#fef2f2" : "#fbf7f3", color: "#4a3728",
                                                                    opacity: s.otpSent ? 0.6 : 1, cursor: s.otpSent ? "not-allowed" : "text",
                                                                    transition: "border-color 0.2s",
                                                                }}
                                                            />
                                                        </div>
                                                        {s.error && <p style={{ color: "#ef4444", fontSize: 11, margin: "4px 0 0" }}>{s.error}</p>}
                                                    </div>

                                                    {!s.otpSent ? (
                                                        <button
                                                            onClick={() => handleSendOtp(step.key)}
                                                            disabled={s.sending}
                                                            style={{
                                                                padding: "10px 18px", borderRadius: 12, background: "#4a3728",
                                                                color: "#fff", fontWeight: 700, fontSize: 13, border: "none",
                                                                cursor: s.sending ? "not-allowed" : "pointer", opacity: s.sending ? 0.7 : 1,
                                                                display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                                                                marginBottom: s.error ? 18 : 0, flexShrink: 0,
                                                            }}
                                                        >
                                                            {s.sending ? <><span className="vm-spinner" /> Sending</> : "Send OTP"}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={async () => {
                                                                try {
                                                                    if (step.key === "email") {
                                                                        await VerificationService.resendEmailOtp(steps[step.key].value);
                                                                    } else if (step.key === "phone") {
                                                                        await VerificationService.resendPhoneOtp(`+91${steps[step.key].value}`);
                                                                    }
                                                                    update(step.key, { otpSent: false, otp: "" });
                                                                    setTimeout(() => update(step.key, { otpSent: true }), 100);
                                                                } catch (e: any) {
                                                                    update(step.key, { error: e.message });
                                                                }
                                                            }}
                                                            style={{
                                                                padding: "10px 16px", borderRadius: 12, background: "transparent",
                                                                color: "#7a5c3e", fontWeight: 700, fontSize: 13,
                                                                border: "2px solid #e0d8cf", cursor: "pointer",
                                                                whiteSpace: "nowrap", marginBottom: s.error ? 18 : 0, flexShrink: 0,
                                                            }}
                                                        >
                                                            Resend
                                                        </button>
                                                    )}
                                                </div>

                                                {s.otpSent && (
                                                    <div className="vm-slide-in" style={{ marginTop: 16 }}>
                                                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 8, textAlign: "center", color: "#4a3728" }}>
                                                            Enter 6-digit OTP sent to your {step.key === "phone" ? "phone" : "email"}
                                                        </label>
                                                        <OtpInput
                                                            value={s.otp}
                                                            onChange={(v: string) => update(step.key, { otp: v, otpError: "" })}
                                                            error={s.otpError}
                                                        />
                                                        <button
                                                            onClick={() => handleVerify(step.key)}
                                                            disabled={s.otp.length < 6 || s.verifying}
                                                            style={{
                                                                marginTop: 14, width: "100%", padding: "12px", borderRadius: 14,
                                                                background: "linear-gradient(135deg, #4a3728 0%, #7a5c3e 100%)",
                                                                color: "#fff", fontWeight: 800, fontSize: 14, border: "none",
                                                                cursor: s.otp.length < 6 || s.verifying ? "not-allowed" : "pointer",
                                                                opacity: s.otp.length < 6 || s.verifying ? 0.55 : 1,
                                                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s",
                                                            }}
                                                        >
                                                            {s.verifying
                                                                ? <><span className="vm-spinner" /> Verifying...</>
                                                                : <>{`Verify ${step.label.split(" ")[0]}`} <ArrowRight style={{ width: 16, height: 16 }} /></>}
                                                        </button>
                                                    </div>
                                                )}
                                                {s.polling && (
                                                    <div style={{ padding: "12px 20px", textAlign: "center", color: "#7a5c3e", fontSize: 13 }}>
                                                        <span>⏳ Verifying... please wait</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* All verified CTA */}
                        {allVerified && (
                            <button
                                className="vm-slide-in"
                                onClick={onClose}
                                style={{
                                    marginTop: 20, width: "100%", padding: "16px", borderRadius: 20,
                                    background: "linear-gradient(135deg, #15803d 0%, #22c55e 100%)",
                                    color: "#fff", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                                    boxShadow: "0 8px 24px rgba(34,197,94,0.35)",
                                }}
                            >
                                <CheckCircle style={{ width: 24, height: 24 }} />
                                Continue as Verified Mentor
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerificationModal;
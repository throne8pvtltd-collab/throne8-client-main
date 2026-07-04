// CreateGroupModal.tsx - Next.js TypeScript Version
'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle,
  Download,
  Copy,
  Share2,
  Users,
  Target,
  Globe,
  Lock,
  Camera,
  CameraOff,
  QrCode,
  Link2,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks';
import {
  selectApiError,
  selectApiLoading,
  selectShareInviteLink,
  selectShareInviteLinkLoading,
  selectShareQRCode,
  selectShareQRCodeLoading,
  selectShareSocialLinks,
  selectShareSocialLinksLoading,
} from '@/hooks/studyGroup/features/groups/groupsSlice';
import { CreateGroupData, GroupCategory, GroupVisibility } from '@/lib/api/studyGroup.service';
<<<<<<< HEAD:src/components/modals/studyGroup/study/CreateGroupModal.tsx
import { createGroupSchema } from '@/lib/validations/studyGroup/group.validation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProfileData } from '@/hooks/data/useProfileData';
=======
import { createGroupSchema } from '@/features/study-group/validators/group.validation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProfileData } from '@/features/profile/hooks/useProfileData';
>>>>>>> ed5e7918466befd6e71595a48758cdf47a8b9a31:src/features/study-group/modals/CreateGroupModal.tsx
import { createGroupThunk } from '@/hooks/studyGroup/features/groups/group.thunks';
import {
  generateInviteLinkThunk,
  generateQRCodeThunk,
  fetchSocialShareLinksThunk,
} from '@/hooks/studyGroup/features/groups/group.thunks';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

type ModalStep = 'form' | 'success';
type Visibility = 'public' | 'private';

interface FormData {
  title: string;
  description: string;
  category: GroupCategory | '';
  visibility: GroupVisibility;
  capacity: number;
  goalHours: number;
  tags: string[];
  cameraOn: boolean;
  attendanceRequired: boolean;
  attendanceAvg: number;
}

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGroupCreated?: (formData: FormData, groupLink: string) => void;
}

// ==========================================
// COMPONENT
// ==========================================

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onGroupCreated,
}) => {
  const dispatch = useAppDispatch();

  // ==========================================
  // STATE
  // ==========================================

  const [step, setStep] = useState<ModalStep>('form');
  const [createdGroupId, setCreatedGroupId] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    visibility: GroupVisibility.PUBLIC,
    capacity: 20,
    goalHours: 8,
    tags: [],
    cameraOn: false,
    attendanceRequired: false,
    attendanceAvg: 75,
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [copiedQR, setCopiedQR] = useState<boolean>(false);
  const { user } = useAuth();
  const [error, setError] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [shareTab, setShareTab] = useState<'link' | 'qr' | 'social'>('link');

  // ==========================================
  // REDUX SELECTORS
  // ==========================================

  const isLoading = useAppSelector(selectApiLoading);
  const apiError = useAppSelector(selectApiError);

  // Share selectors
  const inviteLinkData = useAppSelector(selectShareInviteLink);
  const inviteLinkLoading = useAppSelector(selectShareInviteLinkLoading);
  const qrCodeData = useAppSelector(selectShareQRCode);
  const qrCodeLoading = useAppSelector(selectShareQRCodeLoading);
  const socialLinksData = useAppSelector(selectShareSocialLinks);
  const socialLinksLoading = useAppSelector(selectShareSocialLinksLoading);

  // Derived values — use real API data if available, fallback to empty string
  const inviteLink = inviteLinkData?.inviteLink ?? '';
  const inviteCode = inviteLinkData?.inviteCode ?? '';
  const qrCodeBase64 = qrCodeData?.qrCode ?? '';

  // ==========================================
  // CONSTANTS
  // ==========================================

  const categories = Object.values(GroupCategory);

  // ==========================================
  // EFFECTS
  // ==========================================

  // When step becomes 'success', trigger all 3 share APIs in parallel
  useEffect(() => {
    if (step === 'success' && createdGroupId) {
      // Generate invite link + QR + social links in parallel
      dispatch(generateInviteLinkThunk({ groupId: createdGroupId }));
      dispatch(generateQRCodeThunk(createdGroupId));
      dispatch(fetchSocialShareLinksThunk(createdGroupId));
    }
  }, [step, createdGroupId, dispatch]);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  const handleSubmit = async (): Promise<void> => {
    setError('');
    const result = createGroupSchema.safeParse({
      title: formData.title,
      description: formData.description,
      category: (formData.category || undefined) as GroupCategory | undefined,
      visibility: formData.visibility,
      capacity: formData.capacity,
      goalHours: formData.goalHours,
      tags: formData.tags,
    });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const response = await dispatch(
      createGroupThunk({
        ...result.data,
        cameraRequired: formData.cameraOn,
        attendanceRequired: formData.attendanceRequired,
        minAttendancePercent: formData.attendanceRequired ? formData.attendanceAvg : undefined,
      } as CreateGroupData)
    );

    if (createGroupThunk.fulfilled.match(response)) {
      const group = response.payload;
      setCreatedGroupId(group.groupId); // save groupId for share APIs
      setStep('success');
      if (onGroupCreated) onGroupCreated(formData, ''); // link will come async
    }
  };

  const handleAddTag = (): void => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string): void => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleCopyLink = async (): Promise<void> => {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Failed to copy. Please copy manually.');
    }
  };

  const handleDownloadQR = (): void => {
    if (!qrCodeBase64) return;
    const link = document.createElement('a');
    link.href = qrCodeBase64;
    link.download = `${formData.title.replace(/\s+/g, '_')}_QR.png`;
    link.click();
  };

  const handleCopyQRLink = async (): Promise<void> => {
    if (!qrCodeData?.inviteLink) return;
    try {
      await navigator.clipboard.writeText(qrCodeData.inviteLink);
      setCopiedQR(true);
      setTimeout(() => setCopiedQR(false), 2000);
    } catch {
      alert('Failed to copy. Please copy manually.');
    }
  };

  const handleRegenerateLink = (): void => {
    if (!createdGroupId) return;
    dispatch(generateInviteLinkThunk({ groupId: createdGroupId }));
  };

  const handleClose = (): void => {
    setStep('form');
    setCreatedGroupId('');
    setFormData({
      title: '',
      description: '',
      category: '',
      visibility: GroupVisibility.PUBLIC,
      capacity: 20,
      goalHours: 8,
      tags: [],
      cameraOn: false,
      attendanceRequired: false,
      attendanceAvg: 75,
    });
    setError('');
    setShareTab('link');
    onClose();
  };

  // ==========================================
  // INPUT HANDLERS
  // ==========================================

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, title: e.target.value });

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFormData({ ...formData, description: e.target.value });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFormData({ ...formData, category: e.target.value as GroupCategory });

  const handleGoalHoursChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, goalHours: parseInt(e.target.value) || 8 });

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, capacity: parseInt(e.target.value) || 20 });

  const handleAttendanceAvgChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, attendanceAvg: parseInt(e.target.value) });

  const toggleVisibility = (visibility: GroupVisibility) =>
    setFormData({ ...formData, visibility });

  const toggleCameraOn = () =>
    setFormData({ ...formData, cameraOn: !formData.cameraOn });

  const toggleAttendanceRequired = () =>
    setFormData({ ...formData, attendanceRequired: !formData.attendanceRequired });

  // ==========================================
  // PROFILE
  // ==========================================

  const { userProfileData, fetchUserProfile } = useProfileData();

  useEffect(() => {
    if (user) fetchUserProfile();
  }, [user, fetchUserProfile]);

  const leaderName = userProfileData
    ? `${userProfileData.firstName} ${userProfileData.lastName}`.trim()
    : 'Loading...';

  if (!isOpen) return null;

  // ==========================================
  // SUCCESS SCREEN
  // ==========================================

  if (step === 'success') {
    const isShareLoading = inviteLinkLoading || qrCodeLoading || socialLinksLoading;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#4a3728]">Group Created!</h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Success Icon */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#4a3728]">
                "{formData.title}" is now live!
              </h3>
              <p className="text-xs text-[#6b5847]">Share with your friends to get them in</p>
            </div>

            {/* Share Tabs */}
            <div className="flex bg-[#f6ede8] rounded-xl p-1 gap-1">
              {(['link', 'qr', 'social'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setShareTab(tab)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all capitalize ${
                    shareTab === tab
                      ? 'bg-white text-[#4a3728] shadow-sm'
                      : 'text-[#6b5847] hover:text-[#4a3728]'
                  }`}
                >
                  {tab === 'link' && '🔗 Link'}
                  {tab === 'qr' && '📱 QR Code'}
                  {tab === 'social' && '📣 Social'}
                </button>
              ))}
            </div>

            {/* ── TAB: INVITE LINK ── */}
            {shareTab === 'link' && (
              <div className="space-y-3">
                <div className="bg-[#f6ede8] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link2 size={16} className="text-[#4a3728]" />
                      <p className="text-sm font-semibold text-[#4a3728]">Invite Link</p>
                    </div>
                    <button
                      onClick={handleRegenerateLink}
                      disabled={inviteLinkLoading}
                      className="flex items-center gap-1 text-xs text-[#8b7355] hover:text-[#4a3728] disabled:opacity-50"
                    >
                      <RefreshCw size={12} className={inviteLinkLoading ? 'animate-spin' : ''} />
                      Regenerate
                    </button>
                  </div>

                  {inviteLinkLoading ? (
                    <div className="flex items-center justify-center py-4 gap-2">
                      <Loader2 size={18} className="animate-spin text-[#8b7355]" />
                      <span className="text-sm text-[#6b5847]">Generating link...</span>
                    </div>
                  ) : inviteLink ? (
                    <>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inviteLink}
                          readOnly
                          className="flex-1 px-3 py-2 border-2 border-[#e0d8cf] rounded-lg bg-white text-[#4a3728] font-mono text-xs"
                        />
                        <button
                          onClick={handleCopyLink}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1 ${
                            copied
                              ? 'bg-green-500 text-white'
                              : 'bg-[#8b7355] text-white hover:bg-[#6b5847]'
                          }`}
                        >
                          {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>

                      {/* Invite code badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#6b5847]">Invite Code:</span>
                        <span className="bg-white border border-[#e0d8cf] text-[#4a3728] font-mono text-xs px-2 py-1 rounded-lg font-bold tracking-widest">
                          {inviteCode}
                        </span>
                      </div>

                      {/* Expiry info */}
                      {inviteLinkData?.expiresAt && (
                        <p className="text-xs text-orange-500">
                          ⏰ Expires: {new Date(inviteLinkData.expiresAt).toLocaleDateString()}
                        </p>
                      )}
                      {!inviteLinkData?.expiresAt && (
                        <p className="text-xs text-green-600">✅ Never expires</p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-red-500 text-center py-2">
                      Failed to generate link.{' '}
                      <button
                        onClick={handleRegenerateLink}
                        className="underline text-[#8b7355]"
                      >
                        Retry
                      </button>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ── TAB: QR CODE ── */}
            {shareTab === 'qr' && (
              <div className="bg-gradient-to-br from-[#f6ede8] to-[#e0d8cf] rounded-xl p-4 text-center space-y-3">
                <p className="text-sm font-semibold text-[#4a3728]">Scan to Join</p>

                {qrCodeLoading ? (
                  <div className="flex flex-col items-center justify-center py-6 gap-2">
                    <Loader2 size={24} className="animate-spin text-[#8b7355]" />
                    <span className="text-sm text-[#6b5847]">Generating QR code...</span>
                  </div>
                ) : qrCodeBase64 ? (
                  <>
                    {/* Real QR Code image from API */}
                    <div className="bg-white w-40 h-40 mx-auto rounded-xl shadow-md flex items-center justify-center p-2">
                      <img
                        src={qrCodeBase64}
                        alt="Group invite QR code"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* QR invite link */}
                    {qrCodeData?.inviteLink && (
                      <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-[#e0d8cf]">
                        <span className="text-xs font-mono text-[#4a3728] flex-1 truncate">
                          {qrCodeData.inviteLink}
                        </span>
                        <button
                          onClick={handleCopyQRLink}
                          className="text-[#8b7355] hover:text-[#4a3728] flex-shrink-0"
                        >
                          {copiedQR ? <CheckCircle size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    )}

                    <button
                      onClick={handleDownloadQR}
                      className="bg-[#4a3728] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#6b5847] transition-all flex items-center gap-2 mx-auto"
                    >
                      <Download size={16} />
                      Download QR
                    </button>
                  </>
                ) : (
                  <div className="py-4 space-y-2">
                    <QrCode size={48} className="mx-auto text-[#c4b5a5]" />
                    <p className="text-sm text-red-500">
                      Failed to generate QR.{' '}
                      <button
                        onClick={() => dispatch(generateQRCodeThunk(createdGroupId))}
                        className="underline text-[#8b7355]"
                      >
                        Retry
                      </button>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── TAB: SOCIAL SHARE ── */}
            {shareTab === 'social' && (
              <div className="space-y-3">
                {socialLinksLoading ? (
                  <div className="flex items-center justify-center py-6 gap-2">
                    <Loader2 size={20} className="animate-spin text-[#8b7355]" />
                    <span className="text-sm text-[#6b5847]">Loading share links...</span>
                  </div>
                ) : socialLinksData?.socialLinks ? (
                  <>
                    <p className="text-sm font-semibold text-[#4a3728]">Share on</p>
                    <div className="grid grid-cols-2 gap-2">
                      {/* WhatsApp */}
                      <button
                        onClick={() =>
                          window.open(socialLinksData.socialLinks.whatsapp, '_blank')
                        }
                        className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                      >
                        <Share2 size={16} />
                        WhatsApp
                      </button>

                      {/* Telegram */}
                      <button
                        onClick={() =>
                          window.open(socialLinksData.socialLinks.telegram, '_blank')
                        }
                        className="flex items-center gap-2 bg-[#0088cc] text-white px-4 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                      >
                        <Share2 size={16} />
                        Telegram
                      </button>

                      {/* Twitter */}
                      <button
                        onClick={() =>
                          window.open(socialLinksData.socialLinks.twitter, '_blank')
                        }
                        className="flex items-center gap-2 bg-[#1DA1F2] text-white px-4 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                      >
                        <Share2 size={16} />
                        Twitter / X
                      </button>

                      {/* Facebook */}
                      <button
                        onClick={() =>
                          window.open(socialLinksData.socialLinks.facebook, '_blank')
                        }
                        className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                      >
                        <Share2 size={16} />
                        Facebook
                      </button>
                    </div>

                    {/* Direct invite link below social buttons */}
                    {socialLinksData.inviteLink && (
                      <div className="mt-2 bg-[#f6ede8] rounded-xl p-3">
                        <p className="text-xs text-[#6b5847] mb-1">Or copy the link directly:</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={socialLinksData.inviteLink}
                            readOnly
                            className="flex-1 px-2 py-1.5 border border-[#e0d8cf] rounded-lg bg-white text-[#4a3728] font-mono text-xs"
                          />
                          <button
                            onClick={async () => {
                              await navigator.clipboard.writeText(socialLinksData.inviteLink);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className="px-3 py-1.5 bg-[#8b7355] text-white rounded-lg text-xs font-semibold hover:bg-[#6b5847]"
                          >
                            {copied ? '✓' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4">
                    {/* Fallback: use invite link if social API failed */}
                    {inviteLink ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() =>
                            window.open(
                              `https://wa.me/?text=${encodeURIComponent(
                                `Join my study group "${formData.title}"! ${inviteLink}`
                              )}`,
                              '_blank'
                            )
                          }
                          className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-xl text-sm font-semibold hover:opacity-90"
                        >
                          <Share2 size={16} /> WhatsApp
                        </button>
                        <button
                          onClick={() =>
                            window.open(
                              `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}`,
                              '_blank'
                            )
                          }
                          className="flex items-center gap-2 bg-[#0088cc] text-white px-4 py-3 rounded-xl text-sm font-semibold hover:opacity-90"
                        >
                          <Share2 size={16} /> Telegram
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-red-500">
                        Failed to load social links.{' '}
                        <button
                          onClick={() => dispatch(fetchSocialShareLinksThunk(createdGroupId))}
                          className="underline text-[#8b7355]"
                        >
                          Retry
                        </button>
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Group Details Summary — always visible */}
            <div className="bg-[#f6ede8] rounded-xl p-4 space-y-2">
              <p className="text-sm font-bold text-[#4a3728]">Group Details</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#6b5847]">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{formData.capacity} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target size={14} />
                  <span>{formData.goalHours}h/day</span>
                </div>
                <div className="flex items-center gap-1">
                  {formData.visibility === GroupVisibility.PUBLIC ? (
                    <Globe size={14} />
                  ) : (
                    <Lock size={14} />
                  )}
                  <span>{formData.visibility === GroupVisibility.PUBLIC ? 'Public' : 'Private'}</span>
                </div>
                <div className="flex items-center gap-1">
                  {formData.cameraOn ? <Camera size={14} /> : <CameraOff size={14} />}
                  <span>Camera {formData.cameraOn ? 'Required' : 'Optional'}</span>
                </div>
                {formData.category && (
                  <div className="col-span-2 flex items-center gap-1">
                    <Target size={14} />
                    <span>{formData.category}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setStep('form');
                  setCreatedGroupId('');
                }}
                className="flex-1 px-4 py-2 border-2 border-[#4a3728] text-[#4a3728] rounded-lg font-semibold text-sm hover:bg-[#f6ede8] transition-all"
              >
                Create Another
              </button>
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-[#8b7355] text-white rounded-lg font-semibold text-sm hover:bg-[#6b5847] transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FORM SCREEN (unchanged from your original)
  // ==========================================

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#4a3728]">Create Study Group</h2>
            <p className="text-sm text-[#6b5847]">Set up your study group</p>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Group Title */}
          <div>
            <label className="block text-xs font-semibold text-[#4a3728] mb-1">
              Group Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g., Focus JEE Warriors"
              className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none text-sm text-[#4a3728] placeholder-[#c4b5a5]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#4a3728] mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="E.g., Daily 6AM-8AM study sessions. Rules: Camera on, no phone."
              rows={2}
              className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none text-sm resize-none text-[#4a3728] placeholder-[#c4b5a5]"
            />
            <p className="mt-1 text-xs text-blue-600">
              <span className="font-semibold">💡 Tip:</span> Mention group rules, target audience,
              active times, prerequisites & study goals
            </p>
          </div>

          {/* Category and Leader */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4a3728] mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728] font-medium bg-white"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a3728] mb-1">Leader</label>
              <input
                type="text"
                value={leaderName || 'Loading...'}
                readOnly
                className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg bg-[#f0ebe7] text-[#6b5847] text-sm cursor-not-allowed"
              />
              <p className="text-xs text-[#6b5847] mt-1">You are the group leader</p>
            </div>
          </div>

          {/* Goal Hours and Capacity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4a3728] mb-1">
                Daily Goal (hrs)
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={formData.goalHours}
                onChange={handleGoalHoursChange}
                className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4a3728] mb-1">Capacity</label>
              <input
                type="number"
                min="5"
                max="100"
                value={formData.capacity}
                onChange={handleCapacityChange}
                className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728]"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-[#4a3728] mb-1">
              Tags (max 10)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="e.g. biology, neet"
                className="flex-1 px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728] placeholder-[#c4b5a5]"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-[#8b7355] text-white rounded-lg text-sm font-semibold hover:bg-[#6b5847]"
              >
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-[#e0d8cf] text-[#4a3728] px-2 py-1 rounded-full text-xs"
                  >
                    #{tag}
                    <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-xs font-semibold text-[#4a3728] mb-2">Visibility</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toggleVisibility(GroupVisibility.PUBLIC)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.visibility === GroupVisibility.PUBLIC
                    ? 'border-[#8b7355] bg-[#8b7355]/10'
                    : 'border-[#e0d8cf] hover:border-[#8b7355]/50'
                }`}
              >
                <Globe className="w-5 h-5 mx-auto mb-1 text-[#4a3728]" />
                <div className="text-sm font-semibold text-[#4a3728]">Public</div>
              </button>
              <button
                type="button"
                onClick={() => toggleVisibility(GroupVisibility.PRIVATE)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.visibility === GroupVisibility.PRIVATE
                    ? 'border-[#8b7355] bg-[#8b7355]/10'
                    : 'border-[#e0d8cf] hover:border-[#8b7355]/50'
                }`}
              >
                <Lock className="w-5 h-5 mx-auto mb-1 text-[#4a3728]" />
                <div className="text-sm font-semibold text-[#4a3728]">Private</div>
              </button>
            </div>
          </div>

          {/* Settings Toggles */}
          <div className="space-y-2">
            {/* Camera Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#f6ede8] rounded-lg">
              <div className="flex items-center gap-2">
                <Camera className="text-[#4a3728]" size={16} />
                <div>
                  <div className="text-sm font-semibold text-[#4a3728]">Camera Required</div>
                  <div className="text-xs text-[#6b5847]">Must turn on camera</div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleCameraOn}
                className={`w-11 h-6 rounded-full transition-all ${
                  formData.cameraOn ? 'bg-[#8b7355]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-all ${
                    formData.cameraOn ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Attendance Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#f6ede8] rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-[#4a3728]" size={16} />
                <div>
                  <div className="text-sm font-semibold text-[#4a3728]">Attendance Required</div>
                  <div className="text-xs text-[#6b5847]">Track attendance</div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleAttendanceRequired}
                className={`w-11 h-6 rounded-full transition-all ${
                  formData.attendanceRequired ? 'bg-[#8b7355]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-all ${
                    formData.attendanceRequired ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Attendance Percentage */}
            {formData.attendanceRequired && (
              <div className="pl-3">
                <label className="block text-xs font-semibold text-[#4a3728] mb-1">
                  Minimum Attendance (%)
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={formData.attendanceAvg}
                  onChange={handleAttendanceAvgChange}
                  className="w-full"
                />
                <div className="text-center text-xl font-bold text-[#4a3728] mt-1">
                  {formData.attendanceAvg}%
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {(error || apiError) && (
            <p className="text-red-500 text-xs mt-1">{error || apiError}</p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Create Study Group'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
export type { FormData, CreateGroupModalProps, ModalStep, Visibility };



// 'use client';  // Required for useState and browser APIs in Next.js 13+

// import React, { useEffect, useState } from 'react';
// import {
//   X,
//   CheckCircle,
//   Download,
//   Copy,
//   Share2,
//   Users,
//   Target,
//   Globe,
//   Lock,
//   Camera,
//   CameraOff
// } from 'lucide-react';
// import { useAppDispatch } from '@/store/hooks';
// import {  selectApiError, selectApiLoading } from '@/hooks/studyGroup/features/groups/groupsSlice';

// import {  CreateGroupData, GroupCategory, GroupVisibility } from '@/lib/api/studyGroup.service';
// import { createGroupSchema,  } from '@/lib/validations/studyGroup/group.validation';
// import { useAuth } from '@/features/auth/hooks/useAuth';
// import { useProfileData } from '@/hooks/data/useProfileData';
// import { useAppSelector } from '@/core/store/store.hooks';
// import { createGroupThunk } from '@/hooks/studyGroup/features/groups/group.thunks';

// // ==========================================
// // TYPE DEFINITIONS
// // ==========================================

// // Step type - only two possible values
// type ModalStep = 'form' | 'success';

// // Visibility type - union of literal types
// type Visibility = 'public' | 'private';

// // Form data structure
// interface FormData {
//   title: string;
//   description: string;
//   category: GroupCategory | '';   // ← use enum
//   visibility: GroupVisibility;    // ← use enum
//   capacity: number;
//   goalHours: number;
//   tags: string[];                 // ← add tags
//   cameraOn: boolean;
//   attendanceRequired: boolean;
//   attendanceAvg: number;
// }

// // Component props
// interface CreateGroupModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onGroupCreated?: (formData: FormData, groupLink: string) => void;  // Optional callback
// }

// // ==========================================
// // COMPONENT
// // ==========================================

// const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
//   isOpen,
//   onClose,
//   onGroupCreated
// }) => {

//   //redux set

//   const dispatch = useAppDispatch();


//   // ==========================================
//   // STATE - All properly typed
//   // ==========================================

//   const [step, setStep] = useState<ModalStep>('form');
//   const [formData, setFormData] = useState<FormData>({
//     title: '',
//     description: '',
//     category: '',
//     visibility: GroupVisibility.PUBLIC,
//     capacity: 20,
//     goalHours: 8,
//     tags: [],
//     cameraOn: false,
//     attendanceRequired: false,
//     attendanceAvg: 75,
//   });

//   const [groupLink, setGroupLink] = useState<string>('');
//   const [copied, setCopied] = useState<boolean>(false);
//   const { user } = useAuth();
//   // const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const isLoading = useAppSelector(selectApiLoading);
//   const apiError = useAppSelector(selectApiError);
//   const [tagInput, setTagInput] = useState<string>('');

//   // ==========================================
//   // CONSTANTS
//   // ==========================================

//   const categories = Object.values(GroupCategory);
//   // This gives: ['JEE', 'NEET', 'Competitive Examinations', 'College Students', ...]

//   // ==========================================
//   // HELPER FUNCTIONS
//   // ==========================================

//   // Generate a random group link
//   const generateGroupLink = (): string => {
//     const randomId = Math.random().toString(36).substr(2, 9);
//     return `https://throne8.app/join/${randomId}`;
//   };

//   // ==========================================
//   // EVENT HANDLERS - All typed
//   // ==========================================

//   const handleSubmit = async (): Promise<void> => {
//     const result = createGroupSchema.safeParse({
//       title: formData.title as string,
//       description: formData.description as string,
//       category: (formData.category || undefined) as GroupCategory | undefined,
//       visibility: formData.visibility as GroupVisibility,
//       capacity: formData.capacity as number,
//       goalHours: formData.goalHours as number,
//       tags: formData.tags as string[],
//     });

//     if (!result.success) {
//       setError(result.error.errors[0].message);
//       return;
//     }

//     const response = await dispatch(createGroupThunk({
//         ...result.data,
//         cameraRequired: formData.cameraOn,           // your existing cameraOn → cameraRequired
//         attendanceRequired: formData.attendanceRequired,
//         minAttendancePercent: formData.attendanceRequired ? formData.attendanceAvg : undefined,
//       } as CreateGroupData));

//     if (createGroupThunk.fulfilled.match(response)) {
//       const group = response.payload;
//       setGroupLink(`https://throne8.app/join/${group.joinCode || group.groupId}`);
//       setStep('success');
//       if (onGroupCreated) onGroupCreated(formData, groupLink);
//     }
//     // rejected case is handled automatically by Redux → apiError selector
//   };

//   const handleAddTag = (): void => {
//     const tag = tagInput.trim().toLowerCase();
//     if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
//       setFormData({ ...formData, tags: [...formData.tags, tag] });
//       setTagInput('');
//     }
//   };

//   const handleRemoveTag = (tag: string): void => {
//     setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
//   };

//   const handleCopyLink = async (): Promise<void> => {
//     try {
//       await navigator.clipboard.writeText(groupLink);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (error) {
//       console.error('Failed to copy link:', error);
//       alert('Failed to copy link. Please copy manually.');
//     }
//   };

//   const handleClose = (): void => {
//     setStep('form');
//     setFormData({
//       title: '',
//       description: '',
//       category: '',
//       visibility: GroupVisibility.PUBLIC,
//       capacity: 20,
//       goalHours: 8,
//       tags: [],
//       cameraOn: false,
//       attendanceRequired: false,
//       attendanceAvg: 75,
//     });
//     setError('');
//     onClose();
//   };

//   // ==========================================
//   // INPUT CHANGE HANDLERS - Typed events
//   // ==========================================

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setFormData({ ...formData, title: e.target.value });
//   };

//   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
//     setFormData({ ...formData, description: e.target.value });
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
//     setFormData({ ...formData, category: e.target.value as GroupCategory });
//   };

//   // const handleLeaderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//   //   setFormData({ ...formData, leader: e.target.value });
//   // };

//   const handleGoalHoursChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setFormData({ ...formData, goalHours: parseInt(e.target.value) || 8 });
//   };

//   const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setFormData({ ...formData, capacity: parseInt(e.target.value) || 20 });
//   };

//   const handleAttendanceAvgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setFormData({ ...formData, attendanceAvg: parseInt(e.target.value) });
//   };

//   const toggleVisibility = (visibility: GroupVisibility): void => {
//     setFormData({ ...formData, visibility });
//   };

//   const toggleCameraOn = (): void => {
//     setFormData({ ...formData, cameraOn: !formData.cameraOn });
//   };

//   const toggleAttendanceRequired = (): void => {
//     setFormData({ ...formData, attendanceRequired: !formData.attendanceRequired });
//   };


//   // Inside CreateGroupModal
//   const { userProfileData, fetchUserProfile } = useProfileData();

//   useEffect(() => {
//     if (user) fetchUserProfile();
//   }, [user, fetchUserProfile]);

//   const leaderName = userProfileData
//     ? `${userProfileData.firstName} ${userProfileData.lastName}`.trim()
//     : 'Loading...';
//   // console.log("leader name ", leaderName)

//   // Early return if modal is closed
//   if (!isOpen) return null;

//   // ==========================================
//   // SUCCESS SCREEN
//   // ==========================================

//   if (step === 'success') {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
//           {/* Header */}
//           <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
//             <h2 className="text-xl font-bold text-[#4a3728]">Group Created!</h2>
//             <button
//               onClick={handleClose}
//               className="text-gray-400 hover:text-gray-600"
//               aria-label="Close modal"
//             >
//               <X size={24} />
//             </button>
//           </div>

//           <div className="p-4 space-y-3">
//             {/* Success Icon */}
//             <div className="text-center space-y-3">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
//                 <CheckCircle className="w-10 h-10 text-white" />
//               </div>
//               <h3 className="text-lg font-bold text-[#4a3728]">
//                 "{formData.title}" is now live!
//               </h3>
//             </div>

//             {/* QR Code Section */}
//             <div className="bg-gradient-to-br from-[#f6ede8] to-[#e0d8cf] rounded-xl p-4 text-center space-y-3">
//               <p className="text-sm font-semibold text-[#4a3728]">Scan to Join</p>
//               <div className="bg-white w-32 h-32 mx-auto rounded-lg shadow-md flex items-center justify-center">
//                 <div className="w-28 h-28 bg-gradient-to-br from-[#4a3728] to-[#6b5847] opacity-20 rounded-md flex items-center justify-center">
//                   <span className="text-xs text-[#4a3728] font-mono">QR Code</span>
//                 </div>
//               </div>
//               <button
//                 className="bg-[#4a3728] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#6b5847] transition-all flex items-center gap-2 mx-auto"
//                 onClick={() => console.log('Download QR code')}
//               >
//                 <Download size={16} />
//                 Download
//               </button>
//             </div>

//             {/* Share Link */}
//             <div className="space-y-2">
//               <p className="text-sm font-semibold text-[#4a3728]">Share Link</p>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={groupLink}
//                   readOnly
//                   className="flex-1 px-3 py-2 border-2 border-[#e0d8cf] rounded-lg bg-[#f6ede8] text-[#4a3728] font-mono text-xs"
//                   aria-label="Group link"
//                 />
//                 <button
//                   onClick={handleCopyLink}
//                   className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1 ${copied
//                     ? 'bg-green-500 text-white'
//                     : 'bg-[#8b7355] text-white hover:bg-[#6b5847]'
//                     }`}
//                 >
//                   {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
//                   {copied ? 'Copied!' : 'Copy'}
//                 </button>
//               </div>
//             </div>

//             {/* Social Share Buttons */}
//             <div className="grid grid-cols-3 gap-2">
//               <button
//                 className="bg-[#25D366] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1"
//                 onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(groupLink)}`, '_blank')}
//               >
//                 <Share2 size={14} />
//                 WhatsApp
//               </button>
//               <button
//                 className="bg-[#0088cc] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1"
//                 onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(groupLink)}`, '_blank')}
//               >
//                 <Share2 size={14} />
//                 Telegram
//               </button>
//               <button
//                 className="bg-[#1DA1F2] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1"
//                 onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(groupLink)}`, '_blank')}
//               >
//                 <Share2 size={14} />
//                 Twitter
//               </button>
//             </div>

//             {/* Group Details Summary */}
//             <div className="bg-[#f6ede8] rounded-xl p-4 space-y-2">
//               <p className="text-sm font-bold text-[#4a3728]">Group Details</p>
//               <div className="grid grid-cols-2 gap-2 text-xs text-[#6b5847]">
//                 <div className="flex items-center gap-1">
//                   <Users size={14} />
//                   <span>{formData.capacity} members</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Target size={14} />
//                   <span>{formData.goalHours}h/day</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   {formData.visibility === 'public' ? <Globe size={14} /> : <Lock size={14} />}
//                   <span>{formData.visibility === 'public' ? 'Public' : 'Private'}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   {formData.cameraOn ? <Camera size={14} /> : <CameraOff size={14} />}
//                   <span>Camera {formData.cameraOn ? 'On' : 'Off'}</span>

//                   <div className="grid grid-cols-2 gap-2 text-xs text-[#6b5847]">
//                     <div className="flex items-center gap-1">
//                       <Users size={14} />
//                       <span>{formData.capacity} members</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Target size={14} />
//                       <span>{formData.goalHours}h/day</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       {formData.visibility === GroupVisibility.PUBLIC ? <Globe size={14} /> : <Lock size={14} />}
//                       <span>{formData.visibility === GroupVisibility.PUBLIC ? 'Public' : 'Private'}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Target size={14} />
//                       <span>{formData.category}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setStep('form')}
//                 className="flex-1 px-4 py-2 border-2 border-[#4a3728] text-[#4a3728] rounded-lg font-semibold text-sm hover:bg-[#f6ede8] transition-all"
//               >
//                 Create Another
//               </button>
//               <button
//                 onClick={handleClose}
//                 className="flex-1 px-4 py-2 bg-[#8b7355] text-white rounded-lg font-semibold text-sm hover:bg-[#6b5847] transition-all"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ==========================================
//   // FORM SCREEN
//   // ==========================================

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-bold text-[#4a3728]">Create Study Group</h2>
//             <p className="text-sm text-[#6b5847]">Set up your study group</p>
//           </div>
//           <button
//             onClick={handleClose}
//             className="text-gray-400 hover:text-gray-600"
//             aria-label="Close modal"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-6 space-y-4">
//           {/* Group Title */}
//           <div>
//             <label className="block text-xs font-semibold text-[#4a3728] mb-1">
//               Group Title *
//             </label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={handleTitleChange}
//               placeholder="e.g., Focus JEE Warriors"
//               className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none text-sm text-[#4a3728] placeholder-[#c4b5a5]"
//               // className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none text-sm"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-xs font-semibold text-[#4a3728] mb-1">
//               Description *
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={handleDescriptionChange}
//               placeholder="E.g., Daily 6AM-8AM study sessions. Rules: Camera on, no phone. For serious JEE aspirants with Class 11 Physics/Maths completed. Active study + doubt clearing."
//               rows={2}
//               className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none text-sm resize-none text-[#4a3728] placeholder-[#c4b5a5]"
//               required
//             />
//             <p className="mt-1 text-xs text-blue-600">
//               <span className="font-semibold">💡 Tip:</span> Mention group rules, target audience, active times, prerequisites & study goals
//             </p>
//           </div>

//           {/* Category and Leader */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-semibold text-[#4a3728] mb-1">
//                 Category *
//               </label>
//               <select
//                 value={formData.category}
//                 onChange={handleCategoryChange}
//                 className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728] font-medium bg-white"
//                 required
//               >
//                 <option value="" className="text-gray-400">Select category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat} className="text-[#4a3728] font-medium">{cat}</option>
//                 ))}
//               </select>
//             </div>


//             <div>
//               <label className="block text-xs font-semibold text-[#4a3728] mb-1">
//                 Leader
//               </label>
//               <input
//                 type="text"
//                 value={leaderName ? leaderName : 'Loading...'}
//                 readOnly
//                 className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg bg-[#f0ebe7] text-[#6b5847] text-sm cursor-not-allowed"
//               />
//               <p className="text-xs text-[#6b5847] mt-1">You are the group leader</p>
//             </div>
//           </div>

//           {/* Goal Hours and Capacity */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-semibold text-[#4a3728] mb-1">
//                 Daily Goal (hrs)
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 max="24"
//                 value={formData.goalHours}
//                 onChange={handleGoalHoursChange}
//                 className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728]"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-[#4a3728] mb-1">
//                 Capacity
//               </label>
//               <input
//                 type="number"
//                 min="5"
//                 max="100"
//                 value={formData.capacity}
//                 onChange={handleCapacityChange}
//                 className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728]"
//               />
//             </div>


//           </div>

//           {/* Tags */}
//           <div>
//             <label className="block text-xs font-semibold text-[#4a3728] mb-1">
//               Tags (max 10)
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
//                 placeholder="e.g. biology, neet"
//                 className="flex-1 px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm text-[#4a3728] placeholder-[#c4b5a5]"
//               />
//               <button type="button" onClick={handleAddTag}
//                 className="px-3 py-2 bg-[#8b7355] text-white rounded-lg text-sm font-semibold hover:bg-[#6b5847]">
//                 Add
//               </button>
//             </div>
//             {formData.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {formData.tags.map(tag => (
//                   <span key={tag} className="flex items-center gap-1 bg-[#e0d8cf] text-[#4a3728] px-2 py-1 rounded-full text-xs">
//                     #{tag}
//                     <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500">
//                       <X size={12} />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Visibility Toggle */}
//           <div>
//             <label className="block text-xs font-semibold text-[#4a3728] mb-2">
//               Visibility
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => toggleVisibility(GroupVisibility.PUBLIC)}
//                 className={`p-3 rounded-lg border-2 transition-all ${formData.visibility === 'public'
//                   ? 'border-[#8b7355] bg-[#8b7355]/10'
//                   : 'border-[#e0d8cf] hover:border-[#8b7355]/50'
//                   }`}
//               >
//                 <Globe className="w-5 h-5 mx-auto mb-1 text-[#4a3728]" />
//                 <div className="text-sm font-semibold text-[#4a3728]">Public</div>
//               </button>

//               <button
//                 type="button"
//                 onClick={() => toggleVisibility(GroupVisibility.PRIVATE)}
//                 className={`p-3 rounded-lg border-2 transition-all ${formData.visibility === 'private'
//                   ? 'border-[#8b7355] bg-[#8b7355]/10'
//                   : 'border-[#e0d8cf] hover:border-[#8b7355]/50'
//                   }`}
//               >
//                 <Lock className="w-5 h-5 mx-auto mb-1 text-[#4a3728]" />
//                 <div className="text-sm font-semibold text-[#4a3728]">Private</div>
//               </button>
//             </div>
//           </div>

//           {/* Settings Toggles */}
//           <div className="space-y-2"> *
//             {/* Camera Toggle */}
//             <div className="flex items-center justify-between p-3 bg-[#f6ede8] rounded-lg">
//               <div className="flex items-center gap-2">
//                 <Camera className="text-[#4a3728]" size={16} />
//                 <div>
//                   <div className="text-sm font-semibold text-[#4a3728]">
//                     Camera Required
//                   </div>
//                   <div className="text-xs text-[#6b5847]">Must turn on camera</div>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={toggleCameraOn}
//                 className={`w-11 h-6 rounded-full transition-all ${formData.cameraOn ? 'bg-[#8b7355]' : 'bg-gray-300'
//                   }`}
//                 aria-label="Toggle camera requirement"
//               >
//                 <div className={`w-4 h-4 bg-white rounded-full transition-all ${formData.cameraOn ? 'translate-x-6' : 'translate-x-1'
//                   }`} />
//               </button>
//             </div>

//             {/* Attendance Toggle */}
//             <div className="flex items-center justify-between p-3 bg-[#f6ede8] rounded-lg">
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="text-[#4a3728]" size={16} />
//                 <div>
//                   <div className="text-sm font-semibold text-[#4a3728]">
//                     Attendance Required
//                   </div>
//                   <div className="text-xs text-[#6b5847]">Track attendance</div>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={toggleAttendanceRequired}
//                 className={`w-11 h-6 rounded-full transition-all ${formData.attendanceRequired ? 'bg-[#8b7355]' : 'bg-gray-300'
//                   }`}
//                 aria-label="Toggle attendance requirement"
//               >
//                 <div className={`w-4 h-4 bg-white rounded-full transition-all ${formData.attendanceRequired ? 'translate-x-6' : 'translate-x-1'
//                   }`} />
//               </button>
//             </div>

//             {/* Attendance Percentage (conditional) */}
//             {formData.attendanceRequired && (
//               <div className="pl-3">
//                 <label className="block text-xs font-semibold text-[#4a3728] mb-1">
//                   Minimum Attendance (%)
//                 </label>
//                 <input
//                   type="range"
//                   min="50"
//                   max="100"
//                   value={formData.attendanceAvg}
//                   onChange={handleAttendanceAvgChange}
//                   className="w-full"
//                 />
//                 <div className="text-center text-xl font-bold text-[#4a3728] mt-1">
//                   {formData.attendanceAvg}%
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Error Message */}
//           {(error || apiError) && (
//             <p className="text-red-500 text-xs mt-1">{error || apiError}</p>
//           )}

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Creating...' : 'Create Study Group'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // EXPORTS
// // ==========================================

// export default CreateGroupModal;

// // Export types for parent components
// export type { FormData, CreateGroupModalProps, ModalStep, Visibility };
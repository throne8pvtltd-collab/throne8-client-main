// src/profile/components/ProfileBanner.tsx
'use client';
import React, { useEffect, useState } from 'react';
import CoverPhotoModal from './CoverPhotoModal';

interface ProfileBannerProps {
    bannerImage: string;
    onBannerUpdate?: (newUrl: string) => void;
    onDataRefresh?: () => void;
    coverId?: string;
    isOwnProfile?: boolean;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({
    bannerImage,
    onBannerUpdate,
    onDataRefresh,
    coverId = '',
    isOwnProfile = true,
}) => {
    const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
    const [currentBannerImage, setCurrentBannerImage] = useState(
        bannerImage && bannerImage.trim() !== '' ? bannerImage : ''
    );

    // ✅ Jab bannerImage prop change ho (naye user ki profile pe navigate hone par),
    // currentBannerImage ko turant sync/reset karo — warna purana banner flash hota hai
    useEffect(() => {
        setCurrentBannerImage(bannerImage && bannerImage.trim() !== '' ? bannerImage : '');
    }, [bannerImage]);

    const hasCustomBanner = currentBannerImage && currentBannerImage.trim() !== '';

    const handleEdit = () => {
        setIsCoverModalOpen(true);
    };

    const handleCoverUpdate = (newImageUrl: string) => {
        setCurrentBannerImage(newImageUrl);

        if (onBannerUpdate) {
            onBannerUpdate(newImageUrl);
        }

        if (onDataRefresh) {
            onDataRefresh();
        }
    };

    return (
        <>
            <div className="relative h-48 w-full overflow-hidden group">
                {hasCustomBanner ? (
                    <img
                        src={currentBannerImage}
                        alt="Banner"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        onError={(e) => {
                            // ✅ Agar upload ki hui image bhi load fail ho jaye,
                            // to hardcoded default pe mat jao — bas hide kar do.
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                ) : (
                    // ✅ Koi banner upload nahi kiya gaya — plain placeholder, koi fixed photo nahi
                    <div className="w-full h-full bg-gradient-to-r from-[#e8dfd7] to-[#d8ccc0]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3728]/40 to-transparent"></div>

                <div className="absolute bottom-36 left-4 rounded-2xl border-2 text-white/80 text-xs font-medium bg-black/20 px-2 py-1 backdrop-blur-sm">
                    ✨ Professional Networker
                </div>

                {isOwnProfile && (
                    <button
                        onClick={handleEdit}
                        className="bannerEdit absolute top-4 right-4 border-2 text-white/80 text-xs font-medium bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm hover:bg-black/30 transition-all duration-300">
                        ✏ Edit
                    </button>
                )}
            </div>

            {isOwnProfile && (
                <CoverPhotoModal
                    isOpen={isCoverModalOpen}
                    onClose={() => setIsCoverModalOpen(false)}
                    onUploadSuccess={handleCoverUpdate}
                    currentImageUrl={currentBannerImage}
                    coverId={coverId}
                />
            )}
        </>
    );
};

export default ProfileBanner;
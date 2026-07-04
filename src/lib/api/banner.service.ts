import config from "@/config/env.config";
import api from "./api.intance";
// import { logger } from '@/lib/';

// ==================== TYPES ====================
interface BannerUploadData {
    banner: File;
    bannerType?: 'cover' | 'profile';
    setAsPrimary?: boolean;
}

interface BannerMetadata {
    width: number;
    height: number;
    aspectRatio: number;
}

interface BannerStatus {
    isActive: boolean;
    isPrimary: boolean;
}

interface BannerResponse {
    bannerId: string;
    bannerType: string;
    url: string;
    metadata: BannerMetadata;
    variants: any[];
    status: BannerStatus;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    timestamp: string;
    statusCode: number;
    data: BannerResponse;
}

// ==================== VALIDATION CONSTANTS ====================
const BANNER_VALIDATION = {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
    minWidth: 100,
    minHeight: 100,
    maxWidth: 10000,
    maxHeight: 10000,
};

// ==================== VALIDATION HELPER ====================
class BannerValidator {
    static validateFile(file: File): { valid: boolean; error?: string } {
        // Check file size
        if (file.size > BANNER_VALIDATION.maxFileSize) {
            return {
                valid: false,
                error: `File size exceeds maximum limit of ${BANNER_VALIDATION.maxFileSize / (1024 * 1024)}MB`,
            };
        }

        // Check MIME type
        if (!BANNER_VALIDATION.allowedMimeTypes.includes(file.type)) {
            return {
                valid: false,
                error: `Invalid file type. Allowed types: ${BANNER_VALIDATION.allowedMimeTypes.join(', ')}`,
            };
        }

        // Check file extension
        const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (!BANNER_VALIDATION.allowedExtensions.includes(ext)) {
            return {
                valid: false,
                error: `Invalid file extension. Allowed: ${BANNER_VALIDATION.allowedExtensions.join(', ')}`,
            };
        }

        return { valid: true };
    }

    static async validateImageDimensions(file: File): Promise<{ valid: boolean; error?: string }> {
        return new Promise((resolve) => {
            const img = new Image();
            const url = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(url);

                if (img.width < BANNER_VALIDATION.minWidth || img.height < BANNER_VALIDATION.minHeight) {
                    resolve({
                        valid: false,
                        error: `Image dimensions too small. Minimum: ${BANNER_VALIDATION.minWidth}x${BANNER_VALIDATION.minHeight}px`,
                    });
                    return;
                }

                if (img.width > BANNER_VALIDATION.maxWidth || img.height > BANNER_VALIDATION.maxHeight) {
                    resolve({
                        valid: false,
                        error: `Image dimensions too large. Maximum: ${BANNER_VALIDATION.maxWidth}x${BANNER_VALIDATION.maxHeight}px`,
                    });
                    return;
                }

                resolve({ valid: true });
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                resolve({
                    valid: false,
                    error: 'Failed to load image. Please try another file.',
                });
            };

            img.src = url;
        });
    }
}

// ==================== BANNER SERVICE ====================
class BannerService {
    private static readonly UPLOAD_ENDPOINT = `${config?.NEXT_PUBLIC_COVER_PHOTO_ENDPOINT || process.env.NEXT_PUBLIC_COVER_PHOTO_ENDPOINT}/upload-cover`;

    /**
     * Upload banner image
     */
    static async uploadBanner(data: BannerUploadData): Promise<BannerResponse> {
        try {
            // console.log('📤 [BANNER UPLOAD] Starting upload...', {
            //     fileName: data.banner.name,
            //     fileSize: data.banner.size,
            //     fileType: data.banner.type,
            // });

            // Step 1: Validate file
            const fileValidation = BannerValidator.validateFile(data.banner);
            if (!fileValidation.valid) {
                throw new Error(fileValidation.error);
            }

            // Step 2: Validate dimensions
            const dimensionValidation = await BannerValidator.validateImageDimensions(data.banner);
            if (!dimensionValidation.valid) {
                throw new Error(dimensionValidation.error);
            }

            // console.log('✅ [BANNER UPLOAD] Validation passed');

            // Step 3: Create FormData
            const formData = new FormData();
            formData.append('banner', data.banner);
            formData.append('bannerType', data.bannerType || 'cover');
            formData.append('setAsPrimary', String(data.setAsPrimary ?? true));

            // Step 4: Upload to server
            // console.log('🚀 [BANNER UPLOAD] Sending to server...');

            const response = await api.post<ApiResponse>(
                this.UPLOAD_ENDPOINT,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // console.log('✅ [BANNER UPLOAD] Upload successful', {
            //     bannerId: response.data.data.bannerId,
            //     url: response.data.data.url,
            // });

            return response.data.data;

        } catch (error: any) {
            console.error('❌ [BANNER UPLOAD] Upload failed', error);

            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }

            if (error.code === 'ERR_NETWORK') {
                throw new Error('Unable to connect to server. Please check your internet connection.');
            }

            throw new Error(error.message || 'Failed to upload banner. Please try again.');
        }
    }

    /**
     * Get validation rules (for UI display)
     */
    static getValidationRules() {
        return {
            maxFileSizeMB: BANNER_VALIDATION.maxFileSize / (1024 * 1024),
            allowedTypes: BANNER_VALIDATION.allowedMimeTypes,
            allowedExtensions: BANNER_VALIDATION.allowedExtensions,
            minDimensions: {
                width: BANNER_VALIDATION.minWidth,
                height: BANNER_VALIDATION.minHeight,
            },
            maxDimensions: {
                width: BANNER_VALIDATION.maxWidth,
                height: BANNER_VALIDATION.maxHeight,
            },
        };
    }
}

export default BannerService;
export { BannerValidator, BANNER_VALIDATION };
export type { BannerUploadData, BannerResponse, BannerMetadata, BannerStatus };
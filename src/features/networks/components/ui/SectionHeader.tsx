import React, { ReactNode } from 'react';

interface SectionHeaderProps {
    icon: ReactNode;
    title: string;
    subtitle?: string;
    actionLabel?: string;
    onActionClick?: () => void;
    iconBgColor?: string;
    textColor?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    icon,
    title,
    subtitle,
    actionLabel,
    onActionClick,
    iconBgColor = '#f6ede8',
    textColor = '#4a3728'
}) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
                <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                    style={{ backgroundColor: iconBgColor, color: textColor }}
                >
                    {icon}
                </div>
                <div>
                    <h4 className="text-3xl font-black" style={{ color: textColor }}>
                        {title}
                    </h4>
                    {subtitle && (
                        <p className="text-sm opacity-70" style={{ color: textColor }}>
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            {actionLabel && onActionClick && (
                <button
                    onClick={onActionClick}
                    className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity px-4 py-2 rounded-xl"
                    style={{ color: textColor, backgroundColor: iconBgColor }}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};
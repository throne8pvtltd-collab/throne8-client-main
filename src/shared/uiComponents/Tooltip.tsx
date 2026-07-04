import React, { ReactNode } from 'react';

interface TooltipProps {
    text: string;
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
    const positionClasses = {
        top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
        bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
        left: 'right-full mr-2 top-1/2 -translate-y-1/2',
        right: 'left-full ml-2 top-1/2 -translate-y-1/2',
    };

    return (
        <div className="group relative inline-flex">
            {children}
            {/* Tooltip */}
            <div
                className={`absolute ${positionClasses[position]} 
                    px-3 py-1.5 bg-[#4a3728] text-[#f6ede8] text-xs font-semibold 
                    rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    pointer-events-none whitespace-nowrap shadow-lg z-50
                    before:absolute before:content-[''] 
                    ${position === 'top' ? 'before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-[#4a3728] before:border-b-transparent before:border-l-transparent before:border-r-transparent' : ''}
                    ${position === 'bottom' ? 'before:-top-1 before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-[#4a3728] before:border-t-transparent before:border-l-transparent before:border-r-transparent' : ''}
                `}
            >
                {text}
            </div>
        </div>
    );
};

export default Tooltip;

import { useConnectionRequests } from '@/features/networks/hooks/useConnectionRequests';

export const NetworkNotificationBadge: React.FC = () => {
    const { requests } = useConnectionRequests(); // ✅ Get requests array
    
    const count = requests.length; // ✅ Direct count from array
    
    if (count === 0) return null;
    
    return (
        <span className="absolute -top-1 -right-5 bg-[#4a3728] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-puls">
            {count > 9 ? '9+' : count}
        </span>
    );
};
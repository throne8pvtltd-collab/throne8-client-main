// mentorDashboard/components/Sidebar.tsx
import { Star } from "lucide-react";
import { MENU_ITEMS } from "../../constants/constant";
import type { MenuItem } from "../../types";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  mentorData: any;
}

export default function Sidebar({
  activePage,
  setActivePage,
  mentorData
}: SidebarProps) {
  // Inhe derive karo
  const firstName = mentorData?.user?.firstName ?? "A";
  const lastName = mentorData?.user?.lastName ?? "S";
  const initials = `${firstName[0]}${lastName[0]}`;
  const fullName = `${firstName} ${lastName}`;
  const domain = (mentorData?.domains?.[0]?.replace("_", " ") ?? "Mentor")
    .split(" ")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  const profilePic = mentorData?.profilePic ?? null;
  const rating = mentorData?.stats?.averageRating || 0;

  return (
    <aside className="w-80 bg-white shadow-2xl flex flex-col">
      {/* Profile Card */}
      <div className="m-6 p-8 rounded-3xl shadow-2xl relative overflow-hidden hover:scale-105 transition-all duration-300 bg-[#fbf7f3] border-2 border-[#e0d8cf]">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-30 -mr-16 -mt-16 bg-[#e0d8cf]" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-30 -ml-12 -mb-12 bg-[#e0d8cf]" />
        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl">
            {profilePic ? (
              <img src={profilePic} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white bg-[#4a3728]">
                {initials}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-center mb-1 text-[#4a3728]">{fullName}</h2>
          <p className="text-center mb-2 font-semibold text-[#7a5c3e] ">{domain}</p>
          {/* Rating — 0 ho toh "No ratings yet" dikhao */}
          <div className="flex items-center justify-center gap-1">
            {rating > 0 ? (
              <>
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2 font-bold text-[#4a3728]">{rating.toFixed(1)}</span>
              </>
            ) : (
              <span className="text-sm text-[#8a7a6a]">No ratings yet</span>
            )}
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="space-y-2">
          {MENU_ITEMS.map((item: MenuItem) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 font-semibold group ${isActive
                  ? "bg-[#4a3728] text-white shadow-lg scale-105"
                  : "bg-[#fbf7f3] text-[#7a5c3e] border-2 border-[#e0d8cf] hover:shadow-md hover:scale-[1.02]"
                  }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? "" : "group-hover:scale-110"}`} />
                <span>{item.label}</span>
                {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
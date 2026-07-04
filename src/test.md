1. Recieve the connection point but when i refreshed it remove 
2. When revcieve the request then counting notification in Netowork button of Navbar
3. When connection of both users then don't show in People You May Know section by using get all connections from the server 
4. show all send request 
































<!-- 
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import ProfileNavbar from '../../components/ProfileNavbar';
// import { useProfileData } from '@/hooks/data/useProfileData';
// import { useHeadlineData } from '@/hooks/data/useHeadlineData';
// import { transformToProfileData } from '@/utils/profileTransformers';
// import { useAuth } from '@/features/auth/hooks/useAuth';

// interface Person {
//     id: number;
//     name: string;
//     title: string;
//     mutuals: string;
//     image: string;
//     location: string;
// }

// interface ConnectionRequest {
//     id: number;
//     name: string;
//     title: string;
//     mutuals: string;
//     image: string;
//     location: string;
// }

// interface SentRequest {
//     id: number;
//     name: string;
//     title: string;
//     image: string;
// }

// interface PremiumUser {
//     name: string;
//     title: string;
//     stats: string;
//     img: string;
//     badge: string;
//     achievements: string[];
// }

// const dummySuggestions: Person[] = [
//     {
//         id: 1,
//         name: "Sakshi Pandey",
//         title: "Attended Technocrats Institute Of Technology",
//         mutuals: "Ankit and 51 other mutual connections",
//         image: "https://randomuser.me/api/portraits/women/65.jpg",
//         location: "Indore, MP"
//     },
//     {
//         id: 2,
//         name: "Shreyansh Khan",
//         title: "SCADA, IoT, Power System",
//         mutuals: "Ankit and 23 other mutual connections",
//         image: "https://randomuser.me/api/portraits/men/45.jpg",
//         location: "Bhopal, MP"
//     },
//     {
//         id: 3,
//         name: "Chinmay Yadav",
//         title: "Student | Learner | SGSITS",
//         mutuals: "Deepak and 6 other mutual connections",
//         image: "https://randomuser.me/api/portraits/men/52.jpg",
//         location: "Indore, MP"
//     },
//     {
//         id: 4,
//         name: "RK",
//         title: "Full-Stack Developer reactjs",
//         mutuals: "Ankit and 45 other mutual connections",
//         image: "https://randomuser.me/api/portraits/men/88.jpg",
//         location: "Mumbai, MH,india"
//     }
// ];

// const suggestionForYou: Person[] = [
//     {
//         id: 101,
//         name: "Aman Verma",
//         title: "Software Engineer | Java | Spring",
//         mutuals: "Rahul and 12 other mutual connections",
//         image: "https://randomuser.me/api/portraits/men/11.jpg",
//         location: "Delhi, India"
//     },
//     {
//         id: 102,
//         name: "Neha Sharma",
//         title: "UI/UX Designer | Figma",
//         mutuals: "Sakshi and 9 other mutual connections",
//         image: "https://randomuser.me/api/portraits/women/12.jpg",
//         location: "Pune, MH"
//     },
//     {
//         id: 103,
//         name: "Rohit Jain",
//         title: "Backend Developer | Node.js",
//         mutuals: "Ankit and 18 others",
//         image: "https://randomuser.me/api/portraits/men/13.jpg",
//         location: "Indore, MP"
//     },
//     {
//         id: 104,
//         name: "Pooja Malhotra",
//         title: "HR | Talent Acquisition",
//         mutuals: "Deepak and 7 others",
//         image: "https://randomuser.me/api/portraits/women/14.jpg",
//         location: "Gurgaon, HR"
//     },
//     {
//         id: 105,
//         name: "Aditya Singh",
//         title: "React Developer | Frontend",
//         mutuals: "Rahul and 21 others",
//         image: "https://randomuser.me/api/portraits/men/15.jpg",
//         location: "Bangalore, KA"
//     },
//     {
//         id: 106,
//         name: "Kritika Joshi",
//         title: "Data Analyst | Power BI",
//         mutuals: "Neha and 11 others",
//         image: "https://randomuser.me/api/portraits/women/16.jpg",
//         location: "Jaipur, RJ"
//     },
//     {
//         id: 107,
//         name: "Saurabh Mishra",
//         title: "DevOps Engineer | AWS",
//         mutuals: "Aman and 14 others",
//         image: "https://randomuser.me/api/portraits/men/17.jpg",
//         location: "Noida, UP"
//     },
//     {
//         id: 108,
//         name: "Simran Kaur",
//         title: "Product Designer",
//         mutuals: "Pooja and 6 others",
//         image: "https://randomuser.me/api/portraits/women/18.jpg",
//         location: "Chandigarh"
//     },
//     {
//         id: 109,
//         name: "Harsh Patel",
//         title: "MERN Stack Developer",
//         mutuals: "Rohit and 19 others",
//         image: "https://randomuser.me/api/portraits/men/19.jpg",
//         location: "Ahmedabad, GJ"
//     },
//     {
//         id: 110,
//         name: "Anjali Gupta",
//         title: "MBA | Business Analyst",
//         mutuals: "Kritika and 10 others",
//         image: "https://randomuser.me/api/portraits/women/20.jpg",
//         location: "Lucknow, UP"
//     },
//     ...Array.from({ length: 10 }).map((_, i) => ({
//         id: 111 + i,
//         name: `Professional ${i + 1}`,
//         title: "Tech Enthusiast | Learner",
//         mutuals: "5+ mutual connections",
//         image: `https://randomuser.me/api/portraits/men/${30 + i}.jpg`,
//         location: "India"
//     }))
// ];

// const connectionRequests: ConnectionRequest[] = [
//     {
//         id: 201,
//         name: "Rahul Meena",
//         title: "Frontend Developer | React",
//         mutuals: "12 mutual connections",
//         image: "https://randomuser.me/api/portraits/men/32.jpg",
//         location: "Jaipur, RJ"
//     },
//     {
//         id: 202,
//         name: "Kajal Verma",
//         title: "UI Designer | Figma",
//         mutuals: "8 mutual connections",
//         image: "https://randomuser.me/api/portraits/women/44.jpg",
//         location: "Indore, MP"
//     }
// ];

// const sentRequests: SentRequest[] = [
//     {
//         id: 401,
//         name: "Amit Sharma",
//         title: "Backend Developer",
//         image: "https://randomuser.me/api/portraits/men/41.jpg"
//     },
//     {
//         id: 402,
//         name: "Sneha Joshi",
//         title: "Product Designer",
//         image: "https://randomuser.me/api/portraits/women/42.jpg"
//     }
// ];

// const premiumProfiles: PremiumUser[] = [
//     {
//         name: "Ananya Dev",
//         title: "AI Researcher & Innovation Leader",
//         stats: "120K followers • Google DevFest Speaker",
//         img: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33",
//         badge: "AI Pioneer",
//         achievements: ["TEDx Speaker", "Published Author", "Forbes 30 Under 30"]
//     },
//     {
//         name: "Rohan Kapoor",
//         title: "CTO & Startup Mentor",
//         stats: "90K followers • 5 Successful Exits",
//         img: "https://randomuser.me/api/portraits/men/75.jpg",
//         badge: "Tech Visionary",
//         achievements: ["Y Combinator", "Angel Investor", "Tech Advisor"]
//     },
//     {
//         name: "Priya Mehra",
//         title: "Data Science & ML Expert",
//         stats: "150K followers • TEDx Speaker",
//         img: "https://randomuser.me/api/portraits/women/60.jpg",
//         badge: "Data Queen",
//         achievements: ["Kaggle Grandmaster", "MIT Graduate", "AI Researcher"]
//     }
// ];

// export default function NetworkPage() {
//     const params = useParams();
//     const router = useRouter();
//     const userId = params.userId as string;
//     const { user } = useAuth();

//     const [activeTab, setActiveTab] = useState<'grow' | 'catchup'>('grow');
//     const [connectedUsers, setConnectedUsers] = useState<Set<number>>(new Set());
//     const [requests, setRequests] = useState<ConnectionRequest[]>(connectionRequests);
//     const [showRequestsPanel, setShowRequestsPanel] = useState(false);
//     const [activeReqTab, setActiveReqTab] = useState<"received" | "sent">("received");

//     const handleConnect = (userId: number) => {
//         setConnectedUsers(prev => new Set([...prev, userId]));
//     };

//     const handleAccept = (id: number) => {
//         setRequests(prev => prev.filter(user => user.id !== id));
//         setConnectedUsers(prev => new Set([...prev, id]));
//     };

//     const handleIgnore = (id: number) => {
//         setRequests(prev => prev.filter(user => user.id !== id));
//     };

//     const {
//         userProfileData,
//         profileImageUrl,
//         headlineId,
//         fetchUserProfile
//     } = useProfileData();

//     const { headlineData, isLoadingHeadline, fetchHeadlineData } = useHeadlineData(headlineId);

//     useEffect(() => {
//         if (user) {
//             fetchUserProfile();
//         }
//     }, [user, fetchUserProfile]);

//     const profileData = transformToProfileData(
//         userProfileData,
//         profileImageUrl,
//         headlineData
//     );

//     const fullName = userProfileData
//         ? `${userProfileData.firstName} ${userProfileData.lastName}`.trim()
//         : 'Loading...';


//     return (
//         <>

//             <ProfileNavbar
//                 profileImage={profileData.profileImage}
//                 userName={profileData.userName}
//                 currentUserId={user?.userId}
//             />

//             <div className="min-h-screen mt-12" style={{ backgroundColor: '#f6ede8' }}>
//                 {/* Floating Background Elements */}
//                 <div className="fixed inset-0 overflow-hidden pointer-events-none">
//                     <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-5" style={{ backgroundColor: '#4a3728' }}></div>
//                     <div className="absolute top-60 right-20 w-24 h-24 rounded-full opacity-5" style={{ backgroundColor: '#4a3728' }}></div>
//                     <div className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full opacity-5" style={{ backgroundColor: '#4a3728' }}></div>
//                 </div>

//                 <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-6">
//                     {/* Sidebar: Manage My Network */}
//                     <div className="w-full lg:w-80">
//                         <div className="rounded-3xl shadow-2xl border-2 overflow-hidden transform hover:scal-105 transition-all duration-300"
//                             style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                             <div className="p-8 relative overflow-hidden">
//                                 <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-10"></div>
//                                 <div className="relative z-10">
//                                     <div className="flex items-center gap-3 mb-3">
//                                         <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#f6ede8' }}>
//                                             <i className="ri-global-fill"></i>
//                                         </div>
//                                         <div>
//                                             <h2 className="text-2xl font-black" style={{ color: '#4a3728' }}>My Network</h2>
//                                             <p className="text-sm opacity-70" style={{ color: '#4a3728' }}>Build meaningful connections</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="p-6 space-y-4">
//                                 {[
//                                     { label: 'Connections', count: 3288, icon: <i className="ri-shake-hands-line"></i>, gradient: 'from-blue-400 to-purple-500' },
//                                     { label: 'Contacts', count: 523, icon: <i className="ri-contacts-book-3-line"></i>, gradient: 'from-green-400 to-blue-500' },
//                                     { label: 'Following & Followers', count: 465, icon: <i className="ri-user-follow-line"></i>, gradient: 'from-pink-400 to-red-500' },
//                                     { label: 'Groups', count: 7, icon: <i className="ri-team-line"></i>, gradient: 'from-yellow-400 to-orange-500' },
//                                     { label: 'Events', count: 3, icon: <i className="ri-calendar-event-line"></i>, gradient: 'from-purple-400 to-pink-500' },
//                                     { label: 'Pages', count: 168, icon: <i className="ri-pages-line"></i>, gradient: 'from-indigo-400 to-purple-500' },
//                                     { label: 'Newsletters', count: 51, icon: <i className="ri-news-line"></i>, gradient: 'from-teal-400 to-green-500' }
//                                 ].map((item, index) => (
//                                     <div
//                                         key={index}
//                                         className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
//                                         style={{ backgroundColor: '#f6ede8' }}
//                                     >
//                                         <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300"
//                                             style={{ background: `linear-gradient(135deg, #4a3728, #6b4e3d)` }}></div>
//                                         <div className="relative p-4 flex justify-between items-center">
//                                             <div className="flex items-center gap-4">
//                                                 <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-lg"
//                                                     style={{ backgroundColor: '#e0d8cf' }}>
//                                                     {item.icon}
//                                                 </div>
//                                                 <span className="font-bold group-hover:translate-x-2 transition-transform duration-300"
//                                                     style={{ color: '#4a3728' }}>{item.label}</span>
//                                             </div>
//                                             {item.count !== undefined && (
//                                                 <div className="relative">
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-[#f6ede8]/50 to-[#f6ede8]/50 rounded-full blur opacity-30"></div>
//                                                     <span className="relative text-sm font-black px-3 py-1 rounded-full shadow-lg"
//                                                         style={{ color: '#4a3728', backgroundColor: '#e0d8cf' }}>
//                                                         {item.count}
//                                                     </span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Main Content */}
//                     <div className="flex-1 space-y-8">
//                         {/* Enhanced Tabs */}
//                         <div className="max-w-4xl mx-auto p-6 space-y-8">
//                             {/* Tab Navigation Section */}
//                             <div className="rounded-3xl shadow-2xl p-8 border-2 relative overflow-hidden"
//                                 style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5"></div>
//                                 <div className="relative flex gap-8">
//                                     {(['grow', 'catchup'] as const).map((tab) => (
//                                         <button
//                                             key={tab}
//                                             onClick={() => setActiveTab(tab)}
//                                             className={`relative font-black text-lg pb-4 transition-all duration-300 ${activeTab === tab ? 'transform scale-110' : 'opacity-60 hover:opacity-100'
//                                                 }`}
//                                             style={{ color: '#4a3728' }}
//                                         >
//                                             {tab === 'grow' ? 'Grow' : 'Catch Up'}
//                                             {activeTab === tab && (
//                                                 <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full shadow-lg"></div>
//                                             )}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             {requests.length > 0 && (
//                                 <div
//                                     className="rounded-3xl shadow-2xl p-8 border-2 mb-10"
//                                     style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}
//                                 >
//                                     <div className="flex items-center gap-4 mb-6">
//                                         <div
//                                             className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
//                                             style={{ backgroundColor: '#f6ede8' }}
//                                         >
//                                             <i className="ri-user-received-2-fill"></i>
//                                         </div>
//                                         <h3 className="text-3xl font-black" style={{ color: '#4a3728' }}>
//                                             Connection Requests
//                                         </h3>
//                                         <button
//                                             onClick={() => setShowRequestsPanel(prev => !prev)}
//                                             className="ml-auto text-sm font-bold px-4 py-2 rounded-xl transition"
//                                             style={{ backgroundColor: '#f6ede8', color: '#4a3728' }}
//                                         >
//                                             {showRequestsPanel ? "Hide ▲" : "Show more →"}
//                                         </button>
//                                     </div>

//                                     <div className="space-y-4">
//                                         {requests.map((user) => (
//                                             <div
//                                                 key={user.id}
//                                                 className="flex items-center justify-between p-4 rounded-2xl shadow-lg"
//                                                 style={{ backgroundColor: '#f6ede8' }}
//                                             >
//                                                 <div className="flex items-center gap-4">
//                                                     <img
//                                                         src={user.image}
//                                                         alt={user.name}
//                                                         className="w-14 h-14 rounded-full object-cover"
//                                                     />
//                                                     <div>
//                                                         <h4 className="font-bold" style={{ color: '#4a3728' }}>
//                                                             {user.name}
//                                                         </h4>
//                                                         <p className="text-xs opacity-70" style={{ color: '#4a3728' }}>
//                                                             {user.title}
//                                                         </p>
//                                                         <p className="text-xs opacity-50" style={{ color: '#4a3728' }}>
//                                                             {user.mutuals}
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 <div className="flex gap-3">
//                                                     <button
//                                                         onClick={() => handleIgnore(user.id)}
//                                                         className="px-4 py-2 rounded-xl text-sm font-bold border"
//                                                         style={{ borderColor: '#4a3728', color: '#4a3728' }}
//                                                     >
//                                                         Ignore
//                                                     </button>

//                                                     <button
//                                                         onClick={() => handleAccept(user.id)}
//                                                         className="px-4 py-2 rounded-xl text-sm font-bold text-white"
//                                                         style={{
//                                                             background: 'linear-gradient(135deg, #4a3728, #7a5c3e)'
//                                                         }}
//                                                     >
//                                                         Accept
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {showRequestsPanel && (
//                                 <div
//                                     className="mt-6 rounded-3xl p-6 shadow-xl border-2"
//                                     style={{ backgroundColor: '#f6ede8', borderColor: '#4a3728' }}
//                                 >
//                                     {/* Tabs */}
//                                     <div className="flex gap-6 mb-6 border-b pb-3">
//                                         {(["received", "sent"] as const).map(tab => (
//                                             <button
//                                                 key={tab}
//                                                 onClick={() => setActiveReqTab(tab)}
//                                                 className={`font-bold pb-2 transition ${activeReqTab === tab ? "border-b-4" : "opacity-60"
//                                                     }`}
//                                                 style={{ borderColor: '#4a3728', color: '#4a3728' }}
//                                             >
//                                                 {tab === "received" ? "Received Requests" : "Sent Requests"}
//                                             </button>
//                                         ))}
//                                     </div>

//                                     {/* List */}
//                                     <div className="space-y-4">
//                                         {(activeReqTab === "received" ? requests : sentRequests).map(user => (
//                                             <div
//                                                 key={user.id}
//                                                 className="flex items-center justify-between p-4 rounded-2xl cursor-pointer hover:scale-[1.01] transition shadow"
//                                                 style={{ backgroundColor: '#e0d8cf' }}
//                                             >
//                                                 <div className="flex items-center gap-4">
//                                                     <img
//                                                         src={user.image}
//                                                         alt={user.name}
//                                                         className="w-14 h-14 rounded-full object-cover"
//                                                     />
//                                                     <div>
//                                                         <h4 className="font-bold" style={{ color: '#4a3728' }}>
//                                                             {user.name}
//                                                         </h4>
//                                                         <p className="text-xs opacity-70" style={{ color: '#4a3728' }}>
//                                                             {user.title}
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 {/* Buttons only for RECEIVED */}
//                                                 {activeReqTab === "received" && (
//                                                     <div className="flex gap-3">
//                                                         <button
//                                                             onClick={() => handleIgnore(user.id)}
//                                                             className="px-4 py-2 rounded-xl text-sm font-bold border"
//                                                             style={{ borderColor: '#4a3728', color: '#4a3728' }}
//                                                         >
//                                                             Ignore
//                                                         </button>

//                                                         <button
//                                                             onClick={() => handleAccept(user.id)}
//                                                             className="px-4 py-2 rounded-xl text-sm font-bold text-white"
//                                                             style={{
//                                                                 background: 'linear-gradient(135deg, #4a3728, #7a5c3e)'
//                                                             }}
//                                                         >
//                                                             Withdraw
//                                                         </button>
//                                                     </div>
//                                                 )}

//                                                 {/* SENT label */}
//                                                 {activeReqTab === "sent" && (
//                                                     <span className="text-xs font-bold opacity-60" style={{ color: '#4a3728' }}>
//                                                         Request Sent
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Profile Viewer Card Section */}
//                             <div className="rounded-3xl shadow-2xl p-8 border-2 relative overflow-hidden"
//                                 style={{ backgroundColor: '#f6ede8', borderColor: '#4a3728' }}>
//                                 <div className="absolute inset-0 bg-gradient-to-br from-[#f6ede8]/50 via-transparent to-[#f6ede8]/50 opacity-30"></div>
//                                 <div className="relative flex justify-between items-center">
//                                     <div className="flex items-center gap-4">
//                                         <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl"
//                                             style={{ backgroundColor: '#e0d8cf' }}>
//                                             <i className="ri-eye-fill"></i>
//                                         </div>
//                                         <div>
//                                             <h4 className="font-black text-xl mb-2" style={{ color: '#4a3728' }}>
//                                                 Who's Viewed Your Profile?
//                                             </h4>
//                                             <p className="text-sm opacity-70" style={{ color: '#4a3728' }}>
//                                                 Discover who's interested in your professional journey
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <button className="group relative overflow-hidden px-6 py-3 rounded-2xl font-black shadow-xl transform hover:scale-105 transition-all duration-300"
//                                         style={{ backgroundColor: '#e0d8cf', color: '#4a3728' }}>
//                                         <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                                         <span className="relative group-hover:text-white">🌟 Try Premium</span>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* People You May Know - First Section */}
//                         <div className="rounded-3xl shadow-2xl p-8 border-2"
//                             style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                             <div className="flex justify-between items-center mb-8">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
//                                         style={{ backgroundColor: '#f6ede8' }}>
//                                         <i className="ri-hand-coin-fill"></i>
//                                     </div>
//                                     <h4 className="text-3xl font-black" style={{ color: '#4a3728' }}>People You May Know</h4>
//                                 </div>
//                                 <button className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity px-4 py-2 rounded-xl"
//                                     style={{ color: '#4a3728', backgroundColor: '#f6ede8' }}>
//                                     See all →
//                                 </button>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                                 {dummySuggestions.map((person) => (
//                                     <div
//                                         key={person.id}
//                                         className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 transform hover:-translate-y-1 hover:border-[#4a3728] hover:shadow-[0_0_15px_rgba(74,55,40,0.3)]"
//                                         style={{ backgroundColor: '#f6ede8' }}
//                                     >
//                                         <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
//                                             <div className="absolute inset-0 bg-gradient-to-br from-[#4a3728] to-[#7a5c3e] rounded-bl-3xl"></div>
//                                         </div>

//                                         <div className="relative p-5 flex flex-col h-full">
//                                             <div className="flex flex-col items-center text-center">
//                                                 <div className="relative mb-4">
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
//                                                     <div className="relative">
//                                                         <img
//                                                             src={person.image}
//                                                             alt={person.name}
//                                                             className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-xl relative z-10"
//                                                             onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64'; }}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <h3 className="font-bold text-base mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-600 transition-all duration-500"
//                                                     style={{ color: '#4a3728' }}>
//                                                     {person.name}
//                                                 </h3>

//                                                 <p className="text-xs opacity-75 mb-2 font-medium leading-tight" style={{ color: '#4a3728' }}>
//                                                     {person.title}
//                                                 </p>

//                                                 <div className="flex items-center gap-1 mb-2">
//                                                     <div className="w-2 h-2 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full"></div>
//                                                     <span className="text-xs opacity-60 font-medium" style={{ color: '#4a3728' }}>{person.location}</span>
//                                                 </div>

//                                                 <div className="flex items-center gap-1 mb-4">
//                                                     <div className="flex -space-x-1">
//                                                         <div className="w-4 h-4 bg-[#f6ede8] rounded-full border border-white"></div>
//                                                         <div className="w-4 h-4 bg-[#e0d8cf] rounded-full border border-white"></div>
//                                                         <div className="w-4 h-4 bg-[#f6ede8] rounded-full border border-white"></div>
//                                                     </div>
//                                                     <span className="text-xs opacity-50 font-medium ml-1" style={{ color: '#4a3728' }}>
//                                                         {person.mutuals}
//                                                     </span>
//                                                 </div>

//                                                 <button
//                                                     onClick={() => handleConnect(person.id)}
//                                                     disabled={connectedUsers.has(person.id)}
//                                                     className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold shadow-lg transform transition-all duration-300 ${connectedUsers.has(person.id)
//                                                         ? 'bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-white cursor-default'
//                                                         : 'text-[#4a3728] hover:bg-[#f6ede8] hover:border hover:border-[#4a3728] hover:shadow-md hover:opacity-90 active:scale-95'
//                                                         }`}
//                                                     style={{
//                                                         background: connectedUsers.has(person.id)
//                                                             ? 'linear-gradient(135deg, #4a3728, #7a5c3e)'
//                                                             : '#e0d8cf'
//                                                     }}
//                                                 >
//                                                     <span className="flex items-center justify-center gap-2">
//                                                         {connectedUsers.has(person.id) ? (
//                                                             <>
//                                                                 <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
//                                                                     <span className="text-[#7a5c3e] text-xs">✓</span>
//                                                                 </span>
//                                                                 Connected
//                                                             </>
//                                                         ) : (
//                                                             <>
//                                                                 <span className="animate-pulse">✨</span>
//                                                                 Connect
//                                                             </>
//                                                         )}
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                         </div>

//                                         <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                                             <div className="absolute top-4 left-4 w-1 h-3 bg-[#f6ede8] rounded-full animate-pulse"></div>
//                                             <div className="absolute top-8 right-6 w-1 h-3 bg-[#e0d8cf] rounded-full animate-pulse"></div>
//                                             <div className="absolute bottom-6 left-6 w-1 h-3 bg-[#f6ede8] rounded-full animate-pulse"></div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* People You May Know - Second Section */}
//                         <div className="rounded-3xl shadow-2xl p-8 border-2"
//                             style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                             <div className="flex justify-between items-center mb-8">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
//                                         style={{ backgroundColor: '#f6ede8' }}>
//                                         <i className="ri-hand-coin-fill"></i>
//                                     </div>
//                                     <h4 className="text-3xl font-black" style={{ color: '#4a3728' }}>People You May Know</h4>
//                                 </div>
//                                 <button className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity px-4 py-2 rounded-xl"
//                                     style={{ color: '#4a3728', backgroundColor: '#f6ede8' }}>
//                                     See all →
//                                 </button>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                                 {dummySuggestions.map((person) => (
//                                     <div
//                                         key={person.id}
//                                         className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 transform hover:-translate-y-1 hover:border-[#4a3728] hover:shadow-[0_0_15px_rgba(74,55,40,0.3)]"
//                                         style={{ backgroundColor: '#f6ede8' }}
//                                     >
//                                         <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
//                                             <div className="absolute inset-0 bg-gradient-to-br from-[#4a3728] to-[#7a5c3e] rounded-bl-3xl"></div>
//                                         </div>

//                                         <div className="relative p-5 flex flex-col h-full">
//                                             <div className="flex flex-col items-center text-center">
//                                                 <div className="relative mb-4">
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
//                                                     <div className="relative">
//                                                         <img
//                                                             src={person.image}
//                                                             alt={person.name}
//                                                             className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-xl relative z-10"
//                                                             onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64'; }}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <h3 className="font-bold text-base mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-600 transition-all duration-500"
//                                                     style={{ color: '#4a3728' }}>
//                                                     {person.name}
//                                                 </h3>

//                                                 <p className="text-xs opacity-75 mb-2 font-medium leading-tight" style={{ color: '#4a3728' }}>
//                                                     {person.title}
//                                                 </p>

//                                                 <div className="flex items-center gap-1 mb-2">
//                                                     <div className="w-2 h-2 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full"></div>
//                                                     <span className="text-xs opacity-60 font-medium" style={{ color: '#4a3728' }}>{person.location}</span>
//                                                 </div>

//                                                 <div className="flex items-center gap-1 mb-4">
//                                                     <div className="flex -space-x-1">
//                                                         <div className="w-4 h-4 bg-[#f6ede8] rounded-full border border-white"></div>
//                                                         <div className="w-4 h-4 bg-[#e0d8cf] rounded-full border border-white"></div>
//                                                         <div className="w-4 h-4 bg-[#f6ede8] rounded-full border border-white"></div>
//                                                     </div>
//                                                     <span className="text-xs opacity-50 font-medium ml-1" style={{ color: '#4a3728' }}>
//                                                         {person.mutuals}
//                                                     </span>
//                                                 </div>

//                                                 <button
//                                                     onClick={() => handleConnect(person.id)}
//                                                     disabled={connectedUsers.has(person.id)}
//                                                     className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold shadow-lg transform transition-all duration-300 ${connectedUsers.has(person.id)
//                                                         ? 'bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-white cursor-default'
//                                                         : 'text-[#4a3728] hover:bg-[#f6ede8] hover:border hover:border-[#4a3728] hover:shadow-md hover:opacity-90 active:scale-95'
//                                                         }`}
//                                                     style={{
//                                                         background: connectedUsers.has(person.id)
//                                                             ? 'linear-gradient(135deg, #4a3728, #7a5c3e)'
//                                                             : '#e0d8cf'
//                                                     }}
//                                                 >
//                                                     <span className="flex items-center justify-center gap-2">
//                                                         {connectedUsers.has(person.id) ? (
//                                                             <>
//                                                                 <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
//                                                                     <span className="text-[#7a5c3e] text-xs">✓</span>
//                                                                 </span>
//                                                                 Connected
//                                                             </>
//                                                         ) : (
//                                                             <>
//                                                                 <span className="animate-pulse">✨</span>
//                                                                 Connect
//                                                             </>
//                                                         )}
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                         </div>

//                                         <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                                             <div className="absolute top-4 left-4 w-1 h-3 bg-[#f6ede8] rounded-full animate-pulse"></div>
//                                             <div className="absolute top-8 right-6 w-1 h-3 bg-[#e0d8cf] rounded-full animate-pulse"></div>
//                                             <div className="absolute bottom-6 left-6 w-1 h-3 bg-[#f6ede8] rounded-full animate-pulse"></div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* People You May Know - Third Section */}
//                         <div className="rounded-3xl shadow-2xl p-8 border-2"
//                             style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                             <div className="flex justify-between items-center mb-8">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
//                                         style={{ backgroundColor: '#f6ede8' }}>
//                                         <i className="ri-hand-coin-fill"></i>
//                                     </div>
//                                     <h4 className="text-3xl font-black" style={{ color: '#4a3728' }}>People You May Know</h4>
//                                 </div>
//                                 <button className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity px-4 py-2 rounded-xl"
//                                     style={{ color: '#4a3728', backgroundColor: '#f6ede8' }}>
//                                     See all →
//                                 </button>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                                 {dummySuggestions.map((person) => (
//                                     <div
//                                         key={person.id}
//                                         className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 transform hover:-translate-y-1 hover:border-[#4a3728] hover:shadow-[0_0_15px_rgba(74,55,40,0.3)]"
//                                         style={{ backgroundColor: '#f6ede8' }}
//                                     >
//                                         <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
//                                             <div className="absolute inset-0 bg-gradient-to-br from-[#4a3728] to-[#7a5c3e] rounded-bl-3xl"></div>
//                                         </div>

//                                         <div className="relative p-5 flex flex-col h-full">
//                                             <div className="flex flex-col items-center text-center">
//                                                 <div className="relative mb-4">
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
//                                                     <div className="relative">
//                                                         <img
//                                                             src={person.image}
//                                                             alt={person.name}
//                                                             className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-xl relative z-10"
//                                                             onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64'; }}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <h3 className="font-bold text-base mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-600 transition-all duration-500"
//                                                     style={{ color: '#4a3728' }}>
//                                                     {person.name}
//                                                 </h3>

//                                                 <p className="text-xs opacity-75 mb-2 font-medium leading-tight" style={{ color: '#4a3728' }}>
//                                                     {person.title}
//                                                 </p>

//                                                 <div className="flex items-center gap-1 mb-2">
//                                                     <div className="w-2 h-2 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full"></div>
//                                                     <span className="text-xs opacity-60 font-medium" style={{ color: '#4a3728' }}>{person.location}</span>
//                                                 </div>

//                                                 <div className="flex items-center gap-1 mb-4">
//                                                     <div className="flex -space-x-1">
//                                                         <div className="w-4 h-4 bg-[#f6ede8] rounded-full border border-white"></div>
//                                                         <div className="w-4 h-4 bg-[#e0d8cf] rounded-full border border-white"></div>
//                                                         <div className="w-4 h-4 bg-[#f6ede8] rounded-full border border-white"></div>
//                                                     </div>
//                                                     <span className="text-xs opacity-50 font-medium ml-1" style={{ color: '#4a3728' }}>
//                                                         {person.mutuals}
//                                                     </span>
//                                                 </div>

//                                                 <button
//                                                     onClick={() => handleConnect(person.id)}
//                                                     disabled={connectedUsers.has(person.id)}
//                                                     className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold shadow-lg transform transition-all duration-300 ${connectedUsers.has(person.id)
//                                                         ? 'bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-white cursor-default'
//                                                         : 'text-[#4a3728] hover:bg-[#f6ede8] hover:border hover:border-[#4a3728] hover:shadow-md hover:opacity-90 active:scale-95'
//                                                         }`}
//                                                     style={{
//                                                         background: connectedUsers.has(person.id)
//                                                             ? 'linear-gradient(135deg, #4a3728, #7a5c3e)'
//                                                             : '#e0d8cf'
//                                                     }}
//                                                 >
//                                                     <span className="flex items-center justify-center gap-2">
//                                                         {connectedUsers.has(person.id) ? (
//                                                             <>
//                                                                 <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
//                                                                     <span className="text-[#7a5c3e] text-xs">✓</span>
//                                                                 </span>
//                                                                 Connected
//                                                             </>
//                                                         ) : (
//                                                             <>
//                                                                 <span className="animate-pulse">✨</span>
//                                                                 Connect
//                                                             </>
//                                                         )}
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                         </div>

//                                         <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                                             <div className="absolute top-4 left-4 w-1 h-3 bg-[#f6ede8] rounded-full animate-pulse"></div>
//                                             <div className="absolute top-8 right-6 w-1 h-3 bg-[#e0d8cf] rounded-full animate-pulse"></div>
//                                             <div className="absolute bottom-6 left-6 w-1 h-3 bg-[#f6ede8] rounded-full animate-pulse"></div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* People You May Know - Fourth Section */}
//                         <div className="rounded-3xl shadow-2xl p-8 border-2"
//                             style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                             <div className="flex justify-between items-center mb-8">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
//                                         style={{ backgroundColor: '#f6ede8' }}>
//                                         <i className="ri-hand-coin-fill"></i>
//                                     </div>
//                                     <h4 className="text-3xl font-black" style={{ color: '#4a3728' }}>People You May Know</h4>
//                                 </div>
//                                 <button className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity px-4 py-2 rounded-xl"
//                                     style={{ color: '#4a3728', backgroundColor: '#f6ede8' }}>
//                                     See all →
//                                 </button>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                                 {dummySuggestions.map((person) => (
//                                     <div
//                                         key={person.id}
//                                         className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 transform hover:-translate-y-1 hover:border-[#4a3728] hover:shadow-[0_0_15px_rgba(74,55,40,0.3)]"
//                                         style={{ backgroundColor: '#f6ede8' }}
//                                     >
//                                         <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
//                                             <div className="absolute inset-0 bg-gradient-to-br from-[#4a3728] to-[#7a5c3e] rounded-bl-3xl"></div>
//                                         </div>

//                                         <div className="relative p-5 flex flex-col h-full">
//                                             <div className="flex flex-col items-center text-center">
//                                                 <div className="relative mb-4">
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
//                                                     <div className="relative">
//                                                         <img
//                                                             src={person.image}
//                                                             alt={person.name}
//                                                             className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-xl relative z-10"
//                                                             onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64'; }}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <h3 className="font-bold text-base mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-600 transition-all duration-500"
//                                                     style={{ color: '#4a3728' }}>
//                                                     {person.name}
//                                                 </h3>

//                                                 <p className="text-xs opacity-75 mb-2 font-medium leading-tight" style={{ color: '#4a3728' }}>
//                                                     {person.title}
//                                                 </p>

//                                                 <div className="flex items-center gap-1 mb-2">
//                                                     <div className="w-2 h-2 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full"></div>
//                                                     <span className="text-xs opacity-60 font-medium" style={{ color: '#4a3728' }}>{person.location}</span>
//                                                 </div>

//                                                 <div className="flex items-center gap-1 mb-4">
//                                                     <div className="flex -space-x-1">
//                                                         <div className="w-4 h-4 bg-[#f6ede8] rounded-full border border-white"></div>
//                                                         <div className="w-4 h-4 bg-[#e0d8cf] rounded-full border border-white"></div>
//                                                         <div className="w-4 h-4 bg-[#f6ede8] rounded-full border border-white"></div>
//                                                     </div>
//                                                     <span className="text-xs opacity-50 font-medium ml-1" style={{ color: '#4a3728' }}>
//                                                         {person.mutuals}
//                                                     </span>
//                                                 </div>

//                                                 <button
//                                                     onClick={() => handleConnect(person.id)}
//                                                     disabled={connectedUsers.has(person.id)}
//                                                     className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold shadow-lg transform transition-all duration-300 ${connectedUsers.has(person.id)
//                                                         ? 'bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-white cursor-default'
//                                                         : 'text-[#4a3728] hover:bg-[#f6ede8] hover:border hover:border-[#4a3728] hover:shadow-md hover:opacity-90 active:scale-95'
//                                                         }`}
//                                                     style={{
//                                                         background: connectedUsers.has(person.id)
//                                                             ? 'linear-gradient(135deg, #4a3728, #7a5c3e)'
//                                                             : '#e0d8cf'
//                                                     }}
//                                                 >
//                                                     <span className="flex items-center justify-center gap-2">
//                                                         {connectedUsers.has(person.id) ? (
//                                                             <>
//                                                                 <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
//                                                                     <span className="text-[#7a5c3e] text-xs">✓</span>
//                                                                 </span>
//                                                                 Connected
//                                                             </>
//                                                         ) : (
//                                                             <>
//                                                                 <span className="animate-pulse">✨</span>
//                                                                 Connect
//                                                             </>
//                                                         )}
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                         </div>

//                                         <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                                             <div className="absolute top-4 left-4 w-1 h-3 bg-[#f6ede8] rounded-full animate-pulse"></div>
//                                             <div className="absolute top-8 right-6 w-1 h-3 bg-[#e0d8cf] rounded-full animate-pulse"></div>
//                                             <div className="absolute bottom-6 left-6 w-1 h-3 bg-[#f6ede8] rounded-full animate-pulse"></div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Premium Spotlight - First Section */}
//                         <div className="rounded-3xl shadow-2xl p-8 border-2"
//                             style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                             <div className="flex justify-between items-center mb-8">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
//                                         style={{ backgroundColor: '#f6ede8' }}>
//                                         ⭐
//                                     </div>
//                                     <h2 className="text-3xl font-black" style={{ color: '#4a3728' }}>
//                                         Premium Spotlight
//                                     </h2>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {premiumProfiles.map((user, index) => (
//                                     <div
//                                         key={index}
//                                         className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-105"
//                                         style={{ backgroundColor: '#f6ede8' }}
//                                     >
//                                         {/* Premium gradient border */}
//                                         <div className="absolute inset-0 bg-gradient-to-r from-#f6ede8 via-#e0d8cf to-#4a3728 p-0.5 rounded-2xl">
//                                             <div className="w-full h-full rounded-2xl" style={{ backgroundColor: '#f6ede8' }}></div>
//                                         </div>

//                                         <div className="relative p-5">
//                                             <div className="flex items-center justify-between mb-4">
//                                                 <div className="relative">
//                                                     <img
//                                                         src={user.img}
//                                                         alt={user.name}
//                                                         className="w-14 h-14 rounded-full border-3 border-amber-300 object-cover shadow-lg"
//                                                         onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/56'; }}
//                                                     />
//                                                 </div>
//                                                 <div className="px-2 py-1 rounded-full text-xs font-bold text-amber-800 bg-gradient-to-r from-amber-200 to-orange-200">
//                                                     ⭐ {user.badge}
//                                                 </div>
//                                             </div>

//                                             <h3 className="text-lg font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 transition-all duration-300"
//                                                 style={{ color: '#4a3728' }}>
//                                                 {user.name}
//                                             </h3>

//                                             <p className="text-sm opacity-80 mb-2 font-medium" style={{ color: '#4a3728' }}>
//                                                 {user.title}
//                                             </p>

//                                             <p className="text-xs opacity-60 mb-3" style={{ color: '#4a3728' }}>
//                                                 {user.stats}
//                                             </p>

//                                             <div className="mb-4">
//                                                 <div className="flex flex-wrap gap-1">
//                                                     {user.achievements.slice(0, 2).map((achievement, i) => (
//                                                         <span key={i}
//                                                             className="text-xs px-2 py-1 rounded-full font-medium opacity-80"
//                                                             style={{ backgroundColor: '#e0d8cf', color: '#4a3728' }}>
//                                                             {achievement}
//                                                         </span>
//                                                     ))}
//                                                 </div>
//                                             </div>

//                                             <button className="w-full px-3 py-2 rounded-xl font-bold text-white shadow-lg transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] hover:from-[#4a3728] hover:to-[#7a5c3e]">
//                                                 <span className="flex items-center justify-center gap-1 text-sm">
//                                                     ⭐ View Profile
//                                                 </span>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Suggestions For You */}
//                         <div className="rounded-3xl shadow-2xl p-8 border-2 mt-10"
//                             style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                             <div className="flex justify-between items-center mb-8">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
//                                         style={{ backgroundColor: '#f6ede8' }}>
//                                         <i className="ri-user-add-fill"></i>
//                                     </div>
//                                     <h4 className="text-3xl font-black" style={{ color: '#4a3728' }}>
//                                         Suggestions For You
//                                     </h4>
//                                 </div>

//                                 <button className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity px-4 py-2 rounded-xl"
//                                     style={{ color: '#4a3728', backgroundColor: '#f6ede8' }}>
//                                     View more →
//                                 </button>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                                 {suggestionForYou.map((person) => (
//                                     <div
//                                         key={person.id}
//                                         className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 transform hover:-translate-y-1"
//                                         style={{ backgroundColor: '#f6ede8' }}
//                                     >
//                                         <div className="relative p-5 flex flex-col h-full items-center text-center">
//                                             <img
//                                                 src={person.image}
//                                                 alt={person.name}
//                                                 className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg mb-3"
//                                                 onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64'; }}
//                                             />

//                                             <h3 className="font-bold text-base mb-1"
//                                                 style={{ color: '#4a3728' }}>
//                                                 {person.name}
//                                             </h3>

//                                             <p className="text-xs opacity-75 mb-2"
//                                                 style={{ color: '#4a3728' }}>
//                                                 {person.title}
//                                             </p>

//                                             <p className="text-xs opacity-60 mb-3"
//                                                 style={{ color: '#4a3728' }}>
//                                                 📍 {person.location}
//                                             </p>

//                                             <p className="text-[11px] opacity-50 mb-4"
//                                                 style={{ color: '#4a3728' }}>
//                                                 {person.mutuals}
//                                             </p>

//                                             <button
//                                                 onClick={() => handleConnect(person.id)}
//                                                 disabled={connectedUsers.has(person.id)}
//                                                 className={`w-full py-2 rounded-xl text-sm font-bold transition-all duration-300
//                                                 ${connectedUsers.has(person.id)
//                                                         ? 'text-white'
//                                                         : 'text-[#4a3728] hover:border hover:border-[#4a3728]'
//                                                     }`}
//                                                 style={{
//                                                     background: connectedUsers.has(person.id)
//                                                         ? 'linear-gradient(135deg, #4a3728, #7a5c3e)'
//                                                         : '#e0d8cf'
//                                                 }}
//                                             >
//                                                 {connectedUsers.has(person.id) ? 'Connected ✓' : '+ Connect'}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* People You May Know - Fifth Section */}
//                         <div className="rounded-3xl shadow-2xl p-8 border-2"
//                             style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                             <div className="flex justify-between items-center mb-8">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
//                                         style={{ backgroundColor: '#f6ede8' }}>
//                                         <i className="ri-hand-coin-fill"></i>
//                                     </div>
//                                     <h4 className="text-3xl font-black" style={{ color: '#4a3728' }}>People You May Know</h4>
//                                 </div>
//                                 <button className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity px-4 py-2 rounded-xl"
//                                     style={{ color: '#4a3728', backgroundColor: '#f6ede8' }}>
//                                     See all →
//                                 </button>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                                 {dummySuggestions.map((person) => (
//                                     <div
//                                         key={person.id}
//                                         className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 transform hover:-translate-y-1 hover:border-[#4a3728] hover:shadow-[0_0_15px_rgba(74,55,40,0.3)]"
//                                         style={{ backgroundColor: '#f6ede8' }}
//                                     >
//                                         <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
//                                             <div className="absolute inset-0 bg-gradient-to-br from-[#4a3728] to-[#7a5c3e] rounded-bl-3xl"></div>
//                                         </div>

//                                         <div className="relative p-5 flex flex-col h-full">
//                                             <div className="flex flex-col items-center text-center">
//                                                 <div className="relative mb-4">
//                                                     <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
//                                                     <div className="relative">
//                                                         <img
//                                                             src={person.image}
//                                                             alt={person.name}
//                                                             className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-xl relative z-10"
//                                                             onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64'; }}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <h3 className="font-bold text-base mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-600 transition-all duration-500"
//                                                     style={{ color: '#4a3728' }}>
//                                                     {person.name}
//                                                 </h3>

//                                                 <p className="text-xs opacity-75 mb-2 font-medium leading-tight" style={{ color: '#4a3728' }}>
//                                                     {person.title}
//                                                 </p>

//                                                 <div className="flex items-center gap-1 mb-2">
//                                                     <div className="w-2 h-2 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full"></div>
//                                                     <span className="text-xs opacity-60 font-medium" style={{ color: '#4a3728' }}>{person.location}</span>
//                                                 </div>

//                                                 <div className="flex items-center gap-1 mb-4">
//                                                     <div className="flex -space-x-1">
//                                                         <div className="w-4 h-4 bg-[#f6ede8] rounded-full border border-white"></div>
//                                                         <div className="w-4 h-4 bg-[#e0d8cf] rounded-full border border-white"></div>
//                                                         <div className="w-4 h-4 bg-[#f6ede8] rounded-full border border-white"></div>
//                                                     </div>
//                                                     <span className="text-xs opacity-50 font-medium ml-1" style={{ color: '#4a3728' }}>
//                                                         {person.mutuals}
//                                                     </span>
//                                                 </div>

//                                                 <button
//                                                     onClick={() => handleConnect(person.id)}
//                                                     disabled={connectedUsers.has(person.id)}
//                                                     className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold shadow-lg transform transition-all duration-300 ${connectedUsers.has(person.id)
//                                                         ? 'bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-white cursor-default'
//                                                         : 'text-[#4a3728] hover:bg-[#f6ede8] hover:border hover:border-[#4a3728] hover:shadow-md hover:opacity-90 active:scale-95'
//                                                         }`}
//                                                     style={{
//                                                         background: connectedUsers.has(person.id)
//                                                             ? 'linear-gradient(135deg, #4a3728, #7a5c3e)'
//                                                             : '#e0d8cf'
//                                                     }}
//                                                 >
//                                                     <span className="flex items-center justify-center gap-2">
//                                                         {connectedUsers.has(person.id) ? (
//                                                             <>
//                                                                 <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
//                                                                     <span className="text-[#7a5c3e] text-xs">✓</span>
//                                                                 </span>
//                                                                 Connected
//                                                             </>
//                                                         ) : (
//                                                             <>
//                                                                 <span className="animate-pulse">✨</span>
//                                                                 Connect
//                                                             </>
//                                                         )}
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                         </div>

//                                         <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                                             <div className="absolute top-4 left-4 w-1 h-3 bg-[#f6ede8] rounded-full animate-pulse"></div>
//                                             <div className="absolute top-8 right-6 w-1 h-3 bg-[#e0d8cf] rounded-full animate-pulse"></div>
//                                             <div className="absolute bottom-6 left-6 w-1 h-3 bg-[#f6ede8] rounded-full animate-pulse"></div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Premium Spotlight - Second Section */}
//                         <div className="rounded-3xl shadow-2xl p-8 border-2"
//                             style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                             <div className="flex justify-between items-center mb-8">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
//                                         style={{ backgroundColor: '#f6ede8' }}>
//                                         ⭐
//                                     </div>
//                                     <h2 className="text-3xl font-black" style={{ color: '#4a3728' }}>
//                                         Premium Spotlight
//                                     </h2>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {premiumProfiles.map((user, index) => (
//                                     <div
//                                         key={index}
//                                         className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-105"
//                                         style={{ backgroundColor: '#f6ede8' }}
//                                     >
//                                         {/* Premium gradient border */}
//                                         <div className="absolute inset-0 bg-gradient-to-r from-#f6ede8 via-#e0d8cf to-#4a3728 p-0.5 rounded-2xl">
//                                             <div className="w-full h-full rounded-2xl" style={{ backgroundColor: '#f6ede8' }}></div>
//                                         </div>

//                                         <div className="relative p-5">
//                                             <div className="flex items-center justify-between mb-4">
//                                                 <div className="relative">
//                                                     <img
//                                                         src={user.img}
//                                                         alt={user.name}
//                                                         className="w-14 h-14 rounded-full border-3 border-amber-300 object-cover shadow-lg"
//                                                         onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/56'; }}
//                                                     />
//                                                 </div>
//                                                 <div className="px-2 py-1 rounded-full text-xs font-bold text-amber-800 bg-gradient-to-r from-amber-200 to-orange-200">
//                                                     ⭐ {user.badge}
//                                                 </div>
//                                             </div>

//                                             <h3 className="text-lg font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 transition-all duration-300"
//                                                 style={{ color: '#4a3728' }}>
//                                                 {user.name}
//                                             </h3>

//                                             <p className="text-sm opacity-80 mb-2 font-medium" style={{ color: '#4a3728' }}>
//                                                 {user.title}
//                                             </p>

//                                             <p className="text-xs opacity-60 mb-3" style={{ color: '#4a3728' }}>
//                                                 {user.stats}
//                                             </p>

//                                             <div className="mb-4">
//                                                 <div className="flex flex-wrap gap-1">
//                                                     {user.achievements.slice(0, 2).map((achievement, i) => (
//                                                         <span key={i}
//                                                             className="text-xs px-2 py-1 rounded-full font-medium opacity-80"
//                                                             style={{ backgroundColor: '#e0d8cf', color: '#4a3728' }}>
//                                                             {achievement}
//                                                         </span>
//                                                     ))}
//                                                 </div>
//                                             </div>

//                                             <button className="w-full px-3 py-2 rounded-xl font-bold text-white shadow-lg transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] hover:from-[#4a3728] hover:to-[#7a5c3e]">
//                                                 <span className="flex items-center justify-center gap-1 text-sm">
//                                                     ⭐ View Profile
//                                                 </span>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Redesigned Profile Completion */}
//                         <div className="rounded-3xl shadow-2xl border-2 overflow-hidden"
//                             style={{ backgroundColor: '#e0d8cf', borderColor: '#4a3728' }}>
//                             <div className="relative p-8">
//                                 <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
//                                     style={{ backgroundColor: '#4a3728', transform: 'translate(50%, -50%)' }}></div>
//                                 <div className="relative flex items-start justify-between">
//                                     <div className="flex-1">
//                                         <div className="flex items-center gap-3 mb-4">
//                                             <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
//                                                 style={{ backgroundColor: '#f6ede8' }}>
//                                                 <i className="ri-account-pin-circle-fill"></i>
//                                             </div>
//                                             <div>
//                                                 <h3 className="text-2xl font-black" style={{ color: '#4a3728' }}>Complete Your Profile!</h3>
//                                                 <p className="text-sm opacity-70" style={{ color: '#4a3728' }}>Unlock more networking opportunities</p>
//                                             </div>
//                                         </div>

//                                         <div className="relative mb-6">
//                                             <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#f6ede8' }}>
//                                                 <div className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full shadow-inner transition-all duration-1000"
//                                                     style={{ width: '12%' }}></div>
//                                             </div>
//                                         </div>

//                                         <button className="group relative overflow-hidden px-8 py-4 rounded-2xl font-black text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
//                                             style={{ background: 'linear-gradient(135deg, #4a3728 0%, #6b4e3d 50%, #8b6f47 100%)' }}>
//                                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//                                             <span className="relative">🎯 Boost My Profile</span>
//                                         </button>
//                                     </div>

//                                     <div className="text-center">
//                                         <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black shadow-2xl mb-2"
//                                             style={{ backgroundColor: '#f6ede8', color: '#4a3728' }}>
//                                             12%
//                                         </div>
//                                         <div className="text-xs font-bold opacity-60" style={{ color: '#4a3728' }}>Profile Score</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// } -->

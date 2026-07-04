import { Person, ConnectionRequest, SentRequest, PremiumUser, Company } from '@/features/networks/types';
import { networkIcons } from './icons';

export const dummySuggestions: Person[] = [
    {
        id: "1", // ✅ Changed from number to string
        name: "Sakshi Pandey",
        title: "Attended Technocrats Institute Of Technology",
        mutuals: "Ankit and 51 other mutual connections",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        location: "Indore, MP"
    },
    {
        id: "2", // ✅ Changed
        name: "Shreyansh Khan",
        title: "SCADA, IoT, Power System",
        mutuals: "Ankit and 23 other mutual connections",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        location: "Bhopal, MP"
    },
    {
        id: "3", // ✅ Changed
        name: "Chinmay Yadav",
        title: "Student | Learner | SGSITS",
        mutuals: "Deepak and 6 other mutual connections",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
        location: "Indore, MP"
    },
    {
        id: "4", // ✅ Changed
        name: "RK",
        title: "Full-Stack Developer reactjs",
        mutuals: "Ankit and 45 other mutual connections",
        image: "https://randomuser.me/api/portraits/men/88.jpg",
        location: "Mumbai, MH,india"
    }
];

export const suggestionForYou: Person[] = [
    {
        id: "101", // ✅ Changed
        name: "Aman Verma",
        title: "Software Engineer | Java | Spring",
        mutuals: "Rahul and 12 other mutual connections",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
        location: "Delhi, India"
    },
    {
        id: "102", // ✅ Changed
        name: "Neha Sharma",
        title: "UI/UX Designer | Figma",
        mutuals: "Sakshi and 9 other mutual connections",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        location: "Pune, MH"
    },
    {
        id: "103", // ✅ Changed
        name: "Rohit Jain",
        title: "Backend Developer | Node.js",
        mutuals: "Ankit and 18 others",
        image: "https://randomuser.me/api/portraits/men/13.jpg",
        location: "Indore, MP"
    },
    {
        id: "104", // ✅ Changed
        name: "Pooja Malhotra",
        title: "HR | Talent Acquisition",
        mutuals: "Deepak and 7 others",
        image: "https://randomuser.me/api/portraits/women/14.jpg",
        location: "Gurgaon, HR"
    },
    {
        id: "105", // ✅ Changed
        name: "Aditya Singh",
        title: "React Developer | Frontend",
        mutuals: "Rahul and 21 others",
        image: "https://randomuser.me/api/portraits/men/15.jpg",
        location: "Bangalore, KA"
    },
    {
        id: "106", // ✅ Changed
        name: "Kritika Joshi",
        title: "Data Analyst | Power BI",
        mutuals: "Neha and 11 others",
        image: "https://randomuser.me/api/portraits/women/16.jpg",
        location: "Jaipur, RJ"
    },
    {
        id: "107", // ✅ Changed
        name: "Saurabh Mishra",
        title: "DevOps Engineer | AWS",
        mutuals: "Aman and 14 others",
        image: "https://randomuser.me/api/portraits/men/17.jpg",
        location: "Noida, UP"
    },
    {
        id: "108", // ✅ Changed
        name: "Simran Kaur",
        title: "Product Designer",
        mutuals: "Pooja and 6 others",
        image: "https://randomuser.me/api/portraits/women/18.jpg",
        location: "Chandigarh"
    },
    {
        id: "109", // ✅ Changed
        name: "Harsh Patel",
        title: "MERN Stack Developer",
        mutuals: "Rohit and 19 others",
        image: "https://randomuser.me/api/portraits/men/19.jpg",
        location: "Ahmedabad, GJ"
    },
    {
        id: "110", // ✅ Changed
        name: "Anjali Gupta",
        title: "MBA | Business Analyst",
        mutuals: "Kritika and 10 others",
        image: "https://randomuser.me/api/portraits/women/20.jpg",
        location: "Lucknow, UP"
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: `${111 + i}`, // ✅ Changed to string template
        name: `Professional ${i + 1}`,
        title: "Tech Enthusiast | Learner",
        mutuals: "5+ mutual connections",
        image: `https://randomuser.me/api/portraits/men/${30 + i}.jpg`,
        location: "India"
    }))
];

export const connectionRequests: ConnectionRequest[] = [
    {
        id: "201",
        name: "Rahul Meena",
        title: "Frontend Developer | React",
        mutuals: "12 mutual connections",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        location: "Jaipur, RJ"
    },
    {
        id: "202",
        name: "Kajal Verma",
        title: "UI Designer | Figma",
        mutuals: "8 mutual connections",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        location: "Indore, MP"
    }
];

export const sentRequests: SentRequest[] = [
    {
        id: (401).toString(), // ✅ Changed to string
        name: "Amit Sharma",
        title: "Backend Developer",
        image: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
        id: (402).toString(), // ✅ Changed to string
        name: "Sneha Joshi",
        title: "Product Designer",
        image: "https://randomuser.me/api/portraits/women/42.jpg"
    }
];

export const premiumProfiles: PremiumUser[] = [
    {
        name: "Ananya Dev",
        title: "AI Researcher & Innovation Leader",
        stats: "120K followers • Google DevFest Speaker",
        img: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33",
        badge: "AI Pioneer",
        achievements: ["TEDx Speaker", "Published Author", "Forbes 30 Under 30"]
    },
    {
        name: "Rohan Kapoor",
        title: "CTO & Startup Mentor",
        stats: "90K followers • 5 Successful Exits",
        img: "https://randomuser.me/api/portraits/men/75.jpg",
        badge: "Tech Visionary",
        achievements: ["Y Combinator", "Angel Investor", "Tech Advisor"]
    },
    {
        name: "Priya Mehra",
        title: "Data Science & ML Expert",
        stats: "150K followers • TEDx Speaker",
        img: "https://randomuser.me/api/portraits/women/60.jpg",
        badge: "Data Queen",
        achievements: ["Kaggle Grandmaster", "MIT Graduate", "AI Researcher"]
    }
];

export const networkStats = [
    { label: 'Connections', count: 3288, icon: networkIcons.connections, gradient: 'from-blue-400 to-purple-500' },
    { label: 'Contacts', count: 523, icon: networkIcons.contacts, gradient: 'from-green-400 to-blue-500' },
    { label: 'Following & Followers', count: 465, icon: networkIcons.followingFollowers, gradient: 'from-pink-400 to-red-500' },
    { label: 'Groups', count: 7, icon: networkIcons.groups, gradient: 'from-yellow-400 to-orange-500' },
    { label: 'Events', count: 3, icon: networkIcons.events, gradient: 'from-purple-400 to-pink-500' },
    { label: 'Pages', count: 168, icon: networkIcons.pages, gradient: 'from-indigo-400 to-purple-500' },
    { label: 'Newsletters', count: 51, icon: networkIcons.newsletters, gradient: 'from-teal-400 to-green-500' }
];

export const companySuggestions: Company[] = [
    {
        id: "company-1",
        name: "Google India",
        industry: "Technology / Software",
        employees: "50K+ employees",
        image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        location: "Bangalore, KA",
        description: "Search, AI & Cloud Services"
    },
    {
        id: "company-2",
        name: "Microsoft India",
        industry: "Technology / Software",
        employees: "40K+ employees",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        location: "Hyderabad, TS",
        description: "Cloud, AI & Enterprise Software"
    },
    {
        id: "company-3",
        name: "Amazon India",
        industry: "Technology / E-Commerce",
        employees: "100K+ employees",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        location: "Bangalore, KA",
        description: "E-Commerce, AWS & Cloud"
    },
    {
        id: "company-4",
        name: "Apple India",
        industry: "Technology / Hardware",
        employees: "10K+ employees",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        location: "Bangalore, KA",
        description: "Consumer Electronics & Services"
    },
    {
        id: "company-5",
        name: "Meta India",
        industry: "Technology / Social Media",
        employees: "30K+ employees",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc_logo.svg",
        location: "Bangalore, KA",
        description: "Social Media & AI Research"
    },
    {
        id: "company-6",
        name: "TCS (Tata Consultancy Services)",
        industry: "IT Services / Consulting",
        employees: "600K+ employees",
        image: "https://upload.wikimedia.org/wikipedia/en/b/ba/Tata_Consultancy_Services_Logo.svg",
        location: "Mumbai, MH",
        description: "IT Services & Consulting"
    },
    {
        id: "company-7",
        name: "Infosys",
        industry: "IT Services / Consulting",
        employees: "300K+ employees",
        image: "https://upload.wikimedia.org/wikipedia/en/d/dc/Infosys_logo.svg",
        location: "Bangalore, KA",
        description: "Digital Transformation & IT"
    },
    {
        id: "company-8",
        name: "HCL Technologies",
        industry: "IT Services",
        employees: "200K+ employees",
        image: "https://upload.wikimedia.org/wikipedia/en/4/41/HCL_Technologies_logo.svg",
        location: "Gurgaon, HR",
        description: "IT Services & Solutions"
    }
];
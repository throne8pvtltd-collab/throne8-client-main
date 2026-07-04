'use client';
import { useState } from "react";
import Sidebar from "../../features/company/components/Sidebar";

export default function CompanyLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { userId: string };
}) {
    const [collapsed, setCollapsed] = useState(false);
    console.log('CompanyLayout rendered with userId:', params.userId); // Debug log

    return (
        <div className="min-h-screen bg-white">
            <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
            <main className={`transition-all duration-300 p-6 min-h-screen ${collapsed ? 'md:ml-20' : 'md:ml-64'}`}>
                {children}
            </main>
        </div>
    );
}
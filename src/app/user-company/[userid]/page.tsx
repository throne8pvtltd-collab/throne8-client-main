// src/app/user-company/[companyid]/page.tsx
'use client'

import { Suspense, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks'
import { CompanyHero } from '../../../features/user-company/components/CompanyHero'
import { TabNav } from '../../../features/user-company/components/TabNav'
import { TabPanel } from '../../../features/user-company/components/TabPanel'
import { Sidebar } from '../../../features/user-company/components/Sidebar'
import { Footer } from '../../../features/user-company/components/Footer'
import { MobileBottomNav } from '../../../features/user-company/components/layout/MobileBottomNav'
import {
    fetchCompanyById,
    fetchCompanyEmployees,
    fetchCompanyPosts
} from '@/features/company/store/slices/companySlice'
import CompanyService from '@/lib/api/company.service'
import { fetchAllEvents } from '@/features/company/store/slices/eventSlice'
import { setFollowStatus } from '@/features/company/store/slices/uiSlice'

export default function CompanyPage() {
    const params = useParams()
    const companyId = params.companyid as string || params.userid as string
    const dispatch = useAppDispatch()
    const { isLoadingApi, error } = useAppSelector((state: any) => state.company)


    useEffect(() => {
        if (companyId) {
            dispatch(fetchCompanyById(companyId));
            dispatch(fetchCompanyEmployees(companyId));
            dispatch(fetchCompanyPosts(companyId));
            dispatch(fetchAllEvents());

            CompanyService.getCompanyFollowStatus(companyId)
                .then((res) => {
                    if (res?.data?.isFollowing) {
                        dispatch(setFollowStatus(true)); 
                    }
                })
                .catch(() => {
                   
                });
        }
    }, [companyId, dispatch]);

   
    useEffect(() => {
        if (companyId) {
            CompanyService.trackCompanyEvent({
                companyId,
                eventType: 'page_view',
            }).catch(() => {
               
            });
        }
    }, [companyId]);

    const meta = useAppSelector((state: any) => state.company.meta);
    const apiData = useAppSelector((state: any) => state.company.apiData);

    if (isLoadingApi) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#d4c4b5] border-t-[#4a3728] rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen text-[#2d1f14]">
            <CompanyHero />
            <TabNav />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="flex gap-6 items-start">
                    <div className="flex-1 min-w-0">
                        <Suspense fallback={
                            <div className="py-16 flex justify-center">
                                <div className="w-5 h-5 border-2 border-[#d4c4b5] border-t-[#4a3728] rounded-full animate-spin" />
                            </div>
                        }>
                            <TabPanel />
                        </Suspense>
                    </div>
                    <div className="hidden lg:block w-72 xl:w-80 shrink-0">
                        <Sidebar />
                    </div>
                </div>
            </main>
            <Footer />
            <MobileBottomNav />
        </div>
    )
}
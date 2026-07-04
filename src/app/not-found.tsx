// src/app/not-found.tsx
'use client'
import { useAuth, useProtectedRoute } from "@/features/auth/hooks/useAuth";
import { useEducation } from "@/features/profile/hooks/useEducation";
import { useProfile } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router= useRouter();
  const { user, isLoading } = useAuth();

  const { loadProfile, loadPosts } = useProfile();
  const { loadEducation } = useEducation();

  useEffect(() => {
    if (user) {
      loadProfile();   // ← Redux action
      loadPosts();
      loadEducation();
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="mb-4 text-6xl font-bold text-[#4a3728]">404</h1>
      <h2 className="mb-4 text-3xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="mb-8 max-w-md text-center text-gray-600">
        Sorry, we could not find the page you are looking for on Throne8.
      </p>
      <button
        onClick ={ ()=> router.push(user ? "/dashboard" : "/login")}
        // onClick={()=>
        //   router.push("/login")
        // }
        className="rounded-xl bg-[#4a3728] px-8 py-4 text-white font-medium hover:bg-[#3a2a1e] transition shadow-lg"
      >
        Go Back {user ? 'home page' : 'login page'}
      </button>
    </div>
  );
}
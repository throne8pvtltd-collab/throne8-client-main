'use client';

import { useState } from 'react';
import Link from 'next/link';

const profileImage = 'https://i.pinimg.com/736x/f6/61/ea/f661ea61616909838a9fbfeda0d2ea14.jpg';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#e0d8cf] text-[#4a3728] shadow-md z-50 border-b border-[#d4c8be]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="text-2xl font-bold text-[#4a3728] tracking-tight hover:text-[#6b4e3d] transition-colors">
          Throne8
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center bg-[#f6ede8] rounded-full px-4 py-2 shadow-sm w-64">
          <svg className="w-4 h-4 text-[#4a3728]/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search people, posts, jobs..."
            className="bg-transparent text-sm text-[#4a3728] placeholder-[#4a3728]/40 focus:outline-none ml-2 w-full"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 text-[#4a3728]/70 hover:text-[#4a3728] hover:bg-[#f6ede8] rounded-xl transition-all duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#4a3728] rounded-full" />
          </button>

          {/* Profile dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#f6ede8] transition-all duration-200">
              <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-[#d4c8be] shadow-sm">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="hidden md:block text-sm font-semibold text-[#4a3728]">Honey</span>
              <svg className="w-3 h-3 text-[#4a3728]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-[#f6ede8] rounded-xl shadow-xl py-2 hidden group-hover:block border border-[#e0d8cf] z-50">
              {[
                { label: 'View Profile', href: '/' },
                { label: 'Edit Profile', href: '/edit' },
                { label: 'Settings', href: '#' },
                { label: 'Logout', href: '#' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm text-[#4a3728] hover:bg-[#e0d8cf] transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
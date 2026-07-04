"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    searchGroupsThunk,
    fetchTrendingGroupsThunk,
    fetchPopularGroupsThunk,
    fetchRecommendedGroupsThunk,
    joinGroupThunk,
} from "@/hooks/studyGroup/features/groups/group.thunks";
import {
    selectSearchResults,
    selectSearchResultsLoading,
    selectTrendingGroups,
    selectPopularGroups,
    selectJoiningGroupId,
    selectRecommendedGroups
} from "@/hooks/studyGroup/features/groups/groupsSlice";
import { Search, TrendingUp, Flame, Users, Lock, Globe, Loader2, X, Sparkles } from "lucide-react";
import { GroupCategory } from "@/lib/api/studyGroup.service";
import { useRouter } from "next/navigation";

interface SearchDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    query: string;
    onQueryChange: (val: string) => void;
}

// ── Single result row ──────────────────────────────────────────────────────────
const GroupRow = ({
    group,
    joiningGroupId,
    onJoin,
    onOpen,
}: {
    group: any;
    joiningGroupId: string | null;
    onJoin: (group: any) => void;
    onOpen: (groupId: string) => void;
}) => {
    const isJoining = joiningGroupId === group.groupId;
    const isMember = group.isMember ?? false;
    const spotsLeft = group.capacity - group.currentMemberCount;
    const isFull = spotsLeft <= 0;

    return (
        <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f6ede8]/70 rounded-xl transition-colors cursor-pointer">
            {/* Avatar */}
            <div
                onClick={() => onOpen(group.groupId)}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8b7355] to-[#4a3728] flex items-center justify-center flex-shrink-0 shadow-sm"
            >
                <span className="text-white font-bold text-sm">
                    {group.title?.charAt(0)?.toUpperCase() ?? "G"}
                </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0" onClick={() => onOpen(group.groupId)}>
                <div className="flex items-center gap-1.5">
                    {/* <p className="text-sm font-semibold text-[#4a3728] truncate">{group.title}</p> */}
                    <p className="text-sm font-bold text-[#1a0f0a] truncate">{group.title}</p>
                    {group.visibility === "private"
                        ? <Lock className="w-3 h-3 text-[#8b7355] flex-shrink-0" />
                        : <Globe className="w-3 h-3 text-[#8b7355] flex-shrink-0" />
                    }
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                    {/* <span className="text-xs text-[#8b7355] bg-[#f6ede8] px-1.5 py-0.5 rounded-full">
                        {group.category}
                    </span>
                    <span className="text-xs text-[#6b5847]"> */}
                    <span className="text-xs text-[#5a3e2b] bg-[#f0e4d8] px-1.5 py-0.5 rounded-full font-semibold">
                        {group.category}
                    </span>
                    <span className="text-xs text-[#4a3728] font-medium">
                        {group.currentMemberCount}/{group.capacity}
                    </span>
                    {!isFull && (
                        // <span className="text-xs text-green-600">{spotsLeft} left</span>
                        <span className="text-xs text-green-700 font-semibold">{spotsLeft} left</span>
                    )}
                </div>
            </div>

            {/* Action button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    isMember ? onOpen(group.groupId) : onJoin(group);
                }}
                disabled={(isFull && !isMember) || isJoining}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isFull && !isMember
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#8b7355] to-[#6b5847] text-white hover:from-[#6b5847] hover:to-[#4a3728]"
                    }`}
            >
                {isJoining
                    ? <Loader2 className="w-3 h-3 animate-spin" />
                    : isMember ? "Open" : isFull ? "Full" : "Join"
                }
            </button>
        </div>
    );
};

// ── Section header ─────────────────────────────────────────────────────────────
const SectionLabel = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center gap-1.5 px-3 pt-3 pb-1">
        {icon}
        <span className="text-xs font-bold text-[#5a3e2b] uppercase tracking-widest">{label}</span>
    </div>
);

// ── Main Dropdown ──────────────────────────────────────────────────────────────
export default function SearchDropdown({
    isOpen,
    onClose,
    query,
    onQueryChange,
}: SearchDropdownProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout>();


    const searchResults = useAppSelector(selectSearchResults) ?? [];
    const searchLoading = useAppSelector(selectSearchResultsLoading);
    const trendingGroups = useAppSelector(selectTrendingGroups) ?? [];
    const popularGroups = useAppSelector(selectPopularGroups) ?? [];
    const joiningGroupId = useAppSelector(selectJoiningGroupId);
    // ADD inside component
    const recommendedGroups = useAppSelector(selectRecommendedGroups) ?? [];

    const hasQuery = (query ?? "").trim().length > 0;
    const hasResults = searchResults.length > 0;

    // Fetch discovery data once on open
    useEffect(() => {
        if (isOpen) {
            if (!trendingGroups.length) dispatch(fetchTrendingGroupsThunk(5));
            if (!popularGroups.length) dispatch(fetchPopularGroupsThunk(5));
            if (!recommendedGroups.length) dispatch(fetchRecommendedGroupsThunk({ limit: 5 }));
        }
    }, [isOpen]);

    // Click outside to close
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        if (isOpen) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, onClose]);
    useEffect(() => {
        clearTimeout(debounceRef.current);
        if (!query.trim()) {
            return;
        }
        debounceRef.current = setTimeout(() => {
            dispatch(searchGroupsThunk({ search: query.trim(), limit: 20 }));
        }, 300);
        return () => clearTimeout(debounceRef.current);
    }, [query, dispatch]);

    const handleJoin = async (group: any) => {
        await dispatch(joinGroupThunk({ groupId: group.groupId }));
    };

    const handleOpen = (groupId: string) => {
        onClose();
        router.push(`/study/groups/${groupId}`);
    };

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className="absolute top-full left-0 w-full mt-2 z-[200] bg-white rounded-2xl shadow-2xl border-2 border-[#e0d8cf] overflow-hidden"
        >
            <div
                className="max-h-[280px] overflow-y-auto p-2 hide-scrollbar">

                {/* Loading */}
                {hasQuery && searchLoading && (
                    <div className="flex items-center justify-center gap-2 py-8 text-[#8b7355]">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {/* <span className="text-sm">Searching...</span> */}
                        <span className="text-sm font-semibold text-[#4a3728]">Searching...</span>
                    </div>
                )}

                {/* Search results */}
                {hasQuery && !searchLoading && hasResults && (
                    <>
                        <div className="flex items-center justify-between px-3 pt-2 pb-1">
                            <span className="text-xs font-bold text-[#8b7355] uppercase tracking-widest">
                                Results
                            </span>
                            <span className="text-xs text-[#7a6050] font-medium">{searchResults.length} found</span>
                        </div>
                        {searchResults.map((g) => (
                            <GroupRow
                                key={g.groupId}
                                group={g}
                                joiningGroupId={joiningGroupId}
                                onJoin={handleJoin}
                                onOpen={handleOpen}
                            />
                        ))}
                    </>
                )}

                {/* No results */}
                {hasQuery && !searchLoading && !hasResults && (
                    <div className="text-center py-8">
                        <Search className="w-7 h-7 mx-auto mb-2 text-[#c4b5a5]" />
                       
                        <p className="text-sm font-bold text-[#2a1810]">No groups found</p>
                        <p className="text-xs text-[#7a6050] mt-1">Try a different search term</p>
                    </div>
                )}

                {/* Empty state — discovery */}
                {!hasQuery && (
                    <>
                        {trendingGroups.length > 0 && (
                            <>
                                <SectionLabel
                                    icon={<TrendingUp className="w-3.5 h-3.5 text-[#8b7355]" />}
                                    label="Trending This Week"
                                />
                                {trendingGroups.slice(0, 3).map((g) => (
                                    <GroupRow
                                        key={g.groupId}
                                        group={g}
                                        joiningGroupId={joiningGroupId}
                                        onJoin={handleJoin}
                                        onOpen={handleOpen}
                                    />
                                ))}
                            </>
                        )}

                        {popularGroups.length > 0 && (
                            <>
                                <SectionLabel
                                    icon={<Flame className="w-3.5 h-3.5 text-orange-500" />}
                                    label="Most Popular"
                                />
                                {popularGroups.slice(0, 3).map((g) => (
                                    <GroupRow
                                        key={g.groupId}
                                        group={g}
                                        joiningGroupId={joiningGroupId}
                                        onJoin={handleJoin}
                                        onOpen={handleOpen}
                                    />
                                ))}
                            </>
                        )}

                        // ADD in empty state section after popularGroups
                        {recommendedGroups.length > 0 && (
                            <>
                                <SectionLabel
                                    icon={<Sparkles className="w-3.5 h-3.5 text-yellow-500" />}
                                    label="Recommended"
                                />
                                {recommendedGroups.slice(0, 3).map((g) => (
                                    <GroupRow
                                        key={g.groupId}
                                        group={g}
                                        joiningGroupId={joiningGroupId}
                                        onJoin={handleJoin}
                                        onOpen={handleOpen}
                                    />
                                ))}
                            </>
                        )}

                        {!trendingGroups.length && !popularGroups.length && (
                            <div className="text-center py-8">
                                <Search className="w-7 h-7 mx-auto mb-2 text-[#c4b5a5]" />
                                <p className="text-sm text-[#6b5847]">Start typing to search groups</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
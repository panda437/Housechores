"use client";

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BottomNav } from '@/components/BottomNav';
import { Trophy, Medal, Crown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/leaderboard')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setLeaderboard(data);
                setLoading(false);
            });
    }, []);

    return (
        <main className="pb-24">
            <Header title="Hall of Heroes" subtitle="Every point makes a legend! 🏆" />

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                </div>
            ) : (
                <div className="px-6 space-y-6">
                    {leaderboard.length > 0 ? (
                        <>
                            {/* Top 3 Podium */}
                            <div className="flex justify-center items-end gap-2 py-8">
                                {leaderboard[1] && <PodiumEntry rank={2} user={leaderboard[1]} height="h-32" />}
                                {leaderboard[0] && <PodiumEntry rank={1} user={leaderboard[0]} height="h-44" />}
                                {leaderboard[2] && <PodiumEntry rank={3} user={leaderboard[2]} height="h-24" />}
                            </div>

                            {/* Rest of the List */}
                            <div className="space-y-4">
                                {leaderboard.slice(3).map((user, idx) => (
                                    <div key={user.id} className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                                        <div className="font-black text-slate-300 w-6">#{idx + 4}</div>
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl">
                                            {user.avatarUrl}
                                        </div>
                                        <div className="flex-1 font-bold text-slate-700">{user.name}</div>
                                        <div className="font-black text-indigo-600">{user.points}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="w-24 h-24 bg-amber-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-4xl">
                                🏆
                            </div>
                            <h2 className="text-3xl font-black text-slate-800 mb-4">No Heroes Yet!</h2>
                            <p className="text-slate-500 font-medium mb-10 leading-relaxed max-w-[240px] mx-auto">
                                Points are waiting to be claimed. Add your family and start the quest!
                            </p>
                            <Link href="/admin/users">
                                <Button size="lg" className="w-full h-16 rounded-3xl gap-2 shadow-xl shadow-amber-100 bg-amber-400 hover:bg-amber-500 text-indigo-900 border-none">
                                    Add Family Members
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            <BottomNav />
        </main>
    );
}

function PodiumEntry({ rank, user, height }: { rank: number; user: any; height: string }) {
    const colors = {
        1: 'bg-amber-400 text-amber-900',
        2: 'bg-slate-300 text-slate-700',
        3: 'bg-orange-400 text-orange-900',
    }[rank];

    const Icon = rank === 1 ? Crown : Medal;

    return (
        <div className="flex flex-col items-center flex-1">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative mb-2"
            >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border-2 border-slate-50 flex items-center justify-center text-3xl">
                    {user.avatarUrl}
                </div>
                <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${colors} flex items-center justify-center shadow-lg border-2 border-white`}>
                    <Icon className="w-4 h-4" />
                </div>
            </motion.div>
            <div className="text-center mb-2">
                <div className="font-black text-slate-800 text-sm truncate w-24 px-2">{user.name}</div>
                <div className="font-black text-indigo-600 text-xs">{user.points} PTS</div>
            </div>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height }}
                className={`w-full ${colors} rounded-t-3xl opacity-30 flex items-center justify-center font-black text-4xl border-x border-t border-white/20`}
            >
                {rank}
            </motion.div>
        </div>
    );
}

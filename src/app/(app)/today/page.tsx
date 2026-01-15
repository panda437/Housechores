"use client";

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BottomNav } from '@/components/BottomNav';
import { Flame, Loader2, Sparkles, Zap } from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';
import { CompleteChoreModal } from '@/components/CompleteChoreModal';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function TodayPage() {
    const { data: session } = useSession();
    const [chores, setChores] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeChore, setActiveChore] = useState<any | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // HouseId is now pulled from session by the API
                const [choresRes, usersRes] = await Promise.all([
                    fetch('/api/chores'),
                    fetch('/api/users')
                ]);

                const choresData = await choresRes.json();
                const usersData = await usersRes.json();

                if (Array.isArray(choresData)) setChores(choresData);
                if (Array.isArray(usersData)) setUsers(usersData);

                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleComplete = async (userId: string) => {
        if (!activeChore) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    choreId: activeChore._id,
                    userId,
                }),
            });

            if (res.ok) {
                fireConfetti();
                setChores(chores.filter(c => c._id !== activeChore._id));
                setActiveChore(null);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const repeatingChores = chores.filter(c => ['daily', 'weekly', 'monthly'].includes(c.repeatType));
    const oneTimeChores = chores.filter(c => c.repeatType === 'once');

    return (
        <main className="pb-24">
            <Header
                title="Mission Control"
                subtitle={session?.user?.name ? `${session.user.name}'s Household 🚀` : "Earn points, be a hero! 🚀"}
            />

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                </div>
            ) : chores.length === 0 ? (
                <div className="px-6 py-20 text-center">
                    <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-4xl">
                        🚀
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-4">No Missions Yet!</h2>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                        Your household is ready for a hero. Head to the Admin HQ to set up your first missions.
                    </p>
                    <Link href="/admin/chores">
                        <Button size="lg" className="w-full h-16 rounded-3xl gap-2 shadow-xl shadow-indigo-100">
                            <Zap className="w-5 h-5 fill-white" /> Gear Up Now
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="px-6 space-y-8">
                    {/* Repeating Chores Section */}
                    {repeatingChores.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4 fill-indigo-400" />
                                Repeating Missions
                            </h2>
                            <div className="space-y-4">
                                {repeatingChores.map((chore) => (
                                    <ChoreCard key={chore._id} chore={chore} onClick={() => setActiveChore(chore)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* One-time Chores Section */}
                    {oneTimeChores.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 fill-pink-400" />
                                One-time Quests
                            </h2>
                            <div className="space-y-4">
                                {oneTimeChores.map((chore) => (
                                    <ChoreCard key={chore._id} chore={chore} onClick={() => setActiveChore(chore)} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}

            {activeChore && (
                <CompleteChoreModal
                    chore={activeChore}
                    users={users}
                    onComplete={handleComplete}
                    onClose={() => setActiveChore(null)}
                    isSubmitting={isSubmitting}
                />
            )}

            <BottomNav />
        </main>
    );
}

function ChoreCard({ chore, onClick }: { chore: any; onClick: () => void }) {
    return (
        <Card
            className="relative overflow-hidden group cursor-pointer active:scale-95 transition-all"
            onClick={onClick}
        >
            <div className="flex justify-between items-center relative z-10">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">{chore.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-amber-500 font-black text-sm">
                            <Flame className="w-4 h-4" />
                            {chore.points} PTS
                        </span>
                        {chore.repeatType !== 'daily' && chore.repeatType !== 'once' && (
                            <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-50 px-1.5 py-0.5 rounded">
                                {chore.repeatType}
                            </span>
                        )}
                    </div>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <Sparkles className="w-5 h-5" />
                </div>
            </div>

            <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-50 rounded-full group-hover:scale-[10] transition-transform duration-700 opacity-30 -z-0" />
        </Card>
    );
}

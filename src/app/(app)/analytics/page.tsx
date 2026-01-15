"use client";

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { BottomNav } from '@/components/BottomNav';
import { BarChart3, Clock, TrendingUp, Loader2, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

export default function AnalyticsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/logs/details')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setLogs(data);
                setLoading(false);
            });
    }, []);

    const totalPoints = logs.reduce((sum, log) => sum + log.points, 0);

    return (
        <main className="pb-24">
            <Header title="Chore Insights" subtitle="Watch your hero score grow! 📈" />

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                </div>
            ) : (
                <div className="px-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-indigo-600 border-none text-white p-4">
                            <div className="flex justify-between items-start">
                                <BarChart3 className="w-5 h-5 text-indigo-200" />
                                <ArrowUpRight className="w-4 h-4 text-indigo-200" />
                            </div>
                            <div className="mt-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Total Points</p>
                                <h3 className="text-3xl font-black">{totalPoints}</h3>
                            </div>
                        </Card>

                        <Card className="bg-pink-500 border-none text-white p-4">
                            <div className="flex justify-between items-start">
                                <Clock className="w-5 h-5 text-pink-200" />
                                <TrendingUp className="w-4 h-4 text-pink-200" />
                            </div>
                            <div className="mt-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-pink-200">Completed</p>
                                <h3 className="text-3xl font-black">{logs.length}</h3>
                            </div>
                        </Card>
                    </div>

                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">
                        Recent Achievements
                    </h2>

                    <div className="space-y-4">
                        {logs.length === 0 && (
                            <p className="text-center text-slate-400 py-10 font-medium italic">
                                No logs found yet.
                            </p>
                        )}
                        {logs.map((log) => (
                            <div key={log._id} className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                                <div className="text-2xl w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl">
                                    {log.userId?.avatarUrl || '👤'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 leading-tight text-sm">
                                        {log.userId?.name} completed <span className="text-indigo-600">{log.choreId?.name}</span>
                                    </h4>
                                    <p className="text-xs font-medium text-slate-400 mt-0.5">
                                        {format(new Date(log.completedAt), 'MMM d, h:mm a')}
                                    </p>
                                </div>
                                <div className="text-amber-500 font-black">
                                    +{log.points}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <BottomNav />
        </main>
    );
}

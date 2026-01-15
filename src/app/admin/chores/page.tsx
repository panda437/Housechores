"use client";

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BottomNav } from '@/components/BottomNav';
import { PlusCircle, ArrowLeft, Loader2, Trash2, Zap, Sparkles, Edit2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminChoresPage() {
    const [chores, setChores] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [points, setPoints] = useState('50');
    const [type, setType] = useState<'daily' | 'weekly' | 'monthly' | 'once'>('daily');
    const [isAdding, setIsAdding] = useState(false);
    const [editingChoreId, setEditingChoreId] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/chores')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setChores(data);
                setLoading(false);
            });
    }, []);

    const handleAddChore = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        setIsAdding(true);
        try {
            const endpoint = editingChoreId ? `/api/chores?id=${editingChoreId}` : '/api/chores';
            const method = editingChoreId ? 'PUT' : 'POST';

            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    points: parseInt(points),
                    repeatType: type,
                    active: true
                }),
            });

            if (res.ok) {
                const chore = await res.json();
                if (editingChoreId) {
                    setChores(chores.map(c => c._id === editingChoreId ? chore : c));
                } else {
                    setChores([...chores, chore]);
                }
                resetForm();
            }
        } finally {
            setIsAdding(false);
        }
    };

    const resetForm = () => {
        setName('');
        setPoints('50');
        setType('daily');
        setEditingChoreId(null);
    };

    const handleEditClick = (chore: any) => {
        setEditingChoreId(chore._id);
        setName(chore.name);
        setPoints(chore.points.toString());
        setType(chore.repeatType);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteChore = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        const res = await fetch(`/api/chores?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            setChores(chores.filter(c => c._id !== id));
        }
    };

    return (
        <main className="pb-24">
            <div className="flex items-center px-4 pt-4">
                <Link href="/admin">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                </Link>
            </div>

            <Header title="Chore Library" subtitle="Create missions for the family" />

            <div className="px-6 space-y-6">
                <Card className="bg-slate-50 border-dashed border-2 border-slate-200 shadow-none">
                    <form onSubmit={handleAddChore} className="space-y-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            {editingChoreId ? <Edit2 className="w-4 h-4 text-indigo-600" /> : <PlusCircle className="w-4 h-4" />}
                            {editingChoreId ? "Edit Mission" : "New Mission"}
                        </h3>

                        <input
                            type="text"
                            placeholder="Mission Name (e.g. Set Table)"
                            className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700 placeholder:text-slate-300"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Points</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700"
                                    value={points}
                                    onChange={(e) => setPoints(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Frequency</label>
                                <select
                                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as any)}
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="once">One-time</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" className="flex-1 py-4 rounded-2xl" disabled={isAdding}>
                                {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingChoreId ? "Update Mission" : "Create Mission")}
                            </Button>
                            {editingChoreId && (
                                <Button type="button" variant="outline" className="py-4 rounded-2xl" onClick={resetForm}>
                                    <XCircle className="w-5 h-5" />
                                </Button>
                            )}
                        </div>
                    </form>
                </Card>

                <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Manage Missions</h4>
                    {loading ? (
                        <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-300" /></div>
                    ) : (
                        chores.map(chore => (
                            <div key={chore._id} className="flex items-center justify-between p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl ${chore.repeatType === 'daily' ? 'bg-indigo-50 text-indigo-600' : 'bg-pink-50 text-pink-600'}`}>
                                        {chore.repeatType === 'daily' ? <Zap className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <span className="font-bold text-slate-700 block leading-tight">{chore.name}</span>
                                        <span className="text-[10px] font-black text-amber-500 uppercase">{chore.points} PTS • {chore.repeatType}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleEditClick(chore)}
                                        className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteChore(chore._id)}
                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <BottomNav />
        </main>
    );
}

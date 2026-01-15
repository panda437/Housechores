"use client";

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BottomNav } from '@/components/BottomNav';
import { UserPlus, ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';

const AVATARS = ['👦', '👩‍🦰', '🦊', '🦉', '🐱', '🐶', '🦄', '🦁'];

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(AVATARS[0]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setUsers(data);
                setLoading(false);
            });
    }, []);

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        setIsAdding(true);
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    avatarUrl: avatar,
                    role: 'player'
                }),
            });

            if (res.ok) {
                const newUser = await res.json();
                setUsers([...users, newUser]);
                setName('');
            }
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            setUsers(users.filter(u => u._id !== id));
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

            <Header title="Family Members" subtitle="Add or remove kids and heroes" />

            <div className="px-6 space-y-6">
                <Card className="bg-slate-50 border-dashed border-2 border-slate-200 shadow-none">
                    <form onSubmit={handleAddUser} className="space-y-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <UserPlus className="w-4 h-4" /> Add Member
                        </h3>

                        <input
                            type="text"
                            placeholder="Name (e.g. Sarah)"
                            className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold placeholder:text-slate-300"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className="flex flex-wrap gap-2">
                            {AVATARS.map(a => (
                                <button
                                    key={a}
                                    type="button"
                                    onClick={() => setAvatar(a)}
                                    className={`w-10 h-10 text-2xl flex items-center justify-center rounded-xl transition-all ${avatar === a ? 'bg-indigo-600 scale-110 shadow-lg' : 'bg-white hover:bg-slate-100'}`}
                                >
                                    {a}
                                </button>
                            ))}
                        </div>

                        <Button type="submit" className="w-full py-4 rounded-2xl" disabled={isAdding}>
                            {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add to Household"}
                        </Button>
                    </form>
                </Card>

                <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Members</h4>
                    {loading ? (
                        <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-300" /></div>
                    ) : (
                        users.map(user => (
                            <div key={user._id} className="flex items-center justify-between p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{user.avatarUrl || '👤'}</span>
                                    <span className="font-bold text-slate-700">{user.name}</span>
                                    {user.role === 'admin' && <span className="text-[8px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-black uppercase">Admin</span>}
                                </div>
                                {user.role !== 'admin' && (
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <BottomNav />
        </main>
    );
}

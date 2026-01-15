"use client";

import { Header } from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BottomNav } from '@/components/BottomNav';
import { Users, ClipboardList, ShieldCheck, ArrowRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function AdminPage() {
    const { data: session } = useSession();

    return (
        <main className="pb-24">
            <Header title="Mission HQ" subtitle="Manage your household system 🛠️" />

            <div className="px-6 space-y-6">
                <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                    <ShieldCheck className="w-12 h-12 text-indigo-300 mb-4" />
                    <h2 className="text-2xl font-black leading-tight">Admin Dashboard</h2>
                    <p className="text-indigo-100 font-medium mt-1">Control center for parents</p>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                </div>

                <div className="grid gap-4">
                    <Link href="/admin/users">
                        <Card className="hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">Family Members</h3>
                                        <p className="text-xs text-slate-500 font-medium">Add kids and set avatars</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Card>
                    </Link>

                    <Link href="/admin/chores">
                        <Card className="hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center">
                                        <ClipboardList className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">Chore Library</h3>
                                        <p className="text-xs text-slate-500 font-medium">Create and edit missions</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Card>
                    </Link>
                </div>

                <div className="pt-8 space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Settings</h4>
                    <Card className="bg-slate-50 border-none shadow-none p-4">
                        <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                            <span>Account Email</span>
                            <span className="text-slate-800">{session?.user?.email}</span>
                        </div>
                    </Card>

                    <Button
                        variant="outline"
                        className="w-full h-14 rounded-3xl text-red-500 border-red-100 hover:bg-red-50 gap-2 font-black uppercase tracking-widest text-[10px]"
                        onClick={() => signOut({ callbackUrl: '/' })}
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </Button>
                </div>
            </div>

            <BottomNav />
        </main>
    );
}

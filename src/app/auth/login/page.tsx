"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Zap, Loader2, LogIn, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get('registered');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError(res.error);
            setLoading(false);
        } else {
            router.push('/today');
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col justify-center px-6 py-12">
            <div className="mb-12 text-center text-slate-800">
                <Link href="/" className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-3xl text-white mb-6 shadow-xl shadow-indigo-100 hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 fill-white" />
                </Link>
                <h1 className="text-4xl font-black">Welcome Back</h1>
                <p className="text-slate-500 font-medium mt-2 italic">Ready for today's adventures?</p>
            </div>

            <Card className="p-8 shadow-2xl">
                <form onSubmit={handleLogin} className="space-y-6">
                    {registered && !error && (
                        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Account Created! Please Sign In.
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100 italic">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-2 block">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="e.g. sarah@example.com"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all placeholder:text-slate-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-2 block">Password</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all placeholder:text-slate-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full h-16 rounded-3xl" disabled={loading}>
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <span className="flex items-center gap-2">
                                Sign Into Household <LogIn className="w-5 h-5" />
                            </span>
                        )}
                    </Button>
                </form>
            </Card>

            <p className="text-center mt-8 text-slate-500 font-bold">
                New to Home Chore Hero?{' '}
                <Link href="/auth/signup" className="text-indigo-600 hover:underline">
                    Create Account
                </Link>
            </p>
        </main>
    );
}

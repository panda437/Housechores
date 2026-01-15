"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Zap, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                // Automatically check if they can sign in after signup
                router.push('/auth/login?registered=true');
            } else {
                const data = await res.json();
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Could not connect to the server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col justify-center px-6 py-12">
            <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-3xl text-white mb-6 shadow-xl shadow-indigo-200">
                    <Zap className="w-8 h-8 fill-white" />
                </div>
                <h1 className="text-3xl font-black text-slate-800">Become a Hero</h1>
                <p className="text-slate-500 font-medium mt-2">Create your family household in seconds</p>
            </div>

            <Card className="p-8 shadow-2xl">
                <form onSubmit={handleSignup} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100 italic">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-2 block">Parent Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Sarah Miller"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all placeholder:text-slate-300"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-2 block">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="sarah@example.com"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all placeholder:text-slate-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-2 block">Choose Password</label>
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
                                Create My Household <ArrowRight className="w-5 h-5" />
                            </span>
                        )}
                    </Button>
                </form>
            </Card>

            <p className="text-center mt-8 text-slate-500 font-bold">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-indigo-600 hover:underline">
                    Sign In
                </Link>
            </p>
        </main>
    );
}

"use client";

import { Header } from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Trophy, Zap, Sparkles, Heart, Star, Layout, Users, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-stretch">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden bg-indigo-600">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/20 rounded-full -ml-24 -mb-24 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest mb-6 border border-white/20">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Family Life, Upgraded
          </div>
          <h1 className="text-5xl font-black text-white leading-[1.1] mb-6">
            Turn Chores into an <span className="text-amber-400">Epic Quest!</span>
          </h1>
          <p className="text-indigo-100 text-lg font-medium mb-10 max-w-sm mx-auto">
            The fun, effortless system that motivates kids to help out, earn points, and climb the family leaderboard.
          </p>

          <div className="flex flex-col gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full h-16 text-lg rounded-3xl bg-amber-400 hover:bg-amber-500 text-indigo-900 border-none shadow-xl shadow-amber-900/20">
                Start Your Family Quest
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 h-14 rounded-3xl">
                Already a Hero? Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-slate-50">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-12 text-center">How It Works</h2>

        <div className="space-y-6">
          <FeatureCard
            icon={<Users className="w-6 h-6 text-indigo-600" />}
            title="Create Your Household"
            description="Sign up and add your kids. Everyone gets a unique avatar and identity."
            color="bg-indigo-50"
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-pink-600" />}
            title="Define Missions"
            description="Set up daily habits or one-time special quests with point rewards."
            color="bg-pink-50"
          />
          <FeatureCard
            icon={<Trophy className="w-6 h-6 text-amber-600" />}
            title="Live Leaderboards"
            description="Watch the family compete in friendly rivalry for the top spot."
            color="bg-amber-50"
          />
          <FeatureCard
            icon={<ClipboardCheck className="w-6 h-6 text-emerald-600" />}
            title="Shared Dashboard"
            description="Perfect for a kitchen tablet. Just tap a chore and select who did it!"
            color="bg-emerald-50"
          />
        </div>
      </section>

      {/* Social Proof/Stat */}
      <section className="px-6 py-16 text-center border-t border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="flex -space-x-4">
            {['🦊', '🐶', '🦉', '🦁'].map((e, i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-2xl shadow-sm">
                {e}
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-500 font-bold italic">
          "The first chore app my kids actually ask to use every morning!"
        </p>
        <div className="mt-2 text-xs font-black text-indigo-500 uppercase tracking-widest">
          — The Miller Family
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 mt-auto text-center">
        <div className="text-white font-black text-xl flex items-center justify-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
          Home Chore Hero
        </div>
        <p className="text-slate-400 text-sm font-medium">
          Built with ❤️ for happy households.
        </p>
        <div className="mt-8 pt-8 border-t border-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          © 2026 Home Chore Hero
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description, color }: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100"
    >
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

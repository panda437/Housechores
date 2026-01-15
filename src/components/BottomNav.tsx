"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trophy, Settings, Star, BarChart3 } from 'lucide-react';
import { clsx } from 'clsx';

export const BottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Today', icon: Home, href: '/today' },
        { name: 'Leaderboard', icon: Trophy, href: '/leaderboard' },
        { name: 'Analytics', icon: BarChart3, href: '/analytics' },
        { name: 'Admin', icon: Settings, href: '/admin' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50 md:rounded-b-[3rem]">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon as any;

                return (
                    <Link
                        key={item.name}
                        href={item.href || '#'}
                        className={clsx(
                            'flex flex-col items-center gap-1 transition-all',
                            isActive ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'
                        )}
                    >
                        <Icon className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
};

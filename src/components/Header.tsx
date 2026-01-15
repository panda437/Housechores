import React from 'react';

export const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {
    return (
        <header className="px-6 pt-8 pb-4">
            <h1 className="text-3xl font-black text-indigo-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-slate-500 font-medium">{subtitle}</p>}
        </header>
    );
};

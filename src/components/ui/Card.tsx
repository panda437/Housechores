import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Card = ({
    children,
    className,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'bg-white rounded-3xl p-6 shadow-xl border-b-4 border-gray-100 hover:border-indigo-100 transition-all',
                className
            )}
        >
            {children}
        </div>
    );
};

"use client";

import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { X } from 'lucide-react';

interface CompleteChoreModalProps {
    chore: any;
    users: any[];
    onComplete: (userId: string) => void;
    onClose: () => void;
    isSubmitting: boolean;
}

export const CompleteChoreModal = ({
    chore,
    users,
    onComplete,
    onClose,
    isSubmitting
}: CompleteChoreModalProps) => {
    if (!chore) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-indigo-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-sm relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center pt-4 pb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-3xl mb-4 text-3xl">
                        ✨
                    </div>
                    <h2 className="text-2xl font-black text-slate-800">Who did it?</h2>
                    <p className="text-slate-500 font-medium mt-1">
                        "{chore.name}"
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {users.map((user) => (
                        <button
                            key={user._id}
                            disabled={isSubmitting}
                            onClick={() => onComplete(user._id)}
                            className="flex flex-col items-center gap-2 p-4 rounded-3xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all active:scale-95 group"
                        >
                            <span className="text-4xl group-hover:scale-110 transition-transform">
                                {user.avatarUrl || '👤'}
                            </span>
                            <span className="font-bold text-slate-700">{user.name}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-6">
                    <Button
                        variant="ghost"
                        className="w-full text-slate-400"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                </div>
            </Card>
        </div>
    );
};

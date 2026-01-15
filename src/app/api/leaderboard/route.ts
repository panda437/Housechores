import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChoreLog from '@/models/ChoreLog';
import User from '@/models/User';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const houseId = (session.user as any).houseId;

        // Aggregate points from logs
        const logs = await ChoreLog.aggregate([
            { $match: { houseId: (session.user as any).houseId } }, // Ensure scoped to house
            {
                $group: {
                    _id: '$userId',
                    totalPoints: { $sum: '$points' },
                },
            },
            { $sort: { totalPoints: -1 } },
        ]);

        // Populate user details
        const leaderboard = await Promise.all(
            logs.map(async (entry) => {
                const user = await User.findById(entry._id).select('name avatarUrl');
                return {
                    id: entry._id,
                    name: user?.name || 'Unknown Hero',
                    avatarUrl: user?.avatarUrl || '👤',
                    points: entry.totalPoints,
                };
            })
        );

        return NextResponse.json(leaderboard);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
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
        const houseObjectId = new mongoose.Types.ObjectId(houseId);

        // Fetch all users in the house first
        const allUsers = await User.find({ houseId }).select('name avatarUrl');

        // Aggregate points from logs
        const logs = await ChoreLog.aggregate([
            { $match: { houseId: houseObjectId } },
            {
                $group: {
                    _id: '$userId',
                    totalPoints: { $sum: '$points' },
                },
            },
        ]);

        // Map points to users
        const pointsMap = logs.reduce((acc: any, log: any) => {
            acc[log._id.toString()] = log.totalPoints;
            return acc;
        }, {});

        const leaderboard = allUsers.map(user => ({
            id: user._id,
            name: user.name,
            avatarUrl: user.avatarUrl || '👤',
            points: pointsMap[user._id.toString()] || 0
        })).sort((a, b) => b.points - a.points);

        return NextResponse.json(leaderboard);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

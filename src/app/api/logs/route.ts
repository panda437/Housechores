import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChoreLog from '@/models/ChoreLog';
import Chore from '@/models/Chore';
import User from '@/models/User';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const houseId = (session.user as any).houseId;
        const { choreId, userId, photoUrl } = await request.json();

        // 1. Fetch chore to get points and verify houseId
        const chore = await Chore.findOne({ _id: choreId, houseId });
        if (!chore) return NextResponse.json({ error: 'Chore not found' }, { status: 404 });

        // 2. Verify user belongs to same house
        const user = await User.findOne({ _id: userId, houseId });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        // 3. Create Log
        const log = await ChoreLog.create({
            choreId,
            userId,
            houseId,
            points: chore.points,
            photoUrl,
        });

        // 4. Update User Points
        await User.findByIdAndUpdate(userId, { $inc: { points: chore.points } });

        return NextResponse.json(log, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

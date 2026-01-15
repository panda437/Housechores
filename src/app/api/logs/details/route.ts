import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChoreLog from '@/models/ChoreLog';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const houseId = (session.user as any).houseId;

        const logs = await ChoreLog.find({ houseId })
            .sort({ completedAt: -1 })
            .limit(20)
            .populate('userId', 'name avatarUrl')
            .populate('choreId', 'name');

        return NextResponse.json(logs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

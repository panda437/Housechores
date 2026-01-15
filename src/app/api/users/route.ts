import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const houseId = (session.user as any).houseId;
        const users = await User.find({ houseId });
        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const houseId = (session.user as any).houseId;
        const body = await request.json();

        const user = await User.create({
            ...body,
            houseId,
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const houseId = (session.user as any).houseId;
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // Prevent deleting the admin themselves via this endpoint if needed, 
        // but for now just scope it to houseId.
        const result = await User.findOneAndDelete({ _id: id, houseId });
        if (!result) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

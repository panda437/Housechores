import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Chore from '@/models/Chore';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const houseId = (session.user as any).houseId;
        const chores = await Chore.find({ houseId, active: true });
        return NextResponse.json(chores);
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

        const chore = await Chore.create({
            ...body,
            houseId,
        });

        return NextResponse.json(chore, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const houseId = (session.user as any).houseId;
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body = await request.json();

        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

        // Ensure the chore belongs to this house
        const chore = await Chore.findOneAndUpdate(
            { _id: id, houseId },
            body,
            { new: true }
        );

        if (!chore) return NextResponse.json({ error: 'Chore not found' }, { status: 404 });

        return NextResponse.json(chore);
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

        const result = await Chore.findOneAndDelete({ _id: id, houseId });
        if (!result) return NextResponse.json({ error: 'Chore not found' }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

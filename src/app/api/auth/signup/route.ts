import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import House from "@/models/House";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        // 1. Create a new Household
        const household = await House.create({
            name: `${name}'s Household`,
        });

        // 2. Hash Password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 3. Create Admin User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            houseId: household._id,
            role: "admin",
            points: 0,
        });

        return NextResponse.json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                houseId: user.houseId
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

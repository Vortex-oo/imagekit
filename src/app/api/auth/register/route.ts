import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/db"
import User from "../../../models/user.model"
import SignupSchema from "../../../../../schemas/signup.schema";

export async function POST(request: NextRequest) {

    const { email, password } = await SignupSchema.parseAsync(request.json())

    if (!email || !password) {
        return NextResponse.json({
            message: "Email and Password are required",
            success: false
        }, { status: 400 })
    }

    try {
        await dbConnect()

        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return NextResponse.json({
                message: "User already exist",
                success: false
            }, { status: 400 })
        }

        const user = await User.create({
            email: email,
            password: password
        })

        return NextResponse.json({
            message: "User register successfully",
            success: true
        }, { status: 200 })
    } catch (error) {

        console.log("Registration Error",error);

        return NextResponse.json({
            message: "Failed to register user",
            Error:error,
            success: false  
        }, { status: 500 })
    }
}
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectToDatabase();
        const {role,mobile}= await req.json();
        // Perform role update logic here
        const session = await auth();
        const user = await User.findByIdAndUpdate({email:session?.user?.email}, {
            role,
            mobile
        });
        if(!user){
            return NextResponse.json({message:"User not found"}, {status:404});
        }
        return NextResponse.json({message:"Role updated successfully",user}, {status:200});
    } catch (error) {
        return NextResponse.json({message:`Error updating role and mobile ${error}`}, {status:500});
    }
}
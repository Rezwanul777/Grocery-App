import { auth } from "@/auth";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req:NextRequest) {
   try {
     const session= await auth()
    if(!session || !session.user){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    const user= await User.findOne({email:session.user.email}).select("-password");
    if(!user){
        return NextResponse.json({message:"User not found"},{status:404})
    }
    return NextResponse.json(user,{status:200});
   } catch (error) {
    return NextResponse.json({message:`Error getting user ${error}`},{status:500})
   }
    
}
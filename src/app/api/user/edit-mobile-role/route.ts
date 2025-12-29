/* eslint-disable @typescript-eslint/no-explicit-any */
// import { auth } from "@/auth";
// import connectToDatabase from "@/lib/db";
// import User from "@/models/user.model";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req:NextRequest) {
//     try {
//         await connectToDatabase();
//         const {role,mobile}= await req.json();
//         // Perform role update logic here
//         const session = await auth();
//         const user = await User.findByIdAndUpdate({email:session?.user?.email}, {
//             role,
//             mobile
//         });
//         if(!user){
//             return NextResponse.json({message:"User not found"}, {status:404});
//         }
//         return NextResponse.json({message:"Role updated successfully",user}, {status:200});
//     } catch (error) {
//         return NextResponse.json({message:`Error updating role and mobile ${error}`}, {status:500});
//     }
// }

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { role, mobile } = await req.json();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { role, mobile },
      { new: true } // return updated doc
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Role updated successfully", user }, { status: 200 });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Error updating role and mobile", error: String(error?.message ?? error) },
      { status: 500 }
    );
  }
}

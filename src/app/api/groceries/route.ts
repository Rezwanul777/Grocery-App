/* eslint-disable @typescript-eslint/no-explicit-any */
import connectToDatabase from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const groceries = await Grocery.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(groceries, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `get groceries error: ${error?.message || error}` },
      { status: 500 }
    );
  }
}
import db from "@/lib/client";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const userId = req.nextUrl.searchParams.get("id") as string;

    const collection = db.collection("guests");
    const result = await collection.findOne({ _id: new ObjectId(userId) });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

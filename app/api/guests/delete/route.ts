import db from "@/lib/client";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("id") as string;

    if (!userId) throw new Error("Id is missing");

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    const result = await collection.deleteOne({ _id: new ObjectId(userId) });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

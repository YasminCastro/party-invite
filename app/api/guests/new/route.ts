import db from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) throw new Error("Name is missing");

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");
    const foundUser = await collection.findOne({ name });

    if (foundUser) {
      return NextResponse.json(
        {
          message: "Guest alredy exists",
        },
        { status: 200 }
      );
    }

    const result = await collection.insertOne({
      name,
      status: false,
      receivedInvitation: false,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

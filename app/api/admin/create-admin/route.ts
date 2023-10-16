import db from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    const result = await collection.updateOne(
      { name: "aniversariante" },
      {
        $setOnInsert: {
          status: true,
          receivedInvitation: true,
          isAdmin: true,
        },
      },
      { upsert: true }
    );

    let message = "Operation performed but no changes were made";

    if (result.upsertedCount > 0) {
      message = "User created successfully";
    } else if (result.modifiedCount > 0) {
      message = "User password updated successfully";
    }

    return NextResponse.json({ message }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

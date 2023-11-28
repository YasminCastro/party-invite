import db from "@/lib/client";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { name, receivedInvitation, isAdmin, id, status } = await req.json();

    if (!id) throw new Error("Argument id is missing");

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    let update: any = {};

    if (receivedInvitation !== undefined) {
      update.receivedInvitation = receivedInvitation;
    }

    if (status !== undefined) {
      update.status = status;
    }

    if (isAdmin !== undefined) {
      update.isAdmin = isAdmin;
    }

    if (name) update.name = name;

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

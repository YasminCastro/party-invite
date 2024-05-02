import { INewGuest } from "@/interface/guests";
import db from "@/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, receivedInvitation, isAdmin, status }: INewGuest =
      await req.json();
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
        { status: 200 },
      );
    }

    let newUser: any = { name: name.trim().toLocaleLowerCase() };

    if (receivedInvitation !== undefined) {
      newUser.receivedInvitation = receivedInvitation;
    }

    if (status !== undefined) {
      newUser.status = status;
    }

    if (isAdmin !== undefined) {
      newUser.isAdmin = isAdmin;
    }

    const result = await collection.insertOne(newUser);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

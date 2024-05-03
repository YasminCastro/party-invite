import db from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("GET ALL GUESTS");
    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");
    const result = await collection.find().toArray();

    const response = NextResponse.json(result, { status: 200 });
    response.headers.append(
      "Cache-Control",
      "no-cache, no-store, must-revalidate",
    );
    response.headers.append("Pragma", "no-cache");
    response.headers.append("Expires", "0");
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

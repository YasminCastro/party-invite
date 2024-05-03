import db from "@/lib/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("GET ALL GUESTS");
    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");
    const result = await collection.find().toArray();

    return Response.json({ result });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

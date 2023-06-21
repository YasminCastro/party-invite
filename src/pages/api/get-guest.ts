import db from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetGuest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    const result = await collection.find().toArray();
    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

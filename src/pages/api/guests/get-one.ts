import db from "@/lib/client";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetOne(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const database = await db;

    const userId = req.query.id as string;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    const result = await collection.findOne({ _id: new ObjectId(userId) });

    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

import db from "@/lib/client";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function DeleteGuest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;

    if (!id) throw new Error("Id is missing");

    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

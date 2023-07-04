import db from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getConfiguration(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("admin");

    const configuration = await collection.find().toArray();

    res.status(200).json(configuration[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

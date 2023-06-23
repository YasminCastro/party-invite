import db from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function UpdateStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, receivedInvitation } = req.body;

    if (!name && !receivedInvitation)
      throw new Error("Arguments name and status are missing");

    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    const result = await collection.findOneAndUpdate(
      { name },
      { $set: { receivedInvitation } }
    );

    res.status(200).json(result.value);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

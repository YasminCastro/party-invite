import db from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function NewGuest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name } = req.body;

    if (!name) throw new Error("Name is missing");

    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    const foundUser = await collection.findOne({ name });

    if (foundUser) throw new Error("Guest alredy exists");

    const result = await collection.insertOne({
      name,
      status: false,
      receivedInvitation: false,
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(200).json({ message: error.message, acknowledged: false });
  }
}

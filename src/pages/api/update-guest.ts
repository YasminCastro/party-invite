import db from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function UpdateGuest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, receivedInvitation, isAdmin, secret } = req.body;

    if (!name) throw new Error("Argument name is missing");

    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    let update: any = {};

    if (receivedInvitation) update.receivedInvitation = receivedInvitation;
    if (isAdmin) update.isAdmin = isAdmin;
    if (secret) update.secret = secret;

    const result = await collection.findOneAndUpdate(
      { name },
      { $set: update }
    );

    res.status(200).json(result.value);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

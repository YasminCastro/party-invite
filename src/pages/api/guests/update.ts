import { ADMIN_PASSWORD } from "@/config";
import db from "@/lib/client";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function UpdateGuest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, receivedInvitation, isAdmin, id, status } = req.body;

    if (!id) throw new Error("Argument id is missing");

    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    let update: any = {};

    if (receivedInvitation !== null) {
      update.receivedInvitation = receivedInvitation;
    }

    if (status !== null) {
      update.status = status;
    }

    if (isAdmin !== null) {
      update.isAdmin = isAdmin;
      update.secret = ADMIN_PASSWORD;
    }

    if (name) update.name = name;

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    res.status(200).json(result.value);
  } catch (error: any) {
    console.error(error);
    res.status(200).json({ message: error.message });
  }
}

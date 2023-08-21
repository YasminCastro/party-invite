import { ADMIN_PASSWORD } from "@/config";
import db from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreateAdmin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    const name = "aniversariante";

    const foundUser = await collection.findOne({ name });

    if (foundUser) return res.status(200).json(foundUser);

    const result = await collection.insertOne({
      name,
      status: true,
      receivedInvitation: true,
      isAdmin: true,
      password: ADMIN_PASSWORD,
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(200).json({ message: error.message, acknowledged: false });
  }
}

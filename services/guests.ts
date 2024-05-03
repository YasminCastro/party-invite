import { INewGuest, IUpdateGuest } from "@/interface/guests";
import axios from "axios";

export async function getGuests() {
  const { data } = await axios.get(`/api/guests/get`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

  const response = data.result;

  const confirmedGuests = response.reduce(
    (count: number, guest: any) => count + (guest.status ? 1 : 0),
    0,
  );

  return {
    guests: response,
    guestsCount: response.length,
    confirmedGuestsCount: confirmedGuests,
  };
}

export async function updateGuests(guest: IUpdateGuest) {
  let query: any = {
    id: guest._id,
  };

  if ("status" in guest) query.status = guest.status;
  if ("receivedInvitation" in guest) {
    query.receivedInvitation = guest.receivedInvitation;
  }
  if ("isAdmin" in guest) {
    query.isAdmin = guest.isAdmin;
  }
  if (guest.name) query.name = guest.name.trim().toLocaleLowerCase();

  const { data } = await axios.put("/api/guests/update", query);

  return data;
}

export async function createGuest(guest: INewGuest) {
  const { data } = await axios.post("/api/guests/new", guest);

  return data;
}

export async function deleteGuest(id: string) {
  const { status } = await axios.delete(`/api/guests/delete?id=${id}`);

  return status;
}

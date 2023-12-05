import { IUpdateGuest } from "@/interface/guests";
import axios from "axios";

export async function getGuests() {
  const timestamp = new Date().getTime();
  const res = await fetch(`/api/guests/get`, {
    cache: "no-store",
  });

  const data = await res.json();
  // const { data } = await axios.get(`/api/guests/get?_=${timestamp}`, {
  //   headers: {
  //     "Cache-Control": "no-cache",
  //     Pragma: "no-cache",
  //     Expires: "0",
  //   },
  // });

  const confirmedGuests = data.reduce(
    (count: number, guest: any) => count + (guest.status ? 1 : 0),
    0
  );

  return {
    guests: data,
    guestsCount: data.length,
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
  if (guest.name) query.name = guest.name.trim().toLocaleLowerCase();

  const { data } = await axios.put("/api/guests/update", query);

  console.log(query);
  console.log(data);

  return data;
}

export async function createGuest(name: string) {
  const { data } = await axios.post("/api/guests/new", {
    name: name.trim().toLocaleLowerCase(),
  });

  return data;
}

export async function deleteGuest(id: string) {
  const { status } = await axios.delete(`/api/guests/delete?id=${id}`);

  return status;
}

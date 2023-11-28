import { IUpdateGuest } from "@/interface/guests";
import axios from "axios";

export async function getGuests() {
  const timestamp = new Date().getTime();
  const { data } = await axios.get(`/api/guests/get?_=${timestamp}`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

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

export async function updateGuests(user: IUpdateGuest) {
  const { data } = await axios.put("/api/guests/update", {
    id: user._id,
    status: user.status,
  });

  return data.user;
}

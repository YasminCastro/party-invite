import axios from "axios";
import { useEffect, useState } from "react";

import GuestList from "./GuestList";
import { IStepActive } from "@/pages/admin";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepActive>>;
}

export default function EditGuest({ setCardActive }: IProps) {
  const [guests, setGuests] = useState<any[]>([]);
  let [totalConfirmedGuests, setTotalConfirmedGuests] = useState(0);
  let [totalGuests, setTotalGuests] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getGuests = async () => {
      try {
        const { data } = await axios.get("/api/guests/get");
        setGuests(data);
        const confirmedGuests = data.reduce(
          (count: number, guest: any) => count + (guest.status ? 1 : 0),
          0
        );
        setTotalConfirmedGuests(confirmedGuests);
        setTotalGuests(data.length);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(true);
      }
    };

    getGuests();
  }, []);

  guests.sort(compareGuests);

  return (
    <div className="mt-10">
      <div className="text-center">
        <p className="font-bungee text-xl  text-white  max-sm:text-base ">
          Total de confirmados: {totalConfirmedGuests}
        </p>
        <p className="font-bungee text-base  text-white  max-sm:text-sm ">
          Total de convidados: {totalGuests}
        </p>
      </div>
      <div className="h-[75vh] overflow-auto">
        {loading && <GuestList guests={guests} setCardActive={setCardActive} />}
      </div>
    </div>
  );
}

const compareGuests = (guestA: any, guestB: any) => {
  if (guestA.status && !guestB.status) {
    return -1; // guestA confirmado, guestB não confirmado
  } else if (!guestA.status && guestB.status) {
    return 1; // guestA não confirmado, guestB confirmado
  } else {
    // Mesmo status, ordem alfabética
    return guestA.name.localeCompare(guestB.name);
  }
};

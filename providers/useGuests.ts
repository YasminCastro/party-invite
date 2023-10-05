import { useState, useEffect } from "react";
import axios from "axios";

export function useGuests() {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalConfirmedGuests, setTotalConfirmedGuests] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const { data } = await axios.get("/api/guests/get");
        data.sort(compareGuests);
        setGuests(data);

        const confirmedGuests = data.reduce(
          (count: number, guest: any) => count + (guest.status ? 1 : 0),
          0
        );
        setTotalConfirmedGuests(confirmedGuests);
        setTotalGuests(data.length);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  return { guests, loading, error, totalConfirmedGuests, totalGuests };
}

const compareGuests = (guestA: any, guestB: any) => {
  if (guestA.status && !guestB.status) {
    return -1;
  } else if (!guestA.status && guestB.status) {
    return 1;
  } else {
    return guestA.name.localeCompare(guestB.name);
  }
};

import axios from "axios";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export default function Convidades() {
  const [guests, setGuests] = useState<any[]>([]);
  let [totalConfirmedGuests, setTotalConfirmedGuests] = useState(0);
  let [totalGuests, setTotalGuests] = useState(0);

  useEffect(() => {
    const getGuests = async () => {
      try {
        const { data } = await axios.get("/api/get-guest");
        setGuests(data);
        const confirmedGuests = data.reduce(
          (count: number, guest: any) => count + (guest.status ? 1 : 0),
          0
        );
        setTotalConfirmedGuests(confirmedGuests);
        setTotalGuests(data.length);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getGuests();
  }, []);

  guests.sort(compareGuests);

  return (
    <>
      <NextSeo
        title="404 • Convidades"
        description="Convidades para festa da yas"
      />
      <div className="relative flex min-h-screen flex-col items-center  overflow-x-auto bg-login bg-cover">
        <div className="m-8 text-center">
          <p className="font-bungee text-xl  text-purple-950  max-sm:text-base ">
            Total de confirmados: {totalConfirmedGuests}
          </p>
          <p className="font-bungee text-base  text-purple-950  max-sm:text-sm ">
            Total de convidados: {totalGuests}
          </p>
        </div>
        <div className="h-[80vh] overflow-auto">
          <table className=" bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700  dark:text-gray-400">
            <thead className="">
              <tr>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {guests &&
                guests.map((guest) => {
                  return (
                    <tr
                      key={guest._id}
                      className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {guest.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {guest.status ? (
                          <AiFillCheckCircle color="green" />
                        ) : (
                          <AiFillCloseCircle color="red" />
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
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
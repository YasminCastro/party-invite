import projectConfig from "@/config/project";
import axios from "axios";
import { Button } from "flowbite-react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export default function Convidades() {
  const [guests, setGuests] = useState<any[]>([]);
  let [totalConfirmedGuests, setTotalConfirmedGuests] = useState(0);
  let [totalGuests, setTotalGuests] = useState(0);

  useEffect(() => {
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
      }
    };

    getGuests();
  }, []);

  guests.sort(compareGuests);
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={`${projectConfig.seoName} • Convidades`}
        description="Convidades para festa."
      />
      <div className="relative flex min-h-screen flex-col items-center  overflow-x-auto bg-gradient-to-br from-cyan-400  via-cyan-800 to-red-500">
        <Button
          className="absolute right-6 top-6"
          size="sm"
          gradientDuoTone="pinkToOrange"
          outline
          onClick={() => router.push("/")}
        >
          Início
        </Button>
        <div className="m-8 text-center">
          <p className="font-bungee text-xl  text-white  max-sm:text-base ">
            Total de confirmados: {totalConfirmedGuests}
          </p>
          <p className="font-bungee text-base  text-white  max-sm:text-sm ">
            Total de convidados: {totalGuests}
          </p>
        </div>
        <div className="h-[80vh] overflow-auto">
          <table className="bg-gray-700 text-xs uppercase text-gray-400">
            <thead className="">
              <tr>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Recebu convite?</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {guests &&
                guests.map((guest) => {
                  return (
                    <tr key={guest._id} className="border-gray-700 bg-gray-800">
                      <td>{guest.name}</td>
                      <td>
                        {guest.receivedInvitation ? (
                          <AiFillCheckCircle color="green" />
                        ) : (
                          <AiFillCloseCircle color="red" />
                        )}
                      </td>
                      <td>
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

import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useGuests } from "@/providers/Guests";
import { Checkbox } from "flowbite-react";
import { updateGuest } from "@/lib/guest";
import GuestTableSkeleton from "./GuestTableSkeleton";

interface IProps {
  isAdminPage: boolean;
}

export default function GuestTable({ isAdminPage }: IProps) {
  const { guests, loading } = useGuests();
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [selectedGuest, setSelectedGuest] = useState<any>();
  const [sortConfig, setSortConfig] = useState({
    key: "status",
    direction: "ascending",
  });

  if (loading) {
    return <GuestTableSkeleton isAdminPage={isAdminPage} />;
  }

  const sortedGuests = [...guests].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const direction =
    sortConfig.direction === "ascending" ? "descending" : "ascending";

  return (
    <div>
      <table className="bg-gray-700 text-xs uppercase text-gray-400 ">
        <thead>
          <tr>
            <th
              className="flex items-center justify-center gap-1"
              onClick={() =>
                setSortConfig({
                  key: "name",
                  direction,
                })
              }
            >
              Nome
              {sortConfig.direction === "ascending" ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </th>
            {isAdminPage && <th>Recebeu convite?</th>}
            <th
              className="flex items-center justify-center gap-1"
              onClick={() =>
                setSortConfig({
                  key: "status",
                  direction,
                })
              }
            >
              Status
              {sortConfig.direction === "ascending" ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </th>
            {isAdminPage && <th>Editar</th>}
            {isAdminPage && <th>Excluir</th>}
          </tr>
        </thead>

        <tbody>
          {!loading &&
            guests &&
            sortedGuests.map((guest) => {
              return (
                <tr key={guest._id} className="border-gray-700 bg-gray-800">
                  <td>{guest.name}</td>
                  {isAdminPage && (
                    <td className="text-center">
                      <Checkbox
                        className=" text-green-500 bg-gray-100  focus:ring-green-500"
                        defaultChecked={guest.receivedInvitation}
                        onChange={() => {
                          updateGuest({
                            id: guest._id,
                            name: guest.name,
                            receivedInvitation: !guest.receivedInvitation,
                          });
                        }}
                      />
                    </td>
                  )}

                  <td className="text-center">
                    {guest.status ? (
                      <AiFillCheckCircle color="green" />
                    ) : (
                      <AiFillCloseCircle color="red" />
                    )}
                  </td>
                  {isAdminPage && (
                    <td className="text-center">
                      {!guest.isAdmin && (
                        <AiOutlineEdit
                          size={18}
                          className="cursor-pointer focus:outline-none hover:text-blue-400 active:text-blue-600"
                          onClick={() => {
                            setSelectedGuest(guest);
                            setOpenModal("EditGuest");
                          }}
                        />
                      )}
                    </td>
                  )}

                  {isAdminPage && (
                    <td className="text-center">
                      {!guest.isAdmin && (
                        <AiOutlineDelete
                          size={18}
                          className="cursor-pointer focus:outline-none hover:text-blue-400 active:text-blue-600"
                          onClick={() => {
                            setSelectedGuest(guest);
                            setOpenModal("DeleteGuest");
                          }}
                        />
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>

      {openModal === "DeleteGuest" && selectedGuest && (
        <DeleteModal
          openModal={openModal}
          setOpenModal={(modal) => {
            if (!modal) setSelectedGuest(null);
            setOpenModal(modal);
          }}
          guest={selectedGuest}
        />
      )}
      {openModal === "EditGuest" && selectedGuest && (
        <EditModal
          openModal={openModal}
          setOpenModal={(modal) => {
            if (!modal) setSelectedGuest(null);
            setOpenModal(modal);
          }}
          guest={selectedGuest}
        />
      )}
    </div>
  );
}

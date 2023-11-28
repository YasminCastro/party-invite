import { useState } from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { Spinner } from "flowbite-react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { Checkbox, CustomFlowbiteTheme, Flowbite, Table } from "flowbite-react";
import { compareByName, compareByStatus } from "@/utils/sort";
import { IGuest } from "@/interface/guests";
import * as guestsService from "@/services/guests";

interface IProps {
  isAdminPage: boolean;
  guests: IGuest[];
}

const compareFunctions = {
  name: compareByName,
  status: compareByStatus,
};

interface SortConfig {
  key: keyof typeof compareFunctions;
  direction: "ascending" | "descending";
}

export default function GuestTable({ isAdminPage, guests }: IProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [selectedGuest, setSelectedGuest] = useState<IGuest | null>();
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "status",
    direction: "ascending",
  });

  const compareFunction = compareFunctions[sortConfig.key];

  const sortedGuests = [...guests].sort((a, b) => {
    return sortConfig.direction === "ascending"
      ? compareFunction(a, b)
      : -compareFunction(a, b);
  });

  const direction =
    sortConfig.direction === "ascending" ? "descending" : "ascending";

  const icon =
    sortConfig.direction === "ascending" ? (
      <IoIosArrowUp />
    ) : (
      <IoIosArrowDown />
    );

  const customTheme: CustomFlowbiteTheme = {
    table: {
      root: {
        base: "w-full max-[370px]:text-xs",
      },
      head: {
        base: "text-gray-400 group/head",
        cell: { base: "bg-gray-700 p-3 max-sm:p-2" },
      },
      row: {
        base: "border-gray-700 bg-gray-800 text-white",
        hovered: "hover:bg-gray-600",
      },
    },
  };

  const editUser = async (guest: any) => {
    try {
      await guestsService.updateGuests({
        _id: guest._id,
        name: guest.name,
        receivedInvitation: guest.receivedInvitation,
      });
    } catch (error) {
      console.log(error);
      setError("Erro interno tente novamente mais tarde.");
    }
  };
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell
            onClick={() =>
              setSortConfig({
                key: "name",
                direction,
              })
            }
          >
            <span className="flex items-center justify-center gap-1">
              Nome
              {icon}
            </span>
          </Table.HeadCell>
          {isAdminPage && (
            <Table.HeadCell className="max-sm:hidden">
              Recebeu convite?
            </Table.HeadCell>
          )}
          <Table.HeadCell
            className="flex items-center justify-center gap-1 "
            onClick={() =>
              setSortConfig({
                key: "status",
                direction,
              })
            }
          >
            <span className="flex items-center justify-center gap-1">
              Status
              {icon}
            </span>
          </Table.HeadCell>
          {isAdminPage && <Table.HeadCell>Editar</Table.HeadCell>}
          {isAdminPage && <Table.HeadCell>Excluir</Table.HeadCell>}
        </Table.Head>

        <Table.Body className="divide-y">
          {guests &&
            sortedGuests.map((guest) => {
              let receivedInvitation = guest.receivedInvitation;
              return (
                <Table.Row key={guest._id}>
                  <Table.Cell>{guest.name}</Table.Cell>
                  {isAdminPage && (
                    <Table.Cell className="text-center max-sm:hidden">
                      <Checkbox
                        className=" text-green-500 bg-gray-100  focus:ring-green-500 "
                        defaultChecked={receivedInvitation}
                        onChange={async () => {
                          receivedInvitation = !receivedInvitation;
                          await editUser({
                            _id: guest._id,
                            name: guest.name,
                            receivedInvitation,
                          });
                        }}
                      />
                    </Table.Cell>
                  )}

                  <Table.Cell className="text-center">
                    {guest.status ? (
                      <AiFillCheckCircle color="green" />
                    ) : (
                      <AiFillCloseCircle color="red" />
                    )}
                  </Table.Cell>
                  {isAdminPage && (
                    <Table.Cell className="text-center">
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
                    </Table.Cell>
                  )}

                  {isAdminPage && (
                    <Table.Cell className="text-center">
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
                    </Table.Cell>
                  )}
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>

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
    </Flowbite>
  );
}

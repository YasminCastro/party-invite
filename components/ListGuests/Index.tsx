"use client";
import { useState } from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { compareByName, compareByStatus } from "@/utils/sort";
import { IGuest } from "@/interface/guests";
import * as guestsService from "@/services/guests";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import EditGuest from "./EditGuest";

interface IProps {
  isAdminPage: boolean;
  guests: IGuest[];
  setReloadGuests: React.Dispatch<React.SetStateAction<string>>;
}

const compareFunctions = {
  name: compareByName,
  status: compareByStatus,
};

interface SortConfig {
  key: keyof typeof compareFunctions;
  direction: "ascending" | "descending";
}

export default function ListGuests({
  isAdminPage,
  guests,
  setReloadGuests,
}: IProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [selectedGuest, setSelectedGuest] = useState<IGuest | null>();
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

  const editUser = async (guest: any) => {
    try {
      await guestsService.updateGuests({
        _id: guest._id,
        receivedInvitation: guest.receivedInvitation,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            {isAdminPage && <TableHead>Recebeu o convite?</TableHead>}
            {isAdminPage && <TableHead>Editar</TableHead>}
            {isAdminPage && <TableHead>Excluir</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedGuests.map((guest) => {
            let receivedInvitation = guest.receivedInvitation;
            console.log(guest);
            return (
              <TableRow key={guest._id}>
                <TableCell>{guest.name}</TableCell>
                <TableCell>
                  {guest.status ? (
                    <AiFillCheckCircle color="green" />
                  ) : (
                    <AiFillCloseCircle color="red" />
                  )}
                </TableCell>

                {isAdminPage && (
                  <TableCell>
                    <Checkbox
                      checked={receivedInvitation}
                      onChange={async () => {
                        receivedInvitation = !receivedInvitation;
                        await editUser({
                          _id: guest._id,
                          name: guest.name,
                          receivedInvitation,
                        });
                      }}
                    />
                  </TableCell>
                )}

                {isAdminPage && (
                  <TableCell>
                    <AiOutlineEdit
                      size={18}
                      onClick={() => {
                        setSelectedGuest(guest);
                        setOpenModal("EditGuest");
                      }}
                    />
                  </TableCell>
                )}

                {isAdminPage && (
                  <TableCell>
                    <AiOutlineDelete
                      size={18}
                      onClick={() => {
                        setSelectedGuest(guest);
                        setOpenModal("DeleteGuest");
                      }}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {openModal === "EditGuest" && (
        <EditGuest openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
}

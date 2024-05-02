import { IGuest } from "@/interface/guests";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { Checkbox } from "@/components/ui/checkbox";
import { SetStateAction, useState } from "react";
import DeleteGuest from "@/components/Pages/Admin/DeleteGuest/Index";
import EditGuest from "@/components/Pages/Admin/EditGuest/Index";
import * as guestsService from "@/services/guests";

interface IProps {
  isAdmin: boolean;
  guests: IGuest[];
  setRefreshList: React.Dispatch<SetStateAction<string>>;
}

export default function GuestTable({
  isAdmin,
  guests,
  setRefreshList,
}: IProps) {
  const [openDeleteGuest, setOpenDeleteGuest] = useState(false);
  const [openEditGuest, setOpenEditGuest] = useState(false);
  const [guest, setGuest] = useState<IGuest>();

  const changeReceivedInvitation = async ({
    _id,
    receivedInvitation,
  }: {
    _id: string;
    receivedInvitation: boolean;
  }) => {
    try {
      await guestsService.updateGuests({
        _id,
        receivedInvitation,
      });
    } catch (error) {
      console.log("Error updating guest", error);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Recebeu convite?</TableHead>
            {isAdmin && <TableHead>Editar</TableHead>}
            {isAdmin && <TableHead>Excluir</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow>
              <TableCell>{guest.name}</TableCell>
              <TableCell>
                {guest.status ? (
                  <AiFillCheckCircle className="text-lg text-green-500" />
                ) : (
                  <AiFillCloseCircle className="text-lg text-red-500" />
                )}
              </TableCell>
              <TableCell>
                {!guest.isAdmin && (
                  <Checkbox
                    defaultChecked={guest.receivedInvitation}
                    onCheckedChange={(e) => {
                      changeReceivedInvitation({
                        _id: guest._id,
                        receivedInvitation: e as boolean,
                      });
                    }}
                  />
                )}
              </TableCell>
              {!guest.isAdmin && isAdmin && (
                <TableCell>
                  <AiOutlineEdit
                    size={18}
                    className="cursor-pointer hover:text-blue-400  active:text-blue-600"
                    onClick={() => {
                      setOpenEditGuest(true);
                      setGuest(guest);
                    }}
                  />
                </TableCell>
              )}
              {!guest.isAdmin && isAdmin && (
                <TableCell>
                  <AiOutlineDelete
                    size={18}
                    className="cursor-pointer hover:text-blue-400  active:text-blue-600"
                    onClick={() => {
                      setOpenDeleteGuest(true);
                      setGuest(guest);
                    }}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openDeleteGuest && guest && (
        <DeleteGuest
          setOpenDeleteGuest={setOpenDeleteGuest}
          openDeleteGuest={openDeleteGuest}
          setRefreshList={setRefreshList}
          guest={guest}
        />
      )}

      {openEditGuest && guest && (
        <EditGuest
          setOpenEditGuest={setOpenEditGuest}
          openEditGuest={openEditGuest}
          setRefreshList={setRefreshList}
          guest={guest}
        />
      )}
    </>
  );
}

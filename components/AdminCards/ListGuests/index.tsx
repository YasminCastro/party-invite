import { useGuests } from "@/providers/Guests";
import GuestTable from "./GuestTable";

interface IProps {}

export default function ListGuests({}: IProps) {
  const { error, totalConfirmedGuests, totalGuests } = useGuests();

  if (error) {
    return <p>Ocorreu um erro ao carregar os convidados.</p>;
  }

  return (
    <div className="mt-14">
      <div className="text-center">
        <p className="font-title text-xl  text-admin-title  max-sm:text-base ">
          Total de confirmados: {totalConfirmedGuests}
        </p>
        <p className="font-title text-base  text-admin-title  max-sm:text-sm ">
          Total de convidados: {totalGuests}
        </p>
      </div>
      <div className="mt-3 h-[75vh] overflow-auto">
        <GuestTable />
      </div>
    </div>
  );
}

import GoBackButton from "@/components/Global/GoBackButton/Index";
import GuestList from "@/components/Global/GuestList/Index";

export default function Admin() {
  return (
    <>
      <GoBackButton title="Voltar" path="/" />
      <GuestList isAdmin={true} />
    </>
  );
}

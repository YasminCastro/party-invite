import { Button } from "flowbite-react";
import { IAdminAction } from "@/app/admin/page";

interface IProps {
  setActiveView: React.Dispatch<React.SetStateAction<IAdminAction>>;
}

const AdminNavigation: React.FC<IProps> = ({ setActiveView }) => {
  return (
    <div className="absolute top-6 flex gap-4 max-md:left-6 max-md:gap-2 max-sm:left-4">
      <Button
        onClick={() => setActiveView("newGuest")}
        gradientDuoTone="pinkToOrange"
        outline
        size="sm"
      >
        Novo
      </Button>
      <Button
        onClick={() => setActiveView("listGuests")}
        gradientDuoTone="pinkToOrange"
        outline
        size="sm"
      >
        Lista
      </Button>
    </div>
  );
};

export default AdminNavigation;

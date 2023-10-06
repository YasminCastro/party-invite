import { Button } from "flowbite-react";
import { IAdminAction } from "@/app/admin/page";
import projectConfig from "@/config/project";

interface IProps {
  setActiveView: React.Dispatch<React.SetStateAction<IAdminAction>>;
}

const AdminNavigation: React.FC<IProps> = ({ setActiveView }) => {
  return (
    <div className="absolute top-6 flex gap-4 max-md:left-6 max-md:gap-2 max-sm:left-4">
      <Button
        onClick={() => setActiveView("newGuest")}
        color={projectConfig.buttonColor}
        size="sm"
      >
        Novo
      </Button>
      <Button
        onClick={() => setActiveView("listGuests")}
        color={projectConfig.buttonColor}
        size="sm"
      >
        Lista
      </Button>
    </div>
  );
};

export default AdminNavigation;

import { Button } from "flowbite-react";
import projectConfig from "@/config/project";

interface IProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
}

const SuccessMessage: React.FC<IProps> = ({ message, setMessage }) => {
  return (
    <div>
      <h2 className="mb-2 font-sans text-3xl font-bold text-white">
        {message}
      </h2>
      <Button
        className="mb-2 mt-2 w-full text-base"
        onClick={() => {
          setMessage("");
        }}
        color={projectConfig.buttonColor}
      >
        Criar novo convidado
      </Button>
    </div>
  );
};

export default SuccessMessage;

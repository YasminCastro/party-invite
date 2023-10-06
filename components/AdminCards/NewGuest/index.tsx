import { useState } from "react";
import SuccessMessage from "./SuccessMessage";
import NewGuestForm from "./NewGuestForm";

const NewGuest: React.FC = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="rounded-lg bg-gray-950 bg-opacity-30 w-1/3 bg-clip-padding p-4 max-phone:w-full ">
      {message ? (
        <SuccessMessage message={message} setMessage={setMessage} />
      ) : (
        <NewGuestForm setMessage={setMessage} />
      )}
    </div>
  );
};

export default NewGuest;

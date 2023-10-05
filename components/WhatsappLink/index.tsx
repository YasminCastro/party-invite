import { ReactNode } from "react";

interface IWhatsappLink {
  number: string;
  message: string;
  children: ReactNode;
}

export default function WhatsappLink({
  number,
  message,
  children,
}: IWhatsappLink) {
  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
        message
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-blue-400"
    >
      {children}
    </a>
  );
}

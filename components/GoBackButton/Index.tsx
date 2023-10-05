import projectConfig from "@/config/project";
import { Button } from "flowbite-react";
import Link from "next/link";

interface IProps {
  path: string;
  title: string;
}

export default function GoBackButton({ path, title }: IProps) {
  return (
    <Link href={path}>
      <Button
        className="absolute right-6 top-6"
        color={projectConfig.buttonColor}
      >
        {title}
      </Button>
    </Link>
  );
}

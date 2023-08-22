import { Button } from "flowbite-react";
import { useRouter } from "next/router";

interface IProps {
  path: string;
  title: string;
}

export default function PurpleToBlueButton({ path, title }: IProps) {
  const router = useRouter();

  return (
    <Button
      className="absolute right-6 top-6"
      gradientDuoTone="purpleToBlue"
      onClick={() => router.push(path)}
    >
      {title}
    </Button>
  );
}

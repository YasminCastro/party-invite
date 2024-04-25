import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IProps {
  path: string;
  title: string;
}

export default function GoBackButton({ path, title }: IProps) {
  return (
    <Link href={path}>
      <Button className="absolute right-6 top-6">{title}</Button>
    </Link>
  );
}

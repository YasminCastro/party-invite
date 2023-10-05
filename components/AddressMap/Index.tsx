import projectConfig from "@/config/project";

export default function AddressMap() {
  return (
    <iframe
      src={projectConfig.address}
      width="300"
      height="200"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="mt-4 w-full rounded-xl"
    ></iframe>
  );
}

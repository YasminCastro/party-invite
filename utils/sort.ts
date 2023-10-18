import { IGuests } from "@/providers/Guests";

export const compareByName = (a: IGuests, b: IGuests): number => {
  return a.name.localeCompare(b.name);
};

export const compareByStatus = (a: IGuests, b: IGuests): number => {
  return a.status === b.status ? 0 : a.status ? -1 : 1;
};

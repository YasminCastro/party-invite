import { IGuest } from "@/interface/guests";

export const compareByName = (a: IGuest, b: IGuest): number => {
  return a.name.localeCompare(b.name);
};

export const compareByStatus = (a: IGuest, b: IGuest): number => {
  return a.status === b.status ? 0 : a.status ? -1 : 1;
};

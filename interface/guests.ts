export interface IGuest {
  _id: string;
  name: string;
  receivedInvitation: boolean;
  status: boolean;
  isAdmin?: boolean;
}

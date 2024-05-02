export interface IGuest {
  _id: string;
  name: string;
  receivedInvitation: boolean;
  status: boolean;
  isAdmin?: boolean;
}

export interface IUpdateGuest {
  _id: string;
  name?: string;
  status?: boolean;
  receivedInvitation?: boolean;
  isAdmin?: boolean;
}

export interface INewGuest {
  name: string;
  status?: boolean;
  receivedInvitation?: boolean;
  isAdmin?: boolean;
}

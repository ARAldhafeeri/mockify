import { ReactNode } from "react";

export interface IFetchedUserData {
  _id?: string;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
  createdBy?: string;
  password?: string;
}

export interface IPostedUserData {
  username: string;
  email: string;
  role: string;
}

export interface IDeleteUserData {
  id: string;
}

export interface IUpdateUserData {
  username: string;
  email: string;
  role: string;
}

export interface IFetchUserResponse {
  message?: string;
  status: boolean;
  data?: IFetchedUserData[]
}

export interface IUserInitState {
  user: IFetchUserResponse[];
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}

export interface IUserTableActions {
  icon: ReactNode;
  classes: string[];
  onclick: () => void;
}

export interface IUserTableActionsProps {
  record: IFetchedUserData;
  actions: IUserTableActions[];
}
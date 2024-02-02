import { ReactNode } from "react";

export interface IFetchedClientData {
  _id?: string;
  name: string;
  project: string;
  id: string;
  secret: string;
}

export interface IPostedClientData {
  name: string;
  project: string;
  id: string;
  secret: string;
}

export interface IDeleteClientData {
  id: string;
}

export interface IUpdateClientData {
  name: string;
  project: string;
}

export interface IFetchClientResponse {
  message?: string;
  status?: boolean;
  data?: IFetchedClientData[]
}

export interface IClientInitState {
  client: IFetchedClientData[];
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}

export interface IClientTableActions {
  icon: ReactNode;
  classes: string[];
  onclick: () => void;
}

export interface IClientTableActionsProps {
  record: IFetchedClientData;
  actions: IClientTableActions[];
}
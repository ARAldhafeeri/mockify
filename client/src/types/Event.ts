import { ReactNode } from "react";

export interface IFetchedEventData {
  _id?: string;
  resource: string;
  name: string;
  handler: string;
}

export interface IPostedEventData {
  key: string;
  value: string;
}

export interface IDeleteEventData {
  id: string;
}

export interface IUpdateEventData {
  name: string;
  user: string;
}

export interface IFetchEventResponse {
  message?: string;
  status: boolean;
  data?: IFetchedEventData[]
}

export interface IEventInitState {
  event: IFetchedEventData[];
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}

export interface IEventTableActions {
  icon: ReactNode;
  classes: string[];
  onclick: () => void;
}

export interface IEventTableActionsProps {
  record: IFetchedEventData;
  actions: IEventTableActions[];
}
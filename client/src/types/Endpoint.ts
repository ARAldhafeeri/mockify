import { ReactNode } from "react";

export interface IFetchedEndpointData {
  _id?: string;
  method: string;
  endpoint: string;
  params?: Array<string>;
  
}

export interface IPostedEndpointData {
  method: string;
  endpoint: string;
  params?: Array<string>;
}

export interface IFetchEndpointResponse {
  message?: string;
  status: boolean;
  data?: IFetchedEndpointData[]
}

export interface IEndpointInitState {
  endpoint: IFetchEndpointResponse[];
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}

export interface IEndpointTableActions {
  icon: ReactNode;
  classes: string[];
  onclick: () => void;
}

export interface IEndpointTableActionsProps {
  record: IFetchedEndpointData;
  actions: IEndpointTableActions[];
}
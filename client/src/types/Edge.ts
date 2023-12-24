import { ReactNode } from "react";

export interface IFetchedEdgeData {
  _id?: string;
  resource: string;
  method: string;
  name: string;
  code: string;  
}

export interface IPostedEdgeData {
  method: string;
  endpoint: string;
  params?: Array<string>;
}

export interface IFetchEdgeResponse {
  message?: string;
  status: boolean;
  data?: IFetchedEdgeData[]
}

export interface IEdgeInitState {
  edge: IFetchEdgeResponse[];
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}

export interface IEdgeTableActions {
  icon: ReactNode;
  classes: string[];
  onclick: () => void;
}

export interface IEdgeTableActionsProps {
  record: IFetchedEdgeData;
  actions: IEdgeTableActions[];
}
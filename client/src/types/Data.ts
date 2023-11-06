import { ReactNode } from "react";

export interface IFetchedDataData {
  _id?: string;
  resource: string;
  data: Object;
  
}

export interface IPostedDataData {
  resource: string;
  data: Object;
}

export interface IDeleteDataData {
  id: string;
}

export interface IUpdateDataData {
  resource: string;
  data: Object;
}

export interface IFetchDataResponse {
  message?: string;
  status: boolean;
  data?: IFetchedDataData[]
}

export interface IDataInitState {
  data: IFetchDataResponse[];
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}

export interface IDataTableActions {
  icon: ReactNode;
  classes: string[];
  onclick: () => void;
}

export interface IDataTableActionsProps {
  record: IFetchedDataData;
  actions: IDataTableActions[];
}
import { ReactNode } from "react";

export interface IFetchedCacheData {
  key: string;
  value: string;
}

export interface IPostedCacheData {
  key: string;
  value: string;
}

export interface IDeleteCacheData {
  id: string;
}

export interface IUpdateCacheData {
  name: string;
  user: string;
}

export interface IFetchCacheResponse {
  message?: string;
  status: boolean;
  data?: IFetchedCacheData[]
}

export interface ICacheInitState {
  cache: IFetchedCacheData[];
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}

export interface ICacheTableActions {
  icon: ReactNode;
  classes: string[];
  onclick: () => void;
}

export interface ICacheTableActionsProps {
  record: IFetchedCacheData;
  actions: ICacheTableActions[];
}
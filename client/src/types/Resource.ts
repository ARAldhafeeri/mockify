import { ReactNode } from "react";

export interface IFetchedResourceData {
  _id?: string;
  resourceName: string;
  project: string;
  endpoint: string;
  features: {
    filter: boolean;
    pagination: boolean;
    search: boolean;
    validation: boolean;
    webhook: boolean;
    sse: boolean;
    wss: boolean;
    getx: boolean;
    postx: boolean;
    putx: boolean;
    deletex: boolean;
    consumer: boolean;
    producer: boolean;
  }
  funcs: Array<string>;
}

export interface IPostedResourceData {
  resourceName: string;
  project: string;
  endpoint: string;
  filter: boolean;
  pagination: boolean;
  search: boolean;
  validation: boolean;
  webhook: boolean;
  sse: boolean;
  wss: boolean;
  getx: boolean;
  postx: boolean;
  putx: boolean;
  deletex: boolean;
  consumer: boolean;
  producer: boolean;
  funcs: Array<string>;
}

export interface IDeleteResourceData {
  id: string;
}

export interface IUpdateResourceData {
  resourceName: string;
  project: string;
  endpoint: string;
  filter: boolean;
  pagination: boolean;
  search: boolean;
  validation: boolean;
  webhook: boolean;
  sse: boolean;
  wss: boolean;
  getx: boolean;
  postx: boolean;
  putx: boolean;
  deletex: boolean;
  consumer: boolean;
  producer: boolean;
  funcs: Array<string>;
}

export interface IFetchResourceResponse {
  message?: string;
  status: boolean;
  data?: IFetchedResourceData[]
}

export interface IResourceInitState {
  resource: IFetchResourceResponse[];
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}

export interface IResourceTableActions {
  icon: ReactNode;
  classes: string[];
  onclick: () => void;
}

export interface IResourceTableActionsProps {
  record: IFetchedResourceData;
  actions: IResourceTableActions[];
}
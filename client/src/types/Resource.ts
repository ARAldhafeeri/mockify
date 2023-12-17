import { ReactNode } from "react";

export interface IField {
 name: string;
 type: string;
 required: boolean
}
export interface IFetchedResourceData {
  _id?: string;
  resourceName: string;
  project: string;
  fields: Array<IField>;
  endpoint: string;
  features: {
    filter: boolean;
    pagination: boolean;
    search: boolean;
    validation: boolean;
    getx: boolean;
    postx: boolean;
    putx: boolean;
    deletex: boolean;
  }
}

export interface IPostedResourceData {
  resourceName: string;
  project: string;
  fields: Array<{}>;
  endpoint: string;
  filter: boolean;
  pagination: boolean;
  search: boolean;
  validation: boolean;
  getx: boolean;
  postx: boolean;
  putx: boolean;
  deletex: boolean;
}

export interface IDeleteResourceData {
  id: string;
}

export interface IUpdateResourceData {
  resourceName: string;
  project: string;
  endpoint: string;
  fields: Array<{}>;
  filter: boolean;
  pagination: boolean;
  search: boolean;
  validation: boolean;
  getx: boolean;
  postx: boolean;
  putx: boolean;
  deletex: boolean;
}

export interface IFetchResourceResponse {
  message?: string;
  status?: boolean;
  data?: IFetchedResourceData[]
}

export interface IResourceInitState {
  resource: IFetchedResourceData[];
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
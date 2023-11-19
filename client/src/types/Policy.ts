import { ReactNode } from "react";

export interface IFetchedPolicyData {
  _id?: string;
  project: string;
  resources: Array<string>;
  actions: Array<string>;
  roles: Array<string>;
  policies: Array<{
    role : string,
    can : string[],
    on : string[]
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPostedPolicyData {
  project: string;
  resources: Array<string>;
  actions: Array<string>;
  roles: Array<string>;
  policies: Array<{
    role : string,
    can : string[],
    on : string[]
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface IDeletePolicyData {
  id: string;
}

export interface IUpdatePolicyData {
  resource: string;
  data: Object;
}

export interface IFetchPolicyResponse {
  message?: string;
  status: boolean;
  data?: IFetchedPolicyData[]
}

export interface IPolicyInitState {
  policy: IFetchPolicyResponse[];
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}

export interface IPolicyTableActions {
  icon: ReactNode;
  classes: string[];
  onclick: () => void;
}

export interface IDataTableActionsProps {
  record: IFetchedPolicyData;
  actions: IPolicyTableActions[];
}

export interface IUserDefinedPolicy {
    role : string,
    can : string[],
    on : string[]
}
import { ReactNode } from "react";

export interface IFetchedProjectData {
  _id?: string;
  name: string;
  user: string;
  apiKey?: string;
}

export interface IPostedProjectData {
  name: string;
  user: string;
  apiKey: string;
}

export interface IDeleteProjectData {
  id: string;
}

export interface IUpdateProjectData {
  name: string;
  user: string;
}

export interface IFetchProjectResponse {
  message?: string;
  status: boolean;
  data?: IFetchedProjectData[]
}

export interface IProjectInitState {
  project: IFetchedProjectData[];
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}

export interface IProjectTableActions {
  icon: ReactNode;
  classes: string[];
  onclick: () => void;
}

export interface IProjectTableActionsProps {
  record: IFetchedProjectData;
  actions: IProjectTableActions[];
}
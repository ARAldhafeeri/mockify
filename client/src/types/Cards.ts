import { ReactNode } from "react";

export interface ICardsProps {
  actions: ICardAction[];
  data: any;
}


export interface ICardAction {
  icon: ReactNode;
  classes: string[];
  onclick: (record : any) => void;
}


export interface IUserCardProps {
  username : string;
  email: string;
  role: string;
  _id : string;
  actions: ICardAction[];
  createdAt: string;
  createdBy: string;
}

export interface IProjectCardProps {
  name : string;
  apiKey: string;
  user: string;
  _id : string;
  actions: ICardAction[];
}

export interface IEdgeCardProps {
  name: string;
  code: string;
  _id : string;
  actions: ICardAction[];
  resource: string;
  method: string;
}

export interface IEventCardProps {
  name: string;
  _id : string;
  actions: ICardAction[];
  resource: string;
  handler: string;
}

export interface IClientCardProps {
  name: string;
  _id : string;
  actions: ICardAction[];
  id: string;
  secret: string;
  project: string;
}
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
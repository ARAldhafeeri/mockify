import React from "react";
import { IFetchedProjectData } from "./Project";

export interface GlobalTabsProps {
  content: any;
  createBtn?: any;
  withCreateBtn: boolean;
  handleTabChange: (key: string, projects: any) => void;
  key: number;
}
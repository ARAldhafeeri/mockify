import React from "react";
import { IFetchedProjectData } from "./Project";

export interface GlobalTabsProjectsProps {
  content: any;
  createBtn?: any;
  withCreateBtn: boolean;
  handleTabChange: (key: string, projects: any) => void;
  tabKey: number;
}

export interface GlobalTabsResourceProps {
  content: any;
  createBtn?: any;
  withCreateBtn: boolean;
  handleTabChange?: (key: string, projects: any) => void;
  tabKey: number;
}
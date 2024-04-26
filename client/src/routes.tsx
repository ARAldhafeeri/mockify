import React from "react";
import {
  createBrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./index.css";
import NotLoggedInLayout from "components/containers/Layout/NotLoggedInLayout";
import LoggedInLayout from "components/containers/Layout/LoggedInLayout";

import User from "components/containers/User/User";
import Dashboard from 'components/containers/Dashboard/Dashboard';
import {
  AiFillPieChart ,
  AiOutlineTeam ,
  AiOutlineRadarChart ,
  AiFillDatabase ,
  AiOutlineDeploymentUnit ,
  AiFillControl ,
  AiFillFolderAdd ,
  AiOutlineCodeSandbox ,
  AiOutlineFunction ,
  AiOutlineThunderbolt ,
  AiOutlineLogout 
  
} from 'react-icons/ai';
import { ROUTES_NAMES } from "constants/routes";
import Project from "components/containers/Project/Project";
import Resource from "components/containers/Resource/Resource";
import Endpoint from "components/containers/Endpoint/Endpoint";
import Data from "components/containers/Data/Data";
import Policy from "components/containers/Policy/Policy";
import Edge from "components/containers/Edge/Edge";
import { Tag } from "antd";
import Swagger from "components/containers/Swagger/Swagger";
import Cache from "components/containers/Cache/Cache";
import Event from "components/containers/Event/Event";
import Client from "components/containers/Client/Client";
import Logout from "components/containers/User/Logout";
import { ISiderItem } from "components/commons/Sider/Sider.types";

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  to?: string;
  subItems?: MenuItem[];
  element?: React.ReactNode;
  children?: MenuItem[];
  type?: string | null;
}

interface IRoute {
  path: string;
  element: React.ReactNode;
}

const newPage = (Icon : any) => {
  return <><Icon className="newPageIconLeft" /><Tag color="green"className="newPageText">new</Tag></>
};

const GetItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  to?: string | null,
  children?: ISiderItem[],
) : ISiderItem => {
  return  !to ?  {
    key,
    icon,
    children,
    label,
  } as ISiderItem : {
    key,
    icon,
    to,
    label,
  } as ISiderItem;
}

const GetRoute = (
  path: string,  
  element: React.ReactNode,
) : IRoute => {
  return {
    path,
    element,
  };
}

export const items: ISiderItem[]= [
  GetItem('Users', 'user', <AiOutlineTeam size={25} />, ROUTES_NAMES.USER),
  GetItem('Projects', 'project', <AiFillPieChart  size={25}/>, ROUTES_NAMES.PROJECT),
  GetItem('Resources', 'resources', <AiFillDatabase  size={25}/>, ROUTES_NAMES.RESOURCE),
  GetItem('Data', 'data', <AiOutlineCodeSandbox  size={25}/>, ROUTES_NAMES.DATA),
  GetItem('Policy', 'policy', <AiFillControl  size={25}/>, ROUTES_NAMES.POLICY),
  GetItem('Endpoint', 'endpoint', <AiOutlineDeploymentUnit  size={25}/>, ROUTES_NAMES.ENDPOINT),
  GetItem('Edge', 'Edge', <AiOutlineFunction  size={25}/>, ROUTES_NAMES.EDGE),
  GetItem('Swagger', 'Swagger', <AiFillFolderAdd  size={25}/>, ROUTES_NAMES.SWAGGER),
  GetItem('Cache', 'cache', <AiFillDatabase  size={25}/>, ROUTES_NAMES.CACHE),
  GetItem('Event', 'event', <AiOutlineThunderbolt  size={25}/>, ROUTES_NAMES.EVENT),
  GetItem('Clients', 'clients', <AiOutlineRadarChart size={25} />, ROUTES_NAMES.CLIENTS),
  GetItem("Logout", "logout",<AiOutlineLogout  size={25} />, ROUTES_NAMES.LOGOUT )
];

const withLoggedInLayout = (element: React.ReactNode) => (
  <LoggedInLayout>{element}</LoggedInLayout>
);

const MainRouter = createBrowserRouter([
  GetRoute(ROUTES_NAMES.ROOT, <NotLoggedInLayout />),
  GetRoute(ROUTES_NAMES.USER, withLoggedInLayout(<User />)),
  GetRoute(ROUTES_NAMES.PROJECT, withLoggedInLayout(<Project />)),
  GetRoute(ROUTES_NAMES.RESOURCE, withLoggedInLayout(<Resource />)),
  GetRoute(ROUTES_NAMES.DATA, withLoggedInLayout(<Data />)),
  GetRoute(ROUTES_NAMES.POLICY, withLoggedInLayout(<Policy />)),
  GetRoute(ROUTES_NAMES.ENDPOINT, withLoggedInLayout(<Endpoint />)),
  GetRoute(ROUTES_NAMES.EDGE, withLoggedInLayout(<Edge />)),
  GetRoute(ROUTES_NAMES.SWAGGER, withLoggedInLayout(<Swagger />)),
  GetRoute(ROUTES_NAMES.CACHE, withLoggedInLayout(<Cache />)),
  GetRoute(ROUTES_NAMES.EVENT, withLoggedInLayout(<Event />)),
  GetRoute(ROUTES_NAMES.CLIENTS, withLoggedInLayout(<Client />)),
  GetRoute(ROUTES_NAMES.LOGOUT, withLoggedInLayout(<Logout />))
]);

export default MainRouter;

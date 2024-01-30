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
  PieChartOutlined,
  TeamOutlined,
  RadarChartOutlined,
  UserOutlined,
  SlackCircleFilled, 
  DatabaseFilled,
  DeploymentUnitOutlined,
  ControlOutlined,
  FolderAddOutlined,
  FolderAddFilled,
  FunctionOutlined,
  TransactionOutlined
  
} from '@ant-design/icons';
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

const newPage = (Icon : React.FC<{className: string}>) => {
  return <><Icon className="newPageIconLeft" /><Tag color="green"className="newPageText">new</Tag></>
};

const GetItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  to?: string | null,
  children?: MenuItem[],
  type: string | null = null,
) : MenuItem => {
  return  !to ?  {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem : {
    key,
    icon,
    to,
    label,
  } as MenuItem;
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

export const items: MenuItem[] = [
  GetItem('Configuration', 'configuration', <ControlOutlined />, null,  [
  GetItem('Clients', 'clients', <UserOutlined />, ROUTES_NAMES.CLIENTS),
  ]),
  GetItem('Users', 'user', <UserOutlined />, ROUTES_NAMES.USER),
  GetItem('Projects', 'project', <SlackCircleFilled />, ROUTES_NAMES.PROJECT),
  GetItem('Resources', 'resources', <DatabaseFilled />, ROUTES_NAMES.RESOURCE),
  GetItem('Data', 'data', <FolderAddFilled />, ROUTES_NAMES.DATA),
  GetItem('Policy', 'policy', <ControlOutlined />, ROUTES_NAMES.POLICY),
  GetItem('Endpoint', 'endpoint', <DeploymentUnitOutlined />, ROUTES_NAMES.ENDPOINT),
  GetItem('Edge Functions', 'Edge', <FunctionOutlined />, ROUTES_NAMES.EDGE),
  GetItem('Swagger', 'Swagger', <FolderAddOutlined />, ROUTES_NAMES.SWAGGER),
  GetItem('Cache', 'cache', <DatabaseFilled />, ROUTES_NAMES.CACHE),
  GetItem('Event', 'event', <TransactionOutlined />, ROUTES_NAMES.EVENT)
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
]);

export default MainRouter;

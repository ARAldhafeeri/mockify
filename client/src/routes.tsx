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
  UserOutlined,
  SlackCircleFilled, 
  DatabaseFilled,
  DeploymentUnitOutlined,
  ControlOutlined,
  FolderAddOutlined,
  FolderAddFilled
  
} from '@ant-design/icons';
import { ROUTES_NAMES } from "constants/routes";
import Project from "components/containers/Project/Project";
import Resource from "components/containers/Resource/Resource";
import Endpoint from "components/containers/Endpoint/Endpoint";
import Data from "components/containers/Data/Data";
import Policy from "components/containers/Policy/Policy";


interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  to?: string;
  subItems?: MenuItem[];
  element?: React.ReactNode;
}

export const items: MenuItem[] = [
  // {
  //   key: 'dashbaord',
  //   icon: <PieChartOutlined />,
  //   label: 'Dashboard',
  //   to: '/dashboard',
  //   element:  <Dashboard />
  // },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: 'Users',
    to: '/user',
    element: <User />
  }, 
  {
    key: 'project',
    icon: <SlackCircleFilled />,
    label: 'Projects',
    to: '/project',
    element: <Project />
  }, 
  {
    key: "resources", 
    icon: <DatabaseFilled />,
    label: 'Resources',
    to: '/resource',
    element: <Resource />
  },
  {
    key: "data",
    icon: <FolderAddFilled />,
    label: 'Data',
    to: '/data',
  }, 
  {
    key: "policy",
    icon: <ControlOutlined />,
    label: 'Policy',
    to: '/policy',
  }, 
  {
    key: "endpoint",
    icon: <DeploymentUnitOutlined />,
    label: 'Endpoint',
    to: '/endpoint',
  }, 
  // Add more menu items if needed
];

const withLoggedInLayout = (element: React.ReactNode) => (
  <LoggedInLayout>{element}</LoggedInLayout>
);

const MainRouter = createBrowserRouter([
  {
    path: ROUTES_NAMES.ROOT,
    element: <NotLoggedInLayout />,
  },
  // {
  //   path: ROUTES_NAMES.DASHBOARD,
  //   element: withLoggedInLayout(<Dashboard />),
  // },
  {
    path: ROUTES_NAMES.USER,
    element: withLoggedInLayout(<User />)
  },
  {
    path: ROUTES_NAMES.PROJECT,
    element: withLoggedInLayout(<Project />)
  },
  {
    path: ROUTES_NAMES.RESOURCE,
    element: withLoggedInLayout(<Resource />)
  },
  {
    path: ROUTES_NAMES.DATA,
    element: withLoggedInLayout(<Data />)
  },
  {
    path: ROUTES_NAMES.POLICY,
    element: withLoggedInLayout(<Policy />)
  }, 
  {
    path: ROUTES_NAMES.ENDPOINT,
    element: withLoggedInLayout(<Endpoint />)
  }
]);

export default MainRouter;

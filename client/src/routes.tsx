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
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ROUTES_NAMES } from "constants/routes";
import Project from "components/containers/Project/Project";


interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  to?: string;
  subItems?: MenuItem[];
  element?: React.ReactNode;
}

export const items: MenuItem[] = [
  {
    key: 'dashbaord',
    icon: <DesktopOutlined />,
    label: 'Dashboard',
    to: '/dashboard',
    element:  <Dashboard />
  },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: 'Users',
    to: '/user',
    element: <User />
  }, 
  {
    key: 'project',
    icon: <FileOutlined />,
    label: 'Projects',
    to: '/project',
    element: <Project />
  }, 
  {
    key: "resources", 
    icon: <TeamOutlined />,
    label: 'Resources',
    to: '/resource',
    element: <div>Resources</div>
  },
  {
    key: "mockData",
    icon: <TeamOutlined />,
    label: 'Mock Data',
    to: '/mockData',
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
  {
    path: ROUTES_NAMES.DASHBOARD,
    element: withLoggedInLayout(<Dashboard />),
  },
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
    element: withLoggedInLayout(<div>Resources</div>)
  },
  {
    path: ROUTES_NAMES.MOCKDATA,
    element: withLoggedInLayout(<div>Mock Data</div>)
  }
]);

export default MainRouter;

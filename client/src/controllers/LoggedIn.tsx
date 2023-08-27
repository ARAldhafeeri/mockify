import React from "react";
import User from "components/containers/User/User";
import Dashboard from 'components/containers/Dashboard/Dashboard';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  to?: string;
  subItems?: MenuItem[];
  element?: React.ReactNode;
}

const LoggedInLayoutController = () => {

  const items: MenuItem[] = [
    {
      key: 'user',
      icon: <UserOutlined />,
      label: 'Users',
      to: '/user',
      element: <User />
    },
    {
      key: 'dashbaord',
      icon: <DesktopOutlined />,
      label: 'Dashboard',
      to: '/dashboard',
      element: <Dashboard />
    }
    // Add more menu items if needed
  ];
  const [collapsed, setCollapsed] = React.useState(false as boolean);
  const [current, setCurrent] = React.useState('user' as string);

  const handleClick = (e: any) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return {
    items,
    collapsed,
    setCollapsed,
    current,
    setCurrent,
    handleClick
  };
}

export default LoggedInLayoutController;

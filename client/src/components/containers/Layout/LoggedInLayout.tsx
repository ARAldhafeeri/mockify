import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useRoutes } from 'react-router-dom';
import { Routes } from '../../../routes';

const { Content, Footer, Sider } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  to?: string;
  subItems?: MenuItem[];
}

interface ILoggedInLayoutProps {
  children: React.ReactNode;
}
const items: MenuItem[] = [
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Users',
    to: '/user',
  },
  {
    key: 'dashbaord',
    icon: <DesktopOutlined />,
    label: 'Dashboard',
    to: '/dashboard',
  }
  // Add more menu items if needed
];



const LoggedInLayout: React.FC<ILoggedInLayoutProps> = ({children}) => {
  const [collapsed, setCollapsed] = useState(false as boolean);
  const [current, setCurrent] = useState('1' as string);


  const setActiveKeyBasedOnPath = () : void => {
    // update the current active key based on the path
    // path and to must match
    const path = window.location.pathname;
    const item = items.find(item => item.to === path);
    if (item) {
      setCurrent(item.key);
    }
  };

  useEffect(() => {
    setActiveKeyBasedOnPath();
  }, []);

  return (
    <Layout hasSider={true} style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[current]} mode="inline">
          {items.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.to || '/'}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
            {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>MOCKIFY.IO ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default LoggedInLayout;
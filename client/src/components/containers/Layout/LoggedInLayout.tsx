import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import User from '../User/User';
import Dashboard from '../Dashboard/Dashboard';
const { Content, Footer, Sider } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  to?: string;
  subItems?: MenuItem[];
  element?: React.ReactNode;
}

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



const LoggedInLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false as boolean);
  const [current, setCurrent] = useState('user' as string);

  const handleClick = (e: any) => {
    console.log('click ', e);
    setCurrent(e.key);
  };


  return (
    <Layout hasSider={true} style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[current]} mode="inline">
          {items.map(item => (
            <Menu.Item key={item.key} onClick={handleClick} icon={item.icon}>
              <Link to={item.to || '/'}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Routes>
            {
              items.map(item => (
                <Route key={item.key} path={item.to} element={item.element} />
              ))
            }
          </Routes>        
        </Content>
        <Footer style={{ textAlign: 'center' }}>MOCKIFY.IO ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default LoggedInLayout;
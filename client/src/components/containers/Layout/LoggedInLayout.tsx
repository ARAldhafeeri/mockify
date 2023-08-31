import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import LoggedInLayoutController from 'controllers/LoggedIn';
import { items } from 'routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const { Content, Footer, Sider } = Layout;

interface LoggedInLayoutProps {
  children: React.ReactNode;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = (props) => {
 const {
    collapsed, 
    setCollapsed, 
    current, 
    handleClick 
  } = LoggedInLayoutController();
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
        <ToastContainer
          position="top-right" autoClose={5000} 
          hideProgressBar={false} newestOnTop={false} 
          closeOnClick rtl={false} draggable pauseOnHover 
          style={{ width: "450px" }}
        />
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>MOCKIFY.IO ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default LoggedInLayout;
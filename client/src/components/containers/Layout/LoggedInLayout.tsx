import React, { Suspense, useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import LoggedInLayoutController from 'controllers/LoggedIn';
import { items } from 'routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthCheckController from 'controllers/AuthCheck';
import { ROUTES_NAMES } from 'constants/routes';
import { Navigate } from 'react-router';
import MockifyLoader from 'components/commons/Loader/MockifyLoader';
import styles from "./LoggedInLayout.module.scss";

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

  const { auth } = AuthCheckController()

  if (!auth){
    // currently is normal cookie where token is stored
    // but for security in the near future it's going to be
    // http only cookie
    return <Navigate to={ROUTES_NAMES.ROOT} />
  }

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
        <Suspense fallback={<MockifyLoader/>}>
          <Content className={styles.content}>
          <ToastContainer
            position="top-right" autoClose={5000} 
            hideProgressBar={false} newestOnTop={false} 
            closeOnClick rtl={false} draggable pauseOnHover 
            style={{ width: "450px" }}
          />
            {props.children}
          </Content>
        </Suspense>
        <Footer style={{ textAlign: 'center' }}>MOCKIFY.IO ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default LoggedInLayout;
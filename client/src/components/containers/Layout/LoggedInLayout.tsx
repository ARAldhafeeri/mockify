import React, { Suspense, useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import LoggedInLayoutService from 'services/LoggedIn';
import { items } from 'routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthCheckService from 'services/AuthCheck';
import { ROUTES_NAMES } from 'constants/routes';
import { Navigate } from 'react-router';
import MockifyLoader from 'components/commons/Loader/MockifyLoader';

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
  } = LoggedInLayoutService();

  const { auth } = AuthCheckService()

  if (!auth){
    // currently is normal cookie where token is stored
    // but for security in the near future it's going to be
    // http only cookie
    return <Navigate to={ROUTES_NAMES.ROOT} />
  }

 return (
    <Layout hasSider={true} className='layout'>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[current]} mode="inline" inlineCollapsed>
          {items.map(item => (
            item.children ? (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map(child => (
                <Menu.Item onClick={handleClick} key={child.key} icon={child.icon}>
                  <Link to={child.to || "/"}>{child.label}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
            ) : (
            <Menu.Item onClick={handleClick} key={item.key} icon={item.icon}>
              <Link to={item.to || "/"}>{item.label}</Link>
            </Menu.Item>
            )
          ))}
        </Menu>
      </Sider>
      <Layout className='layout'>
        <Suspense fallback={<MockifyLoader/>}>
          <Content className="">
          <ToastContainer
            position="top-right" autoClose={5000} 
            hideProgressBar={false} newestOnTop={false} 
            closeOnClick rtl={false} draggable pauseOnHover 
            style={{ width: "450px" }}
          />
            {props.children}
            
          </Content>
        </Suspense>
        <Footer className='footer'>MOCKIFY.IO ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default LoggedInLayout;
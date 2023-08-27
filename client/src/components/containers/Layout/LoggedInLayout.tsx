import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import LoggedInLayoutController from 'controllers/LoggedIn';
const { Content, Footer, Sider } = Layout;




const LoggedInLayout: React.FC = () => {
 const { items, collapsed, setCollapsed, current, handleClick } = LoggedInLayoutController();
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
import React from 'react'
import MockifyCard from 'components/commons/Card/Card';
import LoginForm from '../Forms/LoginForm/LoginForm';
import { Layout, theme } from 'antd';
import AuthCheckController from 'controllers/Auth';

const NotLoggedInLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    auth 
  } = AuthCheckController();

  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundColor: "#217dbb", 
        justifyContent: "center", 
        alignItems: "center"}}>
      <MockifyCard classes={["mockify-card-login-page"]}>
       <div className="card-content">
        <h3 className='card-header'>Login into mockify.io</h3>
        <LoginForm />
       </div>
      </MockifyCard>
    </Layout>
  )
}

export default NotLoggedInLayout;
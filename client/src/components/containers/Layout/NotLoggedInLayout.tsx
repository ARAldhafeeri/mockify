import React from 'react'
import MockifyCard from 'components/commons/Card/Card';
import LoginForm from '../Forms/LoginForm/LoginForm';
import { Layout, theme } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthService from 'services/Auth';
import { ROUTES_NAMES } from 'constants/routes';
import { Navigate } from 'react-router';

const NotLoggedInLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { auth } = AuthService();
  if (auth){
    return <Navigate to={ROUTES_NAMES.USER} />;
  }
  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundColor: "#217dbb", 
        justifyContent: "center", 
        alignItems: "center"}}>
      <ToastContainer
        position="top-right" autoClose={5000} 
        hideProgressBar={false} newestOnTop={false} 
        closeOnClick rtl={false} draggable pauseOnHover 
        style={{ width: "450px" }}
      />
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
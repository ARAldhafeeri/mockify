import React from 'react';
import './App.scss';
import LoggedInLayout from 'components/containers/Layout/LoggedInLayout';
import AuthCheckController from 'controllers/AuthCheck';
import NotLoggedInLayout from 'components/containers/Layout/NotLoggedInLayout';

const  App : React.FC = () => {
  const {auth } = AuthCheckController();
  if (auth){
    return (
      <NotLoggedInLayout />
    )
  } else {
    return (
      <LoggedInLayout />
    )
  }
}

export default App;

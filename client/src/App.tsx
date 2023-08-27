import React from 'react';
import './App.scss';
import {
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoggedInLayout from 'components/containers/Layout/LoggedInLayout';
import NotLoggedInLayout from 'components/containers/Layout/NotLoggedInLayout';

const  App : React.FC = () => {
  const [authenticated, setAuthenticated] = React.useState(true);
  if (authenticated){
    return (
      <BrowserRouter>
        <LoggedInLayout />
      </BrowserRouter>
    )
  } else {
    return (
      <NotLoggedInLayout />
    )
  }
}

export default App;

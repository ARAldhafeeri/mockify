import React from 'react';
import './App.scss';
import NotLoggedInLayout from 'components/containers/Layout/NotLoggedInLayout';
import {
  RouterProvider
} from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store';
import LoggedInLayout from 'components/containers/Layout/LoggedInLayout';
import MainRouter from 'routes';
const  App : React.FC = () => {
  return (
    <Provider store={store}>
        < RouterProvider router={MainRouter} />
      </Provider>
  )
}

export default App;

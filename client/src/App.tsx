import React from 'react';
import './App.scss';
import router from 'routes';
import {
  RouterProvider,
} from "react-router-dom";

const  App : React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;

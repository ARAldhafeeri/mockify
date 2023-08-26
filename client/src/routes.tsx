import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
} from "react-router-dom";

import NotLoggedInLayout from "components/containers/Layout/NotLoggedInLayout";
import UserPage from "components/pages/User";
import Dashboard from "components/pages/Dashboard";

export const Routes : Array<object> = [
  {path : '/user', element: <UserPage />},
  {path : '/login', element: <NotLoggedInLayout />},
  {path : '/dashboard', element: <Dashboard />},
]


const router = createBrowserRouter(Routes);


export default router;

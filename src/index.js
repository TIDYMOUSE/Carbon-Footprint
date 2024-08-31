import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CarbonEmission from "./pages/CarbonEmission";
import HomePage from "./pages/HomePage";
import Chatterman from "./pages/Chatterman";
import Admin from "./pages/Admin";
import AdminLoginPage from "./pages/AdminLogin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import DashLayout from "./pages/DashLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Error/>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "carbon-emission",
        element: <CarbonEmission />,
      },
      {
        path: "chat-bot",
        element: <Chatterman />,
      },
    ],

  },
  {
    path:"/dashboard",
    element:<DashLayout/>,
    errorElement:<Error/>,
    children :[
      {
        path:"",
        element:<Dashboard/>,

      },
      {
        path:"carbon-emission",
        element:<CarbonEmission/>,
      },
      {
        path: "chat-bot",
        element: <Chatterman/>,
      },
    ]
  },
  {
    path:"/login",
    element:<Login/>,
    errorElement:<Error/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
    errorElement:<Error/>,

  },
  {
    path: "/admin/login",
    element:<AdminLoginPage/>,
    errorElement:<Error/>,
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

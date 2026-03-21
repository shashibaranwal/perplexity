import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login"
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/components/Protected";

export const router = createBrowserRouter([
    
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <Protected>
             <Dashboard />
        </Protected>
    },
    {
        path: "/dashboard",
        element: <Navigate to="/" />
    }
])

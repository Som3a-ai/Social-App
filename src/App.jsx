import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
import TokenContextProvider from "./Context/TokenContext";
import { HeroUIProvider } from "@heroui/react";
import Notfication from "./Components/Notfication/Notfication";
import Profile from "./Components/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Settings from "./Components/Settings/Settings";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PostDetail from "./Components/PostDetails/PostDetail";
import UserProfile from "./Components/UserProfile/UserProfile";

const query = new QueryClient();

const route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            {" "}
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/notifications",
        element: (
          <ProtectedRoute>
            <Notfication />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        
        path: "/postDetails/:_id",
        element: (
          <ProtectedRoute>
            <PostDetail />
          </ProtectedRoute>
        ),
      },
      {
        path:"/profile",
        element:(
          <ProtectedRoute>
            <UserProfile/>
          </ProtectedRoute>
        )
      }
    ],
  },
  { index: true, element: <Auth /> },
]);

export default function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <HeroUIProvider>
          <TokenContextProvider>
            <RouterProvider router={route}></RouterProvider>
          </TokenContextProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </>
  );
}

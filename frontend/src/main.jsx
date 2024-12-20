import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./store/store.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PostDetails from "./pages/PostDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/users/login",
        element: <Login />,
      },
      {
        path: "/users/register",
        element: <Register />,
      },
      {
        path: "/users/home",
        element: <Home />,
      },
      {
        path: "/posts/create",
        element: <CreatePost />,
      },
      {
        path: "/posts/:postId",
        element: <PostDetails />,
      },
      {
        path: "/users/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <main>
      <RouterProvider router={router} />
    </main>
  </Provider>
);

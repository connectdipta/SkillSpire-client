import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";

import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AboutUs from "../pages/AboutUs";
import AllContests from "../pages/AllContests";
import ContestDetails from "../pages/ContestDetails";
import ErrorPage from "../pages/ErrorPage";

import PrivateRoute from "./PrivateRoute";

// Dashboard pages
import AddContest from "../pages/Dashboard-User/AddContest";
import MyContests from "../pages/Dashboard-User/MyContests";
import Submissions from "../pages/Dashboard-User/Submissions";

export const router = createBrowserRouter([
  /* ---------- MAIN SITE ---------- */
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      { path: "aboutUs", element: <AboutUs /> },

      {
        path: "all-contests",
        element: (
          <PrivateRoute>
            <AllContests />
          </PrivateRoute>
        ),
      },

      {
        path: "contests/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  /* ---------- AUTH ---------- */
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  /* ---------- DASHBOARD (PRIVATE) ---------- */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AddContest />,
      },
      {
        path: "add-contest",
        element: <AddContest />,
      },
      {
        path: "my-contests",
        element: <MyContests />,
      },
      {
        path: "submissions",
        element: <Submissions />,
      },
    ],
  },
]);

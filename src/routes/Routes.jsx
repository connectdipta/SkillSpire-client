import { createBrowserRouter } from "react-router";

/* -------- Layouts -------- */
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";

/* -------- Public Pages -------- */
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import AllContests from "../pages/AllContests";
import ContestDetails from "../pages/ContestDetails";
import ErrorPage from "../pages/ErrorPage";

/* -------- Auth Pages -------- */
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

/* -------- Creator Dashboard -------- */
import AddContest from "../pages/dashboard/creator/AddContest";
import MyContests from "../pages/dashboard/creator/MyContests";
import Submissions from "../pages/dashboard/creator/Submissions";
import EditContest from "../pages/dashboard/creator/EditContest";

/* -------- Admin Dashboard -------- */
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageContests from "../pages/dashboard/admin/ManageContests";

/* -------- Route Guards -------- */
import PrivateRoute from "./PrivateRoute";
import CreatorRoute from "./CreatorRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  /* ================= MAIN SITE ================= */
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

  /* ================= AUTH ================= */
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  /* ================= DASHBOARD ================= */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      /* -------- Creator -------- */
      {
        path: "add-contest",
        element: (
          <CreatorRoute>
            <AddContest />
          </CreatorRoute>
        ),
      },
      {
        path: "my-contests",
        element: (
          <CreatorRoute>
            <MyContests />
          </CreatorRoute>
        ),
      },
      {
        path: "submissions",
        element: (
          <CreatorRoute>
            <Submissions />
          </CreatorRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <CreatorRoute>
            <EditContest />
          </CreatorRoute>
        ),
      },

      /* -------- Admin -------- */
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <AdminRoute>
            <ManageContests />
          </AdminRoute>
        ),
      },
    ],
  },
]);

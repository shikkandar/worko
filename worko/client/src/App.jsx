import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyReferals from "./pages/MyReferals";
import Refer from "./pages/Refer";
import Register from "./pages/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import UpdateStatus from "./pages/UpdateStatus";
import Profile from "./pages/Profile";

// Layout component for routes with NavBar
const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  return children;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "refer",
            element: <Refer />,
          },
          {
            path: "my-referals",
            element: <MyReferals />,
          },
          {
            path: "update-status",
            element: <UpdateStatus />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;

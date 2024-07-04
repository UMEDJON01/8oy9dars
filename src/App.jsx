import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registor from "./pages/Registor";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { action as registorAction } from "./pages/Registor";
import { action as loginAction } from "./pages/Login";
import { action as actionHome } from "./pages/Home";
function App() {
  const { user } = useSelector((state) => state.user);

  let router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          action: actionHome,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: loginAction,
    },
    {
      path: "/registor",
      element: user ? <Navigate to="/" /> : <Registor />,
      action: registorAction,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

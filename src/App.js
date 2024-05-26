import logo from "./logo.svg";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Home from "./Components/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Header from "./Header";
import Setting from "./Setting";
import { ToastContainer } from "react-toastify";

function App() {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const AfterLoginRoutes = () => useRoutes([
    { path: "/", element: <Home /> },
    { path: "/settings", element: <Setting /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
  const BeforeLoginRoutes = () => useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/", element: <Signup /> },
  ]);
  return <BrowserRouter>
    <ToastContainer />
    {user ?
      <div>
        <Header />
        <AfterLoginRoutes />
      </div>
      : <BeforeLoginRoutes />
    }
  </BrowserRouter>;
}

export default App;

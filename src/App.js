import logo from "./logo.svg";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Home from "./Components/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function App() {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const AfterLoginRoutes = () => useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
  const BeforeLoginRoutes = () => useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/", element: <Signup /> },
  ]);
  return <BrowserRouter>{user ? <AfterLoginRoutes /> : <BeforeLoginRoutes />}</BrowserRouter>;
}

export default App;

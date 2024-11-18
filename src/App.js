import logo from "./logo.svg";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import './index.css';
import Home from "./Components/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Header from "./Header";
import Setting from "./Setting";
import { ToastContainer } from "react-toastify";
import SideBar from "./SideBar";
import UserProfile from "./Components/UserProfile";
import ChatHome from "./Components/Chats/ChatHome";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import ChatDetail from './Components/Chats/ChatDetail';
import { useEffect, useState } from "react";

function App() {
  const user = useSelector((state) => state.auth.user);
  const [width, setWidth] = useState(window.innerWidth);
    const handleSize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleSize);
        return () => {
            window.addEventListener("resize", handleSize);
        }
    }, []);

    const isMobile = width <= 917;

  const AfterLoginRoutes = () => useRoutes([
    { path: "/", element: <ChatHome/> },
    { path: "/profile", element: <UserProfile /> },
    { path: "/settings", element: <Setting /> },
    { path: "/chat/:id", element: <ChatDetail />},
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
  
  const BeforeLoginRoutes = () => useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login isMobile={isMobile} /> },
    { path: "/signup", element: <Signup isMobile={isMobile} /> },
    { path: "*", element: <Navigate to="/" replace /> }
  ]);

  return <BrowserRouter>
    <ToastContainer />
    <LoadingSpinner />
    {user ?
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 col-md-2 col-lg-2 p-0">
              <SideBar isMobile={isMobile} />
            </div>
            <div className="col-10 col-md-10 col-lg-10 main-content">
              <AfterLoginRoutes />
            </div>
          </div>
        </div>
      </div>
      : <BeforeLoginRoutes />
    }
  </BrowserRouter>;
}

export default App;

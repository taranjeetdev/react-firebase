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
import SideBar from "./SideBar";
import UserProfile from "./Components/UserProfile";
import ChatHome from "./Components/Chats/ChatHome";
import { useSelector } from "react-redux";

function App() {
  // const user = JSON.parse(localStorage.getItem("userDetails"));
  const user = useSelector((state) => state.auth.user);
  const AfterLoginRoutes = () => useRoutes([
    { path: "/", element: <Home /> },
    { path: "/chats", element: <ChatHome/> },
    { path: "/profile", element: <UserProfile /> },
    { path: "/settings", element: <Setting /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
  const BeforeLoginRoutes = () => useRoutes([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "*", element: <Navigate to="/" replace /> }
  ]);
  return <BrowserRouter>
    <ToastContainer />
    {user ?
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 col-md-2 col-lg-2 p-0">
              <SideBar />
            </div>
            <div className="col-10 col-md-10 col-lg-10">
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

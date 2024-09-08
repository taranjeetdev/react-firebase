import React, { useEffect } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChatLogo from './Images/iconchat.png'
import { logout } from "./reduxData/User/userSlice";
import { catch_error_handler } from "./Database/firebasefunctions";
import { useDispatch, useSelector } from "react-redux";
import { start_loading, stop_loading } from "./reduxData/Loader/loaderSlice";

const Header = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(start_loading());
        try {
            dispatch(logout());
        } catch (error) {
            catch_error_handler(error);
        } finally {
            dispatch(stop_loading());
        }
    };

    return (
        <div className="header-top">
            <Navbar className="d-flex">
                <Container>
                    <Navbar.Brand>
                        <Link to="/" className="text-decoration-none fs-4">
                            <img src={ChatLogo} alt="not found" />
                        </Link>
                    </Navbar.Brand>
                    {/* <Nav className="me-auto">
                    <Link to="/" className="text-decoration-none fs-4 me-3 text-dark">Home</Link>
                </Nav> */}
                    <Nav className="ms-auto">
                        <NavDropdown className="fs-4" title={`${user?.username ? user?.username : "....."}`} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Item href="#logout" onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;


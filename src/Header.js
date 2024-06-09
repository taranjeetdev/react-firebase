import React, { useEffect } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChatLogo from './Images/iconchat.png'

const Header = () => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
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
    )
}

export default Header;


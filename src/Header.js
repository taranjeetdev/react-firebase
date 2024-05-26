import React, { useEffect } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

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
                    <Link to="/" className="text-decoration-none fs-4">Web Chat</Link>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Link to="/" className="text-decoration-none fs-4 me-3 text-dark">Home</Link>
                    <Link to="/settings" className="text-decoration-none fs-4 me-3 text-dark">Settings</Link>
                </Nav>
                <Nav className="ms-auto">
                    <NavDropdown className="fs-4" 
                    title={`${user?.username ? user?.username : "....."}`} 
                    id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#logout" onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;


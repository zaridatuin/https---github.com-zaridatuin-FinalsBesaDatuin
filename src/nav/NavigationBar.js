import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { logout } from "../services/authService";
import './Navbar.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavigationBar() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <>
        <Navbar fixed="top" collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><img src="../img/TwosLogo.png" alt="TwosLogo" className="nav-logo"/></Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {user && (
                        <Nav className="me-auto">
                            <NavLink to="/"><div className="nav-button">Home</div></NavLink>
                            <NavLink to="/menu"><div className="nav-button">Menu</div></NavLink>
                            <NavLink to="/reservation"><div className="nav-button">Reservation</div></NavLink>
                            <NavLink to="/feedback"><div className="nav-button">Feedback</div></NavLink>
                        </Nav>
                    )}
                    
                    {!user && (
                        <Nav className="login-signup-buttons">
                            <NavLink to="/login"><div className="nav-button">Login</div></NavLink>
                            <NavLink to="/signup"><div className="nav-button">Sign Up</div></NavLink>
                        </Nav>
                    )}

                    {user && (
                        <Nav>
                            <div className="nav-button">Hello, {user.displayName}</div>
                            <a onClick={handleLogout}><div className="nav-button">Logout</div></a>
                        </Nav>
                    )}

                </Navbar.Collapse>
            </Container>
        </Navbar>

        </>
    );
}

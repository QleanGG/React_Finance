import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import NavLink for navigation
import Logo from '../static/Qlean_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import { useAuth } from '../AuthContext';

const NavBar = () => {

    const { currentUser, logout } = useAuth();
    return (
        <Navbar className='navbar-custom' expand="lg" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" className='brand-custom'>
                    <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {nav.map(lnk => <Nav.Link as={Link} to={lnk.Link} className='nav-link-custom'>{lnk.text}</Nav.Link>)}
                    </Nav>
                    <Nav>
                        {currentUser ? (
                            <>
                                <Nav.Link as={Link} to="/profile" className='nav-link-custom'>Hello, {currentUser.username}</Nav.Link>
                                <Nav.Link as={Link} to="/" onClick={logout} className='nav-link-custom'>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/register" className='nav-link-custom'>Register</Nav.Link>
                                <Nav.Link as={Link} to="/login" className='nav-link-custom'>Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default NavBar;

const nav = [{text:'Home',Link:'/'},{text:'About',Link:'/about'},{text:'Stocks',Link:'/stocks'},{text:'News',Link:'/news'},{text:'Contact',Link:'/contact'}];

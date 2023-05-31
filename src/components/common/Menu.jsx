import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/logo.png";


const Menu = () => {
  return (
    <>
      <Navbar bg="danger" variant="dark" className="pt-2">
        <Container>
        <Navbar.Brand href="#home">
            <img
              alt="logo"
              src={logo}
              width="40"
              height="47"
              className="d-inline-block align-top pt-0 pb-2"
            />{' '}
            <span className="fs-3 ps-1">Cafecito</span> 
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#features">Registro</Nav.Link>
            <Nav.Link href="#pricing">Administrador</Nav.Link>
            <Nav.Link href="#pricing">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;

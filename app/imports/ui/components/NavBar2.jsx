import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Col, Row } from 'react-bootstrap';

const NavBar2 = () => (
  <Navbar bg="secondary" id="navbar2" variant="dark">
    <Container className="justify-content-center flex-lg-fill">
      <Nav className="justify-content-center">
        <Row>
          <Col>
            <Nav.Link id="home" as={NavLink} to="/" key="home">Home</Nav.Link>
          </Col>
          <Col>
            <Nav.Link id="restaurants" as={NavLink} to="/test" key="#">Restaurants</Nav.Link>
          </Col>
          <Col>
            <Nav.Link id="grabAndGo" as={NavLink} to="/test2" key="#">Grab & Go</Nav.Link>
          </Col>
          <Col>
            <Nav.Link id="foodTrucks" as={NavLink} to="/test3" key="#">Food Trucks</Nav.Link>
          </Col>
          <Col>
            <Nav.Link id="campusDining" as={NavLink} to="/test4" key="#">Campus Dining</Nav.Link>
          </Col>
          <Col>
            <Nav.Link id="todayPicks" as={NavLink} to="/test5" key="#">Today&apos;s Picks</Nav.Link>
          </Col>
        </Row>
      </Nav>
    </Container>
  </Navbar>
);

export default NavBar2;

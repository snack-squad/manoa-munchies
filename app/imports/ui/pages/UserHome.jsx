import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => (
  <Container id="user-home" className="text-center py-3">
    <Container>Username Home</Container>
    <Row>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <Col>Today's Picks</Col>
      <Col>Favorites</Col>
      <Col>Everything</Col>
    </Row>
  </Container>
);

export default UserHome;

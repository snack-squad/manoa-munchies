import React from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => (
  <Container id="user-home" className="text-center py-3">
    <h1 className="py-5">Your Favourites</h1>

    <Row className="align-middle text-center">
      <Col>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="images/food1.jpg" />
          <Card.Body>
            <Card.Title>McDonald&apos;s</Card.Title>
            <Card.Text>
              BOTTOM TEXT
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>

      <Col>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="images/food1.jpg" />
          <Card.Body>
            <Card.Title>McDonald&apos;s</Card.Title>
            <Card.Text>
              BOTTOM TEXT
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>

      <Col>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="images/food1.jpg" />
          <Card.Body>
            <Card.Title>McDonald&apos;s</Card.Title>
            <Card.Text>
              BOTTOM TEXT
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>

    </Row>
  </Container>
);

export default UserHome;

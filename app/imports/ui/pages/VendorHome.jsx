import React from 'react';
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const VendorHome = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
      </Col>

      <Col xs={8} className="d-flex flex-column justify-content-center">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              example
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>

    </Row>
  </Container>
);

export default VendorHome;

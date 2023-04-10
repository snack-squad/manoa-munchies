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
          <Card.Img variant="top" src="https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2022/11/holoholo_small.jpg" />
          <Card.Body>
            <Card.Title>Vendor example name</Card.Title>
            <Card.Text>
              example text for vendor
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>

    </Row>
  </Container>
);

export default VendorHome;

import React from 'react';
import { Carousel, Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="justify-content-center d-flex">
    <Row className="text-center">
      <Col>
        <Carousel>
          <Carousel.Item>
            <Image src="images/carousel-images/GatewayCafe.png" />
            <Carousel.Caption>
              <h3>Gateway Cafe</h3>
              <p>Gateway Cafe offers Breakfast and Lunch during the week.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src="images/carousel-images/HaleAlohaCafe.png" />
            <Carousel.Caption>
              <h3>Hale Aloha Café</h3>
              <p>Hale Aloha Café serves your favorite comfort foods and cuisine influenced by global flavors. </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src="images/carousel-images/CampusCenterFoodCourt.png" />
            <Carousel.Caption>
              <h3>Campus Center Food Court</h3>
              <p>The Campus Center Food Court offers a variety of food including plate lunches, bentos, grab-and-go salads and wraps, burgers, and more!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Container className="carousel-info">
          <h1>Welcome To Snack Squad</h1>
          <p>Here you can see what restaurants are currently open, where to find them, and how to get there.</p>
          <p>Register now to save your favorite restaurants so the food stays at your fingertips.</p>
        </Container>
      </Col>
    </Row>
  </Container>
);

export default Landing;

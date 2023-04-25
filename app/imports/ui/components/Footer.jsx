import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        Snack-Squad
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        {Date()}
        <br />
        <a href="https://snack-squad.github.io/">
          Our Homepage
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;

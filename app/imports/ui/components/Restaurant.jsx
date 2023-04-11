import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Restaurant = ({ restaurant }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={restaurant.logo} />
    <Card.Body>
      <Card.Title>{restaurant.restaurant}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{restaurant.days}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{restaurant.times}</Card.Subtitle>

      <Card.Title>Specials</Card.Title>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>


      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    restaurant: PropTypes.string,
    tags: PropTypes.string,
    days: PropTypes.string,
    times: PropTypes.string,
    logo: PropTypes.string,
    specials: PropTypes.string,
    // _id: PropTypes.string,
  }).isRequired,
};

export default Contact;

import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RestaurantAdmin = ({ restaurantAdmin }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={restaurantAdmin.logo} />
    <Card.Body>

      <Card.Title>{restaurantAdmin.restaurant}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{restaurantAdmin.days}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{restaurantAdmin.times}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Tags: {restaurantAdmin.tags}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Owner: {restaurantAdmin.owner}</Card.Subtitle>

      <Card.Title>Specials</Card.Title>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{restaurantAdmin.specials}</ListGroup.Item>
        <ListGroup.Item>{restaurantAdmin.specials}</ListGroup.Item>
        <ListGroup.Item>{restaurantAdmin.specials}</ListGroup.Item>
      </ListGroup>

    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
RestaurantAdmin.propTypes = {
  restaurantAdmin: PropTypes.shape({
    restaurant: PropTypes.string,
    owner: PropTypes.string,
    tags: PropTypes.string,
    days: PropTypes.string,
    times: PropTypes.string,
    logo: PropTypes.string,
    specials: PropTypes.string,
    // _id: PropTypes.string,
  }).isRequired,
};

export default RestaurantAdmin;

import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      <ListGroup className="list-group-flush">
        <Link to={`/edit/${restaurantAdmin._id}`}>Edit</Link>
      </ListGroup>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
RestaurantAdmin.propTypes = {
  restaurantAdmin: PropTypes.shape({
    restaurant: PropTypes.string,
    tags: PropTypes.string,
    owner: PropTypes.string,
    days: PropTypes.string,
    times: PropTypes.string,
    logo: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
    menu: PropTypes.string,
    favorite: PropTypes.arrayOf(PropTypes.string),
    other: PropTypes.string,
  }).isRequired,
};

export default RestaurantAdmin;

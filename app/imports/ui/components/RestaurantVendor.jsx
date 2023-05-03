import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RestaurantVendor = ({ restaurantVendor }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={restaurantVendor.logo} />
    <Card.Body>

      <Card.Title>{restaurantVendor.restaurant}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{restaurantVendor.days}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{restaurantVendor.times}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Tags: {restaurantVendor.tags}</Card.Subtitle>
      <ListGroup className="list-group-flush" />
      <Link to={`/edit/${restaurantVendor._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
RestaurantVendor.propTypes = {
  restaurantVendor: PropTypes.shape({
    restaurant: PropTypes.string,
    tags: PropTypes.string,
    owner: PropTypes.string,
    days: PropTypes.string,
    times: PropTypes.string,
    logo: PropTypes.string,
    specials: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
    menu: PropTypes.string,
    favorite: PropTypes.arrayOf(PropTypes.string),
    other: PropTypes.string,
  }).isRequired,
};

export default RestaurantVendor;

import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import AddFavorite from './AddFavorite';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RestaurantCard = ({ restaurantCard }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={restaurantCard.logo} />
    <Card.Body>

      <Card.Title>{restaurantCard.restaurant}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{restaurantCard.days}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{restaurantCard.times}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Tags: {restaurantCard.tags}</Card.Subtitle>

      <Card.Title>Specials</Card.Title>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{restaurantCard.specials}</ListGroup.Item>
      </ListGroup>
      <AddFavorite restaurantID={restaurantCard._id} email={restaurantCard.owner} />
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
RestaurantCard.propTypes = {
  restaurantCard: PropTypes.shape({
    restaurant: PropTypes.string,
    tags: PropTypes.string,
    owner: PropTypes.string,
    days: PropTypes.string,
    times: PropTypes.string,
    logo: PropTypes.string,
    specials: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RestaurantCard;

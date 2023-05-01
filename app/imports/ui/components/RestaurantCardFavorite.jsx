import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Card, ListGroup, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { Restaurant } from '../../api/restaurant/Restaurant';

const toggleFavorite = (id) => {
  // console.log(id);
  Restaurant.collection.update(`${id}`, {
    $pull: { favorite: Meteor.user()?.username },
  });
  swal('Success', 'Restaurant removed successfully from favorites', 'success');
};
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RestaurantCard = ({ restaurantCard }) => (
  <Card style={{ width: '18rem' }}>
    <a href={restaurantCard.menu}>
      <Card.Img variant="top" src={restaurantCard.logo} />
    </a>
    <Card.Body>

      <Card.Title>{restaurantCard.restaurant}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{restaurantCard.location}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{restaurantCard.days}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{restaurantCard.times}</Card.Subtitle>
      <ListGroup className="list-group-flush">
        <Button onClick={() => toggleFavorite(restaurantCard._id)}> Remove Favorite </Button>
      </ListGroup>
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
    location: PropTypes.string,
    _id: PropTypes.string,
    menu: PropTypes.string,
    favorite: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default RestaurantCard;

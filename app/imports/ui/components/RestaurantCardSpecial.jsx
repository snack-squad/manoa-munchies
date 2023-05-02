import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Card } from 'react-bootstrap';
import swal from 'sweetalert';
import { Restaurant } from '../../api/restaurant/Restaurant';

const toggleFavorite = (id) => {
  // console.log(id);
  Restaurant.collection.update(`${id}`, {
    $addToSet: { favorite: Meteor.user()?.username },
  });
  swal('Success', 'Restaurant added successfully to favorites', 'success');
};
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RestaurantCardSpecial = ({ restaurantCard }) => (
  <Card style={{ width: '18rem' }}>
    <a href={restaurantCard.menu}>
      <Card.Img variant="top" src={restaurantCard.logo} />
    </a>
    <Card.Body>
      <Card.Title>{restaurantCard.restaurant}</Card.Title>
      {restaurantCard.location === 'Other' ? ([
        <Card.Subtitle className="mb-2 text-muted">{restaurantCard.other}</Card.Subtitle>,
      ]) : ([
        <Card.Subtitle className="mb-2 text-muted">{restaurantCard.location}</Card.Subtitle>,
      ])}
      <Card.Subtitle className="mb-2 text-muted">{_.pluck(restaurantCard.specials, 'name')}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{restaurantCard.times}</Card.Subtitle>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
RestaurantCardSpecial.propTypes = {
  restaurantCard: PropTypes.shape({
    restaurant: PropTypes.string,
    tags: PropTypes.string,
    owner: PropTypes.string,
    times: PropTypes.string,
    logo: PropTypes.string,
    specials: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      date: PropTypes.string,
    })),
    location: PropTypes.string,
    _id: PropTypes.string,
    menu: PropTypes.string,
    other: PropTypes.string,
  }).isRequired,
};

export default RestaurantCardSpecial;

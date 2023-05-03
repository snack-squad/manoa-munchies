import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

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
      <Card.Subtitle className="mb-2 text-muted">
        {restaurantCard.specials.filter((special) => special.date === `${Date().split(' ')[0]}`).map((special) => special.name).join(', ')}
      </Card.Subtitle>
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

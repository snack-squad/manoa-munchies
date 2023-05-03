import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Card, ListGroup, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { Restaurant } from '../../api/restaurant/Restaurant';

const toggleFavorite = (id) => {
  // console.log(id);
  Restaurant.collection.update(`${id}`, {
    $addToSet: { favorite: Meteor.user()?.username },
  });
  swal('Success', 'Restaurant added successfully to favorites', 'success');
};

const RestaurantCard = ({ restaurantCard }) => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
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
        <Card.Subtitle className="mb-2 text-muted">{restaurantCard.days}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{restaurantCard.times}</Card.Subtitle>
        <ListGroup className="list-group-flush">
          {currentUser && !(Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'vendor')) ? ([
            <Button onClick={() => toggleFavorite(restaurantCard._id)}> Favorite </Button>,
          ]) : ''}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
RestaurantCard.propTypes = {
  restaurantCard: PropTypes.shape({
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

export default RestaurantCard;

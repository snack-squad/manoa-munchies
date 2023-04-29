import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Restaurant } from '../../api/restaurant/Restaurant';
import LoadingSpinner from '../components/LoadingSpinner';
import RestaurantCard from '../components/RestaurantCard';
import { Favorites } from '../../api/favorites/Favorites';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => {
  const { ready, restaurant } = useTracker(() => {
  // Note that this subscription will get cleaned up
  // when your component is unmounted or deps change.
  // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Restaurant.userPublicationName);
    const subscriptions2 = Meteor.subscribe(Favorites.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscriptions2.ready();
    // Get the Contact documents
    const restaurantItems = Restaurant.collection.find({}).fetch();
    const favoriteItems = Favorites.collection.find({}).fetch();
    return {
      restaurant: restaurantItems,
      favorites: favoriteItems,
      ready: rdy,
    };
  }, []);
  const restaurantFiltered = _.filter(restaurant, (iter) => iter.favorite.includes(Meteor.user()?.username));
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Welcome</h2>
          </Col>
          <Row className="g-4">
            {restaurantFiltered.map((index) => (<Col><RestaurantCard restaurantCard={index} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserHome;

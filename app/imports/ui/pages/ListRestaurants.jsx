import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Restaurant } from '../../api/restaurant/Restaurant';
import LoadingSpinner from '../components/LoadingSpinner';
import RestaurantCard from '../components/RestaurantCard';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const ListRestaurants = () => {
  const { ready, restaurant } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Restaurant.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Contact documents
    const restaurantItems = Restaurant.collection.find({}).fetch();
    return {
      restaurant: restaurantItems,
      ready: rdy,
    };
  }, []);
  const restaurantParadise = _.filter(restaurant, (iter) => iter.location.includes('Paradise Palms Café'));
  const restaurantFoodTruck = _.filter(restaurant, (iter) => iter.location.includes('Food Truck Row'));
  const restaurantCampusCenter = _.filter(restaurant, (iter) => iter.location.includes('Campus Center'));
  const restaurantOthers = _.filter(restaurant, (iter) => iter.location.includes('Shidler College, 1st Floor') || iter.location.includes('2445 Campus Rd Honolulu') || iter.location.includes('2563 Dole St') ||
      iter.location.includes('2573 Dole St') || iter.location.includes('2585 Dole St'));
  return (ready ? (
    <Container className="py-1">
      <Row className="justify-content-center">
        <Col md={12}>
          <Col className="text-center">
            <h2>Welcome</h2>
          </Col>
          <Col className="text-center">
            <h2>Paradise Palms Café</h2>
          </Col>
          <Row className="g-4">
            {restaurantParadise.map((restaurantUser) => (<Col key={restaurantUser._id}><RestaurantCard restaurantCard={restaurantUser} /></Col>))}
          </Row>
          <Col className="text-center">
            <h2>Food Truck Row</h2>
          </Col>
          <Row className="g-4">
            {restaurantFoodTruck.map((restaurantUser) => (<Col key={restaurantUser._id}><RestaurantCard restaurantCard={restaurantUser} /></Col>))}
          </Row>
          <Col className="text-center">
            <h2>Campus Center</h2>
          </Col>
          <Row className="g-4">
            {restaurantCampusCenter.map((restaurantUser) => (<Col key={restaurantUser._id}><RestaurantCard restaurantCard={restaurantUser} /></Col>))}
          </Row>
          <Col className="text-center">
            <h2>Other Locations</h2>
          </Col>
          <Row className="g-4">
            {restaurantOthers.map((restaurantUser) => (<Col key={restaurantUser._id}><RestaurantCard restaurantCard={restaurantUser} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListRestaurants;

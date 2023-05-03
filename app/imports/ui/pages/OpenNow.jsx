import React, { useState } from 'react';
import { Col, Container, Row, FormControl } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { debounce } from 'lodash';
import { Restaurant } from '../../api/restaurant/Restaurant';
import LoadingSpinner from '../components/LoadingSpinner';
import RestaurantCard from '../components/RestaurantCard';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const OpenNow = () => {
  const { ready, restaurant } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Restaurant.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const getName = {
      Mon: 'Monday',
      Tue: 'Tuesday',
      Wed: 'Wednesday',
      Thu: 'Thursday',
      Fri: 'Friday',
      Sat: 'Saturday',
      Sun: 'Sunday',
    };
    const fullDate = Date().split(' ');
    // Get the Contact documents
    const restaurantItems = Restaurant.collection.find({ openDays: fullDate }).fetch();
    return {
      restaurant: restaurantItems,
      ready: rdy,
    };
  }, []);
  const [searchQuery, setSearchQuery] = useState([]);
  let restaurantItems = restaurant;
  if (searchQuery.length > 0) {
    restaurantItems = _.filter(restaurant, (iter) => iter.restaurant.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 5);

  const handleSearchQueryChange = (event) => {
    const value = event.target.value;
    debouncedSearch(value);
  };
  let restaurantParadise = _.filter(restaurantItems, (iter) => iter.location.includes('Paradise Palms Café'));
  restaurantParadise = _.reject(restaurantParadise, (iter) => iter.favorite.includes(Meteor.user()?.username));
  let restaurantFoodTruck = _.filter(restaurantItems, (iter) => iter.location.includes('Food Truck Row'));
  restaurantFoodTruck = _.reject(restaurantFoodTruck, (iter) => iter.favorite.includes(Meteor.user()?.username));
  let restaurantCampusCenter = _.filter(restaurantItems, (iter) => iter.location.includes('Campus Center'));
  restaurantCampusCenter = _.reject(restaurantCampusCenter, (iter) => iter.favorite.includes(Meteor.user()?.username));
  let restaurantOthers = _.filter(restaurantItems, (iter) => iter.location.includes('Other'));
  restaurantOthers = _.reject(restaurantOthers, (iter) => iter.favorite.includes(Meteor.user()?.username));
  return (ready ? (
    <Container className="py-1">
      <Row className="justify-content-center">
        <Col xl={10}>
          <Col className="text-center">
            <h2>Welcome</h2>
            <FormControl
              placeholder="Search restaurant name"
              aria-label="Search restaurant name"
              aria-describedby="basic-addon2"
              value={searchQuery}
              onInput={handleSearchQueryChange}
            />
          </Col>
          {_.size(restaurantParadise) !== 0 ? ([
            <Col className="text-center">
              <h2>Paradise Palms Café</h2>
            </Col>,
            <Row className="g-4">
              {restaurantParadise.map((restaurantUser) => (<Col key={restaurantUser._id}><RestaurantCard restaurantCard={restaurantUser} /></Col>))}
            </Row>,
          ]) : ''}

          {_.size(restaurantFoodTruck) !== 0 ? ([
            <Col className="text-center">
              <h2>Food Truck Row</h2>
            </Col>,
            <Row className="g-4">
              {restaurantFoodTruck.map((restaurantUser) => (<Col key={restaurantUser._id}><RestaurantCard restaurantCard={restaurantUser} /></Col>))}
            </Row>,
          ]) : ''}

          {_.size(restaurantCampusCenter) !== 0 ? ([
            <Col className="text-center">
              <h2>Campus Center</h2>
            </Col>,
            <Row className="g-4">
              {restaurantCampusCenter.map((restaurantUser) => (<Col key={restaurantUser._id}><RestaurantCard restaurantCard={restaurantUser} /></Col>))}
            </Row>,
          ]) : ''}

          {_.size(restaurantOthers) !== 0 ? ([
            <Col className="text-center">
              <h2>Other Locations</h2>
            </Col>,
            <Row className="g-4">
              {restaurantOthers.map((restaurantUser) => (<Col key={restaurantUser._id}><RestaurantCard restaurantCard={restaurantUser} /></Col>))}
            </Row>,
          ]) : ''}

        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default OpenNow;

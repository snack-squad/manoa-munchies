import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Restaurant } from '../../api/restaurant/Restaurant';
import LoadingSpinner from '../components/LoadingSpinner';
import RestaurantCard from '../components/RestaurantCard';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const TodaysPicks = () => {
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

  console.log(Date());
  const fullDate = Date().split(' ');
  const picks = _.filter(restaurant, (dish) => _.some(dish.specials, (special) => special.date === `${fullDate[0]}day`));
  return (ready ? (
    <Container className="py-1">
      <Row className="justify-content-center">
        <Col md={12}>
          <Col className="text-center">
            <h2>Today&apos;s Picks</h2>
          </Col>
          <Row className="g-4">
            {picks.map((restaurantUser) => (<Col key={restaurantUser._id}><RestaurantCard restaurantCard={restaurantUser} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default TodaysPicks;

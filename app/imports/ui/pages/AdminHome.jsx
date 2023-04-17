import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import RestaurantAdmin from '../components/RestaurantAdmin';
import { Stuffs } from '../../api/stuff/Stuff';
import RestaurantCard from '../components/RestaurantCard';
import { Restaurant } from '../../api/restaurant/Restaurant';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const AdminHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, restaurant } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Restaurant.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Contact documents
    const restaurantItems = Restaurant.collection.find({}).fetch();
    return {
      restaurant: restaurantItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Restaurants</h2>
          </Col>
          <Row className="px-5">
            {restaurant.map((restaurantCard) => (<Col key={restaurantCard._id}><RestaurantCard restaurantCard={restaurantCard} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminHome;

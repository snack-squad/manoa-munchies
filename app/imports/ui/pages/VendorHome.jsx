import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import { Restaurant } from '../../api/restaurant/Restaurant';
import RestaurantVendor from '../components/RestaurantVendor';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const VendorHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, restaurant } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Restaurant.vendorPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Contact documents
    const restaurantItems = Restaurant.collection.find({}).fetch();
    return {
      restaurant: restaurantItems,
      ready: rdy,
    };
  }, []);
  const restaurantVendorFilter = _.filter(restaurant, (iter) => iter.owner.includes(Meteor.user()?.username));
  /* A simple static component to render some text for the landing page. */
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Here Are Your Restaurants</h2>
          </Col>
          <Row className="g-4">
            {restaurantVendorFilter.map((restaurantVendor) => (<Col key={restaurantVendor._id}><RestaurantVendor restaurantVendor={restaurantVendor} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default VendorHome;

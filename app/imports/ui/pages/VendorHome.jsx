import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Restaurant from "../components/Restaurant";

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const VendorHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
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

/* A simple static component to render some text for the landing page. */
  return (ready ? (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col md={7}>
            <Col className="text-center">
              <h2>List Restaurant</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {restaurant.map((restaurant) => (<Col key={restaurant._id}><Restaurant restaurant={restaurant} /></Col>))}
            </Row>
          </Col>
        </Row>
      </Container>
  ) : <LoadingSpinner />);
};

export default VendorHome;

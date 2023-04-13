import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import RestaurantAdmin from '../components/RestaurantAdmin';
import { Stuffs } from '../../api/stuff/Stuff';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const AdminHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);

  const restaurants = [{
    restaurant: 'Food #1', owner: 'Nicolas', tags: 'Japanese', days: 'Monday - Friday',
    times: '2:00 PM - 11:00 PM',
    logo: 'Future Image', specials1: 'Noodles', specials2: 'Chicken', specials3: 'Beef',
  },
  {
    restaurant: 'Food #2', owner: 'Dustin', tags: 'Indian', days: 'Monday - Friday',
    times: '2:00 PM - 11:00 PM',
    logo: 'Future Image', specials1: 'Noodles', specials2: 'Chicken', specials3: 'Beef',
  },
  {
    restaurant: 'Food #3', owner: 'Raymond', tags: 'American', days: 'Monday - Friday',
    times: '2:00 PM - 11:00 PM',
    logo: 'Future Image', specials1: 'Noodles', specials2: 'Chicken', specials3: 'Beef',
  },
  ];

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Restaurants</h2>
          </Col>
          <Row className="px-5">
            {restaurants.map((restaurant, index) => (<Col key={index}><RestaurantAdmin restaurant={restaurant} /></Col>)) }
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminHome;

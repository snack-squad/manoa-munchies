import React from 'react';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Restaurant } from '../../api/restaurant/Restaurant';
import RestaurantCard from '../components/RestaurantCard';

/* Renders the EditStuff page for editing a single document. */
const SearchResults = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  let { _myEvent } = useParams();
  // console.log('EditContact', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { restaurant, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Restaurant.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const restaurantItems = Restaurant.collection.find({}).fetch();
    return {
      restaurant: restaurantItems,
      ready: rdy,
    };
  }, [_myEvent]);
  // console.log('EditContact', doc, ready);
  // On successful submit, insert the data.

  const filter = _.filter(restaurant, (iter) => iter.restaurant.includes(_myEvent));
  let restaurantParadise = _.filter(filter, (iter) => iter.location.includes('Paradise Palms Café'));
  restaurantParadise = _.reject(restaurantParadise, (iter) => iter.favorite.includes(Meteor.user()?.username));
  let restaurantFoodTruck = _.filter(filter, (iter) => iter.location.includes('Food Truck Row'));
  restaurantFoodTruck = _.reject(restaurantFoodTruck, (iter) => iter.favorite.includes(Meteor.user()?.username));
  let restaurantCampusCenter = _.filter(filter, (iter) => iter.location.includes('Campus Center'));
  restaurantCampusCenter = _.reject(restaurantCampusCenter, (iter) => iter.favorite.includes(Meteor.user()?.username));
  let restaurantOthers = _.filter(filter, (iter) => iter.location.includes('Other'));
  restaurantOthers = _.reject(restaurantOthers, (iter) => iter.favorite.includes(Meteor.user()?.username));

  _myEvent = '';
  return (ready ? (
    <Container className="py-1">
      <Row className="justify-content-center">
        <Col md={12}>
          <Col className="text-center">
            <h2>Welcome</h2>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search for restaurants"
                aria-label="Search for restaurants"
                aria-describedby="basic-addon2"
                onKeyUp={(event) => {
                  if (event.key === 'Enter') {
                    console.log('Hello');
                    _myEvent = event.target.value;
                  }
                }}
              />
              <Link to={`/search-result/${_myEvent}`}>Edit</Link>
            </InputGroup>
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

export default SearchResults;

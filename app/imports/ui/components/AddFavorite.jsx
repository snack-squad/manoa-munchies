import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { ErrorsField, Button } from 'uniforms-bootstrap5';
import PropTypes from 'prop-types';
import { Restaurant } from '../../api/restaurant/Restaurant';
// Create a schema to specify the structure of the data to appear in the form.

/* Renders the AddStuff page for adding a document. */
const AddFavorite = ({ email, restaurantID }) => {
  const toggleFavorite = () => {
    Restaurant.collection.update(`${restaurantID}`, {
      $addToSet: { favorite: email },
    });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Button onClick={() => toggleFavorite()} />
          <Card>
            <Card.Body>
              <ErrorsField />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

AddFavorite.propTypes = {
  email: PropTypes.string.isRequired,
  restaurantID: PropTypes.string.isRequired,
};

export default AddFavorite;

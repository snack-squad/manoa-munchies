import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Favorites } from '../../api/favorites/Favorites';// Create a schema to specify the structure of the data to appear in the form.

const formSchema = new SimpleSchema({
  email: String,
  restaurantID: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddFavorite = ({ email, restaurantID }) => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    Favorites.collection.insert(
      { email, restaurantID },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <SubmitField> Add Favorite </SubmitField>
                <ErrorsField />
                <HiddenField name="email" value={email} />
                <HiddenField name="restaurantID" value={restaurantID} />
              </Card.Body>
            </Card>
          </AutoForm>
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

import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Restaurant } from '../../api/restaurant/Restaurant';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  restaurant: String,
  tags: String,
  days: String,
  times: String,
  logo: String,
  specials: String,
  menu: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddRestaurant = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { restaurant, tags, days, times, logo, specials, menu } = data;
    const owner = Meteor.user().username;
    Restaurant.collection.insert(
      { restaurant, tags, days, times, logo, specials, menu, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Restaurant added successfully', 'success');
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
        <Col xs={5}>
          <Col className="text-center"><h2>Add Restaurant</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField name="restaurant" />
                  </Col>
                  <Col>
                    <TextField name="tags" />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <TextField name="days" />
                  </Col>
                  <Col>
                    <TextField name="times" />
                  </Col>
                </Row>

                <TextField name="logo" />
                <TextField name="specials" />
                <TextField name="menu" />

                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRestaurant;

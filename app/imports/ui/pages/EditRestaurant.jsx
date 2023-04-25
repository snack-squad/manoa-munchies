import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import LoadingSpinner from '../components/LoadingSpinner';
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

/* Renders the EditStuff page for editing a single document. */
const EditRestaurant = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditContact', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Restaurant.vendorPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Restaurant.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditContact', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { restaurant, tags, days, times, logo, specials, menu, owner } = data;
    Restaurant.collection.update(_id, { $set: { restaurant, tags, days, times, logo, specials, menu, owner } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Restaurant</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <LongTextField name="restaurant" />
                <LongTextField name="tags" />
                <Row>
                  <Col>
                    <TextField name="days" />
                  </Col>
                  <Col>
                    <TextField name="times" />
                  </Col>
                  <Col>
                    <TextField name="logo" />
                  </Col>
                </Row>
                <LongTextField name="menu" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditRestaurant;

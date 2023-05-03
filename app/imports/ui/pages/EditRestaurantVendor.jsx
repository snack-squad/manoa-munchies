import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, ListField, ListItemField, NestField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { BackspaceFill, Plus } from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { Restaurant } from '../../api/restaurant/Restaurant';

const bridge = new SimpleSchema2Bridge(Restaurant.schema);

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
    const { restaurant, tags, days, times, logo, specials, menu, location, other } = data;
    Restaurant.collection.update(_id, { $set: { restaurant, tags, days, times, logo, specials, menu, location, other } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Restaurant</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField name="restaurant" />
                  </Col>
                  <Col>
                    <TextField
                      name="tags"
                      help="What kind of food?"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <TextField
                      name="days"
                      help="First Day - Last Day of Week."
                    />
                  </Col>
                  <Col>
                    <TextField
                      name="times"
                      help="Open Time - Close Time"
                    />
                  </Col>
                </Row>

                <TextField
                  name="logo"
                  help="A link to your logo."
                />

                <ListField name="specials" addIcon={<Plus className="text-black" size={30} />} removeIcon={<BackspaceFill className="text-black" size={15} />}>
                  <ListItemField name="$">
                    <NestField>
                      <Row>
                        <TextField name="name" showInlineError placeholder="Special's Name" />
                      </Row>
                      <Row>
                        <Col>
                          <SelectField name="date" showInlineError placeholder="Select a day" />
                        </Col>
                      </Row>
                    </NestField>
                  </ListItemField>
                </ListField>

                <TextField
                  name="menu"
                  help="Link to your menu online."
                />
                <SelectField name="location" />
                <TextField
                  name="other"
                  help="Will appear if Location is Other. Fill in regardless as backup."
                />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditRestaurant;

import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, ListField, ListItemField, NestField } from 'uniforms-bootstrap5';
import { Plus, BackspaceFill } from 'react-bootstrap-icons';
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
  specials: {
    type: Array,
    optional: true,
  },
  'specials.$': Object,
  'specials.$.name': String,
  'specials.$.date': {
    type: String,
    allowedValues: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  menu: String,
  location: {
    type: String,
    allowedValues: ['Paradise Palms Café', 'Food Truck Row', 'Campus Center', 'Other'],
    defaultValue: 'Other',
  },
  other: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddRestaurant = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { restaurant, tags, days, times, logo, specials, menu, location, other } = data;
    const owner = Meteor.user().username;
    const favorite = [];
    Restaurant.collection.insert(
      { restaurant, tags, days, times, logo, specials, menu, owner, favorite, location, other },
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
  );
};

export default AddRestaurant;

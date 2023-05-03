import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, BoolField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Food } from '../../api/food/Food';
import { Restaurant } from '../../api/restaurant/Restaurant';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  foodName: String,
  tags: {
    type: String,
    defaultValue: 'none',
  },
  owner: String,
  storeName: String,
  allergens: {
    type: String,
    defaultValue: 'none',
  },
  picture: String,
  isSpecial: Boolean,
  dietary: {
    type: String,
    allowedValues: ['vegetarian', 'vegan', 'none'],
    defaultValue: 'none',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddFood = () => {
  const { ready, owner, storeName } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Restaurant.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Contact documents
    const storeOwner = 'john@foo.com';
    const restaurants = Restaurant.collection.find({ owner: storeOwner }).fetch();
    const restaurantNames = restaurants.map(a => a.restaurant);
    const restaurantObj = restaurantNames.map(label => ({ label, value: label }));
    console.log(restaurantObj);
    console.log(storeOwner);
    return {
      owner: storeOwner,
      storeName: restaurantNames,
      ready: rdy,
    };
  }, []);
  const submit = (data, formRef) => {
    const { foodName, tags, allergens, picture, isSpecial, dietary } = data;
    Food.collection.insert(
      { foodName, tags, storeName, allergens, picture, isSpecial, dietary, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Food Item added successfully', 'success');
          formRef.reset();
        }
      },
    );

  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Food Item</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField name="foodName" />
                  </Col>
                  <Col>
                    <TextField name="tags" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField name="storeName" />
                  </Col>
                  <Col>
                    <TextField name="allergens" />
                  </Col>
                </Row>
                <TextField name="picture" />
                <SelectField name="dietary" />
                <BoolField name="isSpecial" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AddFood;

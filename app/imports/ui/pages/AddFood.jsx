import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, BoolField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Food } from '../../api/food/Food';

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

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { foodName, tags, storeName, allergens, picture, isSpecial, dietary } = data;
    const owner = Meteor.user().username;
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
  return (
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
                    <SelectField name="storeName" />
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
  );
};

export default AddFood;

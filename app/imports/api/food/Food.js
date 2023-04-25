import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The RestaurantCollection. It encapsulates state and variable values for restaurants.
 */
class FoodCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FoodCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      foodName: String,
      tags: String,
      owner: String,
      storeName: String,
      allergens: String,
      picture: String,
      isSpecial: Boolean,
      dietary: {
        type: String,
        allowedValues: ['vegetarian', 'vegan', 'none'],
        defaultValue: 'good',
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.vendorPublicationName = `${this.name}.publication.vendor`;

  }
}

/**
 * The singleton instance of the RestaurantCollection.
 * @type {RestaurantCollection}
 */
export const Food = new FoodCollection();

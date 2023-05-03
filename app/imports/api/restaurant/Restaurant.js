import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The RestaurantCollection. It encapsulates state and variable values for restaurants.
 */
class RestaurantCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RestaurantCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      restaurant: String,
      tags: String,
      owner: String,
      days: String,
      times: String,
      logo: String,
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
      favorite: {
        type: Array,
        optional: true,
      },
      'favorite.$': String,
      specials: {
        type: Array,
        optional: true,
      },
      'specials.$': Object,
      'specials.$.name': String,
      'specials.$.date': String,
      openDays: {
        type: Array,
        optional: true,
      },
      'openDays.$': String,
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
export const Restaurant = new RestaurantCollection();

import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Restaurant } from '../../api/restaurant/Restaurant';
import { Favorites } from '../../api/favorites/Favorites';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

const addRestaurant = (restaurant) => {
  console.log(`  Adding: ${restaurant.restaurant} (${restaurant.owner})`);
  Restaurant.collection.insert(restaurant);
};

// Initialize the StuffsCollection if empty.
if (Restaurant.collection.find().count() === 0) {
  if (Meteor.settings.defaultRestaurant) {
    console.log('Creating default data.');
    Meteor.settings.defaultRestaurant.forEach(restaurant => addRestaurant(restaurant));
  }
}

const addFavorite = (favorites) => {
  console.log(`  Adding: ${favorites.email} `);
  Favorites.collection.insert(favorites);
};

// Initialize the StuffsCollection if empty.
if (Favorites.collection.find().count() === 0) {
  if (Meteor.settings.defaultFavorites) {
    console.log('Creating default favorites');
    Meteor.settings.defaultFavorites.forEach(favorite => addFavorite(favorite));
  }
}

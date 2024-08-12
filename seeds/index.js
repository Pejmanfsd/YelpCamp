// Step 05(A): Seeding data
// Basics codes (copy from the "app.js" file):
const Campground = require('../models/campground');
// The "campground" collection(table!) is in the "models" folder
// but this "index.js" file is in the "seeds" folder, so
// we should back up one level; with ".."

// Step 07(A): We're bringing EVERYTHING from the "cities.js" file
const cities = require('./cities');
// The "cities" variable is the array of cities.js" file, with 1000 objects

// Step 08(A):
// We're bringing EVERYTHING from the "seedDescriptors.js" and "seedPlaces" file
const { descriptors, places } = require('./seedHelpers');

// Step 05(B):
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    // "yelp-camp" is the name of the database
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!");
        console.log(err);
    })

// Step 06(A):
// Deleting all the data from database, add new data
// Making sure we're connected to the database
// const seedDB = async () => {
//     await Campground.deleteMany({});
//     const c = new Campground({ title: 'purple field' });
//     await c.save();
// }

// Step 08(B): Creating a function that gets an array as the input
// and its output is a random member of the input array
const sample = array => array[Math.floor(Math.random() * array.length)];

// Step 07(B):
const seedDB = async () => { // We're creating an array with 50 objects in the database
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        // We have 1000 cities in the "cities.js" file
        const camp = new Campground({ // We're creating an object with the "new" keyword
            // We're fetching the variable with the index of "random1000" (which is a number)
            // and grabing the values of the "city" key and the "state" key
            // and creating a new value (location) for each object
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            // Step 08(C): Adding a new value to each object we're creating
            title: `${sample(descriptors)} ${sample(places)}`,
            // Now we test it in Terminal again:
            // node seeds/index.js -> mongosh -> use yelp-camp -> db.campgrounds.find()
            // We should see all the 50 generated objects
            // Step 19(B): Updating the seedDB after adding the "image" field:
            image: '',
            description: 'ABC', price: Math.floor(Math.random() * 20) + 10,
            // in Terminal: ctrl + c -> node seeds/index.js -> use yelp-camp -> db.campgrounds.find()
            // We should see the new version of the database (with "image", "description" and "price")
            // Step 36(B): Assigning all the campgrounds to "user01":
            author: '' // Now in Terminal execute: node seeds/index.js
            // and check the database to see if all the campgrounds have the author or not
            // Now we want to display the author of each campground in UI
        })
        await camp.save();
    }
}
// Now we test it in Terminal:
// node seeds/index.js -> mongosh -> use yelp-camp -> db.campgrounds.find()
// We should see all the 50 generated objects

// Step 06(B): We should execute "seedDB"
// seedDB(); // Now check it in Terminal ("node seeds/index.js")

// Step 09:
seedDB().then(() => {
    mongoose.connection.close()
})
// Now if we run the application in Terminal ("node seeds/index.js")
// we'll see the Mongo-Connection-Secceed message and then it closes automatically
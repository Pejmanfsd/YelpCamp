// Step 03(B): Model Basic codes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Step 26(S): Requiring the Review model:
const Review = require('./review');

// Step 03(C): Creating the basic Schema
const CampgroundSchema = new Schema({
    title: String,
    // image: String, // Step 19(A): Adding the "image" field to the database
    // Step 42(H): Updating the image field after the cloudinary process
    images: [
        {
            url: String,
            filename: String
        }
    ],
    price: Number,
    description: String,
    location: String,
    // Step 36(A): We want to associate campgrounds/reviews to users (each
    // user can create/edit/delete their own campgrounds/reviews).
    // First we add the "author" field to this schema:
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // Step 26(B): Inorder to connect the "review" model to this model
    // (which is one to many) we should embed an array of objectIds
    // as the "reviews" field:
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// Step 26(T): Creating the post section of mongoose middleware:
CampgroundSchema.post('findOneAndDelete', async function (doc) { // "doc" is the variable that is going to be deleted
    // (actually the one that is already deleted!)
    if (doc.reviews.length) { // If something (connected to doc/campground) is found for being deleted
        const res = await Review.deleteMany({ // Search through the Schema and remove what you'll find in the following lines:
            _id: { // Fetch the id of the request
                $in: doc.reviews // Search through the array of the reviews of the document
                // that is going to be deleted (doc), which is actually a campground
                // And fetch the correspondant review of the id of the request and remove it
            }
        })
    }
})

// Step 03(D): Exporting the Model
// (We're exporting the schema, which is CampgroundSchema
// and the collection we created, here we call it 'Campground')
module.exports = mongoose.model('Campground', CampgroundSchema);
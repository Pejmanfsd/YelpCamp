// Step 26(A): The model's basic codes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    // Step 38(A): We want to associate each review
    // to its owner, and then show the owner's name
    // next to the review, so we add the "author"
    // field to reviewSchema:
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Review', reviewSchema);
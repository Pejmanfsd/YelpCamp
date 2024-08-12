// Step 28(A): Inside the routes folder, create this file ("reviews.js")
// Create the basic codes:
const express = require('express');
const router = express.Router({ mergeParams: true });
// Since this is the router of the child collection,
// we don't have access to the id of the parent collection
// because express keeps the "params" separately.
// In order to have access to the id of the parent collection,
// we should assign the "mergeParams" parameter to true
const reviews = require('../controllers/reviews'); // Step 39(D): Requiring the review controller
const catchAsync = require('../utils/catchAsync'); // Step 28(E): Paste the "catchAsync" variable here and correct the path (../)
const ExpressError = require('../utils/ExpressError'); // Step 28(G): Paste the "ExpressError" variable here and correct the path (../)
const Review = require('../models/review'); // Step 28(I): Paste the "Review" model here and correct the path (../)
// Since this is the child collection, we need the model of the parent collection too:
const Campground = require('../models/campground');
const { reviewSchema } = require('../schemas.js'); // Step 28(M): Paste the reviewSchema here and correct the path (../)
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js'); // Step 38(I): Requiring the "isReviewAuthor" middleware
// const validateReview = (req, res, next) => { // Step 28(K): Paste "validateReview" here:
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

// Cut all the review middlewares form the "add.js" file
// and paste them here and change the "app" variable to "router"
// and since "/campgrounds/:id/reviews" is the fix part of all the middlewares
// we assign this fix part as the prefix of the line of using the "reviews" variable
// and comment/remove the fix part
// router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
//     const campground = await Campground.findById(req.params.id);
//     const review = new Review(req.body.review);
//     review.author = req.user._id; // Step 38(C): Fetching the id of the
//     // logged-in user and assigning it to the author of the review
//     campground.reviews.push(review);
//     await review.save();
//     await campground.save();
//     // Step 31(I): Adding the flash for posting a review
//     req.flash('success', 'Created new review');
//     res.redirect(`/campgrounds/${campground._id}`);
// }))
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
//     const { id, reviewId } = req.params;
//     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);
//     // Step 31(J): Adding the flash for deleting a review
//     req.flash('success', 'Successfully deleted review');
//     res.redirect(`/campgrounds/${id}`);
// }))
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

// Export the module:
module.exports = router;
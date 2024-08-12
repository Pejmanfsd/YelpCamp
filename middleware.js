const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review'); // Step 38(H): We should require the review model

// Step 35(E): We want if an unregistered/unsigned user who tries to reach an
// unprotected page and asked to register/login, when they register/login they
// return to the same protected page.So first we should create a new
// middleware function (storeReturnTo) that saves the "returnTo" value from
// the session (req.session.returnTo) to "res.locals":
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) { // "returnTo" is the key of a pair of "session" whose
        // value is the URL of the protected page that the user were trying to reach.
        // it may be empty because it's possible that the user clicks on the
        // Login/Register button at the very beginning; if it's empty jump to "next()"
        res.locals.returnTo = req.session.returnTo; // Creating the "returnTo" variable
        // as the key of a pair of "session", which is an object. The value of this key
        // is empty.
    }
    next();
}

// Step 34(A): We create this file (middleware.js) in the main directory
// We create the logic of giving the permission only to the logged-in users
module.exports.isLoggedIn = (req, res, next) => {
    // if the user isn't logged-in, show the error in the flash message
    // and redirect them to the login page:
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // Step 35(F): "req.originalUrl" is the
        // URL of the protected page and we put it as the value of "returnTo".
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login'); // We use "return" because
        // if we get to this part, we're dropped out of the middleware
        // without touching "next()"
    }
    // if the user is logged-in, let them continue:
    next();
}

module.exports.validateReview = (req, res, next) => { // Step 28(K): Paste "validateReview" here:
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// Step 34(C):
module.exports.validateCampground = (req, res, next) => { // Step 27(K): Paste "validateCampground" here:
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// Step 37(E): Creating the "isAuthor" middleware:
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
} // Now just mention the "isAuthor" name in the approprite route handlers
// in "routes/campgrounds.js" and remove/comment the duplicated codes

// Step 38(G): Creating the middleware to chieck if the user owns the review:
module.exports.isReviewAuthor = async (req, res, next) => {
    // We fetch the id (of the campground) and the id of the review
    // the path of the review is: "/campgrounds/id/reviews/reviewId"
    const { id, reviewId } = req.params;
    // (We fetch the campground id only for redirecting the user to the campground page)
    const review = await Review.findById(reviewId); // Fetching the review and putting it in a variable(review)
    if (!review.author.equals(req.user._id)) { // if the author(userId) of the fetched review is NOT equal to the id of the logged-in user
        req.flash('error', 'You do not have the permission to do that!'); // show this error
        return res.redirect(`/campgrounds/${id}`); // and redirect the user to the campground page
    }
    next(); // if not, let the user continue what they were doing
}
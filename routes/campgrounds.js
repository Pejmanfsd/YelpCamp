// Step 27(A): In the main directory, create the "routes" folder
// Inside this folder, create this file ("campgrounds.js")
// Create the basic codes:
const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds'); // Step 39(B): Requiring the campground controller
const catchAsync = require('../utils/catchAsync'); // Step 27(E): Paste the "catchAsync" variable here and correct the path (../)
// const ExpressError = require('../utils/ExpressError'); // Step 27(G): Paste the "ExpressError" variable here and correct the path (../)
const Campground = require('../models/campground'); // Step 27(I): Paste the "Campground" model here and correct the path (../)
// const { campgroundSchema } = require('../schemas.js'); // Step 27(M): Paste the campgroundSchema here and correct the path (../)
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware.js'); // Step 34(B): Requiring the "isLoggedIn" function
// Now pass the "isLoggedIn" function to the appropriate route handlers

// Cut all the campground middlewares form the "add.js" file
// and paste them here and comment/delete them from "app.js"
// Remove all the "campgrounds" from the beginning of each path
// and change the "app" variable to "router"

// Step 42(C): Requiring multer and specifying the destination variable:
const multer = require('multer');
// Step 42(G): Requiring the storage we just set up:
const { storage } = require('../cloudinary'); // We don't have to mention
// '../cloudinary/index' because node automatically looks for "index.js" file
// Now we want to upload the images to the 'storage' variable, instead of the 'uploads' folder
// so we should mention the 'storage' variable for the "upload" variable
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage });
// Now based on the "post" route handler that we have, if we create a new campground
// by uploading an image, because if the "console.log(req.body, req.file);" line, we
// should see the URL of the uploaded image in cloudinary and if we copy it and paste
// it in the addressbar, we should see the image. Also in our cloudinary account we can
// se the image in the "Media Library" section.
// Now we should store the URL of the "path" key in our database (MongoDB)

// router.get('/', catchAsync(async (req, res) => {
//     const campgrounds = await Campground.find({});
//     res.render('campgrounds/index', { campgrounds });
// }))
// router.get('/', catchAsync(campgrounds.index));

// router.get('/new', isLoggedIn, (req, res) => {
//     res.render('campgrounds/new');
// })
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
//     const campground = new Campground(req.body.campground);
//     campground.author = req.user._id; // Step 36(E): We want to associate the campground that
//     // is being created to the logged-in user, so we fetch the logged-in user and assign it to
//     // the author field of the new campground, right before saving it.
//     await campground.save();
//     // Step 31(C): Assigning flash
//     req.flash('success', 'Successfully made a new campground!');
//     res.redirect(`/campgrounds/${campground._id}`);
// }))
// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

// router.get('/:id', catchAsync(async (req, res) => {
//     const campground = await Campground.findById(req.params.id).populate({
//         // Step 38(D): We want to display the author(field) of each review(childSchema) for
//         // the campground(parentSchema), so it's a nested populate:
//         path: 'reviews', // Creating the connection between the campground(parentSchema) and
//         // review(childSchema) by the "path" keyword (the childSchema has been already populated)
//         populate: { // Populating "author" (the field) for the childSchema
//             path: 'author'
//         }
//         // Now we've made the connection between the field of the childSchema to the parentSchema
//     }).populate('author'); // Step 36(C): populating 'author' for the campground
//     // Step 31(M): For the situation where there's no campground (and therefore there's no id)
//     // for fetching a campground, so we should handle this error, and why not handling it
//     // with error flash message:
//     if (!campground) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//         // We return it because we don't want to hit the other "render"
//         // ('campgrounds/show'); by this return we'll be droped out of the middleware
//     }
//     res.render('campgrounds/show', { campground });
// }))
// router.get('/:id', catchAsync(campgrounds.showCampground));

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const campground = await Campground.findById(id);
//     // Step 31(N): error flash message for editing a campground,
//     // For the situation where there's no campground:
//     if (!campground) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//         // We return it because we don't want to hit the other "render"
//         // ('campgrounds/show'); by this return we'll be droped out of the middleware
//     }
//     // Step 37(D): Duplicating the protecting codes here
//     // if (!campground.author.equals(req.user._id)) {
//     //     req.flash('error', 'You do not have permission to do that');
//     //     return res.redirect(`/campgrounds/${id}`);
//     // } // We don't want to duplicate these codes, we create a separate middleware (which
//     // is "isAuthor") and just mention the name in the appropriate route handlers 
//     res.render('campgrounds/edit', { campground });
// }))
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     // Step 37(B): For protecting the route, we should break the following line into two steps
//     // const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//     // step 1 - find the campground:
//     // const campground = await Campground.findById(id);
//     // step 2 - Check if we CAN update the campground (if the id of the logged-in user is the
//     // same as the id of the author):
//     // if (!campground.author.equals(req.user._id)) { // If we can't update ...
//     //     req.flash('error', 'You do not have permission to do that'); // We'll get an error in flash
//     //     return res.redirect(`/campgrounds/${id}`); // And we'll be dropped out of this route handler
//     // to the page of the campground
//     // }
//     // But if we can update the campground ...
//     const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//     // Step 31(H): Adding the flash for updating a campground
//     req.flash('success', 'Successfully updated campground');
//     res.redirect(`/campgrounds/${campground._id}`);
// }))
// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     // Step 37(C): Duplicating the protecting codes here
//     // const campground = await Campground.findById(id);
//     // if (!campground.author.equals(req.user._id)) {
//     //     req.flash('error', 'You do not have permission to do that');
//     //     return res.redirect(`/campgrounds/${id}`);
//     // }
//     await Campground.findByIdAndDelete(id);
//     // Step 31(K): Adding the flash for deleting a campground
//     req.flash('success', 'Successfully deleted campground');
//     res.redirect('/campgrounds');
// }))
// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// Step 40(A): Grouping the similar campground route
// (routes with the same path but different CRUD operations) together:
router.route('/')
    .get(catchAsync(campgrounds.index))
    // Step 42(D): Changing the "POST" request to a new format
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
    // .post(upload.array('image'), (req, res) => { // If we want the user to be limited to
    //     // upload just one images, we should use the "single" keyword instead of "array"
    //     console.log(req.body, req.files); // We see all the information
    //     // If we upload just one images, we should use "req.file" (without "s")
    //     res.send("IT WORKED!");
    // })
    // Step 42(I): Removing/commenting the previous version of the route handler
    // and creating the standard format:
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// Export the module:
module.exports = router;
// Step 42(E): Create the ".env" file in the main directory, Create the "key=value" pairs
// like: SECRET=LOLOL
// PASSWORD=12345
// install the package in Terminal: npm i dotenv
// Require the "dotenv" IF: the environment is "production"
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
// console.log(process.env.SECRET);
// // Now if we run the project, we'll see the value of SECRET in .env file (LOLOL) or
// console.log(process.env.PASSWORD); // We'll see "12345"
// Now we should store the appropriate "key-value" pairs in .env
// CLOUDINARY_CLOUD_NAME=cloud name / key name in credentials
// CLOUDINARY_KEY= API key in credentials
// CLOUDINARY_SECRET= API secret in credentials
// Don't use ";" or space
// Now for storing the files in cloudinary, first install the following packages:
// npm i cloudinary@1.41.3
// npm i multer-storage-cloudinary@4.0.0
// npm i multer@1.4.5-lts.1

// Step 01(A), Basics (1):
const express = require('express'); // We're receiving the 'express' and assigning it to a variable (express)
const path = require('path'); // We're receiving the 'path' tool and assigning it to a variable (path)
// Step 15(A): Install ejs-mate in Terminal,
// Requiring the "ejs-mate" package:
const ejsMate = require('ejs-mate');

// Step 30(A): For using session, in Terminal install it: npm i express-session
// Then require it here:
const session = require('express-session');

// Step 31(A): For using flash messages, in Terminal install it: npm i connect-flash
// Then require it here:
const flash = require('connect-flash');

// Step 25(F): Requiring joi:
// const Joi = require('joi');

// Step 27(L): Copy the campgroundSchema from here:
// Step 28(L): Copy the reviewSchema from here: 
// Step 25(O): Requiring schemas:
const { campgroundSchema, reviewSchema } = require('./schemas.js'); // Step 26(J): Adding "reviewSchema"
// Now we don't need the "Requiring joi" anymore, because in "schemas.js" it's been already required

// Step 27(H): Copy the "Campground" model from here: 
// Step 03(A): Create the "models" folder and "campground.js" file.
// Testing a "CREATE" operation(1):
// We're receiving the 'Campground' collection, which was exported
// from './models/campground'
const Campground = require('./models/campground');
// This "Campground" is actually a Class from the database
// and we create different objects(campgrounds) from this Class

// Step 28(H): Copy the "Review" model from here: 
// Step 26(E): Creating the "Review" model:
const Review = require('./models/review');

// Step 27(D) + Step 28(D): Cut the "catchAsync" variable from here:
// Step 23(C): Requiring the catchAsync function:
// const catchAsync = require('./utils/catchAsync');

// Step 27(F) + Step 28(F): Copy the "ExpressError" variable from here: 
// Step 24(A): Requiring the ExpressError Class:
const ExpressError = require('./utils/ExpressError');

// Step 32(B): Requiring the User model, "passport" and
// the "local" strategy of "passport":
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Step 32(F): Requiring the users route
const userRoutes = require('./routes/users');

// Step 27(B): Requiring the campgrounds route
const campgroundRoutes = require('./routes/campgrounds');

// Step 28(B): Requiring the reviews route
const reviewRoutes = require('./routes/reviews');

// Step 03(E): Model Basics - Connecting to mongoose:
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    // "yelp-camp" is the name of the database
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!");
        console.log(err);
    }) // Step 03(F): Check if the database is connected
// (We should see "MONGO CONNECTION OPEN!!!")

// Step 01(B), Basics (2):
// We're executing express (express()) and assigning the executed express to a variable (app)
const app = express();

// Step 13(B): Requiring 'method-override'
const methodOverride = require('method-override');

// Step 01(C), Basics (3):
// We're giving the connection to the 'view' folder and 'ejs' as 2 tools to the executed express (app)
app.set('view engine', 'ejs');
// We're giving the facility to the executed express (app) to accept any directory to the 'views' folder
// "__dirname" is the current directory
app.set('views', path.join(__dirname, 'views'));

// Step 15(B): Defining the ejs-mate middelware:
app.engine('ejs', ejsMate);
// Now inside the "views" folder, we create the "layouts" folder and inside this folder,
// create the "boilerplate.ejs" file

// Step 12(C): Parsing the req.body
app.use(express.urlencoded({ extended: true }));
// IMPORTANT: Anything inside app.use() executes everytime we run the application!

// Step 13(C): Using 'method-override'
app.use(methodOverride('_method'));
// IMPORTANT: Anything inside app.use() executes everytime we run the application!

// Step 27(J): Cut the "validateCampground" middleware from here:
// // Step 25(I): Creating the "validateCampground" middleware:
// // We move all the codes here (from the "app.post('/campgrounds') middleware")
// // So, for the explainations refer to Step 25(H)
// const validateCampground = (req, res, next) => {
//     // Step 25(L): Create the "schemas.js" file and move the validation to this file
//     // const campgroundSchema = Joi.object({
//     //     campground: Joi.object({
//     //         title: Joi.string().required(),
//     //         price: Joi.number().required().min(0),
//     //         image: Joi.string().required(),
//     //         location: Joi.string().required(),
//     //         description: Joi.string().required()
//     //     }).required()
//     // })
//     const { error } = campgroundSchema.validate(req.body);
//     // console.log(error);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

// Step 28(J): Cut the "validateReview" middleware from here:
// Step 26(K): Creating the review validation variable:

// Step 30(B): Creating the sessionConfig variable and
// use session by this variable:
const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Adding the expiration date
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}
app.use(session(sessionConfig)); // Now by each request we see a new Cookie in "application" tab

// Step 31(B): Using flash:
app.use(flash());

// Step 32(C): Using the "initialize" section and the "session" section of "passport":
app.use(passport.initialize());
app.use(passport.session()); // Make sure "app.use(session(sessionConfig))" is before this line
// By the "LocalStrategy" variable, the User Model and "authenticate" method
// we create a new object and use it on "passport":
passport.use(new LocalStrategy(User.authenticate()));
// We tell passport how to store the "User" model in "session" (serialize):
passport.serializeUser(User.serializeUser());
// and how to get the "User" model out of the "session" (deserialize):
passport.deserializeUser(User.deserializeUser());

// Step 31(D): 
app.use((req, res, next) => {
    res.locals.currentUser = req.user; // Step 35(C): "req.user" is the variable that reveals if
    // the user is logged in or not; if they're not logged in, it's "undefined" and if they're
    // it's an object of their username and email. Since we're going to use this concept in several
    // sections of the project, with the help of the "req.user" variable, we create the "currentUser"
    // variable here an use it in other parts of the project.
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    // The 'error' part is for situations like sending a request for
    // fetching a data that doesn't exist, so we will be redirected to
    // another page (like index) with a flash message
    next();
})

// Step 32(D): Testing what we've done up to now (We'll delete the route handler after testing)
app.get('/fakeUser', async (req, res) => {
    // Creating an instance of the "User" Model:
    const user = new User({ email: 'coltttt@gmail.com', username: 'Coltttt' });
    // Registering the instance(fakeUser) by register(an inner method of passport):
    const fakeUser = await User.register(user, 'abcd');
    // According to the rule of passport, we should add the password('abcd') as the second parameter
    res.send(fakeUser);
})
// Now try "http://localhost:3000/fakeUser" and you should see the "fakeUser" object
// with id, email, username, salt and hash

// Step 32(G): Using the file by specifying the router and a path:
app.use('/', userRoutes);

// Step 27(C): Using the file by specifying the router and a path:
app.use('/campgrounds', campgroundRoutes);

// Step 28(C): Using the file by specifying the router and a path:
// (we use the whole fix part of all the middlewares of reviews)
app.use('/campgrounds/:id/reviews', reviewRoutes);

// Step 29(B): Using the public folder:
app.use(express.static(path.join(__dirname, 'public')));

// Step 01(E): Testing the connection (see 'HELLO FROM YELPCAMP!' message after "nodemon app.js"):
app.get('/', (req, res) => {
    // res.send('HELLO FROM YELPCAMP!');
    // Step 02: Create the "views" folder and the "home.ejs" file
    // and connect it to this route with the "render" keyword
    res.render('home'); // Refresh the browser and see the content of "home.ejs" file
})

// Step 04: Testing a "CREATE" operation(2):
// app.get('/makecampground', catchAsync(async (req, res) => { // Step 23(F): Wrapping all the Async middlewares with the "catchAsync" function
//     const camp = new Campground({ title: 'My Backyard', description: 'Cheap camping!' });
//     await camp.save();
//     res.send(camp);
//     // Now we try "http://localhost:3000/makecampground"
// }))

// // Step 10: Creating the index page to show all the campgrounds
// app.get('/campgrounds', catchAsync(async (req, res) => { // Step 23(G): Wrapping all the Async middlewares with the "catchAsync" function
//     const campgrounds = await Campground.find({});
//     // Fetching all the data from the created "Campground" variable and
//     // puting them all to a single variable
//     res.render('campgrounds/index', { campgrounds });
//     // Sending the new variable to the index.ejs file in the 'views/campgrounds' directory
// }))// Now, create the index.ejs file in the "views/campgrounds" directory
// // And test it on the browser: "http://localhost:3000/campgrounds"

// // Step 12(A): Creating new campground (Route 1)
// // We don't use the "async" keyword because we're just rendering "new.ejs" file
// app.get('/campgrounds/new', (req, res) => {
//     res.render('campgrounds/new');
// }) // Now create the "new.ejs" file in "views/campgrounds" directory

// // Step 12(B): Creating new campground (Route 2)
// // + Step 25(J): Use the "validateCampground" middleware here, after the "path"
// app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => { // Step 22(D): Don't forget to add the "next" keyword here! // Step 23(E): Adding the "catchAsync" function here
//     // res.send(req.body) // "req" is the submitted form and
//     // "req.body" is all the information of the form.
//     // The result would be under the "campground", like:
//     // {
//     // "campground": {
//     //     "title": "---",
//     //     "location": "---"
//     //     }
//     // }
//     // Step 22(C): The error-handling of creating the new data is here:
//     // try {
//     // Step 25(G): Defining our first joi-Schema:
//     // const campgroundSchema = Joi.object({
//     //     // This schema validates our data before we even attempt to save it,
//     //     // before we involve Mongoose at all!
//     //     campground: Joi.object({
//     //         // Everything is going to be sent under "campground" (like the forms we had)
//     //         // and we expect it(campground) to be an object
//     //         title: Joi.string().required(), // We expect the "title" to be a string and required
//     //         price: Joi.number().required().min(0), // We expect the "price" to be a positive number and required
//     //         image: Joi.string().required(), // We expect the "image(URL)" to be a string and required
//     //         location: Joi.string().required(), // We expect the "location" to be a string and required
//     //         description: Joi.string().required() // We expect the "description" to be a string and required
//     //     }).required() // We expect the whole object(campground) to be required.
//     // })
//     // const { error } = campgroundSchema.validate(req.body);
//     // // We should pass our data through this Schema and with the "validate" keyword, we fetch the error
//     // console.log(error); // Now if we try creating a new campground with an error,
//     // // in Terminal we'll see the error, with its type and message.
//     // if (error) { // if there's an error
//     //     const msg = error.details.map(el => el.message).join(',')
//     //     throw new ExpressError(msg, 400)
//     //     // Then by this error, 
//     //     // We map through the error to extract a single string
//     //     // and if there're more than one message, we join them together with ','
//     //     // The string is created, now with this message and the 400 code
//     //     // we create an object from the Class we've created and throw it
//     //     // throw it = send it to the basic-error-handling middleware
//     // }
//     // else {
//     //     next();
//     //     // We validate, if all goes well we call naxt if not we throw an ExpressError
//     //     // This "next" functionality directs us to the middlewares with "validateCampground"
//     // }
//     // // Now if we try creating a new campground with an error,
//     // // we'll see the specific message of the error
//     // // Step 25(H): In order to stop duplication, We create one middleware
//     // // (validateCampground) and move all these functionalities to that middleware
//     // // and remove/comment all of them from here
//     // Step 23(D): Updating the middleware with the class we just created
//     // By removing/commenting the "try" keyword and the "catch block"
//     const campground = new Campground(req.body.campground);
//     await campground.save();
//     // Redirect the user to the detail page of the new created campground
//     res.redirect(`/campgrounds/${campground._id}`);
//     // }
//     // catch (e) {
//     //     next(e); // The error will be directed to the basic error-handling middleware
//     // }
//     // const campground = new Campground(req.body.campground);
//     // await campground.save();
//     // // Redirect the user to the detail page of the new created campground
//     // res.redirect(`/campgrounds/${campground._id}`);
// }))

// // Step 11: Creating a dynamic route to see the deatils of each campground
// app.get('/campgrounds/:id', catchAsync(async (req, res) => { // Step 23(H): Wrapping all the Async middlewares with the "catchAsync" function
//     // "req" is clicking on the campground
//     // "req.params" is all the information of the chosen campground
//     // "req.params.id" is the id of the chosen campground
//     const campground = await Campground.findById(req.params.id).populate('reviews'); // Step 26(O): We want to see the reviews, so we populate reviews here
//     res.render('campgrounds/show', { campground });
// }))
// // Make all the campgrounds in the "index.ejs" file to links
// // Create the "show.ejs" file in the "views/campgrounds" directory

// // Step 13(A): Creating the first route
// app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => { // Step 23(I): Wrapping all the Async middlewares with the "catchAsync" function
//     // Among everything in the database (Campground), we find the one
//     // that has been clicked on by its id (req.params.id) with the
//     // "findById" method and assign it to a variable (campground)
//     const campground = await Campground.findById(req.params.id);
//     // we send the one, true variable (campground) to
//     // the "campgrounds/edit" directory, "edit.ejs" file
//     res.render('campgrounds/edit', { campground });
// }))

// // Step 13(D): Creating the second route
// // + Step 25(K): Use the "validateCampground" middleware here, after the "path"
// app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => { // Step 23(J): Wrapping all the Async middlewares with the "catchAsync" function
//     // We've been redirected to this route from the "edit.ejs" file by the
//     // <a href="/campgrounds/<%= campground._id %>">Back to Campground</a>
//     // line, Now the request is "clicking on the Update Campground button"
//     // and we grab the id from the request by "req.params" and assign it to a variable
//     const { id } = req.params;
//     // By the found id we find and update THE campground with the "findByIdAndUpdate"
//     // method and assign it to a separate variable (campground)
//     // Since we've grouped things under "campground", we use "...req.body.campground"
//     const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//     // We redirect the user to the detail page
//     res.redirect(`/campgrounds/${campground._id}`);
// }))

// // Step 14:
// app.delete('/campgrounds/:id', catchAsync(async (req, res) => { // Step 23(K): Wrapping all the Async middlewares with the "catchAsync" function
//     const { id } = req.params;
//     await Campground.findByIdAndDelete(id);
//     res.redirect('/campgrounds');
// })) // Now add the "delete form" to the "show.ejs" file

// // Step 26(D): Creating the route:
// app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => { // Step 26(L): Applying the "validateReview" to this middleware
//     // update the action attribute of the form in "show.ejs"
//     const campground = await Campground.findById(req.params.id); // fetching the campground by the id
//     // Create the "Review" variable from the Review model on top (by requiring it)
//     const review = new Review(req.body.review); // Instanciating an object from the "Review" class
//     campground.reviews.push(review); // Pushing the created review to the review field in campground model
//     // which is an array
//     await review.save();
//     await campground.save();
//     res.redirect(`/campgrounds/${campground._id}`);
// })) // For testing, add a review for a campground an check it in mongoose
// // Step 26(M): We should try on postman

// // Step 26(Q): Creating the middleware for deleting the reviews:
// app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
//     // res.send('Delete me!'); // Just for testing
//     // We should fetch both the review and the campground and update both of them
//     // In mongoose there's an operator for this, which is "$pull"
//     const { id, reviewId } = req.params; // Fetching the campgroundId and reviewId
//     // By the "$pull" operator we update the campground automatically after deleting the review
//     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     // Here the "$pull" operator takes the "reviewId" and pull it out of all the "reviews" (which is an array of ids)
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/campgrounds/${id}`); // Sending the user back to "show.ejs"
// }))

// // Step 24(B): We create the "ALL" middelware here,
// // before the basic error-handling middeleware
// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page not found', 404))
//     // Here we create an object from the "ExpressError" class
//     // and by the "next" keyword we send the object (err)
//     // to the basic error-handling middeleware
// })

// Step 22(A): Basic Error-Handling
app.use((err, req, res, next) => {
    // Step 24(C): We de-structure the object(err)
    // const { statusCode = 500, message = 'Something went wrong' } = err; // Here, we fetch the status code and the message of the error (err)
    // Step 24(D): We send the fetched message by the fetched status code
    // res.status(statusCode).send(message);
    // Now the message and the status code of each error are different and unique :)
    // Step 22(B): Sending the error:
    // res.send('Something went wrong!');
    // Step 25(D): We should separate the message part
    // (Only if there's no message, we should have a default)
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Something went wrong';
    }
    // Step 25(C): change the "send" function to "render"
    // Since we want the template to be dynamic,
    // so we send the error (err) to the template
    res.status(statusCode).render('error', { err });
})

// Step 01(D), Testing the connection (3):
app.listen(3000, () => {
    console.log('Serving on port 3000')
})
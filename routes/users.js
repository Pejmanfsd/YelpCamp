// Step 32(E): We create this file (routes/users.js)
// and type the basic codes
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync'); // Step 32(J): Requiring the "catchAsync"
// and add it to the "POST" route handler (Step 32(I))
const passport = require('passport'); // Step 33(C): Requiring passport
const User = require('../models/user');
const users = require('../controllers/users'); // Step 39(F): Requiring the review controller
const { storeReturnTo } = require('../middleware'); // Step 35(G): Requiring "storeReturnTo" function
// Now mention it in the "POST" route handler of login

// router.get('/register', (req, res) => {
//     res.render('users/register')
// });
// router.get('/register', users.renderRegister);

// Step 32(I): Creating the "POST" route handler:
// router.post('/register', catchAsync(async (req, res, next) => {
//     try { // Step 32(K): Since we want to have the errors in flash messages, we create our own "try-catch" blocks
//         // The "POST" route handler of passport is quite unique
//         const { email, username, password } = req.body; // destructuring the request
//         const user = new User({ email, username }); // Creating the user(object) from the Class(User model)
//         const registeredUser = await User.register(user, password); // Registering the user:
//         // adding the passwordInput to the created user
//         // Step 35(D): For fixing the little bug (users have to log-in right after the registration)
//         // we loggin right here:
//         req.login(registeredUser, err => {
//             if (err) return next(err); // We handle the potential error
//             console.log(registeredUser);
//             req.flash('success', 'Welcome to Yelp Camp!');
//             res.redirect('/campgrounds');
//         })
//     } catch (e) {
//         req.flash('error', e.message);
//         res.redirect('/register');
//     }
// }));
// router.post('/register', catchAsync(users.register));

// Step 33(B): Creating the "GET" route for login:
// router.get('/login', (req, res) => {
//     res.render('users/login');
// })
// router.get('/login', users.renderLogin);

// Step 33(D): Creating the "POST" route for login:
// We benefit the majical function of passport (authenticate) with 'local' strategy and
// an object for failure situations
// Do the authentication with passport, using the 'local' strategy, if there's a failure, rediret the user to '/login'
// and use the failure flash message
// router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     // If we get to this part, we're sure that the user is authenticated successfully
//     req.flash('success', 'Welcome back!');
//     const redirectUrl = res.locals.returnTo || '/campgrounds'; // Step 35(H): Creating the variable of the URL of the
//     // protected page (if it's empty, then the user will be redirected to '/campgrounds')
//     // res.redirect('/campgrounds');
//     res.redirect(redirectUrl); // Step 35(I): Putting this variable as the input of the redirect method
// })
// router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

// Step 35(A): Creating the "Logout" route handler
// router.get('/logout', (req, res, next) => {
//     req.logout(function (err) {
//         if (err) {
//             return next(err);
//         }
//         req.flash('success', "Goodbye!");
//         res.redirect('/campgrounds');
//     });
// });
router.get('/logout', users.logout);

// Step 40(B): Grouping the similar user route
// (routes with the same path but different CRUD operations) together:
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

module.exports = router;
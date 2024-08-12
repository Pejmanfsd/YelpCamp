// Step 39(E): Same story for reviews!
const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
} // Now indicate "users.renderRegister" as the input of the route handler
// whose functionalities are just moved here, in this controller

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            console.log(registeredUser);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
} // Now indicate "users.register" as the input of the route handler
// whose functionalities are just moved here, in this controller

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
} // Now indicate "users.renderLogin" as the input of the route handler
// whose functionalities are just moved here, in this controller

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
} // Now indicate "users.login" as the input of the route handler
// whose functionalities are just moved here, in this controller

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', "Goodbye!");
        res.redirect('/campgrounds');
    });
} // Now indicate "users.logout" as the input of the route handler
// whose functionalities are just moved here, in this controller
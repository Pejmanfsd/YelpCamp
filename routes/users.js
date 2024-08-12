const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');
const users = require('../controllers/users');
const { storeReturnTo } = require('../middleware');

router.get('/logout', users.logout);
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));
router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

module.exports = router;
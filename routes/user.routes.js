const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const passport = require('../config/passport.config')

router.route('/login').post(passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
})
);
router.route('/signup').post(userController.userSignUp);

module.exports = router;
// require express
const route = require('express').Router();
// require userController
const controller = require('../controller/userController');
// require userValidations
const validations = require('../validations/userValidations');
// require middleware
const { Jwt, Validate } = require('../../../middlewares');

// route to rigesterUser user data
route.post(
    '/',
    [
        ...validations.regiterUser,
        Validate
    ], 
    controller.rigesterUser
);

// route to loginUser user data
route.post(
    '/login',
    [
        ...validations.loginUser,
        Validate
    ], 
    controller.loginUser
);

// exports route
module.exports = route;

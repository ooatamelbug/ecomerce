// require express
const route = require('express').Router();
// require userController
const controller = require('../controller/userController');
// require userValidations
const validations = require('../validations/userValidations');

// route to rigesterUser user data
route.post(
    '/',
    [
        ...validations.regiterUser
    ], 
    controller.rigesterUser
);

// exports route
module.exports = route;

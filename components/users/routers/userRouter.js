// require express
const route = require('express').Router();
// require userController
const controller = require('../controller/userController');

// route to rigesterUser user data
route.post(
    '/',
    [

    ], 
    controller.rigesterUser
);

// exports route
module.exports = route;

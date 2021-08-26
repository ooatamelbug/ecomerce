// require body ,param and header from express-validator
const { body, param, header } = require('express-validator');
// require User models
const User = require('../models/user');

// validation of regiterUser route
const regiterUser = [
    body('firstName')
        .trim().escape()
        .notEmpty().withMessage('firstName IS not allow to be Empty !')
        .bail()
        .isLength({min: 3}).withMessage('firstName min Length is 3 char'),
    body('lastName')
        .trim().escape()
        .notEmpty().withMessage('lastName IS not allow to be Empty !')
        .bail()
        .isLength({min: 3}).withMessage('lastName min Length is 3 char'),
    body('email')
        .trim().escape()
        .notEmpty().withMessage('email IS not allow to be Empty !')
        .bail()
        .isEmail().withMessage('email is not formated email !')
        .custom( async (value, {req, res, next}) => {
            const user = await User.findOne({ email: value });
            if(user) {
                throw new Error();
            }
            next();
        }),
    body('username')
        .trim().escape()
        .notEmpty().withMessage('username IS not allow to be Empty !')
        .bail()
        .custom( async (value, {req, res, next}) => {
            const user = await User.findOne({ username: value });
            if(user) {
                throw new Error();
            }
            next();
        }),
    body('password')
        .trim().escape()
        .notEmpty().withMessage('password IS not allow to be Empty !')
        .bail()
        . matches('[0-9]+[a-z]+[A-Z]+[.]+{8}$')
];

// validation of loginUser route
const loginUser = [
    body('username')
        .trim().escape(),
    body('email')
        .trim().escape(),
    body('password')
        .trim().escape()
        .notEmpty().withMessage('password IS not allow to be Empty !')
        .bail()
        . matches('^[0-9-a-z-A-Z-.]+{8,25}$')

];

// exports validations of user
module.exports = {
    regiterUser,
    loginUser
};
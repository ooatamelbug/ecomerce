// jwt require middleware
const jwt = require('./jwt');
// validation require middleware
const validation = require('./validation');

// exports 
module.exports = {
    Jwt: jwt,
    Validate: validation
}
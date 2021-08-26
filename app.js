// require express 
const express = require('express');
// require body Parser
const bodyParser = require('body-parser');
// require cors 
const cors = require('cors');
// require connectDB
const connectDB = require('./databases');

// create app from express
const app = express();

// use express json to accept api json format
app.use(express.json());
// use express urlencoded to allow to parse data 
app.use(express.urlencoded({
    extended: true
}));

// allow app to use cors headers
app.use(cors());

// build db 
connectDB.sync({alter: true});

// pass app to docs
require('./docs')(app);

// pass app to router
require('./shared/router')(app);

// error handle
app.use(require('./utils/errors'));


// exports module app
module.exports = app
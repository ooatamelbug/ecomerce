// require express 
const express = require('express');
// require body Parser
const bodyParser = require('body-parser');
// require cors 
const cors = require('cors');
// require connectDB
const connectDB = require('./databases');
const { DATE } = require('sequelize/types');

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
connectDB.sync();

// pass app to docs
require('./docs')(app);

// pass app to router
require('./shared/router')(app);


// error handle
app.use((error, req, res, next) => {
    // get data , message ,  status from error
    const { errors, message, status } = error;
    // create validationData variable for error data
    let validationData;
    // check if  errors is null or not
    if(errors){
        // loop of errors array to change format of error data
        errors.forEach(error => {
            validationData[error.param] = error.msg;
        });
    }
    // send status to app
    return res.status(status).json({
        message,
        time: new Date().now(),
        path: req.originUrl,
        validationData
    });
})


// exports module app
module.exports = app
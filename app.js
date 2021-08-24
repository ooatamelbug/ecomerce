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
connectDB.sync();


// error handle
app.use((error, req, res, next) => {
    // get data , message ,  status from error
    const { data, message, status } = error;
    // send status to app
    return res.status(status).json({
        message,
        data
    });
})


// exports module app
module.exports = app
// error handle
module.exports = (error, req, res, next) => {
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
}

// require validationResult
const { validationResult } = require('express-validator');

// middleware of validationResult errors
module.exports = async (req, res, next) => {
    // get errors data fro request  validationResult
    const { errors } = await validationResult(req);
    // check if errors array length is more than 0
    if(errors.length > 0){
        // return status and errors and message
        return res
            .status(400)
            .json({
                message: 'invalid input',
                errors
            });
    }
    next();
}
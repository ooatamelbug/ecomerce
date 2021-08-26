// require UserServices
const { UserServices } = require('../services');

// exports rigesterUser controller
exports.rigesterUser = async (req, res, next) => {
    // await for result from rigesterUser and pass request body
    const result = await UserServices.rigesterUser(req.body);
    // send response with status and data
    return res.status(result.statusCode).json(result.response);
}

// exports UserLogin User controller
exports.loginUser = async (req, res, next) => {
    // await for result from loginUser and pass request body
    const result = await UserServices.loginUser(req.body);
    // send response with status and data
    return res.status(result.statusCode).json(result.response);
}
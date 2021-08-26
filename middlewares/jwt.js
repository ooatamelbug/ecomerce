// require jsonwebtoken
const JWT = require('jsonwebtoken');
// require config
const config = require('config');
// require UserLogin models
const UserLogin = require('../components/users/models/userLogin');
// require moment
const moment = require('moment');

// middleware of json web token  
module.exports = async (req, res, next) => {
    // extract token from Autherization headers or body
    const tokenBearar = req.headers.Autherization || req.body.Autherization; 
    // check if tokenBearar is null or not
    if (!tokenBearar){
        // return error if is no token and status 401
        return res
                .status(401)
                .json({
                    message: 'no token passed in header or body !'
                });
    }else{
        // get token string wihtout Barear 
        const token = tokenBearar.split(' ')[1];
        try {
            // verify token with secret
            const decode = JWT.verify(token, config.get('jwt.secret'));
            // select data from userlogin model that have the same token or not
            const loginData = await UserLogin.findOne({token, user_id: decode.id});
            // check if token is in login user model data 
            if (loginData){
                // check if loginData has logoutTime date or status == false
                if(loginData.logoutTime && !loginData.status){
                    // return error and message with this token is in valid
                    return res
                            .status(401)
                            .json({
                                message: 'token is expired'
                            })
                } else {
                    // get date now and set is to ISOString
                    let now = new Date().toISOString();
                    // sure if date now is after loginTime added to expirein time 
                    const convertDate = moment(now)
                                        .isAfter(
                                            moment(
                                                new Date(
                                                    loginData.loginTime
                                                )
                                                .add(
                                                    Number.parseInt(
                                                        config.get('jwt.expirein')
                                                    )
                                                )
                                            )
                                        );
                    // check if convertDate is true or not 
                    if (convertDate){
                        // return error that token is expire
                        return res
                            .status(401)
                            .json({
                                message: 'token is expire'
                            });
                    }
                    // put token and userdata in request
                    req.token = token;
                    req.user = decode;
                    next();
                }
            } else {
                // return error and message with this token is not found
                return res
                        .status(404)
                        .json({
                            message: 'token is expired or not found'
                        })
            }
        } catch (error) {
            // return error if error in process token and status 401
            return res
                .status(401)
                .json({
                    message: 'error in token passed  !',
                    errors: error.message
                });
        }
    }
}
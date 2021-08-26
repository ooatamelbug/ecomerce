// require User models
const Users = require('../models/user');
// require bcrypt
const bcrypt = require('bcrypt');
// require moment
const moment = require('moment');
// require jsonwebtoken
const JWT = require('jsonwebtoken');
// require config
const config = require('config');
// require UserLogin models
const UserLogin = require('../models/userLogin');


/** class represent user service operations */
class User {
    /**
    *
    *@param {object} body  
    *
    */
    static async rigesterUser(Body) {
        // init stat for response
        let statusCode = 200;
        let response = {};
        try {
            // encrypt password
            const bcryptPassword = await bcrypt.hash(body.password, 12);
            // select data from user model where username or email
            const exsistUser = await Users.findOne({
                where: { 
                    $or: [
                        { username: body.username},
                        {email: body.email}
                    ]
                }
            });
            // check if exsistUser is exsist
            if (exsistUser) {
                // change status code 403 and server error 
                statusCode = 403;
                response.message = 'exsist User';
            } else {
                // create new user and hashed password
                const newUser = await Users.create({
                    ...body,
                    password: bcryptPassword
                });
                // check if newUser is created
                if(newUser){
                    // change status code 201 and created 
                    statusCode = 201;
                    response.message = 'NEW user is created';
                    response.data = newUser;
                }
            }
        } catch (error) {
            // change status code 500 and server error 
            statusCode = 500;
            response.message = 'error in data';
            response.data = error.data;
        }
        // return statusCode and response data
        return { statusCode, response };
    }

    /**
     * 
     * @param {*} Body 
     * @returns 
     */
    static async loginUser(Body) {
        // init stat for response
        let statusCode = 200;
        let response = {};
        try {
            // get some of data from body
            const { username, email, password } = body;
            //create viriable empty
            let user, column;
            // check if username not null and email is null
            if (username && !email) {
                // get data for this username
                const userData = await Users.findOne({username: username});
                // check if userData is not null
                if (userData){
                    // assigin userData to user and username to col
                    user = userData;
                    col = 'username';
                }
                else throw new Error('error no user');
                
            } else {
                 // get data for this email
                 const userData = await Users.findOne({email: email});
                 // check if userData is not null
                 if (userData){
                     // assigin userData to user and email to col
                     user = userData;
                     col = 'email';
                 }
                 else throw new Error('error no user');
            }

            // check if user is null
            if (!user) {
                // change status code 404 and user not found 
                statusCode = 404;
                response.message = `no data for this user please check correct data of ${col}`;         
            }

            // compare two password 
            const verifyPassword = await bcrypt.compare(password, user.password);
            // check if two password is false matched 
            if (!verifyPassword) {
                // change status code 404 and password incorrect
                statusCode  = 404;
                response.message = 'password is not correct please check true';
            }

            // create token for user
            const token = JWT.sign(user,
                config.get('jwt.secret'),
                {
                    expiresIn: config.get('jwt.expireIn')
                }    
            );
            
            // change format date time and clac expireIn time
            let loginTime = moment(new Date())
                            .utc()
                            .format('YYYY-MM-DD HH:mm:ss');
            let logoutTime = moment(new Date())
                            .add(
                                Number.parseInt(
                                    config.get('jwt.expireIn')
                                )
                            )
                            .utc()
                            .format('YYYY-MM-DD HH:mm:ss');

            // create UserLogin for user Login 
            const loginUser = await UserLogin.create({
                token,
                loginTime,
                logoutTime,
                userId: user.id,
                status: true
            });
            // return statusCode 200 and user data token
            statusCode = 200;
            response.message = 'ok data';
            delete user.password;
            response.data = { token, user }; 
        } catch (error) {
            // change status code 500 and server error 
            statusCode = 500;
            response.message = 'error in data';
            response.data = error.data;
        }
        // return statusCode and response data
        return { statusCode, response };
    }
}


module.exports = User;
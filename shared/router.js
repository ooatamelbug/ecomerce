// require UserRouter
const { UserRouter } = require('../components/users');

// exports and use api of components routes
module.exports = app => {
    app.use('/user', UserRouter);
}

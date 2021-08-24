// require swagger UI
const SwaggerUI = require('swagger-ui-express');
// require swagger jsdoc
const SwaggerJSDOC = require('swagger-jsdoc');
// require app 
const app = require('../app');

// create swaggerDefinition props
const swaggerDefinition = {
    components: {},
    info: {
        title: 'ecomerce api app', 
        version: '1.0.0',
        description: 'this is rest api for ecomerce app'
    },
    host: 'localhost:3000',
    basePath: '/api/v1/'
};

// create options for swaggerDefinition and apis od where file of docs
const options = {
    swaggerDefinition,
    apis: ['../components/**/*.yaml']
};

// create spec with SwaggerJSDOC options
const spec = SwaggerJSDOC(options);

// exports and use SwaggerUI on route
module.exports = app => {
    app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(spec));
};
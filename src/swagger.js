const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Rest con MongoDB',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js','./src/routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification
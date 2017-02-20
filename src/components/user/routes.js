(function () {
    const config = require('../../settings/config');
    const Knex = require('knex')(config.database);
    const userController = require('./controller');
    const Joi = require('joi');

    module.exports = [{
        path: '/users',
        method: 'GET',
        handler: userController.getUsers
    }, {
        path: '/auth',
        method: 'POST',
        config: {
            handler: userController.getAuth,
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        },
    }];
})();
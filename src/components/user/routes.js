(function () {
    'use strict';
    const config = require('../../settings/config');
    const Knex = require('knex')(config.database);
    const controller = require('./controller');
    const Joi = require('joi');

    module.exports = [{
        path: '/auth',
        method: 'POST',
        config: {
            handler: controller.post,
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        },
    }];
})();
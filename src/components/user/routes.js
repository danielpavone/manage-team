(function () {
    'use strict';
    const config = require('../../settings/config');
    const Knex = require('knex')(config.database);
    const model = require('./model');
    const Joi = require('joi');
    const Boom = require('boom');

    module.exports = [{
        path: '/auth',
        method: 'POST',
        config: {
            handler: model.post,
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        }
    }, {
        path: '/auth',
        method: 'GET',
        config: {
            handler: (request, reply) => {
                reply('It Works!');
            }
        }
    }];
})();

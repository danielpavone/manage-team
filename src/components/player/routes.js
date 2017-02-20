(function () {
    'use strict';

    const config = require('../../settings/config');
    const Knex = require('knex')(config.database);
    const controller = require('./controller');
    const Joi = require('joi');

    module.exports = [{
        path: '/players',
        method: 'GET',
        handler: controller.get
    }, {
        path: '/players',
        method: 'POST',
        config: {
            auth: {
                strategy: 'token',
                scope: ['admin']
            }
        },
        handler: controller.post
    }];
})();
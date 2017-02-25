(function () {
    'use strict';

    const config = require('../../settings/config');
    const Knex = require('knex')(config.database);
    const model = require('./model');
    const Joi = require('joi');

    module.exports = [{
        path: '/players',
        method: 'GET',
        handler: model.get
    }, {
        path: '/players',
        method: 'POST',
        config: {
            auth: {
                strategy: 'token',
                scope: ['admin']
            }
        },
        handler: model.post
    }, {
        path: '/players/{id}',
        method: 'PUT',
        config: {
            auth: {
                strategy: 'token',
                scope: ['admin']
            },
            pre: [{
                method: (request, reply) => {
                    const {
                        id
                    } = request.params;
                    const {
                        scope
                    } = request.auth.credentials;

                    const getOperation = Knex('players').where({
                        id: id,
                    }).then(([result]) => {
                        if (!result) {
                            reply({
                                error: true,
                                errMessage: 'the player with id ${id} was not found'
                            }).takeover();
                        }
                        return reply.continue();
                    });
                }
            }],
            handler: model.put
        }
    }, {
        path: '/players/{id}',
        method: 'DELETE',
        config: {
            auth: {
                strategy: 'token',
                scope: ['admin']
            },
            pre: [{
                method: (request, reply) => {
                    const {
                        id
                    } = request.params;
                    const {
                        scope
                    } = request.auth.credentials;

                    const getOperation = Knex('players').where({
                        id: id,
                    }).then(([result]) => {
                        if (!result) {
                            reply({
                                error: true,
                                errMessage: 'the player with id ${id} was not found'
                            }).takeover();
                        }
                        return reply.continue();
                    });
                }
            }],
            handler: model.del
        }
    }];
})();

(function () {
    var config = require('../../settings/config');
    var Knex = require('knex')(config.database);
    var userHandle = require('./controller');
    var Joi = require('joi');

    module.exports = [{
        path: '/users',
        method: 'GET',
        handler: (request, reply) => {
            const getOperation = Knex('users').select('name').then((results) => {
                if (!results || results.length === 0) {
                    reply({
                        error: true,
                        errMessage: 'Users not found'
                    });
                }

                reply({
                    dataCount: results.length,
                    data: results,
                });
            }).catch((err) => {
                reply('server-side error');
            });
        }
    }, {
        path: '/auth',
        method: 'POST',
        config: {
            handler: userHandle.getAuth,
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        },
    }];
})();
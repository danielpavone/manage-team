(function () {
    'use strict';
    var config = require('../../settings/config');
    var Knex = require('knex')(config.database);
    var jwt = require('jsonwebtoken');
    
    let controllers = {
        userAuth: {
            handler: (request, reply) => {
                const {
                    username,
                    password
                } = request.payload;

                const getOperation = Knex('users').where({
                    username
                }).select('guid', 'password').then(([user]) => {
                    if (!user) {
                        reply({
                            error: true,
                            errMessage: 'the specified user was not found'
                        });
                        return;
                    }
                    if (user.password === password) {
                        const token = jwt.sign({
                            username,
                            scope: user.guid
                        }, config.jwt.key, {
                            algorithm: 'HS256',
                            expiresIn: '1h'
                        });

                        reply({
                            token,
                            scope: user.guid
                        });
                    } else {
                        reply('Incorrect password');
                    }
                }).catch((err) => {
                    reply('server-side error');
                });
            }
        }
    };
    module.exports = controllers;
})();
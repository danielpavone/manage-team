(function () {
    'use strict';

    const config = require('../../settings/config');
    const knex = require('knex')(config.database);
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');
    const Boom = require('boom');

    function post(request, reply, callback) {
        const { username, password } = request.payload;

        const getOperation = knex('users').where({
            username
        }).select('admin', 'password').then(([user]) => {
            if (!user) {
                reply(Boom.badRequest('The specified user was not found'));
                return;
            }
            if (user.password === bcrypt.hashSync(password, config.salt)) {
                const token = jwt.sign({
                    username,
                    scope: user.admin
                }, config.jwt.key, {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                });

                reply({
                    token,
                    admin: user.admin
                });
            } else {
                reply(Boom.badRequest('Incorrect Password'));
            }
        }).catch((err) => {
            reply(Boom.badRequest('Invalid request'));
        });
    }

    module.exports.post = post;
}());

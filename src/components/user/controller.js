(function () {
    'use strict';

    module.exports.getAuth = getAuth;
    module.exports.getUsers = getUsers;
    const config = require('../../settings/config');
    const Knex = require('knex')(config.database);
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');

    function getAuth(request, reply) {
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
            if (user.password === bcrypt.hashSync(password, config.salt)) {
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

    function getUsers(request, reply) {
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
})();
(function () {
    'use strict';

    module.exports.post = post;
    const config = require('../../settings/config');
    const Knex = require('knex')(config.database);
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');

    function post(request, reply) {
        const {
            username,
            password
        } = request.payload;

        const getOperation = Knex('users').where({
            username
        }).select('admin', 'password').then(([user]) => {
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
                    scope: user.admin ? 'admin' : 'user'
                }, config.jwt.key, {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                });

                reply({
                    token,
                    admin: user.admin
                });
            } else {
                reply('Incorrect password');
            }
        }).catch((err) => {
            reply('server-side error');
        });
    }

})();
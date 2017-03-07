(function () {
    'use strict';

    require('app-module-path').addPath('app');

    const Hapi = require('hapi');
    const jwt = require('hapi-auth-jwt');
    const routes = require('settings/routes');
    const config = require('settings/config').jwt;

    const server = new Hapi.Server({});

    server.connection({
        host: '0.0.0.0',
        port: 3000
    });

    server.register(jwt, (err) => {
        server.auth.strategy('token', 'jwt', {
            key: config.key,
            verifyOptions: {
                algorithms: ['HS256']
            }
        });
        server.route(routes);
    });

    module.exports = server;
}());
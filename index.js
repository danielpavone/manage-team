(function(){
'use strict';

require('app-module-path').addPath('app');

var Hapi = require('hapi');
var jwt = require('hapi-auth-jwt');
var server = new Hapi.Server();
var routes = require('settings/routes');
var config = require('settings/config').jwt;

server = new Hapi.Server({});

server.connection({
	host: '0.0.0.0',
	port: 8080
});

server.register(jwt, (err) => {
    server.auth.strategy('token', 'jwt', {
        key: config.key,
        verifyOptions: {
            algorithms: ['HS256']
        }
    });
});
server.route(routes);

module.exports = server;
})();
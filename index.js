(function(){
'use strict';

require('app-module-path').addPath('app');

var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var server = new Hapi.Server();
var routes = require('settings/routes');

server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: './app/assets/'
            }
        }
    }
});

server.register(require('vision'), function(err) {
	server.views({
		engines: {
			html: require('handlebars'),
		}
	});
});

server.connection({
	host: '0.0.0.0',
	port: 8080
});

server.register(Inert, function () {});
server.route(routes);

module.exports = server;
})();
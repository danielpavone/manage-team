(function () {
    'use strict';

    const Lab = require('lab');
    const lab = exports.lab = Lab.script();
    var Code = require('code');
    var server = require('../index');

    lab.experiment('Basic HTTP Tests', () => {

        lab.test('POST /auth (endpoint test)', (done) => {
            let options = {
                method: 'POST',
                url: '/auth'
            };

            server.inject(options, (response) => {
                Code.expect(response.statusCode).to.equal(400);
                server.stop(done);
            });
        });

        lab.test('POST /auth failed', (done) => {
            let options = {
                method: 'POST',
                url: '/auth',
                payload: {
                    username: 'foo',
                    password: 'bar'
                }
            };

            server.inject(options, (response) => {
                Code.expect(response.statusCode).to.equal(400);
                server.stop(done);
            });
        });

        lab.test('POST /auth loading', (done) => {
            let options = {
                method: 'POST',
                url: '/auth',
                payload: {
                    username: 'userone',
                    password: '123456'
                }
            };

            server.inject(options, (response) => {
                Code.expect(response.statusCode).to.equal(200);
                server.stop(done);
            });
        });

        lab.test('GET /auth show page with status 200', (done) => {
            let options = {
                method: 'GET',
                url: '/auth'
            };

            server.inject(options, (response) => {
                Code.expect(response.statusCode).to.equal(200);
                Code.expect(response.result).to.have.length(9);
                server.stop(done);
            });
        });
    });
})();
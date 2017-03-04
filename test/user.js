(function () {
    'use strict';

    const Lab = require('lab');
    const lab = exports.lab = Lab.script();
    var Code = require('code');
    var server = require('../index');
    const it = lab.test;
    const describe = lab.experiment;

    describe('/POST user', () => {

        it('POST /auth (endpoint test)', (done) => {
            let options = {
                method: 'POST',
                url: '/auth'
            };

            server.inject(options, (response) => {
                Code.expect(response.statusCode).to.equal(400);
                server.stop(done);
            });
        });

        it('POST /auth failed', (done) => {
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

        it('POST /auth login', (done) => {
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
                Code.expect(response.result).to.be.an.object();
                Code.expect(response.result.admin).to.be.a.number();
                Code.expect(response.result).to.have.length(2);
                server.stop(done);
            });
        });
    });

    describe('/GET user', () => {
        it('it should get \'It Works!\'', (done) => {
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
}());
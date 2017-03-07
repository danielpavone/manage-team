// (function () {
//     'use strict';

//     const Lab = require('lab');
//     const lab = exports.lab = Lab.script();
//     const Code = require('code');
//     const server = require('../index');
//     const it = lab.test;
//     const describe = lab.experiment;
//     const knex = require('../utils/knex');

//     describe('GET /players', () => {

//         lab.beforeEach(function (done) {
//             knex.migrate.rollback()
//                 .then(() => {
//                     knex.migrate.latest()
//                         .then(() => {
//                             return knex.seed.run()
//                                 .then(function () {
//                                     done();
//                                 });
//                         });
//                 });
//         });

//         it('should return all players', (done) => {

//             let options = {
//                 method: 'GET',
//                 url: '/players'
//             };

//             server.inject(options, (response) => {
//                 Code.expect(response.statusCode).to.equal(200);
//                 Code.expect(response.result).to.be.an.object();
//                 Code.expect(response.result.data).to.exist();
//                 Code.expect(response.result.data).to.be.an.array();
//                 Code.expect(response.result.dataCount).to.exist();
//                 Code.expect(response.result.dataCount).to.above(0);
//                 Code.expect(response.result.data[0]).to.have.length(5);
//                 server.stop(done);
//             });
//         });

//     });
// }());
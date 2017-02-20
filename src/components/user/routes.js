(function(){
    var database = require('../../settings/config').database;
    var Knex = require('knex')(database);
    
    module.exports = [{
        path: '/users',
        method: 'GET',
        handler: (request, reply) => {
            const getOperation = Knex('users').select('name').then((results) => {
                if(!results || results.length === 0) {
                    reply({
                        error: true,
                        errMessage: 'No users'
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
    }];
})();
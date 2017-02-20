(function(){
    var config = require('../../settings/config');
    var Knex = require('knex')(config.database);
    var jwt = require('jsonwebtoken');
    
    module.exports = [{
        path: '/users',
        method: 'GET',
        handler: (request, reply) => {
            const getOperation = Knex('users').select('name').then((results) => {
                if(!results || results.length === 0) {
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
    },{
        path: '/auth',
        method: 'POST',
        handler: (request, reply) => {
            const { username, password } = request.payload;

            const getOperation = Knex('users').where({
                username
            }).select('guid', 'password').then(([user]) => {
                if(!user) {
                    reply({
                        error: true,
                        errMessage: 'the specified user was not found'
                    });
                    return;
                }
                if(user.password === password) {
                    const token = jwt.sign({
                        username,
                        scope: user.guid
                    }, config.jwt.key ,{
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
    }];
})();
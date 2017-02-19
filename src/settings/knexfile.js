(function(){
    'use strict';

    let development = {
        migrations: {
            directory: __dirname + '/../utils/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            tableName: '../utils/seeds'
        },
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '123001',
            database: 'manage_team',
            charset: 'utf8'
        }
    };
    module.exports = development;
})();
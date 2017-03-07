(function(){
    'use strict';

    let database = require(__dirname + '/src/settings/config').database;
    let development = {
        migrations: {
            directory: __dirname + '/utils/migrations/',
            tableName: 'migrations'
        },
        seeds: {
            directory: __dirname + '/utils/seeds/',
            tableName: '/utils/seeds/'
        },
        client: database.client,
        connection: database.connection
    };

    module.exports = development;
}());
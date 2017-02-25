(function(){
    'use strict';

    let database = require('./config').database;
    let development = {
        migrations: {
            directory: __dirname + '/../utils/migrations/',
            tableName: 'migrations'
        },
        seeds: {
            directory: __dirname + '/../utils/seeds/',
            tableName: '../utils/seeds/'
        },
        client: 'mysql',
        connection: database.connection
    };
    module.exports = development;
})();
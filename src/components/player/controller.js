(function () {
    'use strict';

    module.exports.get = get;
    module.exports.post = post;
    const config = require('../../settings/config');
    const Knex = require('knex')(config.database);
    const GUID = require('node-uuid');

    function post(request, reply) {
        const {player} = request.payload;
        const guid = GUID.v4();

        const insertOperations = Knex('players').insert({
                name: player.name,
                last_name: player.last_name,
                position: player.position,
                number: player.number,
                goals: player.goals,
                birth: player.birth
        }).then((res) => {
            reply({
                message: 'Successfully created player'
            });
        }).catch((err) => {
            reply('server-side error');
        });
    }

    function get(request, reply) {
        const getOperation = Knex('players').select('name','last_name','position','goals','birth').then((results) => {
            if (!results || results.length === 0) {
                reply({
                    error: true,
                    errMessage: 'Players not found'
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
})();
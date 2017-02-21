(function () {
    'use strict';

    module.exports.post = post;
    module.exports.get = get;
    module.exports.put = put;
    module.exports.del = del;
    const config = require('../../settings/config');
    const Knex = require('knex')(config.database);
    const GUID = require('node-uuid');

    function post(request, reply) {
        const {
            player
        } = request.payload;
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
        const getOperation = Knex('players').select('name', 'last_name', 'position', 'goals', 'birth').then((results) => {
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

    function put(request, reply) {
        const {
            id
        } = request.params;
        const {
            player
        } = request.payload;

        const insertOperation = Knex('players').where({
            id: id
        }).update({
            name: player.name,
            last_name: player.last_name,
            position: player.position,
            number: player.number,
            goals: player.goals,
            birth: player.birth
        }).then((res) => {
            reply({
                message: 'Successfully updated player'
            });
        }).catch((err) => {
            reply('server-side error');
        });
    }

    function del(request, reply) {
        const {
            id
        } = request.params;

        const removeOperation = Knex('players').where({
            id: id
        }).del().then((res) => {
            reply({
                message: 'Successfully deleted player'
            });
        }).catch((err) => {
            reply('server-side error');
        });
    }
})();
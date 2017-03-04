(function () {
    'use strict';

    const config = require('../../settings/config');
    const knex = require('knex')(config.database);

    function post(request, reply) {
        const { player } = request.payload;

        const insertOperations = knex('players').insert({
            name: player.name,
            lastName: player.last_name,
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
        const getOperation = knex('players').select('name', 'last_name', 'position', 'goals', 'birth').then((results) => {
            if (!results || results.length === 0) {
                reply({
                    error: true,
                    errMessage: 'Players not found'
                });
            }

            reply({
                dataCount: results.length,
                data: results
            });
        }).catch((err) => {
            reply('server-side error');
        });
    }

    function getOne(request, reply) {
        const {id} = request.params;
        const getOperation = knex('players').first('name', 'last_name', 'position', 'goals', 'birth').where({id}).then((results) => {
            if (!results || results.length === 0) {
                reply({
                    error: true,
                    errMessage: 'Player not found'
                });
                return;
            }

            reply({
                data: results
            });
        }).catch((err) => {
            reply('server-side error');
        });
    }

    function put(request, reply) {
        const { id } = request.params;
        const { player } = request.payload;

        const insertOperation = knex('players').where({
            id
        }).update({
            name: player.name,
            lastName: player.last_name,
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
        const { id } = request.params;

        const removeOperation = knex('players').where({
            id
        }).del().then((res) => {
            reply({
                message: 'Successfully deleted player'
            });
        }).catch((err) => {
            reply('server-side error');
        });
    }

    module.exports.post = post;
    module.exports.get = get;
    module.exports.put = put;
    module.exports.del = del;
    module.exports.getOne = getOne;
    
}());
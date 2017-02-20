const bcrypt = require('bcryptjs');
const salt = require('../../settings/config').salt;

exports.seed = function (knex, Promise) {
	// Deletes ALL existing entries
	return knex('users').del()
		.then(function () {
			// Inserts seed entries
			return knex('users').insert([{
				name: 'User One',
				username: 'userone',
				password: bcrypt.hashSync('123456', salt),
				email: 'userone@example.com',
				admin: true
			}]);
		});
};
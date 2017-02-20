var bcrypt = require('bcryptjs');
var salt = require('../../settings/config').salt;

exports.seed = function (knex, Promise) {
	// Deletes ALL existing entries
	return knex('users').del()
		.then(function () {
			// Inserts seed entries
			return knex('users').insert([
				{
					name: 'User One',
					username: 'userone',
					password: bcrypt.hashSync('123456', salt),
					email: 'userone@example.com',
					guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c'
				},
				{
					name: 'User Two',
					username: 'usertwo',
					password: bcrypt.hashSync('123456', salt),
					email: 'usertwo@example.com',
					guid: 'f93gdy7c-b051-5302-bdb5-400n3e62044t'
				}
			]);
		});
};
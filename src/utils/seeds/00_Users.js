exports.seed = function (knex, Promise) {
	// Deletes ALL existing entries
	return knex('users').del()
		.then(function () {
			// Inserts seed entries
			return knex('users').insert([
				{
					name: 'User One',
					username: 'userone',
					password: '123456',
					email: 'userone@example.com',
					guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c'
				},
				{
					name: 'User Two',
					username: 'usertwo',
					password: '123456',
					email: 'usertwo@example.com',
					guid: 'f93gdy7c-b051-5302-bdb5-400n3e62044t'
				}
			]);
		});
};

exports.up = function(knex, Promise) {

    return knex.schema.createTable('users', function(usersTable){
        // Primary Key
        usersTable.increments();

        // Data
        usersTable.string('name', 50).notNullable();
        usersTable.string('username', 50).notNullable().unique();
        usersTable.string('email', 50).notNullable().unique();
        usersTable.string('password', 128).notNullable();
        usersTable.string('guid', 50).notNullable().unique();
        usersTable.timestamp('created_at').notNullable();

    });

};

exports.down = function(knex, Promise) {
    
    return knex.schema.dropTableIfExists('users');

};

exports.up = function (knex, Promise) {

    return knex.schema.createTable('players', function (playersTable) {
        //Primary key
        playersTable.increments();

        //Data
        playersTable.string('name', 50).notNullable();
        playersTable.string('lastName', 50).notNullable();
        playersTable.string('position', 20).notNullable();
        playersTable.integer('number').notNullable();
        playersTable.integer('goals').notNullable();
        playersTable.string('birth', 50).notNullable();
    });
};

exports.down = function (knex, Promise) {

    return knex.schema.dropTableIfExists('players');

};
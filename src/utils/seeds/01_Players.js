exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('players').del()
        .then(function () {
            // Inserts seed entries
            return knex('players').insert([{
                name: 'Daniel',
                last_name: 'Pavone',
                position: 'Meio Campo',
                number: 10,
                goals: 3,
                birth: '01/12/1990'
            },{
                name: 'Pedro',
                last_name: 'Litwak',
                position: 'Atacante',
                number: 11,
                goals: 10,
                birth: '28/08/1989'
            },{
                name: 'Thales',
                last_name: 'Varella',
                position: 'Defesa',
                number: 69,
                goals: 0,
                birth: '15/08/1991'
            }]);
        });
};
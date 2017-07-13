
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('testers').del()
    .then(function () {
      // Inserts seed entries
      return knex('testers').insert([
        {id: 1, name: '', address:''}
      ]);
    });
};

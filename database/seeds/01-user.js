
exports.seed = function(knex, Promise) {
  return knex('users').insert([   
    { username: 'testing seed username1', password: "testing seed1" },
    { username: 'testing seed username2', password: "testing seed2" },
    { username: 'testing seed username3', password: "testing seed3" },
    { username: 'testing seed username4', password: "testing seed4" },
    { username: 'testing seed username5', password: "testing seed5" },
    { username: 'testing seed username6', password: "testing seed4" },
    { username: 'testing seed username7', password: "testing seed5" },
  ]);
};

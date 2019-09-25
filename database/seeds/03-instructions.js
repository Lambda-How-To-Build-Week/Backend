
exports.seed = function(knex, Promise) {
  return knex('instructions').insert([   
    { instruction_name: 'testing seed instruction name', intstruction: "testing intstruction", user_instruction_id: 1 },
    { instruction_name: 'testing seed instruction name2', intstruction: "testing intstruction2", user_instruction_id: 1 },
    { instruction_name: 'testing seed instruction name3', intstruction: "testing intstruction3", user_instruction_id: 2 },
  ]);
};

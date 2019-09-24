exports.seed = function(knex, Promise) {
  return knex('posts').insert([   
    { title: 'testing seed title', tag: "testing tag", user_post_id: 1 },
    { title: 'testing seed title2', tag: "testing tag2", user_post_id: 1 },
    { title: 'testing seed title3', tag: "testing tag3", user_post_id: 2 }
  ]);
};

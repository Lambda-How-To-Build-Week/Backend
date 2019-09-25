
exports.seed = function(knex, Promise) {
  return knex('comments').insert([   
    { comment: 'testing seed comment', user_post_id: 1, user_post_comment_id: 1 },
    { comment: 'testing seed comment2', user_post_id: 1, user_post_comment_id: 1 },
    { comment: 'testing seed comment2', user_post_id: 2, user_post_comment_id: 2 },
  ]);
};

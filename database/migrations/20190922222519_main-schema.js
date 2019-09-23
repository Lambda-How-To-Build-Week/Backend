
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
    
        users
          .string('username', 255)
          .notNullable()
          .unique();
        users.string('password', 255).notNullable();
      })
    .createTable('posts', posts => {
        tbl.increments();

        posts

    })
    .createTable('steps', steps => {
        tbl.increments();
        
        steps
            
    })
    .createTable('comments', comments => {
        tbl.increments();

        comments
            
    })

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('comments')
        .dropTableIfExists('steps')
        .dropTableIfExists('posts')
        .dropTableIfExists('users')
};

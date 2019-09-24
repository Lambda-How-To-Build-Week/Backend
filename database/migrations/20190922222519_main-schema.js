
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
    
        users
          .string('username', 60)
          .notNullable()
          .unique();
        users
          .string('password', 60).notNullable();
      })
    .createTable('posts', posts => {
        posts.increments();

        posts
          .string('title', 255)
          .notNullable()
        posts
          .string('tag', 60)
        posts.integer('user_post_id') 
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
    })
    .createTable('instructions', instructions => {
        instructions.increments();

        instructions
          .string('instruction_name', 128).notNullable().unique()
        instructions
          .string('intstruction', 128).notNullable().unique();
        instructions.integer('user_instruction_id') 
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('posts')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
    })
    .createTable('comments', comments => {
        comments.increments();

        comments
          .string('comment', 128).notNullable(); 
        comments.integer('user_post_comment_id') 
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        comments.integer('user_post_id') 
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('posts')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('comments')
        .dropTableIfExists('instructions')
        .dropTableIfExists('posts')
        .dropTableIfExists('users')
};

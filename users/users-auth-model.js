const db = require('../database/dbConfig.js');

module.exports = {
  findAll,
  add,
  find,
  findBy,
  findById,
  findPostById,
  remove,
  findPosts,
  addPost,
  findInstructions,
};

function findAll() {
  return db('users');
}

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
    return db('users')
      .where({ id })
      .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}


function remove(id) {
  return db('users').where({ id }).del()
}

function findPostById(id) {
  return db('posts')
    .where({ id })
    .first();
}

function findPosts(user_post_id) {
  return db('users as u')
  .join('posts as p', 'u.id', 'p.user_post_id')
  .select('p.title', 'p.tag', 'p.id')
  .orderBy('p.id')
  .where({ user_post_id })
}

function findInstructions(user_instruction_id) {
  return db('users as u')
  .join('instructions as in', 'u.id', 'in.user_instruction_id')
  .select('in.id','in.instruction_name', 'in.intstruction')
  .orderBy('in.id')
  .where({ user_instruction_id })
}

function addPost(post) {
  return db('posts').insert(post)
  .then(ids => {
      return findById(ids[0]);
  })
}
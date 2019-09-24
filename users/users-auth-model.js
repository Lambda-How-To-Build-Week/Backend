const db = require('../database/dbConfig.js');

module.exports = {
  findAll,
  add,
  find,
  findBy,
  findById,
  remove,
  findPosts,
  addPost,
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

function findPosts(user_post_id) {
  return db('users as u')
  .join('posts as p', 'u.id', 'p.user_post_id')
  .select('u.id','p.title', 'p.tag', 'p.id')
  .orderBy('p.id')
  .where({ user_post_id })
}

function addPost(post) {
  return db('posts').insert(post)
  .then(ids => {
      return findById(ids[0]);
  })
}
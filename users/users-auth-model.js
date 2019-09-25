const db = require('../database/dbConfig.js');

module.exports = {
  findAllUsers,
  findAllPosts,
  add,
  find,
  findBy,
  findById,
  findPostById,
  removeUser,
  removePost,
  removeInstruction,
  findPosts,
  addPost,
  findInstructions,
  findInstructionById,
  findCommentById,
  addInstruction,
  findComments,
  addComment
};

function findAllUsers() {
  return db('users');
}

function findAllPosts() {
  return db('posts');
}

function removeUser(id) {
  return db('users').where({ id }).del()
}

function removePost(id) {
  return db('posts').where({ id }).del()
}

function removeInstruction(id) {
  return db('instruction').where({ id }).del()
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

function findPostById(id) {
  return db('posts')
    .where({ id })
    .first();
}

function findInstructionById(id) {
  return db('instructions')
    .where({ id })
    .first();
}

function findCommentById(id) {
  return db('comments')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
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

function findComments(user_post_id) {
  return db('users as u')
  .join('comments as c', 'u.id', 'c.user_post_id')
  .select('c.id','c.comment')
  .orderBy('c.id')
  .where({ user_post_id })
}

function addPost(post) {
  return db('posts').insert(post)
  .then(ids => {
      return findById(ids[0]);
  })
}

function addInstruction(instruction) {
  return db('instructions').insert(instruction)
  .then(ids => {
      return findInstructionById(ids[0]);
  })
}

function addComment(comment) {
  return db('comments').insert(comment)
  .then(ids => {
      return findCommentById(ids[0]);
  })
}


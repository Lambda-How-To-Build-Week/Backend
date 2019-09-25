const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()

const authRouter = require('../users/users-auth-router.js');
const postRouter = require('../posts/posts-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', authRouter);
server.use('/api/auth', postRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});
  
module.exports = server;

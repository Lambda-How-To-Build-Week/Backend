const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/auth-middleware.js');
const authRouter = require('../users/users-auth-router.js');
// const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', authRouter);
// server.use('/api/authenticated', authenticate, usersRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});
  
module.exports = server;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//for importing routes

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//for using route

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});
  
module.exports = server;

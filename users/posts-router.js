const router = require('express').Router();

const Users = require('./users-auth-model.js');
const restricted = require('../auth/auth-middleware.js');

router.get('/allusers', restricted, (req, res) => {
  Users.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

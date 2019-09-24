const router = require('express').Router();

const Users = require('../users/users-auth-model.js');
const restricted = require('../auth/auth-middleware.js');

router.get('/allusers', restricted, (req, res) => {
  Users.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Users.findById(id)
  .then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});

router.delete('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Users.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find User with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete User' });
  });
});
module.exports = router;

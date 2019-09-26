const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-auth-model');
const secret = process.env.JWT_SECRET

module.exports = (req, res, next) => {
  // const { username, password, jwt } = req.headers;
  console.log(secret);
  
  const token = req.headers.authorization
  console.log(token)
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401)
      } else {
        req.decodedToken = decodedToken
        next();
      }
    })
  }
  else {
    res.status(401)
  }
  
  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
};

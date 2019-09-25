const router = require('express').Router();

const Users = require('../users/users-auth-model.js');
const restricted = require('../auth/auth-middleware.js');
//restricted, 

router.get('/allusers', (req, res) => {
  Users.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/:id',(req, res) => {
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


router.delete('/:id',(req, res) => {
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

router.get('/:user_id/posts', (req, res) => {
  const { user_id } = req.params;
  
  Users.findPosts(user_id)
  .then(posts => {
    if (posts) {
      res.json(posts);
    } else {
      res.status(404).json({ message: 'Could not find posts for given user' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get posts' });
  });
});


router.get('/:user_id/posts/:post_id', (req, res) => {
  const { user_id } = req.params;
  const { post_id } = req.params;

  Users.findPosts(user_id)
  .then(posts => {
    if (posts) {
      Users.findPostById(post_id)
      .then(post => {
        if (post) {
          res.json(post);
        } else {
          res.status(404).json({ message: 'Could not find posts for given user' })
        }
      })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get posts' });
  });
});


// router.get('/:user_id/posts/:post_id/instructions', (req, res) => {
//   const { user_id } = req.params;
//   const { post_id } = req.params;

//   Users.findPosts(user_id)
//   .then(posts => {
//     if (posts) {
//       Users.findPostById(post_id)
//       .then(post => {
//         if (post) {
//           Users.findInstructions(user_post_id)
//             .then(instructions => {
//                 if(instructions) {
//                   res.json(instructions);
//                 } else {
//                   res.status(404).json({ message: 'Could not find posts for given user' })
//                 }
//             })
//         }
//       })
//     }
//   })
//   .catch(err => {
//     res.status(500).json({ message: 'Failed to get posts' });
//   });
// });


router.post('/:id/posts', (req, res) => {
  const postData = req.body;
  const { id } = req.params; 

  Users.findById(id)
  .then(user => {
    if (user) {
      Users.addPost(postData, id)
      .then(post => {
        res.status(201).json(post);
      })
    } else {
      res.status(404).json({ message: 'Could not find post with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new post' });
  });
});



module.exports = router;

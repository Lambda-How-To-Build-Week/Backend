const router = require('express').Router();

const Users = require('../users/users-auth-model.js');
const restricted = require('../auth/auth-middleware.js');

router.get('/allusers', restricted, (req, res) => {
  console.log(req.decodedToken.sub);
  
  Users.findAllUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/posts', restricted, (req, res) => {
  Users.findAllPosts()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/:id',restricted,(req, res) => {
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


router.delete('/:id',restricted,(req, res) => {
  const user_id  = req.decodedToken.sub; 

  Users.removeUser(id)
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

router.get('/:user_id/posts', restricted, (req, res) => {
  const user_id = req.decodedToken.sub;

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


router.get('/:user_id/posts/:post_id/instructions', restricted, (req, res) => {
  const user_id  = req.decodedToken.sub; 
  const { post_id } = req.params;

  Users.findPosts(user_id)
  .then(posts => {
    if (posts) {
      Users.findPostById(post_id)
      .then(post => {
          Users.findInstructions(post_id)
            .then(instructions => {
              if (instructions) {
                res.json(instructions);
              } else {
                res.status(404).json({ message: 'Could not find posts for given post' })
              }
            })
      })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get posts' });
  });
});

router.get('/:user_id/posts/:post_id/instructions/:instruction_id', restricted, (req, res) => {
  const user_id  = req.decodedToken.sub; 
  const { post_id } = req.params;
  const { instruction_id } = req.params;

  Users.findPosts(user_id)
  .then(posts => {
    if (posts) {
      Users.findPostById(post_id)
      .then(post => {
          Users.findInstructions(post_id)
            .then(instructions => {
              Users.findInstructionById(instruction_id)
                .then(instruction => {
                  if (instruction) {
                    res.json(instruction);
                  } else {
                    res.status(404).json({ message: 'Could not find instruction for given id' })
                  }
                })
            })
      })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get posts' });
  });
});

router.delete('/:user_id/posts/:post_id/instructions/:instruction_id', restricted, (req, res) => {
  const user_id  = req.decodedToken.sub; 
  const { post_id } = req.params;
  const { instruction_id } = req.params;

  Users.findPosts(user_id)
  .then(posts => {
    if (posts) {
      Users.findPostById(post_id)
      .then(post => {
          Users.findInstructions(post_id)
            .then(instructions => {
              Users.findInstructionById(instruction_id)
                .then(instruction => {
                  Users.removeInstruction(instruction_id)
                  .then(deleted => {
                    if (deleted) {
                      res.json({ removed: deleted });
                    } else {
                      res.status(404).json({ message: 'Could not find posts for given user' })
                    }
                  })
                })
            })
      })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get instruction' });
  });
});

router.get('/:user_id/posts/:post_id/comments', restricted,(req, res) => {
  const user_id  = req.decodedToken.sub; 
  const { post_id } = req.params;

  Users.findPosts(user_id)
  .then(posts => {
    if (posts) {
      Users.findPostById(post_id)
      .then(post => {
          Users.findComments(post_id)
            .then(comments => {
              if (comments) {
                res.json(comments);
              } else {
                res.status(404).json({ message: 'Could not find comments for given post' })
              }
            })
      })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get posts' });
  });
});

router.get('/:user_id/posts/:post_id', restricted, (req, res) => {
  const { post_id } = req.params;
  const user_id  = req.decodedToken.sub; 

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

router.put('/:user_id/posts/:post_id', restricted,(req, res) => {
  const user_id  = req.decodedToken.sub; 
  const { post_id } = req.params;
  const changes = req.body;

  Users.findPosts(user_id)
  .then(posts => {
    if (posts) {
      Users.findPostById(post_id)
      .then(post => {
        if (post) {
          Users.updatePost(post_id, changes)
            .then(post => {
              if (post) {
                res.json({ updated: post });
              } else {
                res.status(404).json({ message: 'Could not find posts for given user' })
              }
            })
        }
      })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get posts' });
  });
});



router.post('/posts', restricted, (req, res) => {
  const postData = req.body;
  const id  = req.decodedToken.sub; 

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



router.post('/:user_id/posts/:post_id/comments', restricted, (req, res) => {
  const  commentData  = req.body;
  const user_id  = req.decodedToken.sub; 
  const { post_id } = req.params;

  Users.findPosts(user_id)
  .then(posts => {
    if (posts) {
      Users.findPostById(post_id)
      .then(post => {
          Users.addComment(commentData,post_id)
            .then(comment => {
              res.status(201).json(post);
            })  
      })
    } else {
      res.status(404).json({ message: 'Could not find post with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to post comment' });
  });
});


router.post('/:user_id/posts/:post_id/instructions', restricted, (req, res) => {
  const instructionData  = req.body;
  const user_id  = req.decodedToken.sub; 
  const { post_id } = req.params;

  Users.findPosts(user_id)
  .then(posts => {
    if (posts) {
      Users.findPostById(post_id)
      .then(post => {
          Users.addInstruction(instructionData,post_id)
            .then(instruction => {
              res.status(201).json(post);
            })  
      })
    } else {
      res.status(404).json({ message: 'Could not find post with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to post instruction' });
  });
}); 

router.put('/:user_id/posts/:post_id/instructions/:instruction_id', restricted, (req, res) => {
  const user_id  = req.decodedToken.sub; 
  const { post_id } = req.params;
  const { instruction_id } = req.params;
  const changes = req.body;

  Users.findPosts(user_id)
  .then(posts => {
    if (posts) {
      Users.findPostById(post_id)
      .then(post => {
          Users.findInstructions(post_id)
            .then(instructions => {
              Users.findInstructionById(instruction_id)
                .then(instruction => {
                  Users.updateInstruction(instruction_id, changes)
                  .then(changed => {
                    if (changed) {
                      res.json({ changed: changed });
                    } else {
                      res.status(404).json({ message: 'Could not find posts for given user' })
                    }
                  })
                })
            })
      })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get instruction' });
  });
});



module.exports = router;

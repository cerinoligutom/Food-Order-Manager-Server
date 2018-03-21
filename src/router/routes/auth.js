import express from 'express';
import passport from 'passport';
import { generateHash } from '../../utils/password';

export default (pgPool) => {
  const router = express.Router();

  router.post('/login', passport.authenticate('custom'));

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  router.post('/signup', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let middleName = req.body.middleName;
    let lastName = req.body.lastName;

    pgPool.User.findOne({
      where: {
        [pgPool.op.or]: [{ username: username }, { email: email }]
      }
    }).then(async user => {
      if (user) {
        res.status(409).send('User/Email already exists');
      }

      let hash = await generateHash(password);

      let createdUser = await pgPool.User.create({
        username: username,
        email: email,
        hash: hash,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName
      });

      res.send(createdUser.id);
    }).catch(err => {
      res.status(409).send(err.message);
    });
  });

  router.get('/isAuthenticated', (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).send(req.user.id);
    } else {
      res.status(401).send('Not authenticated');
    }
  });

  return router;
};

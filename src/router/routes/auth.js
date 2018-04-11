import express from 'express';
import { generateHash, compareHash } from '../../utils/password';
import moment from 'moment';
import jwt from '../../utils/jwt';
let shortid = require('shortid');

export default (pgPool) => {
  const router = express.Router();

  router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let user = await pgPool.User.findOne({
      where: {
        [pgPool.op.or]: [
          { username: username },
          { email: username }
        ]
      }
    });

    if (!user) {
      res.status(409).send({ message: 'Bad username or password' });
    }

    let isCorrectPassword = await compareHash(password, user.hash);

    if (isCorrectPassword) {
      await user.updateAttributes({
        last_active: moment()
      });

      let payload = { userId: user.id };

      let token = jwt.sign(payload, process.env.JWT_SECRET);

      res.send({
        message: 'ok',
        token: token
      });
    } else {
      res.status(409).send({ message: 'Bad password' });
    }
  });

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

      return pgPool.User.create({
        id: shortid.generate(),
        username: username,
        email: email,
        hash: hash,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName
      }).then(createdUser => res.send(createdUser.id))
        .catch(err => res.status(409).send(err.message));

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

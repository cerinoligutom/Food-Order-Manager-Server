const CustomStrategy = require('passport-custom').Strategy;
import { compareHash } from '../../../utils/password';
import moment from 'moment';

export default (passport, pgPool) => {
  passport.use('custom', new CustomStrategy(
    async (req, done) => {
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
        return done(null, false, { message: 'Bad username or password' });
      }

      let isCorrectPassword = await compareHash(password, user.hash);

      if (isCorrectPassword) {
        await user.updateAttributes({
          last_active: moment()
        });

        return done(null, { id: user.id }, null);
      } else {
        return done(null, false, { message: 'Bad password' });
      }
    }
  ));
};

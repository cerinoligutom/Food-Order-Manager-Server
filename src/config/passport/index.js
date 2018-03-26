import passport from 'passport';
import setJwtStrategy from './jwt-strategy';

export default (app, pgPool) => {
  setJwtStrategy(passport, pgPool);

  app.use(passport.initialize());
};

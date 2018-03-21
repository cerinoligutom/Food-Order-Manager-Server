import passport from 'passport';
import session from 'express-session';
import uuidv4 from 'uuid/v4';
import setCustomStrategy from './custom-strategy';

export default (app, pgPool) => {
  let expiryDuration = 60 * 60 * 24 * 7; // 1 week

  let sessionConfig = {
    genid: () => uuidv4(),

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    secure: process.env.NODE_ENV === 'production',
    domain: '.zeferinix.com',
    maxAge: expiryDuration,
    expires: new Date(Date.now() + expiryDuration),
    httpOnly: false,
    cookie: {
      expires: false,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false
    }
  };

  if (process.env.NODE_ENV === 'production') {
    sessionConfig.cookie.secure = true;
  }

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await pgPool.User.findOne({ where: { id: id } });

    let userRoles = await pgPool.UserRole.findAll({ where: { user_id: id }});

    user = user.dataValues;

    userRoles.forEach(role => {
      if (role.name === 'Admin') {
        user.isAdmin = true;
      }
    });

    if (!user.isAdmin) user.isAdmin = false;

    done(null, user);
  });

  setCustomStrategy(passport, pgPool);

  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());
};

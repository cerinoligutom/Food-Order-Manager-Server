import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';

export default (passport, pgPool) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    pgPool.User.findOne({
      where: { id: jwt_payload.userId }
    }).then(async user => {
      if (user) {
        user = user.dataValues;
        let userRoles = await pgPool.UserRole.findAll({ where: { user_id: user.id }});

        userRoles.forEach(role => {
          if (role.name === 'Admin') {
            user.isAdmin = true;
          }
        });
        if (!user.isAdmin) user.isAdmin = false;

        done(null, user);
      } else {
        done(null, false);
      }
    }, err => {
      return done(err, false);
    });
  }));
};

export const isAuthenticated = async (req, res, next) => {
  if(req.isAuthenticated()) {
    // Can do more stuffs here
    return next();
  }

  res.status(401).send('Not authenticated');
};

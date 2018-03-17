import auth from './routes/auth';

export default (app, pgPool) => {
  app.use('/auth', auth(pgPool));
};

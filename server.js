const express = require('express');
const next = require('next');
const jwt = require('express-jwt');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
const user = require('./user');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();


app.prepare().then(() => {

  const server = express();
  const secret = 'wd65InkKwGl5RfzRMjQB9H34Kk9sd6Sa';

  server.use(bodyParser.json())
  server.use(cookieParser());
  server.set('x-powered-by', false);
  server.set('trust proxy', true);

  server.get('/', (req, res) => {
    return app.render(req, res, '/');
  });

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login');
  });

  server.get('/logout', (req, res) => {
    res.clearCookie('token', {
      domain: req.hostname,
      path: '/'
    });
    res.end();
  });

  server.get('/board', (req, res) => {
    return app.render(req, res, '/board');
  });

  server.get('/sp', (req, res) => {
    return app.render(req, res, '/sp');
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.post('/auth', (req, res) => {
    const profile = user.getProfileByLogin(req.body.username);
    if (profile) {
      const token = jsonwebtoken.sign(JSON.stringify(profile), secret);
      // set cookie and return the result
      return res
        .cookie('token', token, {
          domain: req.hostname,
          secure: !dev,
          path: '/',
          httpOnly: true,
          maxAge: 3600 * 2000, // two hours from now
          encode: String
        })
        .json(token);
    }
    return res.status(401).send('ERROR_SERVER_INVALID_CREDENTIAL');
  });

  // endpoints for sso 

  // listen and kickstart the server

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> server is ready on localhost:${port}`);
  });

});
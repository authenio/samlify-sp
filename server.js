const express = require('express');
const next = require('next');
const jwt = require('express-jwt');
const bodyParser = require('body-parser')
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

  server.use(jwt({
    secret,
    exp: Math.floor(Date.now() / 1000) + (60*60*6),
    issuer: 'http://passify.io' 
  }).unless({ 
    path: ['/', /_next\/*/, '/auth', '/login']
  }));

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.post('/auth', (req, res) => {
    const profile = user.getProfileByLogin(req.body.username);
    if (profile) {
      const token = jsonwebtoken.sign(JSON.stringify(profile), secret);
      return res.json({ token, profile });
    }
    return res.status(401).send('invalid email or password');
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> server is ready on localhost:${port}`);
  });

});
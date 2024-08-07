const jwt = require('jsonwebtoken')
const privateKey = require('./private_key')

module.exports = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, privateKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
}
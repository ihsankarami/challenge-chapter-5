const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send('token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, 'ini rahasia');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('invalid token');
  }
  return next();
};

module.exports = verifyToken;

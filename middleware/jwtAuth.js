const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
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

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No Token, invalid permission' });
  }

  try {
    const encryption = jwt.verify(token, process.env.JWT_SECRET);
    req.user = encryption.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no valid' });
  }
};

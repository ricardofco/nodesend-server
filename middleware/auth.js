const JWT = require('../services/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const credentials = JWT.varifyToken(token);
      req.user = credentials;
    } catch (error) {
      res.status(403).json({ error: { msg: error } });
      return error;
    }
  }
  return next();
};

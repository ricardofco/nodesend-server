const { validationResult } = require('express-validator');
const User = require('../models/User');
const { stringsError } = require('../constants');

const JWT = require('../services/jwt');

exports.setUserCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      error: {
        msg: stringsError.error422,
        details: validationErrors.array(),
      },
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ error: { msg: stringsError.badCredentials } });
    return next();
  }
  const token = JWT.createJWT(password, user);
  if (token) {
    res.status(200).json({ token, user: user.name });
  } else {
    res.status(401).json({ error: { msg: stringsError.badCredentials } });
    return next();
  }
  return 0;
};

exports.getUserAuthenticated = async (req, res) => {
  res.status(200).json({ msg: req.user });
};

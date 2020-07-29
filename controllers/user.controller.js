const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { stringsError, stringsSuccess } = require('../constants');

exports.addUser = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      error: {
        msg: stringsError.error422,
        details: validationErrors.array(),
      },
    });
  }
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: { msg: stringsError.userIsRegistered } });
  }
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  try {
    user.save();
    return res.json({ msg: stringsSuccess.userCreated });
  } catch (error) {
    return { error: { msg: error } };
  }
};

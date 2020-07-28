const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.addUser = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ error: validationErrors.array() });
  }
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'El usuario ya está registrado' });
  }
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  try {
    user.save();
    return res.json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.log(error);
    return { error };
  }
};

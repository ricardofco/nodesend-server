const User = require('../models/User');

exports.addUser = async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'El usuario ya está registrado' });
  }
  user = new User(req.body);
  user.save();

  return res.json({ msg: 'Usuario creado correctamente' });
};

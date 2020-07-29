const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class JWT {
  static createJWT(password, user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET,
        {
          expiresIn: '8h',
        },
      );
      return token;
    }
    return null;
  }
}

module.exports = JWT;

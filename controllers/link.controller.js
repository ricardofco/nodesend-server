const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Link = require('../models/Link');
const { stringsError } = require('../constants');

exports.addLink = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      error: {
        msg: stringsError.error422,
        details: validationErrors.array(),
      },
    });
  }

  const { originalName } = req.body;
  const link = new Link();
  link.url = shortid.generate();
  link.name = shortid.generate();
  link.originalName = originalName;

  if (req.user) {
    const { downloads, password } = req.body;
    if (downloads) {
      link.downloads = downloads;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }
    link.author = req.user.id;
  }

  try {
    await link.save();
    return res.status(200).json({ msg: `${link.url}` });
  } catch (error) {
    return res.status(500).json({ error: { msg: error } });
  }
};

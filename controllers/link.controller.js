const shortid = require('shortid');
const Link = require('../models/Link');

exports.addLink = async (req, res) => {
  const { originalName, password } = req.body;
  const link = new Link();
  link.url = shortid.generate();
  link.name = shortid.generate();
  link.originalName = originalName;
  link.password = password;

  try {
    await link.save();
    return res.status(200).json({ msg: `${link.url}` });
  } catch (error) {
    return res.status(500).json({ error: { msg: error } });
  }
};

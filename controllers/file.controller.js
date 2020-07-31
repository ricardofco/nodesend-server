const multer = require('multer');
const shortid = require('shortid');

const multerConf = {
  limits: { fileSize: 1000000 },
  storage: multer.diskStorage({
    destination: (req, res, callback) => {
      callback(null, `${__dirname}/../uploads`);
    },
    filename: (req, file, callback) => {
      const extension = file.mimetype.split('/')[1];
      callback(null, `${shortid.generate()}.${extension}`);
    },
  }),
};

const upload = multer(multerConf).single('file');

exports.uploadFile = (req, res, next) => {
  upload(req, res, async (error) => {
    if (!error) {
      return res.status(200).json({ msg: req.file.filename });
    }
    res.status(400).json({ error: { msg: error } });
    return next();
  });
};

exports.deleteFile = (req, res) => {};

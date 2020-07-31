const multer = require('multer');
const shortid = require('shortid');

exports.uploadFile = (req, res, next) => {
  const multerConf = {
    limits: { fileSize: req.user ? 1000000 * 100 : 1000000 },
    storage: multer.diskStorage({
      destination: (request, response, callback) => {
        callback(null, `${__dirname}/../uploads`);
      },
      filename: (request, file, callback) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
          file.originalname.length,
        );
        callback(null, `${shortid.generate()}${extension}`);
      },
    }),
  };

  const upload = multer(multerConf).single('file');
  upload(req, res, async (error) => {
    if (!error) {
      return res.status(200).json({ msg: req.file.filename });
    }
    res.status(400).json({ error: { msg: error } });
    return next();
  });
};

exports.deleteFile = (req, res) => {};

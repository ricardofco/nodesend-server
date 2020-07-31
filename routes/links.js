const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const linkController = require('../controllers/link.controller');
const fileController = require('../controllers/file.controller');

router.post(
  '/',
  [
    check('name', 'Sube un archivo').not().isEmpty(),
    check('originalName', 'Sube un archivo').not().isEmpty(),
  ],
  authMiddleware,
  linkController.addLink,
);

router.get('/:url', linkController.getLink, fileController.deleteFile);

module.exports = router;

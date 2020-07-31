const express = require('express');

const router = express.Router();
const fileController = require('../controllers/file.controller');

router.post('/', fileController.uploadFile);

router.delete('/:id', fileController.deleteFile);

module.exports = router;

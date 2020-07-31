const express = require('express');

const router = express.Router();
const fileController = require('../controllers/file.controller');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, fileController.uploadFile);

module.exports = router;

const express = require('express');
const usuarioController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', usuarioController.addUser);

module.exports = router;

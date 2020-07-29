const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/auth.controller');

router.post(
  '/',
  [
    check('email', 'El formato de correo no es valido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
  ],
  authController.setUserCredentials,
);

router.get('/', authController.getUserAuthenticated);

module.exports = router;

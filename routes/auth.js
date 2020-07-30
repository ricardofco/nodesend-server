const express = require('express');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post(
  '/',
  [
    check('email', 'El formato de correo no es valido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
  ],
  authController.setUserCredentials,
);

router.get('/', authMiddleware, authController.getUserAuthenticated);

module.exports = router;

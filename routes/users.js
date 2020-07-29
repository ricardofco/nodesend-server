const express = require('express');
const { check } = require('express-validator');
const usuarioController = require('../controllers/user.controller');

const router = express.Router();

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El formato de correo no es valido').isEmail(),
    check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({ min: 6 }),
  ],
  usuarioController.addUser,
);

module.exports = router;

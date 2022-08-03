/**
 * Rutas de usuarios:
 * host + /api/auth
 */

const express = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = express.Router();

router.post(
  "/new",
  [
    // validaciones a través de middleware (express-validator)
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Email incorrecto").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "Email incorrecto").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;

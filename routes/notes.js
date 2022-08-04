/**
 * Eventos: deben estar previamente validados
 *
 */

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getNotes,
  getArchivedNotes,
  getOneNote,
  crearNote,
  actualizarNote,
  eliminarNote,
  getCategories,
} = require("../controllers/notes");
const isDate = require("../helpers/isDate");

// Validar token previamente
router.use(validarJWT);

// Rutas

router.get("/", getNotes);

router.get("/archive", getArchivedNotes);

router.get("/categories", getCategories);

router.get("/:id", getOneNote);

router.post(
  "/",
  [
    // validaciones a través de middleware (express-validator)
    check("title", "Title is mandatory").not().isEmpty(),
    check("content", "Content is mandatory").not().isEmpty(),
    check("categories", "Categories are mandatory").not().isEmpty(),
    validarCampos,
  ],
  crearNote
);

router.put("/:id", actualizarNote);

router.delete("/:id", eliminarNote);

module.exports = router;

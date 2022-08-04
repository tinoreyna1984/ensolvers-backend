const { response } = require("express");
const Categoria = require("../models/Categoria");
const Note = require("../models/Note");

const getNotes = async (req, res = response) => {
  let notes = await Note.find().populate("user", "name");

  notes = notes.filter((note) => note.archived === false);

  res.status(200).json({
    ok: true,
    notes,
  });
};

const getArchivedNotes = async (req, res = response) => {
  let notes = await Note.find().populate("user", "name");

  notes = notes.filter((note) => note.archived === true);

  res.status(200).json({
    ok: true,
    notes,
  });
};

const getCategories = async (req, res = response) => {
  const categories = await Categoria.find();

  res.status(200).json({
    ok: true,
    categories,
  });
};

const getOneNote = async (req, res = response) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findById(noteId);
    const uid = req.uid;

    if (!note) {
      return res.status(404).json({
        ok: false,
        msg: "Error 404 - Note with ID: " + noteId + " not found",
      });
    }

    if (note.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Error 401 - Unauthorized",
      });
    }

    res.status(200).json({
      ok: true,
      note,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: "Internal Error (500). Please contact the administrator",
    });
  }
};

const crearNote = async (req, res = response) => {
  const note = new Note(req.body);

  try {
    note.user = req.uid;

    note.categories.forEach(async (category) => {
      const categoria = await Categoria.findOne({nombre: category});
      if(!categoria){
        const nuevaCategoria = new Categoria({nombre: category});
        await nuevaCategoria.save();
      }
    });

    const noteSaved = await note.save();

    res.status(200).json({
      ok: true,
      note: noteSaved,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: "Internal Error (500). Please contact the administrator",
    });
  }
};

const actualizarNote = async (req, res = response) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findById(noteId);
    const uid = req.uid;

    console.log(req.body.categories);

    if (!note) {
      return res.status(404).json({
        ok: false,
        msg: "Error 404 - Note with ID: " + noteId + " not found",
      });
    }

    if (note.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Error 401 - Unauthorized",
      });
    }

    req.body.categories.forEach(async (category) => {
      const categoria = await Categoria.findOne({nombre: category});
      if(!categoria){
        const nuevaCategoria = new Categoria({nombre: category});
        await nuevaCategoria.save();
      }
    });

    const nuevoNote = {
      ...req.body,
      user: uid,
    };

    const noteActualizado = await Note.findByIdAndUpdate(noteId, nuevoNote, {new: true,});

    res.status(200).json({
      ok: true,
      note: noteActualizado,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: "Internal Error (500). Please contact the administrator",
    });
  }
};

const eliminarNote = async (req, res = response) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findById(noteId);
    const uid = req.uid;

    if (!note) {
      return res.status(404).json({
        ok: false,
        msg: "Error 404 - Note with ID: " + noteId + " not found",
      });
    }

    if (note.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Error 401 - Unauthorized",
      });
    }

    await Note.findByIdAndDelete(noteId);

    res.status(200).json({
      ok: true,
      msg: "Row deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: "Internal Error (500). Please contact the administrator",
    });
  }
};

module.exports = {
  getNotes,
  getArchivedNotes,
  getCategories,
  getOneNote,
  crearNote,
  actualizarNote,
  eliminarNote,
};

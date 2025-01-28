const express = require("express");
const notesController = require("../controllers/notesController");
const validateToken = require("../Middleware/tokenHandler");
const notesRouter = express.Router();

notesRouter.route("/").get(validateToken, notesController.getAllNotes).post(validateToken, notesController.addNewNote);
notesRouter.route("/:id").put(validateToken, notesController.updateNote).delete(validateToken, notesController.deleteNote);

module.exports = notesRouter;
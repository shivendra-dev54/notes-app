const asyncHandler = require("express-async-handler");
const Note = require("../Models/noteSchema");

// @desc Get all notes
// @route GET /api/notes/
// @access private
const getAllNotes = asyncHandler(async (_req, res) => {
    const note = await Note.find({user_id: _req.user.email});
    res.status(200).json(note);
});

// @desc add new note
// @route POST /api/notes/
// @access private
const addNewNote = asyncHandler(async (_req, res) => {
    console.log(_req.body);
    const { title, body } = _req.body;
    if(!title || !body){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const note = await Note.create({
        user_id: _req.user.email,
        title,
        body
    });
    console.log(_req.user, "this is the user");
    res.status(201).json(note);
});

// @desc update a note
// @route PUT /api/notes/:id
// @access private
const updateNote = asyncHandler(async (_req, res) => {
    const id = _req.id;
    const note = await Note.findOne({id});
    if(!note){
        res.status(400).json({"Error": "Note not Found"});
        throw new Error("Unable to update note which is not present in the database");
    }
    const updatedNote = await Note.findByIdAndUpdate(
        id,
        {
            user_id: _req.user.id,
            title: _req.body.title,
            body: _req.body.body
        },
        {new: true}
    );

    res.status(200).json(updatedNote);
});

// @desc delete a note
// @route DELETE /api/notes/:id
// @access private
const deleteNote = asyncHandler(async (_req, res) => {
    const note = await Note.findOne({id: _req.id});
    if(!note){
        res.status(400).json({"error": "Note not available in the database"});
        throw new Error("Note Not Found");
    }

    await note.deleteOne({ id: _req.id });
    res.status(200).json(note);
});

module.exports = {
    getAllNotes,
    addNewNote,
    updateNote,
    deleteNote
};
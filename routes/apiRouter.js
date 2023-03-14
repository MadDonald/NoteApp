// Import required modules
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const NoteService = require('../db/NoteService');

// Create a new NoteService instance
const noteService = new NoteService();

// Route to get all notes
router.get('/notes', async function (req, res) {
  const notes = await noteService.getAllNotes();
  return res.json(notes);
});

// Route to add a new note
router.post('/notes', async function (req, res) {
  const { title, text } = req.body;
  const newNote = { id: uuidv4(), title, text };
  await noteService.addNewNote(newNote);
  return res.send(newNote);
});

// Route to delete a note by ID
router.delete('/notes/:id', async function (req, res) {
  const noteId = req.params.id;
  const deletedNote = await noteService.deleteNoteById(noteId);
  return res.send(deletedNote);
});

module.exports = router;

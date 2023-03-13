const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing incoming request data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Serve CSS file with correct MIME type
app.get('/assets/css/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'assets', 'css', 'styles.css'));
  });

// Serve JavaScript file with correct MIME type
app.get('/assets/js/index.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'assets', 'js', 'index.js'));
});

// HTML Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(notes);
  });
  

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  const id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
  const newNote = { id, title, text };
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  const updatedNotes = notes.filter((note) => note.id !== parseInt(req.params.id));
  fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));
  res.json({ success: true });
});

// Server Setup
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

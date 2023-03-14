const fs = require('fs/promises');
const path = require('path');

const noteDataPath = path.join(__dirname, '..', 'db', 'db.json');

class NoteService {
  async getAllNotes() {
    try {
      const notesRaw = await fs.readFile(noteDataPath, 'utf-8');
      return JSON.parse(notesRaw);
    } catch (error) {
      throw error;
    }
  }

  async addNewNote(note) {
    try {
      const currentNotes = await this.getAllNotes();
      currentNotes.push(note);
      await fs.writeFile(noteDataPath, JSON.stringify(currentNotes, null, 2));
      console.log('New note added.');
    } catch (error) {
      throw error;
    }
  }

  async deleteNoteById(id) {
    try {
      const currentNotes = await this.getAllNotes();
      const newNotes = currentNotes.filter((note) => note.id !== id);
      await fs.writeFile(noteDataPath, JSON.stringify(newNotes, null, 2));
      console.log('Note deleted.');
      return newNotes;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NoteService;

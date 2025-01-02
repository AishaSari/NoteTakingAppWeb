const express = require('express');
const path = require('path');
const Datastore = require('nedb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public')); // Serve static files from 'public' folder
app.use(bodyParser.json()); // Parse JSON requests

// Database setup
const db = new Datastore({
    filename: path.join(__dirname, 'notes.json'),
    autoload: true,
});

// Get all notes
app.get('/api/notes', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            res.status(500).send('Database error');
        } else {
            res.json(docs);
        }
    });
});

// Save a note
app.post('/api/notes', (req, res) => {
    const note = { ...req.body, timestamp: Date.now(), pinned: false };
    db.insert(note, (err, newDoc) => {
        if (err) {
            res.status(500).send('Failed to save note');
        } else {
            res.json(newDoc);
        }
    });
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
    db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
        if (err) {
            res.status(500).send('Failed to delete note');
        } else {
            res.json({ success: true });
        }
    });
});

// Toggle pin status
app.patch('/api/notes/:id', (req, res) => {
    db.findOne({ _id: req.params.id }, (err, note) => {
        if (err || !note) {
            res.status(404).send('Note not found');
        } else {
            const updatedNote = { pinned: !note.pinned, timestamp: Date.now() };
            db.update({ _id: req.params.id }, { $set: updatedNote }, {}, (updateErr) => {
                if (updateErr) {
                    res.status(500).send('Failed to update note');
                } else {
                    res.json({ success: true });
                }
            });
        }
    });
});

console.log('Starting server...');


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

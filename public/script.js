let title = document.getElementById("title");
let note = document.getElementById("note");
let saveBtn = document.getElementById("save-btn");
let list = document.getElementById("list");

let notes = [];

// Load all notes
async function loadNotes() {
    const response = await fetch('/api/notes'); // Fetch notes from server
    notes = await response.json();

    list.innerHTML = "";
    notes
        .sort((a, b) => b.pinned - a.pinned || b.timestamp - a.timestamp)
        .forEach(note => {
            const div = document.createElement('div');
            div.classList.add('list_ele');
            if (note.pinned) div.classList.add('pinned');

            const titleElement = document.createElement('h1');
            titleElement.textContent = note.title;

            const content = document.createElement('p');
            content.textContent = note.note;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = () => deleteNote(note._id);

            const pinButton = document.createElement('button');
            pinButton.textContent = note.pinned ? 'Unpin' : 'Pin';
            pinButton.classList.add('pin-btn');
            pinButton.onclick = () => togglePin(note._id);

            div.appendChild(titleElement);
            div.appendChild(content);
            div.appendChild(deleteButton);
            div.appendChild(pinButton);
            list.appendChild(div);
        });
}

// Save a note
saveBtn.onclick = async () => {
    if (title.value !== "" && note.value !== "") {
        const newNote = {
            title: title.value,
            note: note.value,
            pinned: false,
            timestamp: Date.now(),
        };

        await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote)
        });

        title.value = "";
        note.value = "";
        loadNotes(); // Reload the notes
    } else {
        alert("Please fill all the fields and try again");
    }
};

// Delete a note
async function deleteNote(id) {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    loadNotes();
}

// Toggle pin status
async function togglePin(id) {
    await fetch(`/api/notes/${id}`, { method: 'PATCH' });
    loadNotes();
}

// Load notes on startup
window.onload = loadNotes;

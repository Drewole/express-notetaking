const express = require('express');
const { nanoid } = require('nanoid');
const fs = require('fs');
const path = require('path');

const app = express();

var allNotes = [];

// IF this is a production env use that port, or if thats not there use 8000
const PORT = process.env.PORT || 8000;

// NOTE: This is what allows static things like stylesheets, js files and html files to be found and loaded
app.use(express.static('public'));
// NOTE: This is what allows us to receive form data
app.use(express.urlencoded({ extended: true }));
// NOTE: I think this is where we decide what format to move information around in.
app.use(express.json());

////////////////// Routes

// Home Page Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Notes Page Route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Get data from the json file route
app.get('/api/notes', (req, res) => {
  
  if( res === undefined ){
    console.log("bad route")
    res.send("You done messed up, Aaron");
  } else {
    console.log("This worked");

    readFile(res);
  }
  
 });
 // Delete item based on ID and re-render things
app.delete('/api/notes/:id', (req,res) => {
    const existingNotes = fs.readFileSync(‘./db/db.json’, ‘utf-8’);
    const existingNotesJson = JSON.parse(existingNotes)
    let noteId = req.params.id;
    console.log(id);
    const filteredNotes = existingNotesJson.filter(note => note.id != noteId)
    console.log(filteredNotes)
    fs.writeFileSync(‘./db/db.json’, JSON.stringify(filteredNotes));
    res.end();
});
// Post data to the 
app.post('/api/notes', (req, res) => {
  // Lets assign the note deets to a new const
  const newNote = req.body;
  // Use the nano ID package to assign a 4 integer unique ID
  newNote.id = nanoid(4);
  // Add the new note
  allNotes.push(newNote);
  // Send the notes back to the client
  res.json(allNotes);

  allNotes = JSON.stringify(allNotes);
  writeFile(allNotes);

  // This is where we will read data from the database.
    
    // Lets push the new note into the local array
});
function writeFile(data) {
    // This is where we will write the data
    fs.writeFile('./db/db.json', allNotes, (err,data) => {
      if (err) throw err;
      let theData = data;
      console.log(theData)

      allNotes = theData;
      
    });
}
function readFile(res) {
    // This is where we will read data from the database.
    fs.readFile('./db/db.json', (err,data) => {
      if (err) throw err;
      let theData = JSON.parse(data);
      console.log(theData)

      allNotes = theData;
      res.json(allNotes)
    });
}
// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const allNotes = [];

// IF this is a production env use that port, or if thats not there use 8000
const PORT = process.env.PORT || 8000;

// NOTE: This is what allows static things like stylesheets, js files and html files to be found and loaded
app.use(express.static('public'));
// NOTE: This is what allows us to receive form data
app.use(express.urlencoded({ extended: true }));
// NOTE: I think this is where we decide what format to move information around in.
app.use(express.json());

////////////////// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/characters/all', (req, res) => {
  if( obj === undefined ){
    console.log("bad route")
    res.send("You done messed up, Aaron");
  } else {
    console.log(obj);
    res.json(obj)
  }
});

app.post('/api/notes', (req, res) => {
  console.log(req.body);
  characters.push(req.body);
  res.json(req.body);
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
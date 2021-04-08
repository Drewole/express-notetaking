const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

// NOTE: This is what allows static things like stylesheets
app.use(express.static('public'));
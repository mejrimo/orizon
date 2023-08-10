const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// START SERVER APP THROUGH EXPRESS
const app = express();
const port = 3000;

// CONNECT TO DATABASE THROUGH MONGOOSE
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// HANDLE ERROR/SUCCESS CONNECTING TO DATABASE
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

// TELL THE APP TO LISTEN TO A PORT
app.listen(port, () => console.log(`Server started on localhost:${port}!`));

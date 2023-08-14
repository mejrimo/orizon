require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// START SERVER APP THROUGH EXPRESS
const app = express();
const port = 3000;

// CONNECT TO DATABASE THROUGH MONGOOSE
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// HANDLE ERROR/SUCCESS CONNECTING TO DATABASE
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => {
	console.log('Connected to Database');
	// TELL THE APP TO LISTEN TO A PORT (CORRECTION: START THE SERVER ONLY AFTER THE CONNECTION TO DATABASE IS ESTABLISHED)
	app.listen(port, () => console.log(`Server started on localhost:${port}!`));
});

// IMPORT ROUTES USED BY THE APP
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

// USE ROUTES
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

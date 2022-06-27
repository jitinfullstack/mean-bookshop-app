// now here i,m going to create connection code...
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('../database/db');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log("Database connected successfully...")
    },
    error => {
        console.log("Database error : " + error)
    }
)

// Now, i am creating SERVER and PORT...
const bookRoute = require('./routes/book.routes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

// Now create static path
app.use(express.static(path.join(__dirname, 'dist/Bookstore')));

// Api root
app.use('/api', bookRoute);

// Port 
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// 404 Error Handler
app.use((req, res, next) => {
    next(createError(404))
});

// Base route
app.get('/', (req, res) => {
    res.send('Invalid URL...');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'));
});

app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.status).send(err.message);
});
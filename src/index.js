const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/index')

const app = express();
const port = process.env.PORT || 3000;

// config public directory
app.use(express.static(`${__dirname}/../public`))
// parses the application/json content type
app.use(express.json())
// [Middleware] - enable cross-origin
app.use(cors());
// config environment variable
require('dotenv').config();
// connect DB
const db = require('./db/index');
db.connect();

app.get('/', (req, res) => {
    res.json('Welcome!')
})

// Router
app.use(router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
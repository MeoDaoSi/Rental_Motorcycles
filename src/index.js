const express = require('express');
const path = require('path');

// router
const router = require('./routes/index')
// console.log(router);

const app = express();
const port = process.env.PORT || 3000;

// config public directory
app.use(express.static(`${__dirname}/../public`))

// parses the application/json content type
app.use(express.json())

// connect DB
const db = require('./db/index');
db.connect();

app.get('/', (req, res) => {
    res.json('Welcome!')
})

// router
app.use(router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
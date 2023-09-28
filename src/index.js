const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/index')
const AppError = require('./utils/AppError');
const errorHandler = require('./utils/errorHandler');

const app = express();

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
// [Handle if not found api]
app.use((req, res, next) => {
    return next(new AppError(404,"Resource not found"))
})
// [Call errorHandler]
app.use(errorHandler);


module.exports = app
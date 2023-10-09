const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/index')
const AppError = require('./utils/AppError');
const errorHandler = require('./utils/errorHandler');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Config public directory
app.use(express.static(path.join(__dirname, '../public')))
// Parses the application/json content type
app.use(express.json())

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());
// [Middleware] - enable cross-origin
app.use(cors());
// Config environment variable
require('dotenv').config();
// Connect DB
const db = require('./db/index');
db.connect();
// [Template] - Handlebar
app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', `${__dirname}/resources/views`);

// Route welcome!
app.get('/', (req, res) => {
    res.render('home')
})

// Router
app.use(router);
// [Handle if not found api]
app.use((req, res, next) => {
    return next(new AppError(404,'Resource not found'))
})
// [Call errorHandler]
app.use(errorHandler);


module.exports = app
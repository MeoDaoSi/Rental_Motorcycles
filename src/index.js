const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/index')
const AppError = require('./utils/AppError');
const errorHandler = require('./utils/errorHandler');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session')

const app = express();

// Config public directory
app.use(express.static(path.join(__dirname, '../public')))
// Parses the application/json content type
app.use(express.json())

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// [Middleware] - enable cross-origin
app.use(cors());

// Config environment variable
require('dotenv').config();

// Session
app.use(session({
    secret: process.env.SECRET_SESSION, // Change this to a secure random key
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 3600000, // 1hr
        secure: true, // cookie is only accessible over HTTP, requires HTTPS
    }
}));

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
    req.session.views +=1
    console.log(req.session);
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
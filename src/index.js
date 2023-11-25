const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/index')
const AppError = require('./utils/AppError');
const errorHandler = require('./utils/errorHandler');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session')
const flash = require('connect-flash');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const moment = require('moment');
const dateMath = require('date-arithmetic');

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
        maxAge: 259200000 // 3day
        // secure: true, cookie is only accessible over HTTP, requires HTTPS
    }
}));
// [Middleware] - Flash message
app.use(flash());

// Connect DB
const db = require('./db/index');

db.connect();
// [Template] - Handlebar

app.engine('.hbs', engine({
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        increment(variable) {
            return variable + 1;
        },
        formatDate(date) {
            if(!date){
                return "Undefine"
            }
            const dateFormat = date.toLocaleDateString("en-US");
            return dateFormat
        },
        VND_format(cost) {
            total_cost = cost.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return total_cost
        },
        gender(value) {
            if(value === "F"){
                return "Nữ";
            }else{
                return "Nam"
            }
        },
        compare_status(status) {
            if (status == 'REJECT' || status == 'CANCEL') {
                return false
            }
            return true
        }
    }
}));
app.set('view engine', '.hbs');




app.set('views', `${__dirname}/resources/views`);

// Router
app.use(router);
// [Handle if not found route]

app.use((req, res, next) => {
    return next(new AppError(404,'Resource not found'))
})

const dateString = '11/24/2023';

// Parse the date string
const parsedDate = moment('11/11/2023').format('DD-MM-YYYY');

console.log(parsedDate);

// [Call errorHandler]
app.use(errorHandler);

module.exports = app

// PATH=%PATH%;D:\b\node-v18.17.1-win-x64
// /b/mongodb/bin/mongod.exe --dbpath=/b/mongodb_data
// npx tailwindcss -i ./src/input.css -o ./public/css/style.css --watch
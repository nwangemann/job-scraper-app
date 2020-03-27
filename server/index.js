require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const app = express();

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Connected to your DB')
}).catch(err => console.log(err))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

// authCtrl EndPoints


// listingCtrl Endpoints


// scraperCtrl Endpoints

app.listen(SERVER_PORT, () => console.log(`Running on Server Port ${SERVER_PORT}`));
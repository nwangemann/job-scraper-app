require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const app = express();
const { searchScrape } = require('./Controller/scraperCtrl')

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const {editPassword, editEmail, login, registerUser, logout, userSession} = require('./controller/authCtrl')

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
app.post('/auth/login', login);
app.post('/auth/register', registerUser);
app.get('/auth/userSession', userSession);
app.get('/auth/logout', logout);
app.put('/auth/edit_email/:user_id', editEmail)
app.put('/auth/edit_password/:user_id', editPassword)

// listingCtrl Endpoints


// scraperCtrl Endpoints
app.post('/api/search', searchScrape);

app.listen(SERVER_PORT, () => console.log(`Running on Server Port ${SERVER_PORT}`));
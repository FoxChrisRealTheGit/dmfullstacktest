require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    bodyparser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0');

    const app = express();
    app.use(bodyparser.json());

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

        passport.use(new Auth0Strategy({
            domain: process.env.AUTH_DOMAIN,
            clientID: process.env.AUTH_CLIENTID,
            clientSecret: process.env.AUTH_CLIENTSECRET,
            callbackURL: process.env.AUTH_CALLBACK_URL,
            scope:"openid profile"
        }))





    const {SERVER_PORT} = process.env
    app.listen(SERVER_PORT, function(){console.log(`listening on port ${SERVER_PORT}`)});
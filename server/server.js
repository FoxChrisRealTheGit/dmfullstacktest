require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    bodyparser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    massive = require('massive');

const app = express();
app.use(bodyparser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

//grabbing database connection
massive(process.env.CONNECTION_STRING).then((db) => {
    app.set('db', db);
})

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENTID,
    clientSecret: process.env.AUTH_CLIENTSECRET,
    callbackURL: process.env.AUTH_CALLBACK_URL,
    scope: "openid profile"
}, function (accessToken, refreshToken, extraParams, profile, done) {
    let { displayName, user_id, picture } = Profile;
    const db = app.get('db');

    db.find_user([user_id]).then(function (users) {
        if (!users[0]) {
            db.create_user([
                displayName,
                'test@test.com',
                picture,
                user_id
            ]).then(user => {
                return done(null, user.id)
            })
        } else {
            return done(null, users[0].id)
        }
    })
}))

passport.serializeUser((profile, done) => {
    done(null, profile);
})
passport.deserializeUser((profile, done) => {
    done(null, profile);
})


app.get('/auth', passport.authenticate("auth0"))
app.get('/auth/callback', passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/auth"
}))



const { SERVER_PORT } = process.env
app.listen(SERVER_PORT, function () { console.log(`listening on port ${SERVER_PORT}`) });
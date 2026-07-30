require ("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy
const express = require("express");
const app = express();
app.set("view engine", "ejs");
const port = 3000;
const mongoose = require("mongoose");
const characterRoutes = require("./routes/characterRoutes");
const Character = require("./models/characterModel");
const requireLogin = require("./middleware/requireLogin");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/",characterRoutes);


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"/auth/google/callback"
},(accessToken, refreshToken,profile,done)=> {
    return done(null, profile);
}));
passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((user,done)=>done(null,user));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to mongoose!")
});
// Redirect the user to Google's login page:
app.get("/auth/google",passport.authenticate("google",{
    scope:["profile", "email"]
}));

// Google redirects back here after the user approves
// We do not have a successRedirect because we do not have a dashboard yet.
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

// Clear the session and redirect home
app.get('/logout', (req, res) => {
        req.logout(() => res.redirect('/'));
});

app.get("/",(req,res)=>{
    res.render("index",{
        user:req.user || null,
        results: null
    });
});

app.get("/hello", (req,res)=>{
    res.send("hello");
});

app.get("/search",async(req,res)=>{
    const searchCharacter = await Character.find({name:{$regex:req.query.name,$options:"i"}}); //<--- route to search names, telling and telling the logic that capitalizer or uncapitalized does not matter; then rendering the info back in index.ejs
    res.render("index",{
        user:req.user||null,
        results:searchCharacter
    });
});

app.get("/list",async(req,res)=>{
    const listCharacter = await Character.find();
    res.render("index",{
        user:req.user||null,
        results:listCharacter
    });
});


app.listen(port, ()=>{
    console.log("Server up");
});


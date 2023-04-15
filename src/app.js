// // CONFIGURING THE DOTENV
require('dotenv').config();
// console.log("yooooooooooooooooooooooooooooooooooooooooooooooooo" + process.env.SECRETKEY);

// REQUIREING THE PACKAGES
const express = require("express");
const app = express();
const path = require('path');
const port = 8000 || process.env.PORT ;
const expresslayouts = require("express-ejs-layouts");
const router = require("./router/routes");
const cookieparser = require('cookie-parser');

// OTHER ESSENTIALS - START
const fileupload = require('express-fileupload')
const session = require('express-session')
const flash = require('connect-flash')
// OTHER ESSENTIALS - END

app.use(fileupload({
    useTempFiles: true
}))

// FOR BEGING ABLE TO USE "req.cookie.jwt" to get the value of cookie
app.use(cookieparser());

// PARSING THE REQ.BODY
app.use(express.urlencoded({ extended: true }));  //body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(express.json());


// REQUIRING THE MODEL
const client = require('./db/model');

// USING EXPRESS LAYOUTS
app.use(expresslayouts);

// PATH OF STATIC FOLDER 
const staticpath = path.join(__dirname,"../public");
const staticpath2 = path.join(__dirname,"../temp");

// USING EXPRESS.STATIC() FOR SERVING STATIC FILES
app.use(express.static(staticpath));
app.use(express.static(staticpath2));

// SETTING VIEWS DIRECTORY AND VIEW ENGINE
const viewpath = path.join(__dirname,"../views");
app.set('views',viewpath);
app.set('view engine','ejs');


// OTHER ESSENTIALS - START
// app.use(cookieParser('cookingblogsecure'))
app.use(session({
    secret:'cookingblogsecuresession',
    saveUninitialized:true,
    resave:true
}));
app.use(flash());
// OTHER ESSENTIALS - END

let mainroutes = require("./router/routes");
app.use(mainroutes);

// EXECUTING THE CONNECTION FILES
require("./db/connection");

// using ROUTER
app.use(router);

// LISTENING TO SERVER
app.listen(port,`0.0.0.0`,()=>{
    console.log(`Server is running on http://127.0.0.1:${port}`);
})
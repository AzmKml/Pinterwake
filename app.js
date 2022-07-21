//init express
const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const app = express();
const port = 3000;

//init view
app.set("view engine", "ejs");

//init static folder
app.use(express.static("upload"));

//init file upload @express-fileupload
app.use(fileUpload());

//init body parser
app.use(express.urlencoded({ extended: true }));

//init router
const router = require("./routes/index");

//init cookie session
app.use(
  session({
    secret: "pairprojectsahabatku",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true },
  })
);

//! CODE
app.use(router);

//!LISTENING
app.listen(port);

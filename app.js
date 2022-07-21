//init express
const express = require("express");
const fileUpload = require("express-fileupload")
const app = express();
const port = 3000;


//init view+bodyparser
app.use(express.static('upload'))
app.use(fileUpload());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
//init router
const router = require("./routes/index");


//! CODE
app.use(router);

//!LISTENING
app.listen(3000);

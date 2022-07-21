//init express
const express = require("express");
const app = express();
const port = 3000;
//init view+bodyparser
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
//init router
const router = require("./routes/index");

//! CODE
app.use(router);

//!LISTENING
app.listen(3000);

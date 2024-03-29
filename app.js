const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');

// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
require('./routes')(app)
//start server
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
}) 
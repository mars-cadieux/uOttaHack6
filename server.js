const express = require('express');
//const session = require('express-session');
const pug = require('pug');
const fs = require('fs');
//const mc = require('mongodb').MongoClient;
//const mongoose = require("mongoose");

let app = express();

//Body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set view engine to pug so server knows how to render templates
app.set("views", "views/pages");
app.set("view engine", "pug");

/**************************************************************
 * Static File Handling 
 **************************************************************/

//specify directories to search in when serving static files
app.use(express.static("public"));




app.get('/', (req, res) => {
	res.render('main.pug');
});

// app.post('/', (req, res) => {
// 	let file = req.body;
// 	console.log(file);
// 	//let fileParsed = fs.readFileSync(file, "utf-8")
// });







/**************************************************************
 * Start listening
 **************************************************************/

async function run() {
	console.log("Server running on Port 3000");
		app.listen(3000); 
}
// Run the function and handle any errors
run().catch(console.dir);
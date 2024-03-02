const express = require('express');
//const session = require('express-session');
const pug = require('pug');
const fs = require('fs');
//const mc = require('mongodb').MongoClient;
const mongoose = require("mongoose");

const User = require('./models/UserModel.js');
const Flashcard = require('./models/FlashcardModel.js');

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

app.post('/', insertFlashCards, sendCards);

async function insertFlashCards(req, res, next){
	let file = req.body;
	console.log(file);
	for(const key of Object.keys(file)) {
		let newCard = new Flashcard();
		newCard.frontSide = key;
		newCard.backSide = file[key];
		//TODO: newCard.uploadedBy = req.session.username;
		newCard.date = new Date();

		try{
			const result = await newCard.save();
			console.log(result);
		}
		catch(err){
			console.log(err);
			res.status(400).send("Invalid entries.");
		}
	}

	next();
}

async function sendCards(req, res, next){
	res.render("main.pug");
};




/**************************************************************
 * Start listening
 **************************************************************/

async function run() {
	try {
		await mongoose.connect('mongodb://127.0.0.1/LaTeXLatte');
		db = mongoose.connection;
	} 
	catch(err) {
		console.log(err);
	}
	finally {
		console.log("Server running on Port 3000");
		app.listen(3000); 
	}
}
// Run the function and handle any errors
run().catch(console.dir);
const express = require('express');
//const session = require('express-session');
const pug = require('pug');
const fs = require('fs');
//const mc = require('mongodb').MongoClient;
const mongoose = require("mongoose");

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

app.post('/', insertFlashCards, (req, res) => {
	
	res.status(200).send();
	//let fileParsed = fs.readFileSync(file, "utf-8")
});

async function insertFlashCards(req, res, next){
	let file = req.body;
	console.log(file);
}


async function addCardToDB(front, back){
	const Flashcard = mongoose.model('Flashcard', {
        FrontSide: String,
        BackSide: String
    });
      
    const data = new Flashcard({
        FrontSide: front,
        BackSide: back
    });
    
    try{
        await data.save();
        console.log('data saved to db');
    }
    catch (error) {
        console.error('error connecting', error);
    }
}


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

// test  addCardToDB("front", "back");
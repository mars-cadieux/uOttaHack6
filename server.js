const express = require('express');
//const session = require('express-session');
const pug = require('pug');
const fs = require('fs');
//const mc = require('mongodb').MongoClient;
const mongoose = require("mongoose");

const User = require('./models/UserModel.js');
const Flashcard = require('./models/FlashcardModel.js');
const Course = require('./models/CourseModel.js');

let app = express();

const session = require('express-session');
const MongoDBGallery = require('connect-mongodb-session')(session);

const gallery = new MongoDBGallery({
	uri: 'mongodb://127.0.0.1:27017/LaTeXLatte',
	collection: 'sessiondata'
});





/**************************************************************
 * Server Setup 
 **************************************************************/

//Body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set view engine to pug so server knows how to render templates
app.set("views", "views/pages");
app.set("view engine", "pug");

//ensures requests from within the same domain won't get blocked
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//session ID handling
app.use(session({
	secret: 'f696003dc681653e603a83b2ae0ba982',
	cookie: {maxAge:3600000},  //the cookie will expire in 1 hour
	resave: true,
	saveUninitialized: true,
	store: gallery
}));

//middleware to inlude the username in all requests
app.use((req, res, next) => {
	res.locals.username = req.session.username;
	next();
});

/**************************************************************
 * Static File Handling 
 **************************************************************/

//specify directories to search in when serving static files
app.use(express.static("public"));



//get request for 'base' URL redirects to login if not logged in, and redirects to home if logged in page
app.get('/', (req, res) => { 
	if (!req.session.loggedin) {
		res.status(401).redirect('/login');
		return;
	}
    else{
		res.redirect("/upload");
	}
});

//get request for login page
app.get('/login', (req, res) => { 
	res.render("login");
});

//send POST request to /login route to login
app.post('/login', login);	

//send POST request to /register route to register
app.post('/register', register);

//send GET request to /logout route to logout
app.get("/logout", logout);    

app.get('/upload', getCourses, (req, res) => {
	res.render('upload.pug', {options: res.app.locals.courses});
});

app.post('/upload', insertFlashCards, sendCards);

app.get('/flashcards/:id', paginationBuilder, sendCards);

app.post('/addCourse', addCourse);	

app.get('/courses', sendCourses);



/**************************************************************
 * Helper Functions 
 **************************************************************/

//authorization function
function auth(req, res, next) {
	//check if there is a loggedin property set for the session
	if (!req.session.loggedin) {
		res.status(401).redirect('/login');
		return;
	}
	next();
}

async function getCourses(req, res, next){
	let objs = await Course.find().select('courseCode').exec();
	res.app.locals.courses = objs.map(obj => obj.courseCode);

	next();
}

async function login(req, res, next) {
	
	if (req.session.loggedin) {
		if(req.body.username != req.session.username){
			res.status(400).send("Another user is already logged into this session."); 
			return;
		}
		res.status(200).send("Already logged in.");
		return;
	}


	let username = req.body.username;
	let password = req.body.password;

	console.log("Logging in with credentials:");
	console.log("Username: " + req.body.username);
	console.log("Password: " + req.body.password);

	//check if the username exists
	let user = await User.find()
								.where("username").eq(username)
								.exec();
	//if the query for the username returns an empty array
	if(!user[0]){
		res.status(404).send("User not found."); 
		return;
	}
	//If username exists but password is incorrect 
	else if(user[0].password != password){
		res.status(401).send("Incorrect password."); 
		return;
	}
	//made it past all checkpoints; password and login type are both correct for this username
	else{
		try{
			req.session.loggedin = true; // now that particular user session has loggedin value, and it is set to true 
			req.session.username = username; //we keep track of what user this session belongs to
			//keep track of user ID so we don't have to query the db as often
			req.session.userId = user[0]._id;
			req.session.save(function(err) {
				if(err){
					throw new Error(err);
				}
				res.status(200).send("Logged in");
			});
			return;
		}
		catch(err){
			res.status(500).send("An error occurred while trying to sign you in. Please try again.");
		}
	}
}

//register
async function register(req, res, next) {
	if (req.session.loggedin) {
		res.status(401).send("Another user is already logged into this session.");
		return;
	}

	let username = req.body.username;
	let password = req.body.password;

	console.log("Attempting to register with credentials:");
	console.log("Username: " + req.body.username);
	console.log("Password: " + req.body.password);

	let user = await User.find()
							.where("username").eq(username)
							.exec();
	if(user[0]){
		res.status(400).send("Username already exists");
		return;
	} 
	else if(!req.body.password){
		res.status(401).send();
		return;
	}
	else {
		let newUser = new User();
		newUser.username = username;
		newUser.password = password;
		try {
			newUser.save();
			res.status(201).send();
		}
		catch(err){
			console.log(err);
		}
	}
}

//logout function
function logout(req, res, next) {
	if (req.session.loggedin) {
		req.session.loggedin = false;
		req.session.username = undefined;
		req.session.save(function(err) {
			if(err){
				throw new Error(err);
			}
			res.redirect('/login');
		});
	} else {
		res.status(200).send("You cannot log out because you aren't logged in.");
	}
}

async function insertFlashCards(req, res, next){
	let file = req.body;
	//console.log(file);

	let courseCode = req.body.courseCode;
	delete file.courseCode;

	for(const key of Object.keys(file)) {
		let newCard = new Flashcard();

		let result = await Course.updateOne(
			{ courseCode: courseCode },
			{ $addToSet: {flashcards: newCard._id} }
		);

		let course = await Course.find().where("courseCode").eq(courseCode).exec();
		let courseID = course[0]._id;

		newCard.frontSide = key;
		newCard.backSide = file[key];
		newCard.uploadedBy = req.session.username;
		newCard.date = new Date();
		newCard.course = courseID;

		try{
			const result = await newCard.save();
			console.log(result);
		}
		catch(err){
			console.log(err);
			res.status(400).send("Invalid entries.");
		}
	}

	res.status(201).send("Your flashcards were generated successfully!");
}

//create a query limit and page number variable to support pagination
function paginationBuilder(req, res, next) {
	let paramCourseCode = req.params.id;
	res.app.locals.courseCode = paramCourseCode.replace("%20", ' ');
	console.log(res.app.locals.courseCode);

	//build a query string to use for pagination later
	let params = [];
	for (prop in req.query) {
		if (prop == "page") {
			continue;
		}
		params.push(prop + "=" + req.query[prop]);
	}
	req.qstring = params.join("&");

	req.query.limit=1;

	try {
		req.query.page = req.query.page || 1;
		req.query.page = Number(req.query.page);
		if (req.query.page < 1) {
			req.query.page = 1;
		}
	} catch {
		req.query.page = 1;
	}

	if (!req.query.name) {
		req.query.name = "?";
	}

	next();
}

async function sendCards(req, res, next){
	let startIndex = ((req.query.page - 1) * req.query.limit);
	let amount = req.query.limit;

	try{
		let course = await Course.find()
									.where("courseCode").eq(res.app.locals.courseCode)
									.exec();
		let courseID = course[0]._id;
		console.log(course);
		console.log(courseID);
		let queriedCard = await Flashcard.find()
											.where("course").eq(courseID)
											.limit(amount)
											.skip(startIndex)
											.populate()
											.exec();
		let nextCard = await Flashcard.find()
										.where("course").eq(courseID)
										.limit(amount)
										.skip(startIndex+amount)
										.populate()
										.exec();
		console.log(queriedCard);
		console.log(nextCard);
		if(nextCard[0]){
			res.app.locals.nextButton = true;
		}
		else{
			res.app.locals.nextButton = false;
		}						
		res.render("flashcards", {cards: queriedCard, qstring: req.qstring, current: req.query.page, nextButton: res.app.locals.nextButton, courseCode: course[0].courseCode});
	}
	catch(err){
		console.log(err);
		res.status(400).send("No cards match those parameters.");
	}
	
};

async function addCourse(req, res, next){
	courseCode = await Course.find({ courseCode: req.body.courseCode});

	if (courseCode[0]){
		res.status(400).send("Course already exists.");
		
	}
	else{
		try {
			let newCourse = new Course();
			newCourse.courseCode = req.body.courseCode;
			newCourse.save();
			res.status(201).send("Course added!");
		}
		catch(err){
			console.log(err);
			res.status(401).send("Invalid course code.");
		}
	}
	  
}

async function sendCourses(req, res) {
	try{
		let courses = await Course.find();
		console.log(courses);
		res.render('courses', {courses: courses});
	}
	catch(err){
		console.log(err);
		res.status(500).send("An error occurred, please try again later.");
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
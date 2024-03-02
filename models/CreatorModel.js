const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let creatorModel = Schema({
	//userames will be strings between 1-30 characters
	//must consist of only lowercase characters, digits, underscores (_), and periods (.)
	//will be trimmed automatically 
	username: {
		type: String, 
		required: true,
		minlength: 1,
		maxlength: 30,
		match: /[a-z\d_\.]+/,
		trim: true
	},
	//display name of the creator, will appear at top of their page and next to their artworks 
	//meant to be a full name with proper grammar, however digits are allowed as it is common for creators to replace letters with digits in their names (ex. deadmau5)
	//will be trimmed automatically
	name: {
		type: String, 
		required: true,
		minlength: 1,
		maxlength: 30,
		match: /[A-Za-z\d\s]+/,
		trim: true
	},
	//creators can have a 'bio' containing a short introduction about themselves and what kind of subject they post cards for. 
	//not required, can contain any types of characters
	//nice to have: create a default by querying their degree, most common category, earliest year
	bio: {
		type: String, 
		required: false,
		maxlength: 500,
		default: "This creator has not entered a biography for themselves yet."
	},
	photo: {
		type: String, 
		required: false,
		maxlength: 500,
		default: "../user.png"
	},
	//array of flashcards
	//not required since if a new creator is creating a new account, they will not have any flashcards at first
	flashcards:[{ type: Schema.Types.ObjectId, ref: 'Flashcard' }]
});

module.exports = mongoose.model("Creator", creatorSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO: flashcards should be part of a collection

let flashcardSchema = Schema({
    // front side of the flashcard
    // String of at least one character, trim trailing whitespace
    frontSide: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },

    // back side of the flashcard
    // String of at least one character, trim trailing whitespace
    backSide: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },

    //userames will be strings between 1-30 characters
	//must consist of only lowercase characters, digits, underscores (_), and periods (.)
	//will be trimmed automatically 
	uploadedBy: { 
        type: String, 
		required: false, //TODO: change to true when user data becomes integrated with db
		minlength: 1,
		maxlength: 30,
		match: /[a-z\d_\.]+/,
		trim: true 
    },

    // Date of when the flashcard was uploaded
    date: Date
});

module.exports = mongoose.model("Flashcard", flashcardSchema);

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

    category: {
        type: String,
        required: false,
        minLength: 1,
        maxlength: 1,
        match: /[dp]/i, // (d)efinitions, (p)ractice questions, add more as needed
        trim: true
    },

    // the course the flashcard corresponds to
    course: {type: Schema.Types.ObjectId, ref: 'Course'},

    // Date of when the flashcard was uploaded
    date: Date
});

module.exports = mongoose.model("Flashcard", flashcardSchema);

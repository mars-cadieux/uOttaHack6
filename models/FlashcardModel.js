const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
	uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },

    // Date of when the flashcard was uploaded
    date: Date
});

module.exports = mongoose.model("Flashcard", flashcardSchema);

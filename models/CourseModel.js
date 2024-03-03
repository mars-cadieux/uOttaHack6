const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let courseSchema = Schema({
    courseCode: {
        type: String, 
		required: true,
		minlength: 8,
		maxlength: 10,
		match: /[a-z]{3,4} [0-9]{4,5}/i,
		trim: true
    },

    section: {
        type: String, 
		required: false,
		minlength: 1,
		maxlength: 1,
		match: /[a-z]/i,
		trim: true
    },
    
    term: {
        type: String, 
		required: false,
		minlength: 6,
		maxlength: 6,
		match: /[fsw] [0-9]{4}/i,
		trim: true
    },

    flashcards: [{type: Schema.Types.ObjectId, ref: 'Flashcard'}]
})

module.exports = mongoose.model("Course", courseSchema);

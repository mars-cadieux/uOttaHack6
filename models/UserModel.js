const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = Schema({
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
	//passwords will be strings between 1-30 characters
	//nice to have: change min to 8. this will require more complex error handling on client-side
	//passwords cannot contain whitespace but may contain any other type of character
	password: {
		type: String, 
		required: true,
		minlength: 1,
		maxlength: 30,
		match: /\S+/
	}
});

module.exports = mongoose.model("User", userSchema);
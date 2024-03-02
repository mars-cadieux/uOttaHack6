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

app.post('/', (req, res) => {
	let 
});
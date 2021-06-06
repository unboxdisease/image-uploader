const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filesschema = new Schema({
	image: {
		type: String,
		required: true
	},
	
});

const File = mongoose.model('Book', filesschema);

module.exports = File;

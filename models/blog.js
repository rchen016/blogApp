var mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema({
	title: String,
	image: String,
	showImage: String,
	body: String,
	date: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Blog", BlogSchema);

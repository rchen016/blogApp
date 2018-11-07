var mongoose = require("mongoose");

var SecretBlogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	body2: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("SecretBlog", SecretBlogSchema);

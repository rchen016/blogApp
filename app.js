var express = require("express"),
        app = express(),
 bodyParser = require("body-parser"),
   mongoose = require("mongoose");

//Default Config
mongoose.connect("mongodb://localhost/blogApp");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Blog Schema
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//Routes

Blog.create({
	title: "Fox",
	image: "https://images.unsplash.com/photo-1540153448870-af780343526e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=156b02ddcd899f8e70270bf6c4f57932&auto=format&fit=crop&w=1350&q=80",
	body: "Fox being a Fox"
});

app.listen(3000, process.env.IP,function(){
	console.log("Server Up");
});

var express = require("express"),
        app = express(),
 bodyParser = require("body-parser"),
 methordOverride = require("method-override"),
 expressSanitizer = require("express-sanitizer"),
   mongoose = require("mongoose"),
   path     = require("path");

//Default Config
mongoose.connect("mongodb://localhost/blogApp");
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methordOverride("_method"));

//Blog Schema
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//Routes

// Blog.create({
// 	title: "Fox",
// 	image: "https://images.unsplash.com/photo-1540153448870-af780343526e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=156b02ddcd899f8e70270bf6c4f57932&auto=format&fit=crop&w=1350&q=80",
// 	body: "Fox being a Fox"
// });

//redirect homepage to landingpage
app.get("/",function(req,res){
	res.redirect("/blogs");
});

//Show all Blog Post
app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blogs: blogs});
		}
	});
});

//Create new Blog Post
app.get("/blogs/new",function(req,res){
	res.render("new");
});

//Post request for creating new Blog Post
app.post("/blogs",function(req,res){
	console.log(req.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	console.log(req.body);
	Blog.create(req.body.blog,function(err,newlyCreated){
		if(err){
			res.render("new");
		}
		else{
			res.redirect("/blogs");
		}
	});
});

//Details of a blog
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			console.log("error");
			res.redirect("/blogs");
		}
		else{
			res.render("show",{blog:foundBlog});
		}
	});
});

//Edit a POST
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			console.log("error");
			res.redirect("/blogs");
		}
		else{
			res.render("edit",{blog:foundBlog});
		}
	});
});

//Update Route
app.put("/blogs/:id",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog,function(err,updatedBlog){
		if(err){
			console.log("error");
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//Delete Route

app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log("error");
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, process.env.IP,function(){
	console.log("Server Up");
});

// var userSchema = new mongoose.Schema({
//   email: String,
//   name: String,
//   posts: [postSchema]},
//   {usePushEach: true}
// );

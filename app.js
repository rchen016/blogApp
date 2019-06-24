var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    methordOverride  = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
	User             = require("./models/user"),
	Blog             = require("./models/blog"),
	SecretBlog       = require("./models/secretBlog"),
	seedDB           = require("./seeds"),
    path             = require("path");

var url = process.env.DATABASEURL || "mongodb://localhost/blogApp";
mongoose.connect(url,{useNewUrlParser: true});

//Default Config
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methordOverride("_method"));

//passport
app.use(require("express-session")({
	secret: "testtesttest",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.loginpage = false;
	res.locals.homepage = false;
	next();
});

//redirect homepage to landingpage
app.get("/",function(req,res){
	res.redirect("/blogs");
});

//Show all Blog Post
app.get("/blogs",function(req,res){
	var test;
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blogs: blogs.sort(),secret:false,homepage:true});
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
			res.render("show",{blog:foundBlog,secret:false});
		}
	});
});

//Details of a blog
app.get("/login",function(req,res){
	res.locals.loginpage = true;
	res.render("login");
});

app.post("/login", passport.authenticate("local",
	{
		successRedirect: "/blogs",
		failureRedirect: "/login"
	}),function(req,res){
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

//Logout
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/blogs");
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

//seedDB
//Seed
app.get("/seedDB",function(req,res){
	seedDB();
	res.redirect("back");
	return;
});
/////////////////////////
//Secret MJ VS LBJ Start
/////////////////////////
app.get("/secretmjvslbj",function(req,res){
	SecretBlog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("secret",{Sblogs: blogs.sort(),secret:true});
		}
	});
});

//Details of a blog
app.get("/Sblogs/:id",function(req,res){
	SecretBlog.findById(req.params.id,function(err,foundBlog){
		if(err){
			console.log("error");
			res.redirect("/blogs");
		}
		else{
			res.render("secretShow",{Sblogs:foundBlog,secret:true});
		}
	});
});
///////////////////////
//Secret MJ VS LBJ End
///////////////////////
app.listen(process.env.PORT||3000, process.env.IP, function(){
  console.log("Server Up...");
});

var mongoose          = require("mongoose"),
    User              = require("./models/user"),
	Blog             = require("./models/blog"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local");

var data = [
	{
		title: "Childhood",
		image: "https://i.imgur.com/tpvmihw.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "Moving to Baltimore",
		image: "https://i.imgur.com/hM0pgXN.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "Townson Catholic",
		image: "https://i.imgur.com/DTObO2S.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "Oakhill",
		image: "https://i.imgur.com/b9545EW.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "Junior National USA Team",
		image: "https://i.imgur.com/bXk0Xls.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "Syracuse",
		image: "https://i.imgur.com/q5Zg4jH.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "Drafted By Nuggets",
		image: "https://i.imgur.com/g8lA2TW.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "2nd Youngest to Score 30 points",
		image: "https://i.imgur.com/q4Lprv3.png",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "Bronze Medal",
		image: "https://i.imgur.com/qvMQov5.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "First All Star",
		image: "https://i.imgur.com/LdIKZeR.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "Eastern Conference Finals",
		image: "https://i.imgur.com/pHRN804.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	},
	{
		title: "Scoring Leader",
		image: "https://i.imgur.com/znZBY57.jpg",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar felis viverra magna iaculis accumsan. Vestibulum quis ante blandit, condimentum augue ac, egestas odio. Ut dapibus dolor risus, vel aliquet sem venenatis sed. Maecenas vel tristique ex. Nulla sollicitudin aliquam elit nec pellentesque."
	}
];

function seedDB(){
	console.log("Let's Seed!");
	Blog.remove({},function(err){
		if(err){
			console.log("Failed to Delete");
		}
	})
	Blog.create(data,function(err){
		if(err){
			console.log("Hm");
		}
	});
}

module.exports = seedDB;

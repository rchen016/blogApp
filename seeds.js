var mongoose          = require("mongoose"),
    User              = require("./models/user"),
	Blog             = require("./models/blog"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local");

var data = [
	{
		//5-29-1984
		title: "Childhood",
		image: "https://i.imgur.com/tpvmihw.jpg",
		body: "Carmelo Anthony was born May 29, 1984 in Brooklyn New York. His mother was Puerto Rican and his father was African American. He was the youngest of his 2 sisters and brother."
	},
	{
		//1986
		title: "Moving to Baltimore",
		image: "https://i.imgur.com/hM0pgXN.jpg",
		body: "At the age of 2, Carmelo Iriarte (his father), died of cancer. This lead to the uprooting of the family and relocation to Balitmore. The neighborhood they chose wasn't the safest but his family managed to stay out of trouble."
	},
	{
		title: "Towson Catholic",
		image: "https://i.imgur.com/DTObO2S.jpg",
		body: "Carmelo started his basketball career at Towson Catholic High School. During the summer of 1999, Carmelo grew 5 inches raising his height to an astounding 6'5 for a 15 year old kid. After this growth spurt, he became one of the best players in the area. Two years later, won The Baltimore Sun's Metro player of the year and the Baltimore Catholic player of the year. As a sophmore, he led his team to a 26-3 season with averages of 14-5-4-2(Points-Rebounds-Assist-Steals). The following year, he exploded for averages of 23-10.3. (Points-Rebounds) Sadly they lost before they reached State Champsionship."
	},
	{
		//2002
		title: "Oakhill",
		image: "https://i.imgur.com/b9545EW.jpg",
		body: "As Carmelo became a senior, his grades dropped to an unacceptable average where it jeopardized his chances at college. His mother decided to transfer him to Oak Hill Academy in Virginia. Carmelo had a sucessful senior year by winning the championship and followed it up with dominating AAU. He took his team to the Final Four with impressive 25.2 points per game. As his senior year came to an end, his accolades continue to pile up with All-USA First Team, Parade First-Team All-American, Sprite Slam Jam winner, No.1 highschool class of 2002."
	},
	{
		//2002
		title: "Junior National USA Team",
		image: "https://i.imgur.com/bXk0Xls.jpg",
		body: "In 2002, Carmelo played for the USA Junior National League with Chris Bosh. They were defated in the semifinals and ended with Bronze. Carmelo sported a 15.6-4.4-1.8-1.2 (Points-Rebound-Assist-Steal) averages."
	},
	{
		//2002
		title: "Syracuse",
		image: "https://i.imgur.com/q5Zg4jH.jpg",
		body: "Carmelo declares of Syracuse and plays one season (30-5 record) with them. He spotted modest averages of 22.2-10.0 (Points-Rebounds), which both ranked top20 in the NCAA. Carmelo exploded for 33 points against University of Texas in the Final Four and claimed the record of most points by Freshmen in NCAA history. Eventually, he led his team to the prized championship and won Most Outstanding Player Award."
	},
	{
		//2003
		title: "Drafted By Nuggets",
		image: "https://i.imgur.com/g8lA2TW.jpg",
		body: "After completating if he should stay in Syracuse, he decided to declare for the NBA draft due to having nothing left to prove at the college level. He was selected 3rd overall by the Denver Nuggets and chose the jersey number 15."
	},
	{
		//2003
		title: "2nd Youngest to Score 30 points",
		image: "https://i.imgur.com/q4Lprv3.png",
		body: "Just six games into his career, on November 7, 2003, he became the second youngest player to score 30 points in a game against the LA Clippers."
	},
	{
		//2004
		title: "Bronze Medal",
		image: "https://i.imgur.com/qvMQov5.jpg",
		body: "In 2004, Carmelo gets selected for his first Olympics. Hosted in the great city of Greece, this Larry Brown led team became one of the most disappointing ventures in Team USA history. Not only did they lose to 3 opponents (T-Most), they also set the record of most points lost by in Team USA history. This roster had some notable All-Stars: LeBron James, Iverson, Wade, Amar'e and Duncan. They ended up losing to Argentia in the Semifinals 81-89 and picked up Bronze by beating Lithuania 104-96."
	},
	{
		//2007
		title: "First All Star",
		image: "https://i.imgur.com/LdIKZeR.jpg",
		body: "On 2007, Carmelo Anthony was selected for his first All-Star Game, hosted in Las Vegas. The 56th annual All-Star Game was hosted for the first time in All-Star history in a city without a NBA Franchise. The Western All-Stars dominated the East with a decesive 153-132 win. Carmelo chipped in 20-9, second to only Amar'e's 29 points."
	},
	{
		//2008
		title: "First Gold Medal",
		image: "https://i.imgur.com/dgyTdNQ.jpg",
		body: "On 2007, Carmelo Anthony was selected for his first All-Star Game, hosted in Las Vegas. The 56th annual All-Star Game was hosted for the first time in All-Star history in a city without a NBA Franchise. The Western All-Stars dominated the East with a decesive 153-132 win. Carmelo chipped in 20-9, second to only Amar'e's 29 points."
	},
	{
		//2009
		title: "Eastern Conference Finals",
		image: "https://i.imgur.com/pHRN804.jpg",
		body: "Carmelo reaches his first Eastern Conference Final against the Kobe led Lakers, who eventually won the NBA Title. This was their first conference final since 1985. Sadly Carmelo led Nuggets fell to the Lakers 4-2 in the series."
	},
	{
		//2012
		title: "Olympic Most Points in a Game",
		image: "https://i.imgur.com/2xFH7sB.jpg",
		body: "Carmelo comes off the bench and drops 10 3s against Nigeria. He finishes in Olympic history, scoring 37 points, most by any player ever. He broke the previous record held by himself vs Austrilia (2012 31 pts)"
	},
	{
		//2012
		title: "2012 Olympics",
		image: "https://i.imgur.com/XH7Azym.jpg",
		body: "This was Carmelo's arugably hardest Gold medal. They breezed past all the competition until they faced the Juggernaut Spain. The Spain team was lead by notable NBA studs, the Gasol brothers and Serge Ibaka. They escaped by winning by 7. (Average margin of win previous round was 29.5)"
	},
	{
		//2013
		title: "Scoring Leader",
		image: "https://i.imgur.com/znZBY57.jpg",
		body: "As profilic of a scorer as Carmelo was, it was not until 2013 that he won his first scoring title (28.7PPG). Many debate that if Kevin Durant did not sit the season Finale at 28.1 PPG, Carmelo might not have won the scoring title. This in fact was a myth because Durant would have needed to score 70 points to push his averages past Carmelo."
	},
	{
		//2016
		title: "Carmelo's Last Olympics",
		image: "https://i.imgur.com/dFar6ZW.jpg",
		body: "For Carmelo's final Olympics, he was the quote on quote old head of the group. With the help of notable stars, Warriors trio(KD instead of Curry), Butler, Kyrie and Demarcus Cousins, they went 5-0. They inched by Spain by 6 points and completely murked Serbia in the finals by 30."
	},
	{
		title: "Sources",
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png",
		body: "Most of the content was found on Wikipedia: (https://en.wikipedia.org/wiki/Carmelo_Anthony). As for the images, they were found on Google Images. Disclaimer, if any of these photo's are yours and you want them to be removed, please email me @ RICKYCHEN10@GMAIL.COM."
	}
];

function seedDB(){
	console.log("Let's Seed!");
		data.forEach(function(seed){
			console.log(seed.title);
		});
	Blog.remove({},function(err){
		if(err){
			console.log("Failed to Delete");
		}
		data.forEach(function(seed){
			Blog.create(seed,function(err){
				if(err){
					console.log("Hm");
				}
			});
		});
	});

	//
	// var newUser = new User({username: "admin"});
	// var password = "zx1230321";
	// console.log("ReCreate Admin");
	// User.register(newUser, password,function(err){
	//  if(err){
	// 	 console.log("err");
	//  }
	// });
}

module.exports = seedDB;

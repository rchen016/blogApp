var mongoose          = require("mongoose"),
    User              = require("./models/user"),
	Blog              = require("./models/blog"),
	SecretBlog        = require("./models/secretBlog"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local");

var data = [
	{
		//5-29-1984
		title: "Childhood",
		image: "https://i.imgur.com/EHz0fFd.png",
		showImage:"https://i.imgur.com/tpvmihw.jpg",
		body: "Carmelo Anthony was born May 29, 1984 in Brooklyn New York. His mother was Puerto Rican and his father was African American. He was the youngest of his 2 sisters and brother.",
		date:"1984"
	},
	{
		//1986
		title: "Moving to Baltimore",
		image: "https://i.imgur.com/hM0pgXN.jpg",
		showImage:"https://i.imgur.com/hM0pgXN.jpg",
		body: "At the age of 2, Carmelo Iriarte (his father), died of cancer. This lead to the uprooting of the family and relocation to Balitmore. The neighborhood they chose wasn't the safest but his family managed to stay out of trouble.",
		date:"1986"
	},
	{
		title: "Towson Catholic",
		image: "https://i.imgur.com/nQ1lUhv.jpg",
		showImage:"https://i.imgur.com/DTObO2S.jpg",
		body: "Carmelo started his basketball career at Towson Catholic High School. During the summer of 1999, Carmelo grew 5 inches raising his height to an astounding 6'5 for a 15 year old kid. After this growth spurt, he became one of the best players in the area. Two years later, won The Baltimore Sun's Metro player of the year and the Baltimore Catholic player of the year. As a sophmore, he led his team to a 26-3 season with averages of 14-5-4-2(Points-Rebounds-Assist-Steals). The following year, he exploded for averages of 23-10.3. (Points-Rebounds) Sadly they lost before they reached State Champsionship.",
		date:"1999"
	},
	{
		//2002
		title: "Oakhill",
		image: "https://i.imgur.com/x6LXrUL.png",
		showImage:"https://i.imgur.com/x6LXrUL.png",
		body: "As Carmelo became a senior, his grades dropped to an unacceptable average where it jeopardized his chances at college. His mother decided to transfer him to Oak Hill Academy in Virginia. Carmelo had a sucessful senior year by winning the championship and followed it up with dominating AAU. He took his team to the Final Four with impressive 25.2 points per game. As his senior year came to an end, his accolades continue to pile up with All-USA First Team, Parade First-Team All-American, Sprite Slam Jam winner, No.1 highschool class of 2002.",
		date:"2002"
	},
	{
		//2002
		title: "Junior National USA Team",
		image: "https://i.imgur.com/bXk0Xls.jpg",
		showImage:"https://i.imgur.com/bXk0Xls.jpg",
		body: "In 2002, Carmelo played for the USA Junior National League with Chris Bosh. They were defated in the semifinals and ended with Bronze. Carmelo sported a 15.6-4.4-1.8-1.2 (Points-Rebound-Assist-Steal) averages.",
		date:"2002"
	},
	{
		//2002
		title: "Syracuse",
		image: "https://i.imgur.com/q5Zg4jH.jpg",
		showImage:"https://i.imgur.com/q5Zg4jH.jpg",
		body: "Carmelo declares of Syracuse and plays one season (30-5 record) with them. He spotted modest averages of 22.2-10.0 (Points-Rebounds), which both ranked top20 in the NCAA. Carmelo exploded for 33 points against University of Texas in the Final Four and claimed the record of most points by Freshmen in NCAA history. Eventually, he led his team to the prized championship and won Most Outstanding Player Award.",
		date:"2002"
	},
	{
		//2003
		title: "Drafted By Nuggets",
		image: "https://i.imgur.com/xPP8xns.jpg",
		showImage:"https://i.imgur.com/g8lA2TW.jpg",
		body: "After completating if he should stay in Syracuse, he decided to declare for the NBA draft due to having nothing left to prove at the college level. He was selected 3rd overall by the Denver Nuggets and chose the jersey number 15.",
		date:"2003"
	},
	{
		//2003
		title: "2nd Youngest to Score 30 points",
		image: "https://i.imgur.com/8KFtS5c.png",
		showImage:"https://i.imgur.com/uGVCpIj.png",
		body: "Just six games into his career, on November 7, 2003, he became the second youngest player to score 30 points in a game against the LA Clippers.",
		date:"2003"
	},
	{
		//2004
		title: "Bronze Medal",
		image: "https://i.imgur.com/qvMQov5.jpg",
		showImage:"https://i.imgur.com/qvMQov5.jpg",
		body: "In 2004, Carmelo gets selected for his first Olympics. Hosted in the great city of Greece, this Larry Brown led team became one of the most disappointing ventures in Team USA history. Not only did they lose to 3 opponents (T-Most), they also set the record of most points lost by in Team USA history. This roster had some notable All-Stars: LeBron James, Iverson, Wade, Amar'e and Duncan. They ended up losing to Argentia in the Semifinals 81-89 and picked up Bronze by beating Lithuania 104-96.",
		date:"2004"
	},
	{
		//2007
		title: "First All Star",
		image: "https://i.imgur.com/LdIKZeR.jpg",
		showImage:"https://i.imgur.com/LdIKZeR.jpg",
		body: "On 2007, Carmelo Anthony was selected for his first All-Star Game, hosted in Las Vegas. The 56th annual All-Star Game was hosted for the first time in All-Star history in a city without a NBA Franchise. The Western All-Stars dominated the East with a decesive 153-132 win. Carmelo chipped in 20-9, second to only Amar'e's 29 points.",
		date:"2007"
	},
	{
		//2008
		title: "First Gold Medal",
		image: "https://i.imgur.com/dgyTdNQ.jpg",
		showImage:"https://i.imgur.com/dgyTdNQ.jpg",
		body: "On 2007, Carmelo Anthony was selected for his first All-Star Game, hosted in Las Vegas. The 56th annual All-Star Game was hosted for the first time in All-Star history in a city without a NBA Franchise. The Western All-Stars dominated the East with a decesive 153-132 win. Carmelo chipped in 20-9, second to only Amar'e's 29 points.",
		date:"2008"
	},
	{
		//2009
		title: "Eastern Conference Finals",
		image: "https://i.imgur.com/pHRN804.jpg",
		showImage:"https://i.imgur.com/pHRN804.jpg",
		body: "Carmelo reaches his first Eastern Conference Final against the Kobe led Lakers, who eventually won the NBA Title. This was their first conference final since 1985. Sadly Carmelo led Nuggets fell to the Lakers 4-2 in the series.",
		date:"2009"
	},
	{
		//2012
		title: "Olympic Most Points in a Game",
		image: "https://i.imgur.com/2xFH7sB.jpg",
		showImage:"https://i.imgur.com/2xFH7sB.jpg",
		body: "Carmelo comes off the bench and drops 10 3s against Nigeria. He finishes in Olympic history, scoring 37 points, most by any player ever. He broke the previous record held by himself vs Austrilia (2012 31 pts)",
		date:"2012"
	},
	{
		//2012
		title: "2012 Olympics",
		image: "https://i.imgur.com/XH7Azym.jpg",
		showImage:"https://i.imgur.com/XH7Azym.jpg",
		body: "This was Carmelo's arugably hardest Gold medal. They breezed past all the competition until they faced the Juggernaut Spain. The Spain team was lead by notable NBA studs, the Gasol brothers and Serge Ibaka. They escaped by winning by 7. (Average margin of win previous round was 29.5)",
		date:"2012"
	},
	{
		//2013
		title: "Scoring Leader",
		image: "https://i.imgur.com/aWMI0gg.jpg",
		showImage:"https://i.imgur.com/znZBY57.jpg",
		body: "As profilic of a scorer as Carmelo was, it was not until 2013 that he won his first scoring title (28.7PPG). Many debate that if Kevin Durant did not sit the season Finale at 28.1 PPG, Carmelo might not have won the scoring title. This in fact was a myth because Durant would have needed to score 70 points to push his averages past Carmelo.",
		date:"2013"
	},
	{
		//2016
		title: "Carmelo's Last Olympics",
		image: "https://i.imgur.com/dFar6ZW.jpg",
		showImage:"https://i.imgur.com/dFar6ZW.jpg",
		body: "For Carmelo's final Olympics, he was the quote on quote old head of the group. With the help of notable stars, Warriors trio(KD instead of Curry), Butler, Kyrie and Demarcus Cousins, they went 5-0. They inched by Spain by 6 points and completely murked Serbia in the finals by 30.",
		date:"2016"
	},
	{
		title: "Sources",
		image: "https://i.imgur.com/y1bbdYs.png",
		showImage:"https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png",
		body: "Most of the content was found on Wikipedia: (https://en.wikipedia.org/wiki/Carmelo_Anthony). As for the images, they were found on Google Images. Disclaimer, if any of these photo's are yours and you want them to be removed, please email me @ RICKYCHEN10@GMAIL.COM.",
		date:"2019"
	}
];

var secretData =[
	{
		title: "Championship debate",
		image: "https://i.imgur.com/vBacSFG.jpg",
		body: "The age-old debate of how many rings does player X and player Y has. Oddly, people like Robert Horry (7 Rings), John Havlicek (8 Rings), Sam Jones (10 Rings) and Bill Russell (11 Rings) never enter the conversation of GOAT with more rings. A team accolade should not be the backbone of an argument of which player is better. For example, was Kevin Durant any less of a player before he won a ring? No, I don’t believe so. In fact, his most dominant years were in OKC during 2009-2014. You can examine win shares, VORP or OBPM. Everything was higher. I would take 2013-2014 ringless KD over 2016-2017 champion KD. Essentially what I am getting at is this, rings do not dictate how good a player is because if you take 2013-2014 KD, one could argue that the warriors would be even more dominant. It seems like people conveniently use the ring debate when it suits them. [Table] <br><br>This conversion is done because MJ took on average 4.615 more shots. If you adjust LBJ 22% 3PTA and 78% 2PTA, he would score 4.23 more points on 47.5%FG and 31.7% 3P. Also, the extra 20 seconds MJ played, LBJ per second production is .0127PT- .0038REB- .00305AST- .000625ST- .0000317BLK- .000967TO. If you examine the adjusted stats, the better scorer argument quickly becomes debatable. This extrapolation doesn't work with every player but since we are debating GOAT, we are on the assumption, LBJ would capitalize on these extra shots. MJ dominates the NBA Finals with a 100% win rate and 100% Finals MVP win rate, but if you examine the averages, he's only better in PPG, SPG, TO, FG/FT. This has been one of the biggest selling points on why MJ is better, scoring. Just because LBJ doesn't take those shots doesn’t mean he can't. With the same shot attempts, their PPG is almost identical. I'm not saying LBJ is a better shooter since they score their own way, but as a scorer, they are not that far apart. The only thing I can't argue is MJ is a way better overall shooter. These averages are including LBJ's 07 series when he was only a Junior in the league. MJ was on his sixth season for his first final which is a massive experience advantage. You can go back and examine many players and see the correlation with experience and results. It's like the Ben Simmons ROY debate because he had an extra year of NBA development over Donovan Mitchell. Countless people tried to discount Ben Simmons’s case for ROY because he “wasn’t” a rookie. If one year was that big of a difference, imagine 6 full NBA years of experience and being in your prime<br><br>Conculsion: MJ on paper has a better resume in terms of NBA Finals. Proceed to the next post for a deeper dive that examines both playoff careers.",
		body2: ""
	},
	{
		title: "Let's examine the playoffs",
		image: "https://i.imgur.com/IBaSC3o.png",
		body: "One of the biggest knocks on LeBron is he plays in the terrible East, where anyone can make the playoffs. I don't disagree with this statement, but MJ's East usually had 2-3 good teams as well. [Table] Let's examine both their playoff paths.<br><br>Let's examine MJ first. He was below .500 his first 3 years of his career and made the playoffs with losing records, which is unheard of in modern NBA. The 1985 Chicago Bulls made 8th seed with a 30-52 record which shows how bad the East was. There were three teams under .500 in the Eastern Playoffs. This is very similar to modern day Eastern Conference where it is top heavy and lottery teams. Jordan lost in the first round twice and followed it with a round two exit. MJ having 3 first round exits is never mentioned, which is baffling. Losing first round is much worse than losing in the Finals. So how did MJ go from losing records stuck in first round hell to winning. His name is Scottie Pippen. This future Hall of Famer change the course of MJ's career. MJ without Pippen (68-96 41% win rate) and with Pippen (542-212 72% Win rate). That is a massive split between the two. Did MJ magically get that much better? No, he’s already amazing but these splits show, that winning is a team accolade. The Chicago Bulls don’t get the respect they deserve of being one of the greatest team ever because it gets overshadowed by Michael Jordan.<br><br>Let's flip to LBJ for a second. He's had 1 losing record in his whole career. (Up to Lakers while I write this). So which hall of famer did the Cavs add to start propelling LBJ's career? Zydrunas Ilgauskas. He was the second leading scorer. Then next year, they add the stud Larry Hughes. People say LBJ loses in the Finals a lot but let’s look at his first NBA Final roster. His second leading scorer was his boy Ilgauskas at 14 PPG. The rest were avg under 13 PPG. The stud of the team affects the outcome, no doubt but let's look at the team comparisons. In '93, when MJ retired to play baseball, his team went 55-27 and lost to the eventual champions. The following year, before MJ's return they went 35-31. This shows that Michael Jordan made a great team into an elite team. When LBJ left Cavs, the team went from a 61-win team to a 19. They add Kyrie the following year and they still go 21, 24 wins respectively. The Bulls without MJ were 55 win and 35 (out of 66 games). This goes back to Championships is a team accolade. Fast forward to 2018, they went from a 50+ Win team (4 year straight) to a 1-9 record.<br><br>As much grief as LBJ gets for losing 6 NBA Finals, people forget getting there is an accomplishment as well. MJ sported 119-60 playoff record over his career. (66% win rate) Lebron sports a playoff record of 156-83. (65% win rate) This puts into perspective of the 6-0 finals pitch. Lebron has been up there in win rate with MJ in playoffs with a lot more games. (60 more playoff games) This removes the smoke screen of Michael Jordan steamrolling the playoffs. There’s no argument that when he does reach the finals, he wins though. <br><br>The next popular argument is, MJ had to face endless superstars. Here is the list of stars he faced. Magic Johnson, Clyde Dexter, Charles Barley, John Stockton and Karl Malone. He never had to play Hakeem Olajuwon because of a monster we all know, Shaq. This is an impressive list but people arbitrary list hall of famers in this era as if MJ had to play every single one in the playoffs. It’s not even remotely true.<br><br>Next up, we have Lebron James. The list of superstars that Lebron had to play against were Tim Duncan, Tony Parker, Manu Ginobili (debatable but he’s part of the trio), Kawhi Leonard, Dirk Nowitzki, Kevin Durant (OKC), Stephen Curry, Klay Thompson and Kevin Durant (GSW). If you compare the list, can you truly say, Jordan’s opposition would destroy Lebron’s? Outside of the Dirk led Mavs, he had to constantly play the Duncan Spurs and Golden State Warriors. [Table]",
		body2:""
	},
	{
		title: "But LeBron needed 2 All Stars",
		image: "https://usatftw.files.wordpress.com/2018/09/lbj1.jpg?w=1000&h=600&crop=1",
		body: "Per usual, let's start with MJ's first NBA Final roster. Their Big 3 was MJ, Scottie and Horace. 2 Hall of Famers and 1 on the threshold (2019 candidate) vs LBJ, Bosh and Wade. LBJ and Wade should be HOF when it's all said and done. People who say Bosh is a HOF is a joke. His career at TOR sported a solid 20-9-2 line. If you look at only his All-star years 22.8 PTS-9.9 REBS-2.5 AST. He was the lone wolf at TOR, so his numbers were inflated. The year Bosh left Bargnani had 20.8-5-2 stats as the alpha. Kevin Love on the Timberwolves from 2011-2014 sported averages 23.5-13.7-3 but to me isn’t even close to a Hall of Famer. Don't get me wrong, Bosh was solid All Star, but people overblow it like he was an all-world talent.<br><br>Since a lot of NBA advanced stats are debated on importance, let's look at the most popular ones. If we examine Bosh, his metrics are (19.4 PER, .160 WS/48, .5 BPM and avg 1.42 VORP) and Wade (25.4 PER, .205 WS/48, 5.8 BPM and avg 4.5 VORP). Now let's examine Pippen (21.4 PER, .182 WS/48, 6.7 BPM, and avg 5.4 VORP) Horace (18.6PER, .196 WS/48, 5.1 BPM and avg 4.97 VORP). MJ needed 1.5 HOF and LBJ needed 1.5 HOF. This scrubs off the stupid reason on why LBJ's title doesn't count as much. For MJ's 6 championships, he had Pippen in 6, Grant in 3 and Dennis Rodman in 3. So basically all 6 championships, he had 1.5-2 HOF players. <br><br>An underrated aspect is the chemistry that Pippen and MJ had. That's one of the intangibles that you can't put a metrics on, but it makes a huge difference. One of the main reasons the Heatles were so dominant was because of the chemistry of Lebron and Wade, but even that took a couple months to build. Imagine if he had Wade his whole career, that would be a closer comparison to MJ and Pippen.<br><br>Let's look at LBJ's other 2 ships. His second one was with basically the same squad. (1.5HOF) As a Warriors fan, his third ship was the saddest (for Dub Nation), but also one of the most impressive series wins I've ever seen. This was a 73-9 warriors’ team, that had Curry (broke 3 PT record by a huge margin), Klay and Draymond Green. Their chemistry was absurd and holds one of the highest assists to FG ratio in NBA history. (68% FG were assisted) There could be debates of the controversial Draymond suspension but that aside, LBJ and crew took down arguably one of the best teams assembled. There have only been 1 NBA finals that I truly believe was LBJ's fault and that was against the Mavs. His first lost was with a D league team, his other 4 were against one of the most stacked teams in NBA history. People will look back at Curry Klay KD Draymond Insert Center to be NBA2k level roster. I can argue, this team would’ve beat the 92 Bulls but that’s just a hypothetical.<br><br>In conclusion: The debate of LBJ needing All Stars to win isn't false, but so did MJ. You can go back to almost every NBA Champion and make this argument. The Mavs were one of the few that come to mind that won on pure team chemistry. So, all in in all, this scrubs yet another excuse for the Anti Lebron Squad.",
		body2: ""
	},
	{
		title: "Clutch, talk about the Killer Instinct",
		image: "https://i.imgur.com/badUg9q.jpg",
		body: "Let me preface this with, I don't believe clutch is as important as other people believe. I think some players are more focused under pressure, but I don’t believe that they statistically perform that much better than they normally would. Not to say when KD drained that clutch 3 in LBJ's face, I didn't cheer my face off. What I am getting at is, clutch has a lot timing to it. When KD drained that 3, at 40% shooter from the arc, he would’ve made that same shot around 40% of the time. This is being lazy and ignoring LBJ jumping at him. Basically, this shot became clutch because the moment of time it was made. I have yet to see players excel during go ahead/game tying shots. The infamous Kobe Bryant, known for the Mamba Mentality and a montage of highlights of dope shots, has a career 5 for 22 (23%) on go ahead/game tying shots under 10 seconds in the postseason.<br><br>Statically, MJ and LBJ are identical in how clutch they are. In terms of go-ahead shots in the Final 5 seconds of playoff, MJ has 3 buzzer beaters and 7 for 11 overall (45%) vs LBJ 4 buzzer beater 6 for 13. (46%) Essentially, if you want to go clutch, LBJ has technically been 1% more clutch on 2 more shots. If you expand the criteria to last 10 seconds, the gap widens. MJ is at 7 for 15 (47%) and Lebron is at 12 for 23 (52%). I would take Lebron for the last shot over MJ or Mamba Mentality. <br><br>The next argument that comes is normally the eye test. You will often hear: “When I see Jordan, he just has that killer instinct and you knew he was going to make it”. This makes absolutely no sense because the stats provided earlier are events that happened. That vibe you got from Jordan was because he was amazing, not because of this ungodly killer instinct he has. If Jordan shot 8 for 11 on go ahead buckets and somehow always turns into a sharpshooter than I would have nothing to say. Jordan made roughly how much he was supposed to make. <br><br>Lastly, people say LBJ passes it during crunch time, aka the Ray Allen savior 3. Which he technically didn’t pass it. He tried to take that 3 to send it to OT. People forget it was LBJ's 15 fourth Q points back into. Also, LBJ's playstyle is play making. If statically he makes a shot 32% rate from 3 and you have a wide-open Ray Allen at 41%, why wouldn't you pass it? People say, MJ would've taken it. I don't understand how this is an argument of who’s better, it's based on strength. LBJ in his prime had an unstoppable drive which caused the lanes to be clogged, allowing wide open 3s. Knocking one of the best aspects of LBJ's game, makes no sense. Also, let’s not forget the famous pass from MJ off the double team to Kerr at the top of the key for the game winner. Without this, Jordan would’ve lost the 1997 NBA Championship. It’s ironic because Jordan knew a wide-open Kerr was a better option than his doubled team shot. MJ doesn’t get knocked for it because he’s Jordan.  <br><br>In conclusion: MJ is more clutch than LBJ is a lie. They are both relatively the same under 5 seconds but LBJ is 5% better under 10 seconds.",
		body2: ""
	},
	{
		title: "BUT THE ERAS",
		image: "https://i.imgur.com/CYm0Iqa.png",
		body: "The difference of eras is something statistics will never be able to show. Some of the main things people use with the Jordan Era is the toughness and hand checking.<br><br>I think it is blasphemous that people think that a 250lb, 6'8, freight train of a man in LBJ would not be tough enough to drive into much smaller defenders? This current generation of medicine and technology has produced athletes that the world has never seen. There's a reason that you constantly see people beat records for 40-yard dash in NFL, Olympic records, and so on. These are all athletic accolades. <br><br>On to hand checking. LBJ was a lockdown defender in his prime before all the mileage wore him down. Hand checking works both ways because this allows LBJ to hand check people as well. I can't even imagine someone like Kawhi with hand checking. <br><br>Still not convinced? I just watched Zion Williamson debut yesterday. Dude is a freak of nature, 6'7 285lbs with a 45in vertical. This is almost the same bounce as MJ with 70 more lbs. I'm not saying Zion is better than MJ but just examining the physical specimens that exist nowadays.<br><br>Next is also a crucial rule change that people forget. In the ‘90s, there was a rule called illegal defense rule. In this rule, you had to stay within 3 ft of your defender. This was basically a mandated man to man defense. This prevented Zone defense which makes it a lot easier to score. Without Zone defense, it was harder to camp in the paint and wait for a driver. It also made it harder to double team people. The Bulls exploited this by having MJ iso on one side. <br><br>Another interesting tidbit about MJ’s era. During 1988-1990, the Heat, Hornets, Timberwolves and Magic were added to the NBA which help dilute the team depths around the league. Again, this happened in 1995 when the NBA added the Grizzlies and Raptors. Teams were weakened as the talent pool was spread across an additional six teams over a 7-year span.<br><br>Lastly, the 3PT line was shorten. It went from 23.75 ft to 22 ft.  Jordan, a career 30% shooter from the arc exploded to career highs 40.4% during that span. <br><br>In conclusion: There will never be a way to settle eras but I will lazily say the era debate washes because for every point of one era being harder, a counterpoint can be found. ",
		body2: ""
	},
	{
		title: "Who Wins?",
		image: "https://i.imgur.com/rKfZSLE.png",
		body:"Some might say bias to generation or bias to player. I'm a Warriors/Carmelo fan, so I have 0 affiliation to LBJ. I do have a generational gap bias and missed some of the most talented players to ever grace the hardwood. If I had to choose between the 2, I would choose LeBron James.<br><br>Here's the final thoughts on why. Let's examine primes only because MJ took some years off so less mileage. LeBron has the better court vision, drive to the basket, 3PT, post-up and clutch. MJ has the better mid-range (includes fadeaways and all), free throw and debatably defense. <br><br>Since prime of MJ and LBJ is debatable, According to advanced stats of NBA prime (25-29), MJ (.222 WS/48, 10.4 BPM, .119 VORP/g) vs LBJ (.284 WS/48, 10.5 BPM, .12 VORP/g) If you want to explain the course of both their all-star careers, ages 21 to 33, MJ: (.222 WS/48, 9.4 BPM, .111 VORP/g) vs LBJ (.201 WS/g 9.7 BPM .114 VORP/g) <br><br>All in all, I choose LBJ because he has a better all-around game and he makes his team better. He beats MJ in advanced stats, not by much but we are comparing 1 and 2. My ending thought is, I'm not knocking MJ, this is a discussion of GOAT, #2 all time is just as amazing.",
		body2:""
	},
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
	SecretBlog.remove({},function(err){
		if(err){
			console.log("Failed to Delete");
		}
		secretData.forEach(function(seed){
			SecretBlog.create(seed,function(err){
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

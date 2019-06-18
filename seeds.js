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
		showImage:"https://i.imgur.com/b9545EW.jpg",
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
		image: "https://i.imgur.com/znZBY57.jpg",
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
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png",
		showImage:"https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png",
		body: "Most of the content was found on Wikipedia: (https://en.wikipedia.org/wiki/Carmelo_Anthony). As for the images, they were found on Google Images. Disclaimer, if any of these photo's are yours and you want them to be removed, please email me @ RICKYCHEN10@GMAIL.COM.",
		date:"2019"
	}
];

var secretData =[
	{
		title: "Championship debate",
		image: "https://i.imgur.com/vBacSFG.jpg",
		body: "The age out debate of how many rings does player X and player Y has.<table><tr><th></th><th>MJ</th><th>LBJ</th></tr><tr><th>Final Appearances</th><td>6</td><td>9</td></tr><tr><th>Finals Winrate</th><td>100%</td><td>33%</td></tr><tr><th>Finals MvP</th><td>6</td><td>3</td></tr><tr><th>Finals Averages</th><td>43MPG <br />33.5PTS<br />6REB<br />6.11AST<br />1.82ST<br />.68BLK<br />2.5TO <br />48%FG-81%FT<br />16.2SM-30.6SA</td><td>42.66MPG <br />28PTS<br />9.82REB<br />7.8AST<br />1.6ST<br />.83BLK<br />4.1TO <br />47.5%FG-73%FT<br />13.29SM-25.98SA</td></tr><br /><tr><th>Finals Averages Adjusted</th><td>43MPG <br />33.5PTS<br />6REB<br />6.11AST<br />1.82ST<br />.68BLK<br />2.5TO <br />48%FG-81%FT<br />16.2SM-30.6SA</td><td>42.66MPG <br />32.75PTS<br />9.89REB<br />7.9AST<br />1.6ST<br />.84BLK<br />4.12TO <br />47.5%FG-73%FT<br />13.29SM-25.98SA</td><td>This is done because MJ took on average 4.615 more shots. If you adjust LBJ 22% 3PTA and 78% 2PTA, he would score 4.23 more points on 47.5%FG and 31.7% 3P. Also the extra 20 seconds MJ played, LBJ per second production is .0127PT-.0038REB-.00305AST-.000625ST-.0000317BLK-.000967TO.</td></tr></table> Based on the broadview, MJ dominates the NBA Finals with a 100% winrate and 100% Finals MVP winrate. If you examine the averages, he's better in PPG, SPG, TO, FG/FT. I wanted to dig deeper and examine if LBJ was as ball dominate as MJ, you can see the PPG become almost the same. This has been one of the biggest selling points on why MJ is better, scoring. Just because LBJ doesn't take those shots doesnt mean he can't. With the same shot attempts, their PPG is almost identical. I'm not saying LBJ is a better shooter since they score their own way, but as a scorer, they are that far apart. These averages are including LBJ's 07 series when he was only a JR in the league. (MJ was 27 for his first final)",
		body2: "Conculsion: MJ on paper has a better resume in terms of NBA Finals. Proceed to the next post for a deeper dive that examines both playoff careers."
	},
	{
		title: "Let's examine the playoffs",
		image: "http://content.sportslogos.net/logos/6/981/full/4435__nba_playoffs-primary_on_dark-2007.png",
		body: "One of the biggest knock on LeBron is he plays in the terrible East, where anyone can make the playoffs. I don't disagree with this statement but MJ's East usually had 2-3 good teams as well. Let's examine both their playoff paths.<table><tr><th></th><th>Age</th><th>Record</th><th>Notes</th><th>Playoff Results</th></tr><tr><th>MJ</th><td>21</td><td>38-44</td><td>None</td><td>Lost 1st Round</td></tr><tr><th>MJ</th><td>22</td><td>30-52</td><td>None</td><td>Lost 1st Round</td></tr><tr><th>MJ</th><td>23</td><td>40-42</td><td>Added Pippen 21MPG</td><td>Lost Semi</td></tr><tr><th>MJ</th><td>25</td><td>47-35</td><td>Pippen rises to 33MPG</td><td>Lost East Finals</td></tr><tr><th>MJ</th><td>26</td><td>55-27</td><td>None</td><td>Lost East Finals</td></tr><tr><th>MJ</th><td>27</td><td>61-21</td><td>None</td><td>Won Finals</td></tr><tr><th>MJ</th><td>28</td><td>67-15</td><td>None</td><td>Won Finals</td></tr><tr><th>MJ</th><td>29</td><td>57-25</td><td>None</td><td>Won Finals</td></tr><tr><th>MJ Retires</th><td>30</td><td>55-27</td><td>None</td><td>Won Semi in a 7 games against eventual NBA Champions Knicks</td></tr><tr><th>MJ Retires but comes back</th><td>31</td><td>47-35</td><td>comes back for 17 games, bulls were 35-31 without him</td><td>Lost in Semis</td></tr><tr><th>MJ</th><td>32</td><td>72-10</td><td>None</td><td>Won Finals</td></tr><tr><th>MJ</th><td>33</td><td>69-13</td><td>None</td><td>Won Finals</td></tr><tr><th>MJ</th><td>34</td><td>62-20</td><td>None</td><td>Won Finals</td></tr><tr><th></th><td></td><td></td><td></td><td></td></tr><tr><th></th><td></td><td></td><td></td><td></td></tr><tr><th>LBJ</th><td>19</td><td>35-47</td><td>None</td><td>No Playoffs</td></tr><tr><th>LBJ</th><td>20</td><td>42-40</td><td>None</td><td>No Playoffs</td></tr><tr><th>LBJ</th><td>21</td><td>50-32</td><td>None</td><td>Lost Semi</td></tr><tr><th>LBJ</th><td>22</td><td>50-32</td><td>None</td><td>Lost Finals</td></tr><tr><th>LBJ</th><td>23</td><td>45-37</td><td>None</td><td>Lost Semi Finals</td></tr><tr><th>LBJ</th><td>24</td><td>66-16</td><td>None</td><td>Lost Conf Finals</td></tr><tr><th>LBJ</th><td>25</td><td>61-21</td><td>None</td><td>Lost Conf Finals</td></tr><tr><th>LBJ</th><td>26</td><td>58-24</td><td>None</td><td>Lost Semi Finals</td></tr><tr><th>LBJ</th><td>27</td><td>46-20</td><td>None</td><td>Won Finals</td></tr><tr><th>LBJ</th><td>28</td><td>66-16</td><td>None</td><td>Won Finals</td></tr><tr><th>LBJ</th><td>29</td><td>54-28</td><td>None</td><td>Lost Finals</td></tr><tr><th>LBJ</th><td>30</td><td>53-29</td><td>None</td><td>Lost Finals</td></tr><tr><th>LBJ</th><td>31</td><td>57-25</td><td>None</td><td>Won Finals</td></tr><tr><th>LBJ</th><td>32</td><td>51-31</td><td>None</td><td>Lost Finals</td></tr><tr><th>LBJ</th><td>32</td><td>50-32</td><td>None</td><td>Lost Finals</td></tr></table></div> <p>Let's examine MJ first. He was below .500 his first 3 years of his career and made the playoffs with losing records, which is unheard of in modern NBA. He also lost in the first round. As much grief as LBJ gets for losing 6 NBA Finals, people forget getting there is an accomplishment as well.<table><tr><th></th><th>Round</th><th>Lost</th></tr><tr><th>MJ</th><td>1</td><td>3</td></tr><tr><th>LBJ</th><td>1</td><td>0</td></tr><tr><th>MJ</th><td>2</td><td>2</td></tr><tr><th>LBJ</th><td>2</td><td>3</td></tr><tr><th>MJ</th><td>3</td><td>2</td></tr><tr><th>LBJ</th><td>2</td><td>2</td></tr><tr><th>MJ</th><td>4</td><td>0</td></tr><tr><th>LBJ</th><td>4</td><td>6</td></tr</table>",
		body2:"MJ having 3 first round exits is never mentioned, which is baffling. Losing first round is much worst than losing in the Finals imho. So how did MJ go from losing records|stuck in first round hell to winning. His name is Scottie Pippen. This future Hall of Famer change the course of MJ's career. MJ w/o Pippen(68-96 41% Winrate) and with Pip (542-212 72% Winrate) Let's flip to LBj for a second. He's had 1 losing record in his whole career. (Up to Lakers while I write this). So which hall of famer did the Cavs add to start propelling LBJ's career? Zydrunas Ilgauskas. He was the second leading scorer. Then next year, they add the stud Larry Hughes. People say LBJ loses in the Finals a lot but lets look at his first NBA Final roster. His second leading scorer was his boy Ilgauska at 14PPG. The rest were avg under 13PPG. Championships are team accolades. The stud of the team affects the outcome, no doubt but let's look at the team comparisons. In '93 when MJ retired to play baseball, his teamw ent 55-27 and lost to the eventual champions. The following year, before MJ's return they went 35-31. When LBJ left Cavs, the team went from a 61 win team to a 19. They add Kyrie the following year and they still go 21 24 win respectively. The Bulls without MJ were 55 win and 35 (out of 66 games). This goes back to Championships is a team accolade. Fast forward to 2018, they went from a 50+ Win team(4 year straight) to a 1-9 record."
	},
	{
		title: "But LeBron needed 2 All Stars",
		image: "https://usatftw.files.wordpress.com/2018/09/lbj1.jpg?w=1000&h=600&crop=1",
		body: "Per usual, let's start with MJ's first NBA Final roster. Their Big 3 was MJ, Scottie and Grant. 2 Hall of Famers and 1 on the threshold (2019 candidate) vs LBJ, Bosh and Wade. LBJ and Wade should be HOF when it's all said and done. People who say Bosh is a HOF is a joke. His career at TOR sported a solid 20-9-2 line. If you look at only his All-star years 22.8-9.9-2.5. He was the lone wolf at TOR so his numbers were inflated. The year Bosh left Bargnani had 20.8-5-2 stats as the alpha. Don't get me wrong, Bosh was solid all star but people overblow it like he was an all world talent. Needless to say, MJ needed 1.5 HOF and LBJ needed 1.5 HOF. This scrubs off the stupid reason on why LBJ's title doesn't count as much. For MJ's 6 championships, he had Pippen in 6, Grant in 3 and Dennis Rodman in 3. So basically all 6 championships, he had 1.5-2 HOF players. Let's look at LBJ's other 2 ships. His second one was with basically the same squad. (1.5HOF) As a Warriors fan, his third ship was the saddest (for Dub Nation), but also one of the most impressive series wins I've ever seen. This was a 73-9 warriors team, that had Curry(broke 3 pt record by a huge margin), Klay and Draymond Green. There could be debates of the converstaional Draymond suspension but that aside, LBJ and crew took down arguably one of the best teams assembled. There has only been 1 NBA finals that I truly believe was LBJ's fault and that was against the Mavs. His first lost was with a D league team, his other 4 were against one of the most stacked teams in NBA history. People will look back at Curry Klay KD Draymond Insert Center to be NBA2k level roster. I can argue, this team wouldve destroyed the 92 Bulls but thats just a hypothetical.",
		body2: "In conclusion: The debate of LBj needing All Stars to win isn't false, but so did MJ. You can go back to almost every NBA Champsion and make this argument. The Mavs were one of the few that come to mind that won on pure team chemistry. So all in in all, this scrubs yet another excuse for the Anti Lebron Squad."
	},
	{
		title: "Clutch, talk about the Killer Instinct",
		image: "https://www.pressdemocrat.com/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=bRdgvqbMIxADlLgsmspl5c$daE2N3K4ZzOUsqbU5sYubbr0oGu9T2o9BlNg4RiISWCsjLu883Ygn4B49Lvm9bPe2QeMKQdVeZmXF$9l$4uCZ8QDXhaHEp3rvzXRJFdy0KqPHLoMevcTLo3h8xh70Y6N_U_CryOsw6FTOdKL_jpQ-&amp;CONTENTTYPE=image/jpeg",
		body: "The age old, whos more clutch debate. Let me preface this with, I don't believe clutch is as important as other people believe. Not to say when KD drained that quote on quote clutch 3 in LBJ's face, I didn't cheer my face off. What I am getting at is, clutch has a lot of luck to it. When KD drained that 3, at 40% shooter from the arc, he wouldve made that same shot around 40% of the time. This is being lazy and ignoring LBJ jumping at him. Basically, this shot became clutch because the moment of time it was made. Anyways, let's just assume clutch is all its said to be. Statiscally, MJ and LBJ are identical in clutchness. In terms of go-ahead shots in the Final 5 seconds of playoff, MJ has 3 buzzer beaters and 5 for 11 overall (45%) vs LBJ 4 buzzer beater 6 for 13 (46%) Essentially, if you want to go clutch, LBJ has technically been 1% more more clutch and 2 more shots. Lastly, people say LBJ passes it during crunch time, aka the Ray Allen savior 3. People forget it was LBJ who went on 15-0 run to bring them back into. Also LBJ's playstyle is play making. If statiscally he makes a shot 32% rate from 3 and you have a wide open Ray Allen at 41%, why wouldn't you pass it? People say oh MJ would've taken it. I don't understand how this is an agrument of whos better, it's based on strength. LBJ in his prime had an unstoppable drive which caused the lanes to be clogged, allowing wide open 3s. Knocking one of the affects of LBJ pulling in defenses makes no sense.",
		body2: "In conculsion: MJ is more clutch than LBJ is a lie. They are both relatively the same clutchness."
	},
	{
		title: "BUT THE ERAS",
		image: "https://www.pressdemocrat.com/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=bRdgvqbMIxADlLgsmspl5c$daE2N3K4ZzOUsqbU5sYubbr0oGu9T2o9BlNg4RiISWCsjLu883Ygn4B49Lvm9bPe2QeMKQdVeZmXF$9l$4uCZ8QDXhaHEp3rvzXRJFdy0KqPHLoMevcTLo3h8xh70Y6N_U_CryOsw6FTOdKL_jpQ-&amp;CONTENTTYPE=image/jpeg",
		body: "The difference of eras is something statistics will never be able to show. Some of the main things people use with the Jordan Era is the toughness and hand checking. So you're telling me, 250lb 6'8 freight train of a man in LBJ would not be tough enough to drive into much smaller defenders? This current generation of medicine and technology has produced athletes that the world has never seen. On to hand checking. LBJ was a lockdown defender in his prime before all the mileage worn him down. You're saying if you give him hand checking, he wouldn't shut people down even more? Still not convinced? I just watched Zion Williamson debut yesterday. Dude is a freak of nature, 6'7 285lbs with a 45in vertical. This is almost the same bounce as MJ with 70 more lbs.",
		body2: "In conculsion: There will never be a way to settle eras. I will lazily say the eras wash because OG had tougher defense and hand checking. The new gen has the faster pace and better athletes. (I'm not saying there weren't all world atheletes in the past but overall, as a whole, people are getting stronger and faster)"
	},
	{
		title: "Who Wins?",
		image: "https://usathoopshype.files.wordpress.com/2017/11/lebron-flexing.jpg?w=1000&h=600&crop=1",
		body:"Some might say bias to generation or bias to player. I'm a Warriors/Carmelo fan, so I have 0 homerism to LBJ. I do have a generational gap and missed some of the most talented players to ever grace the hardwood. If I had to choose between the 2, I would choose LeBron James. Here's the final thoughts on why. Let's examine primes since MJ took some years off so less mileage. LeBron has the better court vision, drive to the basket and post-up. MJ has the better mid range, free throw and debatably defense. The 3 pt shot is a wash since MJ rarely took 3s, 1.7 a game at 30%. MJ knew he wasn't a good 3 point shooter so he didn't take it, which goes back to LeBron knew his drive and kick out is one of his biggest strengths. All in all, I choose LBJ because he has a better all around game and he makes his team better. If they were playing Horse, I'd choose MJ. My ending thought is, I'm not knocking MJ, this is a discussion of GOAT, #2 all time is just as amazing.",
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

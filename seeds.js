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
		body: "Let’s start with the most popular case of why player X is better than player Y; championships. For some reason, this team accolade is the first bullet fired against rebuttals of who is better. Oddly, people like Robert Horry (7 Rings), John Havlicek (8 Rings), Sam Jones (10 Rings) and Bill Russell (11 Rings) never enter the conversation of GOAT with more rings. A team accolade should not be the backbone of an argument of which player is better. <br><br> If we focus solely on championship as a gauge of talent, was Kevin Durant any less of a player before he won a ring? No, because his most dominant years were in OKC during 2009-2014 by win shares, VORP and OBPM. I would take 2013-2014 ringless KD over 2016-2017 champion KD. Essentially what I am getting at is this, rings do not dictate how good a player is. A final thought on this comparison is, would you take the Warriors with 2013 KD or 2017 KD? It seems like people conveniently use the ring debate when it suits them.<br><br>Here is the NBA Finals Comparison:<br><br><html><body><table class=\"ui celled table mjlbjfinals\"><tr><th></th><th>MJ</th><th>LBJ</th></tr><tr><th>Final Appearances</th><td>6</td><td>9</td></tr><tr><th>Finals Winrate</th><td>100%</td><td>33%</td></tr><tr><th>Finals MvP</th><td>6</td><td>3</td></tr><tr><th>Finals Averages</th><td>43 MPG <br/>33.5 PTS<br/>6 REB<br/>6.11 AST<br/>1.82 ST<br/>.68 BLK<br/>2.5 TO <br/>48% FG-81% FT<br/>16.2 FG-30.6 FGA</td><td>42.66 MPG <br/>28 PTS<br/>9.82 REB<br/>7.8 AST<br/>1.6 ST<br/>.83 BLK<br/>4.1 TO <br/>47.5% FG-73% FT<br/>13.29FG-25.98 FGA</td></tr><tr><th>Finals Averages Adjusted</th><td>43 MPG <br/>33.5 PTS<br/>6 REB<br/>6.11 AST<br/>1.82 ST<br/>.68 BLK<br/>2.5 TO <br/>48% FG-81% FT<br/>16.2 FG-30.6 FGA</td><td>42.66 MPG <br/>32.75 PTS<br/>9.89 REB<br/>7.9 AST<br/>1.6 ST<br/>.84 BLK<br/>4.12 TO <br/>47.5% FG-73% FT<br/>13.29 FG-25.98 FGA</td></tr></table></body></html>This conversion is done because MJ took on average 4.615 more shots. If you adjust LBJ 22% 3PTA and 78% 2PTA, he would score 4.23 more points on 47.5%FG and 31.7% 3P. Also, the extra 20 seconds MJ played, LBJ per second production is .0127PT- .0038REB- .00305AST- .000625ST- .0000317BLK- .000967TO. If you examine the adjusted stats, the better scorer argument quickly becomes debatable. This extrapolation doesn't work with every player but since we are debating GOAT, we are on the assumption, LBJ would capitalize on these extra shots. <br><br>MJ dominates the NBA Finals with a 100% win rate and 100% Finals MVP win rate, but if you examine the averages, he's only better in PPG, SPG, TO, FG/FT. This has been one of the biggest selling points on why MJ is better, scoring. Just because LBJ doesn't take those shots doesn’t mean he can't. With the same shot attempts, their PPG is almost identical. I'm not saying LBJ is a better shooter since they score their own way, but as a scorer, they are not that far apart. The only thing I can't argue is MJ is a way better overall shooter. <br><br>These averages are including LBJ's 07 series when he was only a Junior in the league. MJ was on his sixth season for his first final which is a massive experience advantage. There is a massive correlation with experience and development. Therefore, NBA players don’t start peaking until 3-4 years into the league. Ben Simmons was crucified by half the fan base because he wasn’t a rookie for the extra year of development he had while he was injured.  If one year was that big of a difference, imagine 6 full NBA years of experience and being in your prime. Everyone knows the value of years of experience in the league, but they quickly discount it for superstars such as Lebron James. <br><br>Conclusion: Although MJ on paper had a better resume in terms of NBA Finals, hopefully you are starting to see that it doesn’t matter. Proceed to the next post for a deeper dive that examines both playoff careers.",
		body2: ""
	},
	{
		title: "Let's examine the playoffs",
		image: "https://i.imgur.com/IBaSC3o.png",
		body: "Next on the list is one of the biggest knocks on LeBron; he plays in the terrible East, where anyone can make the playoffs. I don't disagree with this statement, but MJ's East was not that different with 2-3 good teams. Let's examine both their playoff paths:<br><br> <table class=\"ui celled table lbjplayoffs\"><tr><th></th><th>Age</th><th>Record</th><th>Notes</th><th>Playoff Results</th></tr><tr><th>MJ</th><td>21</td><td>38-44</td><td>None</td><td>Lost 1st Round</td></tr><tr><th>MJ</th><td>22</td><td>30-52</td><td>None</td><td>Lost 1st Round</td></tr><tr><th>MJ</th><td>23</td><td>40-42</td><td>Added Pippen 21MPG</td><td>Lost Semi</td></tr><tr><th>MJ</th><td>25</td><td>47-35</td><td>Pippen rises to 33MPG</td><td>Lost East Finals</td></tr><tr><th>MJ</th><td>26</td><td>55-27</td><td>None</td><td>Lost East Finals</td></tr><tr><th>MJ</th><td>27</td><td>61-21</td><td>None</td><td>Won Finals</td></tr><tr><th>MJ</th><td>28</td><td>67-15</td><td>None</td><td>Won Finals</td></tr><tr><th>MJ</th><td>29</td><td>57-25</td><td>None</td><td>Won Finals</td></tr><tr><th>MJ Retires</th><td>30</td><td>55-27</td><td>None</td><td>Lost Semi in a 7 games against eventual NBA Champions Knicks</td></tr><tr><th>Retires<th><td>31</td><td>47-35</td><td>comes back for 17 games, bulls were 35-31 without him</td></tr><tr><th>MJ</th><td>32</td><td>72-10</td><td>None</td><td>Won Finals</td></tr><tr><th>MJ</th><td>33</td><td>69-13</td><td>None</td><td>Won Finals</td></tr><tr><th>MJ</th><td>34</td><td>62-20</td><td>None</td><td>Won Finals</td></tr></table><table class=\"ui celled table lbjplayoffs\"><tr><th></th><th>Age</th><th>Record</th><th>Notes</th><th>Playoff Results</th></tr><tr><th>LBJ</th><td>19</td><td>35-47</td><td>None</td><td>No Playoffs</td></tr><tr><th>LBJ</th><td>20</td><td>42-40</td><td>None</td><td>No Playoffs</td></tr><tr><th>LBJ</th><td>21</td><td>50-32</td><td>None</td><td>Lost Semi</td></tr><tr><th>LBJ</th><td>22</td><td>50-32</td><td>None</td><td>Lost Finals</td></tr><tr><th>LBJ</th><td>23</td><td>45-37</td><td>None</td><td>Lost Semi Finals</td></tr><tr><th>LBJ</th><td>24</td><td>66-16</td><td>None</td><td>Lost Conf Finals</td></tr><tr><th>LBJ</th><td>25</td><td>61-21</td><td>None</td><td>Lost Conf Finals</td></tr><tr><th>LBJ</th><td>26</td><td>58-24</td><td>None</td><td>Lost Semi Finals</td></tr><tr><th>LBJ</th><td>27</td><td>46-20</td><td>None</td><td>Won Finals</td></tr><tr><th>LBJ</th><td>28</td><td>66-16</td><td>Joins Wade & Bosh </td><td>Won Finals</td></tr><tr><th>LBJ</th><td>29</td><td>54-28</td><td>None</td><td>Lost Finals</td></tr><tr><th>LBJ</th><td>30</td><td>53-29</td><td>None</td><td>Lost Finals</td></tr><tr><th>LBJ</th><td>31</td><td>57-25</td><td>None</td><td>Won Finals</td></tr><tr><th>LBJ</th><td>32</td><td>51-31</td><td>None</td><td>Lost Finals</td></tr><tr><th>LBJ</th><td>32</td><td>50-32</td><td>None</td><td>Lost Finals</td></tr></table> <br><br>Let's examine MJ first. He was below .500 his first 3 years of his career and made the playoffs with losing records, which is unheard of in modern NBA. The 1985 Chicago Bulls made 8th seed with a 30-52 record which shows how bad the East was. There were three teams under .500 in the Eastern Playoffs. Barring the records, this is like the modern Eastern Conference with it being top heavy with a bunch of lottery teams. Jordan lost in the first round twice and followed it with a round two exit. MJ having 3 first round exits is never mentioned, which is baffling because losing in the first round is much worse than losing in the Finals. So how did MJ go from losing records stuck in first round hell to winning. His name is Scottie Pippen. This future Hall of Famer change the course of MJ's career. MJ without Pippen (68-96 41% win rate) and with Pippen (542-212 72% Win rate). That is a massive split between the two. Did MJ magically get that much better? No, he’s already an amazing scorer but these splits show, that winning is a team accolade. The Chicago Bulls don’t get the respect they deserve of being one of the greatest team ever because it gets overshadowed by Michael Jordan. <br><br>Let's flip to LBJ for a second. He's had 1 losing record in his whole career. (Up to Lakers while I write this). So which hall of famer did the Cavs add to start propelling LBJ's career? Zydrunas Ilgauskas. He was the second leading scorer. Then next year, they add the stud Larry Hughes. <br><br> One majority factor that is often ignored is, Lebron never went to college. His highest level of competition before the NBA were high schoolers. The jump from college to the NBA is a major leap in talent, so imagine from high school to NBA. This goes back to experience because you can see massive improvements from Lebron after a year of development with professional trainers and facilities. LBJ's rookie year is the only year he has shot under 47.2%. <br><br>The notation that LBJ loses in the Finals a lot is a bad take because most of the results can be explained. Let’s look at his first NBA Final roster; second leading scorer was his boy Ilgauskas at 14 PPG. The rest were averaging under 13 PPG. The stud of the team affects the outcome, no doubt but let's look at the team comparisons. In '93, when MJ retired to play baseball, his team went 55-27 and lost to the eventual champions. The following year, before MJ's return they went 35-31. This shows that Michael Jordan made a great team into an elite team. When LBJ left the Cavs, the team went from a 61-win team to a 19. They add Kyrie the following year and they still go 21, 24 wins respectively. The Bulls without MJ were 55 win and 35 (out of 66 games). This goes back to Championships is a team accolade. Fast forward to 2018, they went from a 50+ Win team (4 year straight) to a 1-9 record. <br><br>As much grief as LBJ gets for losing 6 NBA Finals, people forget getting there is an accomplishment as well. MJ sported 119-60 playoff record over his career. (66% win rate) Lebron sports a playoff record of 156-83. (65% win rate) This puts into perspective of the 6-0 Finals pitch. Lebron has been up there in win rate with MJ in playoffs with a lot more games. (60 more playoff games) This removes the smoke screen of Michael Jordan steamrolling the playoffs. There’s no argument that when he does reach the finals, he wins though. <table class=\"ui celled table\"><tr><th></th><th>Round</th><th>Lost</th></tr><tr><th>MJ</th><td>1</td><td>3</td></tr><tr><th>LBJ</th><td>1</td><td>0</td></tr><tr><th>MJ</th><td>2</td><td>2</td></tr><tr><th>LBJ</th><td>2</td><td>3</td></tr><tr><th>MJ</th><td>3</td><td>2</td></tr><tr><th>LBJ</th><td>2</td><td>2</td></tr><tr><th>MJ</th><td>Finals</td><td>0</td></tr><tr><th>LBJ</th><td>Finals</td><td>6</td></tr></table><br><br>The next popular argument is, MJ had to face endless superstars. Here is the list of stars he faced. Magic Johnson, Clyde Dexter, Charles Barley, Shawn Kemp and Gary Payton. John Stockton (35) and Karl Malone (34) are debatable because MJ played them twice when they were outside of their prime. He never had to play Hakeem Olajuwon because of a monster we all know, Shaq. This is an impressive list but people arbitrary list hall of famers in this era as if MJ had to play every single one in the playoffs. It’s not even remotely true. <br><br>Next up, we have Lebron James. The list of superstars that Lebron had to play against were Tim Duncan, Tony Parker, Manu Ginobili (debatable but he’s part of the trio), Kawhi Leonard, Dirk Nowitzki, Kevin Durant (OKC), Stephen Curry, Klay Thompson and Kevin Durant (GSW). If you compare the list, can you truly say, Jordan’s opposition would destroy Lebron’s? Outside of the Dirk led Mavs, he had to constantly play either play the Spurs Trio or the Warrior’s Dynasty. <br><br> Conclusion: MJ has not had a better playoff resume than Lebron. If you don't nitpick just the Finals, you can see that their playoff team accolades are very similar.",
		body2:""
	},
	{
		title: "But LeBron needed 2 All Stars",
		image: "https://usatftw.files.wordpress.com/2018/09/lbj1.jpg?w=1000&h=600&crop=1",
		body: "Let’s examine NBA Final rosters. Their Big 3 was Michael Jordan, Scottie Pippen and Horace Grant; 2 Hall of Famers and 1 on the threshold. (2019 candidate) The other Big 3 consists of Lebron James, Dwyane Wade and Chris Bosh. LBJ and Wade should be HOF when it's all said and done, but to say Bosh is an automatic HOF is a joke. His career at TOR sported a solid 20-9-2 line. If you look at only his All-star years 22.8 PTS-9.9 REBS-2.5 AST. He was the lone wolf at TOR, so his numbers were inflated. The year Bosh left Bargnani had 21-5-2 stats as the alpha. Kevin Love on the Timberwolves from 2011-2014 sported averages 23.5-13.7-3 but isn’t a Hall of Famer. Bosh was solid All Star, but don’t overblow it like he was an all-world talent. <br><br>Since a lot of NBA advanced stats are debated on importance, let's look at the most popular ones. If we examine Bosh, his metrics are (19.4 PER, .160 WS/48, .5 BPM and avg 1.42 VORP) and Wade (25.4 PER, .205 WS/48, 5.8 BPM and avg 4.5 VORP). Now let's examine Pippen (21.4 PER, .182 WS/48, 6.7 BPM, and avg 5.4 VORP) Horace (18.6PER, .196 WS/48, 5.1 BPM and avg 4.97 VORP). If you combine them just to see the comparison, 44.8 PER 6.3 BPM 5.92 VORP vs 40PER 11.8 BPM 10.37. The only metric that the Wade and Bosh combination wins is PER because of Wade’s insane efficiencies. Examining the next two metrics, it’s not even remotely close. The difference between MJ’s crew and LBJ’s crew is 5.5 BPM and 4.45 VORP. That’s almost half of another Michael Jordan. If we say Wade and Pippen cancel out, you can see Horace Grant is leagues ahead of Chris Bosh. This shows that Lebron didn’t have more help than MJ, in fact, he had less. On top of that, 38-year-old Ray Allen should not be on this list of “Hall Of Famers” that Lebron needed to win. <br><br>An underrated aspect is the chemistry that Pippen and MJ had. That's one of the intangibles that you can't put a metrics on, but it makes a huge difference. One of the main reasons the Heatles were so dominant was because of the chemistry of Lebron and Wade, but even that took a couple months to build. Imagine if he had Wade his whole career, that would be a closer comparison to MJ and Pippen. .<br><br>Conclusion: The debate that Lebron James had more All-star help than MJ isn’t true. You can go back to almost every NBA Champion and make this argument. The Mavs were one of the few that come to mind that won on pure team chemistry. So, all in in all, this removes yet another excuse for the Anti Lebron Squad.",
		body2: ""
	},
	{
		title: "Clutch, talk about the Killer Instinct",
		image: "https://i.imgur.com/badUg9q.jpg",
		body: "Let me preface this with, I don't believe clutch is as important as other people believe. I think some players are more focused under pressure, but I don’t believe that they statistically perform that much better than they normally would. Not to say when KD drained that clutch 3 in LBJ's face, I didn't cheer my face off. What I am getting at is, clutch has a lot timing to it. When KD drained that 3, at 40% shooter from the arc, he would’ve made that same shot around 40% of the time. This is being lazy and ignoring LBJ jumping at him. Basically, this shot became clutch because the moment of time it was made. I have yet to see players excel during go ahead/game tying shots. The infamous Kobe Bryant, known for the Mamba Mentality and a montage of highlights of dope shots, has a career 5 for 22 (23%) on go ahead/game tying shots under 10 seconds in the postseason. <br><br>Statically, MJ and LBJ are identical in how clutch they are. In terms of go-ahead shots in the final 5 seconds of playoff, MJ has 3 buzzer beaters and 5 for 11 overall (45%) vs LBJ 4 buzzer beater 7 for 15. (47%) Essentially, if you want to go clutch, LBJ has technically been 2% more clutch on 4 more shots. If you expand the criteria to last 10 seconds, the gap widens. MJ is at 7 for 15 (47%) and Lebron is at 12 for 23 (52%). Statistically, I would take Lebron for the last shot over MJ or Mamba Mentality. <br><br>The next argument that comes is the eye test. You will often hear: “When I see Jordan, he just has that killer instinct and you knew he was going to make it”. This makes absolutely no sense because the stats provided earlier are events that happened. That vibe you got from Jordan was because he was amazing, not because of this ungodly killer instinct he has. If Jordan shot 8 for 11 on go ahead buckets and somehow always turns into a sharpshooter than I would have nothing to say. Jordan made roughly as much as any given shot in any given game. <br><br>Lastly, people say LBJ passes it during crunch time, aka the Ray Allen savior 3. Which he technically didn’t pass it. He tried to take that 3 to send it to OT but misses it. It was Chris Bosh’s pass to Ray Allen that sent it to overtime. People forget it was LBJ's 15 fourth Q points back into. Hypothetically, if it was Lebron who drove it in and dishes it to Ray Allen, how does that make Lebron a lesser player? If statically he makes a shot 32% rate from 3 and you have a wide-open Ray Allen at 41%, why wouldn't you pass it? People say, MJ would've taken it, but let’s not forget the famous pass from MJ off the double team to Kerr at the top of the key for the game winner. Without this, Jordan would’ve lost the 1997 NBA Championship. It’s ironic because Jordan knew a wide-open Kerr was a better option than his doubled team shot. This is why it is baffling that Lebron is crucified for knowing his strength. The reason Lebron thrives with shooters is because his drives to the basket command so much attention, there’s always someone open for an easy shot. <br><br>Conclusion: Statistically Lebron James is more clutch than Michael Jordan. They are both relatively the same under 5 seconds but LBJ is 5% better under 10 seconds.",
		body2: ""
	},
	{
		title: "BUT THE ERAS",
		image: "https://i.imgur.com/CYm0Iqa.png",
		body: "The difference of eras is something statistics will never be able to show. Some of the main things people use with the Jordan Era is the toughness and hand checking.<br><br>I think it is blasphemous that people think that a 250lb, 6'8, freight train of a man in LBJ would not be tough enough to drive into much smaller defenders? This current generation of medicine and technology has produced athletes that the world has never seen. There's a reason that you constantly see people break sport records such as 40-yard dash in NFL or Olympic records. These are all athletic accolades. Granted athleticism doesn’t guarantee talent, this just shows that the notion this generation cannot compete with less athletic generation is laughable. <br><br>On to hand checking. LBJ was a lockdown defender in his prime before all the mileage wore him down. Hand checking works both ways because this allows LBJ to hand check people as well. Also, there would be very few players in any generation that could stop Lebron from manhandling them because of just hand checking. I can't even imagine someone like Kawhi with hand checking. <br><br>Still not convinced? I just watched Zion Williamson debut yesterday. Dude is a freak of nature, 6'7 285lbs with a 45 in vertical. This is almost the same bounce as MJ with 70 more lbs. I'm not saying Zion is better than MJ but just examining the physical specimens that exist nowadays. <br><br>Next is also a crucial rule change that people forget. In the ‘90s, there was a rule called illegal defense rule. In this rule, you had to stay within 3 ft of your defender. This was essentially a mandated man to man defense. This prevented Zone defense which makes it a lot easier to score. Without Zone defense, it was harder to camp in the paint and wait for a driver. It also made it harder to trap individuals with a double team. The Bulls exploited this by having MJ iso on one side. In 2001, MJ himself admits that he doesn't like zones. He says that he wouldn't have the career he had today if teams played zones. His reasoning is that, zone is a lazy way to play defense because it allowed teams to get rid of stars with all the help defense. Baron Davis admits that, MJ one on one is unstoppable and a team effort on defense is the only way to give yourself a chance. Kobe Bryant, who played both rules prefers the old rules too because as an iso player, solo defenders are the preferred option. <br><br>Another interesting tidbit about MJ’s era. During 1988-1990, the Heat, Hornets, Timberwolves and Magic were added to the NBA which help dilute the team depths around the league. Again, this happened in 1995 when the NBA added the Grizzlies and Raptors. Teams were weakened as the talent pool was spread across an additional six teams over a 7-year span. <br><br>Lastly, the 3PT line was shorten. It went from 23.75 ft to 22 ft.  Jordan, a career 30% shooter from the arc exploded to career highs 40.4% during that span. <br><br>Conclusion: There will never be a way to settle eras because of the endless factors. The purpose of this section was to eliminate the use of the lazy argument of eras.",
		body2: ""
	},
	{
		title: "Who Wins?",
		image: "https://i.imgur.com/rKfZSLE.png",
		body:"Conclusion: Some might say bias to generation or bias to player. I'm a Warriors/Carmelo fan, so I have 0 affiliation to LBJ, but I do have an appreciation of greatness. One bias I am guilty of is a generational gap. Sadly, I missed some of the most talented players to ever grace the hardwood. If I had to choose between the 2, I would choose LeBron James. <br><br>Here's the final thoughts on why. Let's examine primes only because MJ took some years off. LeBron has the better court vision, drive to the basket, 3PT, post-up and was more statistically clutch. MJ has the better mid-range (includes fadeaways and all), free throw. Defense is debatable because of the different rules but on accolade alone, I’ll lean towards MJ. <br><br>Since prime of MJ and LBJ is debatable, according to advanced stats of NBA prime (25-29), MJ (.222 WS/48, 10.4 BPM, .119 VORP/g) vs LBJ. (.284 WS/48, 10.5 BPM, .12 VORP/g) If you want to expand the course of both their all-star careers, ages 21 to 33, MJ: (.222 WS/48, 9.4 BPM, .111 VORP/g) vs LBJ (.201 WS/g 9.7 BPM .114 VORP/g) <br><br>All in all, the comparisons are very close but I choose LBJ because he has a better all-around game. My ending thought is, I'm not knocking MJ even the slightest because this is a discussion of GOAT and #2 all time is just as amazing.",
		body2:""
	},
];
function seedDB(){
	console.log("Let's Seed!");
		data.forEach(function(seed){
			console.log(seed.title);
		});

	// mongoose.deleteModel("Blog");
	// data.forEach(function(seed){
	// 	Blog.create(seed,function(err){
	// 		if(err){
	// 			console.log("Hm");
	// 		}
	// 	});
	// });
	// mongoose.deleteModel("SecretBlog");
	// secretData.forEach(function(seed){
	// 	SecretBlog.create(seed,function(err){
	// 		if(err){
	// 			console.log("Hm");
	// 		}
	// 	});
	// });
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
	// var password = "";
	// console.log("ReCreate Admin");
	// User.register(newUser, password,function(err){
	//  if(err){
	// 	 console.log("err");
	//  }
	// });
}

module.exports = seedDB;

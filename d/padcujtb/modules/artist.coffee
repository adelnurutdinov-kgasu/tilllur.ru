config = "artists/im"
exports.config = config

greys_white = "#FFFFFF"
greys_pre_white = "#F7F7F7"
greys_ultra_light = "#EEEEEE"
greys_lightest = "#DDDDDD"
greys_lighter = "#CCCCCC"
greys_base = "#999999"
greys_darker = "#666666"
greys_darkest = "#222222"
greys_black = "#000000"


exports.colorTheme = {
	navigation_header_background: config + "/navigation header.png"
	navigation_header_background_color: "rgba(150,22,11,"
	navigation_overlay_background: config + "/navigation darker.png"
	# navigation_header_text: "#FFFFFF"
	
	navigation_background: config + "/bg.png"
	# navigation_shadow: "rgba(0,0,0,0.5)"
	navigation_scroll_background: "rgba(0,0,0,0.4)"
	navigation_scroll_timeline: "#666"
	navigation_blur_radius: "blur(10px)"
	navigation_blur_color: "rgba(0,0,0,0.6)"
	# navigation_card_overlay_background: "#FFFFFF"



	player_background: "#1D1D1D"
	player_progress_base: "#666"
	player_progress_filled: "#AF1417"
	player_song_title: "white"
	player_album_title: "rgba(204,204,204,0.5)"
	
	player_shadow_color: "rgba(0,0,0,0.5)"
	player_shadow_y: -20
	player_shadow_blur: 40



	card_shadow_color: "rgba(0,0,0,0.5)"
	card_shadow_y: 28
	card_shadow_blur: 40
	
	# Detailed Album
	detailed_album_background: "#111"
	detailed_album_title: "white"
	detailed_album_year: "rgba(204,204,204,0.5)"
	fav_songs_title: "rgba(255,255,255,0.5)"
	
	# Detailed Album Song
	detailed_album_song_title: "white"
	detailed_album_song_number: "#999"
	detailed_album_song_time: "#999"

}





newsModel0 = { 
	image: config + "/news/full/0.jpg"
	coverImage: config + "/news/covers/0.jpg"
	textImage: config + "/news/text/0.jpg"
}

newsModel1 = { 
	image: config + "/news/full/1.jpg"
	coverImage: config + "/news/covers/1.jpg"
	textImage: config + "/news/text/1.jpg"
}

newsModel2 = { 
	image: config + "/news/full/1.jpg"
	coverImage: config + "/news/covers/2.jpg"
	textImage: config + "/news/text/2.jpg"
}

newsModel3 = { 
	image: config + "/news/full/3.jpg"
	coverImage: config + "/news/covers/3.jpg"
	textImage: config + "/news/text/3.jpg"
}

newsModel4 = { 
	image: config + "/news/full/4.jpg"
	coverImage: config + "/news/covers/4.jpg"
	textImage: config + "/news/text/4.jpg"
}

newsModel5 = { 
	image: config + "/news/full/5.jpg"
	coverImage: config + "/news/covers/5.jpg"
	textImage: config + "/news/text/5.jpg"
}

newsModel6 = { 
	image: config + "/news/full/1.jpg"
	coverImage: config + "/news/covers/6.jpg"
	textImage: config + "/news/text/6.jpg"
}

newsModel7 = { 
	image: config + "/news/full/7.jpg"
	coverImage: config + "/news/covers/7.jpg"
	textImage: config + "/news/text/7.jpg"
}

newsModel8 = { 
	image: config + "/news/full/8.jpg"
	coverImage: config + "/news/covers/8.jpg"
	textImage: config + "/news/text/8.jpg"
}

newsModel9 = { 
	image: config + "/news/full/1.jpg"
	coverImage: config + "/news/covers/9.jpg"
	textImage: config + "/news/text/9.jpg"
}

newsModel10 = { 
	image: config + "/news/full/10.jpg"
	coverImage: config + "/news/covers/10.jpg"
	textImage: config + "/news/text/10.jpg"
}

exports.feedData = [newsModel0, newsModel1, newsModel2, newsModel3, newsModel4, newsModel5, newsModel6, newsModel7, newsModel8, newsModel9, newsModel10]









videoModel0 = { 
	image: config + "/video/previews/0.png"
	video: config + "/video/movies/0.mp4"
}

videoModel1 = { 
	image: config + "/video/previews/1.png"
	video: config + "/video/movies/1.mp4"
}

videoModel2 = { 
	image: config + "/video/previews/2.png"
	video: config + "/video/movies/1.mp4"
}



playlist0 = {
	video: config + "/video/movies/0.mp4"
	image: config + "/video/covers/0.png"
	textImage: config + "/video/text/0.png"
}

playlist1 = {
	video: config + "/video/movies/1.mp4"
	image: config + "/video/covers/1.png"
	textImage: config + "/video/text/1.png"
}

exports.playlistsData = [playlist0, playlist1]
exports.moviesData = [videoModel0, videoModel1, videoModel2]












# Getting Data

# config = "artists/splean"

# albumModel0 = {
# 	title: "Реверсивная логика событий"
# 	year: 1994
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/0.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel1 = {
# 	title: "Сигнас из космоса"
# 	year: 1995
#
# 	songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice",  "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix", "Nevsky Pr", "Bloody Waters", "Knock out"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/1.jpg"
# 	tintColor: "white"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel2 = {
# 	title: "Раздвоение личности"
# 	year: 1999
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/2.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel3 = {
# 	title: "Раздвоение личности"
# 	year: 2005
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/3.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel4 = {
# 	title: "Реверсивная логика событий"
# 	year: 2006
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/0.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel5 = {
# 	title: "Сигнас из космоса"
# 	year: 2007
#
# 	songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice",  "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix", "Nevsky Pr", "Bloody Waters", "Knock out"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/1.jpg"
# 	tintColor: "white"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel6 = {
# 	title: "Раздвоение личности"
# 	year: 2009
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/2.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel7 = {
# 	title: "Раздвоение личности"
# 	year: 2010
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/3.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel8 = {
# 	title: "Реверсивная логика событий"
# 	year: 2012
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/0.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel9 = {
# 	title: "Сигнас из космоса"
# 	year: 2013
#
# 	songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice",  "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix", "Nevsky Pr", "Bloody Waters", "Knock out"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/1.jpg"
# 	tintColor: "white"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel10 = {
# 	title: "Раздвоение личности"
# 	year: 2014
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/2.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel11 = {
# 	title: "Раздвоение личности"
# 	year: 2015
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/3.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel12 = {
# 	title: "Раздвоение личности"
# 	year: 2016
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/3.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel13 = {
# 	title: "Раздвоение личности"
# 	year: 2017
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/3.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel14 = {
# 	title: "Раздвоение личности"
# 	year: 2018
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/3.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }
#
# albumModel15 = {
# 	title: "Раздвоение личности"
# 	year: 2020
#
# 	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
# 	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
#
# 	image: config + "/albums/3.jpg"
# 	tintColor: "grey"
# 	source: ["1.mp3", "2.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3", "1.mp3"]
# }




# exports.albumsData = [albumModel0, albumModel1, albumModel2, albumModel3, albumModel4, albumModel5, albumModel6, albumModel7, albumModel8, albumModel9, albumModel10, albumModel11, albumModel12, albumModel13, albumModel14, albumModel15]



configAlbums = config + "/albums/"
# print configAlbums

randomSource = ["1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3"]


exports.albumsData = [{title:"Classical Mushroom",year:2000,tintColor:"#222",songs:["Bust A Move","None Of This Is Real","Sailing In The Sea Of Mushroom","The Shen","Disco Mushroom","Dracul","Nothing Comes Easy","Mush Mushi","The Missed Symphony"],time:["08:21","06:22","08:18","08:33","08:46","08:00","07:26","07:36","10:26"], image: configAlbums + "0.jpg", source: randomSource},

{title:"B.P.Empire",year:2001,tintColor:"#222",songs:["Never Ever Land","Unbalanced","Spaniard","B.P.Empire","Funchameleon","Tasty Mushroom","Noise Maker","P.G.M.","Dancing With Kadafi"],time:["07:46","07:15","07:38","07:26","06:55","06:56","07:39","07:21","10:22"],image: configAlbums + "1.jpg", source: randomSource},

{title:"Converting Vegetarians",year:2003,tintColor:"#222",songs:["Albibeno","Hush Mail","Apogiffa Night","Song Pong","Chaplin","Echonomix","Scorpion Frog","Deeply Disturbed","Semi Nice","Yanko Pitch","Converting Vegetarians","Elation Station","Drop Out","Avratz","Blink","Shakawkaw","Pletzturra","I Wish","Ballerium","Selecta","Illuminaughty","Jeenge","Elevation"],time:["07:03","07:01","08:08","08:36","06:54","07:43","08:00","08:26","06:09","08:13","05:39","05:35","05:14","10:23","05:32","04:08","06:44","03:00","07:17","05:21","04:50","07:02","05:15"],image: configAlbums + "2.jpg", source: randomSource},

{title:"I'm The Supervisor",year:2004,tintColor:"#222",songs:["I'm The Supervisor","Ration Shmatio","Muse Breaks RMX","Meduzz","Cities Of The Future","Horus The Chorus","Frog Machine","Noon","Bombat","Stretched"],time:["08:32","06:29","07:09","06:42","06:59","07:39","06:10","06:07","08:18","07:22"],image: configAlbums + "3.jpg", source: randomSource},

{title:"Vicious Delicious",year:2007,tintColor:"#222",songs:["Becoming Insane","Artillery","Vicious Delicious","Heavyweight","Suliman","Forgive Me","Special Place","In Front Of Me","Eat It Raw","Change The Formality","Before"],time:["07:20","04:28","07:24","08:41","06:10","03:29","06:53","04:28","06:30","07:44","06:57"],image: configAlbums + "4.jpg", source: randomSource},

{title:"Legend Of The Black Shawarma",year:2009,tintColor:"#222",songs:["Poquito Mas","Saeed","End Of The Road","Smashing The Opponent","Can't Stop","Herbert The Pervert","Killing Time","Project 100","Franks","Slowly","The Legend Of The Black Shawarma","Riders On The Storm"],time:["03:39","07:03","06:46","04:09","07:23","07:17","03:04","09:37","08:04","08:59","07:11","04:29"],image: configAlbums + "5.jpg", source: randomSource},

{title:"Power Charge",year:2011,tintColor:"#222",songs:["Hellion Prime","Energy Sequence","Power Charge","Cities of the Future","Acid Proof","Flying","10.000 Fahrenheit","Brain Spawn","Unbalanced"],time:["06:36","06:31","06:38","07:25","06:37","06:34","06:46","06:45","06:47"],image: configAlbums + "6.jpg", source: randomSource}, 

{title:"Army Of Mushrooms",year:2012,tintColor:"#222",songs:["Never Mind","Nothing to Say","Send Me an Angel","U R So Fucked","The Rat","Nation of Wusses","Wanted To","Serve My Thirst","I Shine","Drum n Bassa","The Pretender","The Messenger 2012","Swingish"],time:["06:05","06:28","07:25","04:41","07:43","07:02","03:24","06:46","05:43","07:12","06:34","10:38","06:16"],image: configAlbums + "7.jpg", source: randomSource},

{title:"Friends On Mushrooms",year:2014,tintColor:"#222",songs:["Kafkaf","Bass Nipple","Savant On Mushrooms","Kipod","Kazabubu","Now Is Gold","Rise Up","Nerds On Mushrooms","Mambacore","Where Do I Belong","Astrix On Mushrooms","Who Is There","Bark","Trance Party","The French","Kipod"],time:["05:47","04:54","06:18","07:00","06:24","05:53","05:29","05:33","04:19","03:26","09:56","04:04","04:09","07:41","06:55","05:47"],image: configAlbums + "8.jpg", source: randomSource},

{title:"Converting Vegetarians II",year:2015,tintColor:"#222",songs:["She Zoremet","Yamakas in Space","Sense of Direction","Animatronica","Feelings","Pink Froid","Demons of Pain","Zoan Zound","Blue Swan 5","Fields of Grey","Leopold","On The Road Again","Stuck in a Loop","Mexicali","The Surgeon"],time:["05:14","07:33","03:25","06:15","04:10","07:40","02:58","04:31","08:58","04:18","04:14","03:59","04:23","03:45","06:21"],image: configAlbums + "9.jpg", source: randomSource}



]




# exports.favList = {
# 	songs: ["ad"]
# 	time: ["1:1"]
# 	albums: [3]
# }
exports.favList = {
	songs: ["Liquid Smoke", "She Zoremet", "Riders On The Storm", "Artillery",  "Kazabubu", "Never Mind", "Zoan Zound", "Heavyweight", "Kafkaf", "Bass Nipple"]
	source: randomSource

	time: ["6:39", "5:14", "4:29", "4:28", "6:24", "6:05", "4:31", "8:41", "5:47", "4:54"]
	albums: [2, 9, 5, 4, 8, 7, 9, 4, 8, 8]
}
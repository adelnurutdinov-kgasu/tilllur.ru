config = "artists/troll"
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
	navigation_header_background_color: "rgba(0,0,0,"
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
	video: config + "/video/movies/0.mp4"
}

videoModel2 = { 
	image: config + "/video/previews/2.png"
	video: config + "/video/movies/0.mp4"
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

popularPlaylist = {
	video: config + "/video/movies/0.mp4"
	image: config + "/video/covers/2.png"
	textImage: config + "/video/text/2.png"
}

exports.playlistsData = [playlist0, playlist1, popularPlaylist]
exports.moviesData = [videoModel0, videoModel1, videoModel2]










configAlbums = config + "/albums/"
# print configAlbums

randomSource = ["1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3"]


albumsDataYears = [{title:"Immortalized",year:2015,tintColor:"#362828",songs:["The Eye Of The Storm","Immortalized","The Vengeful One","Open Your Eyes","The Light","What Are You Waiting For","You're Mine","Who","Save Our Last Goodbye","Fire It Up","The Sound Of Silence","Never Wrong","Who Taught You How To Hate","Tyrant","Legion Of Monsters","The Brave And The Bold"],time:["01:20","04:17","04:12","03:57","04:16","04:03","04:55","04:46","04:59","04:05","04:08","03:33","04:57","03:49","04:23","04:34"], image: configAlbums + "9.jpg", source: randomSource},

{title:"The Lost Children",year:2011,tintColor:"#27212A",songs:["Hell","A Welcome Burden","This Moment","Old Friend","Monster","Run","Leave It Alone","Two Worlds","God Of The Mind","Sickened","Mine","Parasite","Dehumanized","3","Midlife Crisis","Living After Midnight"],time:["04:15","03:31","03:05","03:36","04:04","03:13","04:06","03:32","03:05","03:58","05:04","03:24","03:31","04:02","04:02","04:25"], image: configAlbums + "8.jpg", source: randomSource},

{title:"The Sickness 10th Anniversary Edition",year:2010,tintColor:"#3E686D",songs:["Voices","The Game","Stupify","Down With The Sickness","Violence Fetish","Fear","Numb","Want","Conflict","Shout2000","Droppin' Plates","Meaning Of Life","God Of The Mind","A Welcome Burden"],time:["03:12","03:46","04:34","04:38","03:23","03:46","03:44","03:52","04:35","04:18","03:48","04:00","03:05","03:31"], image: configAlbums + "7.jpg", source: randomSource},

{title:"Disturbed - The Interview",year:2010,tintColor:"#29252B",songs:["Touring (Dan Donegan)","Number One Album","Song Identity","Wheelchair On Stage","John Moyer's Audition","Time Off","Influences","Recording","So Much Darkness","Spirituality","Closer To The People"],time:["04:32","05:59","04:12","05:32","03:21","05:30","06:03","04:13","05:41","04:45","07:29"], image: configAlbums + "6.jpg", source: randomSource},

{title:"Asylum",year:2010,tintColor:"#291B18",songs:["Remnants","Asylum","The Infection","Warrior","Another Way To Die","Never Again","The Animal","Crucified","Serpentine","My Child","Sacrifice","Innocence","ISHFWILF","Down With The Sickness","Stricken"],time:["02:43","04:36","04:08","03:24","04:13","03:33","04:13","04:37","04:09","03:18","04:00","04:31","05:26","05:53","04:17"], image: configAlbums + "5.jpg", source: randomSource},

{title:"Indestructible",year:2008,tintColor:"#D29552",songs:["Indestructible","Inside The Fire","Deceiver","The Night","Perfect Insanity","Haunted","Enough","The Curse","Torn","Criminal","Divide","Façade","Stricken","Down With The Sickness","Just Stop"],time:["04:38","03:51","03:49","04:46","03:56","04:42","04:20","03:24","04:09","04:15","03:36","03:45","04:27","05:14","03:51"], image: configAlbums + "4.jpg", source: randomSource},

{title:"Ten Thousand Fists",year:2005,tintColor:"#41322E",songs:["Ten Thousand Fists","Just Stop","Guarded","Deify","Stricken","I'm Alive","Sons Of Plunder","Overburdened","Decadence","Forgiven","Land Of Confusion","Sacred Lie","Pain Redefined","Avarice"],time:["03:32","03:43","03:20","04:16","04:05","04:42","03:48","05:57","03:24","04:12","04:47","03:05","04:07","02:56"], image: configAlbums + "3.jpg", source: randomSource},

{title:"Music As A Weapon II",year:2004,tintColor:"#3C2520",songs:["Loading The Weapon","Bound","Myself","Dehumanized","Forfeit","Fade To Black","Empty","Sumtimes","Darkness","Bruises","Prayer","The Red","Poem","Stupify (With Pete Loeffler & Joey Duenas)"],time:["02:34","03:53","03:34","03:43","04:05","04:25","04:01","04:41","04:01","02:48","03:47","03:44","03:19","04:28"], image: configAlbums + "2.jpg", source: randomSource},

{title:"Believe",year:2002,tintColor:"#741F24",songs:["Prayer","Liberate","Awaken","Believe","Remember","Intoxication","Rise","Mistress","Breathe","Bound","Devour","Darkness"],time:["03:39","03:27","04:29","04:27","04:08","03:11","03:55","03:45","04:19","03:51","03:46","03:56"], image: configAlbums + "1.jpg", source: randomSource},

{title:"The Sickness",year:2000,tintColor:"#26453D",songs:["Voices","The Game","Stupify","Down With the Sickness","Violence Fetish","Fear","Numb","Want","Conflict","Shout 2000","Droppin' Plates","Meaning Of Life"],time:["03:11","03:47","04:34","04:39","03:23","03:45","03:44","03:51","04:35","04:18","03:48","04:02"], image: configAlbums + "0.jpg", source: randomSource},











#
# {title:"Редкие земли",year:2010,tintColor:"#CFD3E2",songs:["Война человечков","Смог","Вечер","Другие места","Масло","Лучи","Девочкодруг","Шамора","Иди, я буду","Нет нет нет","Наркотикам – нет!","Саундтрек","На перекрестках судьбы (Стань человеком)","С Новым годом, крошка!"],time:["03:58","04:15","04:24","03:44","03:59","04:51","03:48","03:07","05:43","04:08","03:41","03:57","02:38","05:05"],image: configAlbums + "10.jpg", source: randomSource},
#
# {title:"Мумикам от тролликов. Поспи, рок-н-ролл",year:2012,tintColor:"#8BC71B",songs:["Это по любви","О, рай","Дельфины","Такие девчонки","Так надо","С новым годом, крошка","Невеста","Новая луна апреля","Поспи, рок-н-ролл","Моя певица","Забавы"],time:["03:46","03:06","05:11","04:38","04:01","04:58","03:18","03:12","03:34","04:28","03:32"],image: configAlbums + "11.jpg", source: randomSource},
#
# {title:"Пиратские копии",year:2015,tintColor:"#BABD85",songs:["С чистого листа","Медленные танцы","Витамины","Пиратские копии","Кажется","Молния","Золотое сердце","Последний отпускной","Куклы","Мошка","Где вы, девочки","Кто будет спасать рок-н-ролл","Шторм","Ноябрь","2nd Wind","Fake a Fake","Dolphins","1984 Part II","Horongbul","Witch","Polar Bear","Round and Round","Oy Oy Oy","Cha-Ma-Cham-A","You Crush on Me","In The Valley of Ease","Magic Stone","Kuaizuokai"],time:["03:58","09:02","04:17","06:28","04:27","04:32","03:34","03:32","02:58","03:49","04:48","04:16","03:40","06:00","05:15","03:43","04:46","03:11","04:44","03:22","04:01","03:45","03:34","03:32","03:43","08:27","06:39","03:48"],image: configAlbums + "12.jpg", source: randomSource}

]

# exports.albumsData = albumsDataYears.reverse()
exports.albumsData = albumsDataYears


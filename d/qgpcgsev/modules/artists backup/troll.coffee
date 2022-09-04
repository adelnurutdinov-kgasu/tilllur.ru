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


exports.albumsData = [{title:"Икра",year:1996,tintColor:"#222",songs:["Доля риска","Шамаманы","Сиамские сердца","Не звезда","Дельфины","Ранетка","На яды","Так надо","Алмазами","Сигналы","Мальчик-солдат","Голод","Сайонара диска","Далеко"],time:["03:57","03:34","03:56","03:30","04:38","03:19","03:10","03:58","04:15","04:17","04:34","04:43","03:47","06:23"],image: configAlbums + "0.jpeg", source: randomSource},

{title:"Морская",year:1997,tintColor:"#222",songs:["Вдруг ушли поезда","Девочка","Утекай","Морская болезнь","Владивосток 2000","Роза Люксембург","Кот кота (Вот и вся любовь)","Забавы","Скорость","Время тепла","Делай меня точно","Всецело всем","Воспитанник упавшей звезды","Новая луна апреля"],time:["03:50","03:23","02:18","04:41","02:38","02:22","03:08","02:33","03:52","03:07","02:57","03:52","04:28","02:59"],image: configAlbums + "1.jpeg", source: randomSource},

{title:"Шамора",year:1998,tintColor:"#222",songs:["Алло, попс!","Ультиматум","Новая луна апреля","Кассетный мальчик","Инопланетный гость","Девушки эмансипэ","Вечерний чай","Бит бум","Лунные девицы","Парк","Сайонара диска","Чёрная дыра","В думах о девушке из города центрального подчинения КНР","Делай меня точно","Так страшно","Всецело всем","Мальчик-солдат","Воспитанник упавшей звезды","Ложись, подполковник!","Делай Ю-Ю","Блудливые коты","Посиделки-подгляделки","Далеко","Эхом гонга"],time:["02:16","03:42","02:59","03:52","03:51","02:31","03:42","02:17","03:28","02:37","03:47","03:49","03:03","02:57","03:51","03:52","04:35","04:30","03:12","03:45","03:26","03:32","05:12","04:25"],image: configAlbums + "2.jpeg", source: randomSource},

{title:"Точно Ртуть Алоэ",year:2000,tintColor:"#222",songs:["Карнавала.нет","Не очень","Скорее и быстро","Моя певица","Северный полюс","Невеста?","Жабры","Клубничная","Сны","Без обмана","Ему не взять тебя","Тише","Случайности"],time:["03:10","03:58","03:06","04:09","03:40","03:56","03:32","02:37","03:58","03:23","04:50","03:00","03:33"],image: configAlbums + "3.jpeg", source: randomSource},

{title:"Меамуры",year:2002,tintColor:"#222",songs:["В рейс","На удачу","Это по любви","Глубже","Морская капуста","Плюс 28","Доброе утро, планета!","Стекла","Недопонимающая","Знакомым столичным","Обещания","Это по любви"],time:["04:09","03:54","02:54","04:03","02:28","04:39","03:29","03:47","04:07","04:35","03:57","03:47"],image: configAlbums + "4.jpeg", source: randomSource},


{title:"Похитители книг",year:2004,tintColor:"#222",songs:["Такие девчонки","Фламенко Красотки ч. 2","Фламенко Красотки ч. 1","Где такой я?","Твоя летняя","Золотые ворота","Водопады слез","Зеленый rocks","Зеленый rocks","Медведица","Боксерский вальс ч. 2 \"Карамель\"","Боксерский вальс","Боксерский Funky вальс","Такие девчонки","Медведица Bestoloch Mix"],time:["04:38","36","01:03","06:35","02:55","03:57","03:54","54","03:18","03:54","01:33","02:38","04:50","04:59","04:01"],image: configAlbums + "5.jpeg", source: randomSource},

{title:"Слияние и поглощение",year:2005,tintColor:"#222",songs:["Интро","Прости, Киска!","Банзай","Хищник","Страху нет","Кораллы","Приватизация","Такбываетнеслучайно","Янтарь","Ирис","Непокой","Здравствуйдосвидания"],time:["02:54","05:11","02:50","03:54","03:30","04:07","03:31","04:48","03:57","03:14","02:51","04:24"],image: configAlbums + "6.jpeg", source: randomSource},

{title:"Best DJ’'s Dance Mix Vol.VI",year:2006,tintColor:"#222",songs:["Здравствуйдосвидания","Страху нет","Медведица | Dj Ivan Scratchin'","Прости, Киска","С Новым Годом, Крошка!","Девочка","Страху нет","С Новым Годом, Крошка!","Lady Alpine Blue | Dj Ram","Lucky Bride?","Ирис","Невеста?","Дельфины","Иди, я буду","С Новым Годом, Крошка!","Непокой"],time:["05:07","05:02","05:58","02:41","04:00","03:19","02:43","05:08","04:52","03:59","04:07","03:13","04:18","04:29","04:52","02:49"],image: configAlbums + "7.jpeg", source: randomSource},

{title:"8",year:2008,tintColor:"#222",songs:["Запуск ракетоплана \"Иосиф Сталин\" на Луну","Эй, товарищ","Контрабанды","Проспали","Музыкант","Наше время","Молодость","Метель","Золото и ладан","В этом свете","Мамы дочерей","Ядерные станции","Пьяная струна","О, рай!","Лазурно-бирюзовые","Поспи, рок-н-ролл","Акваланги","Весна","Нормальный бизнес","Фантастика","Круг замкнулся"],time:["01:57","03:47","04:00","03:10","03:42","04:47","04:48","03:44","04:23","04:54","05:33","05:14","03:55","04:00","04:15","04:27","05:00","05:00","04:28","03:42","02:57"],image: configAlbums + "8.jpeg", source: randomSource},

{title:"Comrade Ambassador",year:2009,tintColor:"#222",songs:["Mothers And Daughters","Hey, Tovarishch","We Overslept","Musician","Nuclear Stations","Venomous Star","In Our World","Drunken String","Queen Of Rock","Snowstorm","Witnesses","Sleep Rock'n'Roll","Burn It All","California Dreaming"],time:["05:35","03:48","03:09","03:43","05:14","03:01","04:56","03:55","03:08","03:45","03:02","04:27","06:07","03:12"],image: configAlbums + "9.jpeg", source: randomSource},

{title:"Редкие земли",year:2010,tintColor:"#222",songs:["Война человечков","Смог","Вечер","Другие места","Масло","Лучи","Девочкодруг","Шамора","Иди, я буду","Нет нет нет","Наркотикам – нет!","Саундтрек","На перекрестках судьбы (Стань человеком)","С Новым годом, крошка!"],time:["03:58","04:15","04:24","03:44","03:59","04:51","03:48","03:07","05:43","04:08","03:41","03:57","02:38","05:05"],image: configAlbums + "10.jpeg", source: randomSource},

{title:"Мумикам от тролликов. Поспи, рок-н-ролл",year:2012,tintColor:"#222",songs:["Это по любви","О, рай","Дельфины","Такие девчонки","Так надо","С новым годом, крошка","Невеста","Новая луна апреля","Поспи, рок-н-ролл","Моя певица","Забавы"],time:["03:46","03:06","05:11","04:38","04:01","04:58","03:18","03:12","03:34","04:28","03:32"],image: configAlbums + "11.jpeg", source: randomSource},

{title:"Пиратские копии",year:2015,tintColor:"#222",songs:["С чистого листа","Медленные танцы","Витамины","Пиратские копии","Кажется","Молния","Золотое сердце","Последний отпускной","Куклы","Мошка","Где вы, девочки","Кто будет спасать рок-н-ролл","Шторм","Ноябрь","2nd Wind","Fake a Fake","Dolphins","1984 Part II","Horongbul","Witch","Polar Bear","Round and Round","Oy Oy Oy","Cha-Ma-Cham-A","You Crush on Me","In The Valley of Ease","Magic Stone","Kuaizuokai"],time:["03:58","09:02","04:17","06:28","04:27","04:32","03:34","03:32","02:58","03:49","04:48","04:16","03:40","06:00","05:15","03:43","04:46","03:11","04:44","03:22","04:01","03:45","03:34","03:32","03:43","08:27","06:39","03:48"],image: configAlbums + "12.jpeg", source: randomSource}

]




# exports.favList = {
# 	songs: ["ad"]
# 	time: ["1:1"]
# 	albums: [3]
# }
exports.favList = {
	songs: ["Владивосток 2000", "Невеста?", "Утекай", "Медведицп",  "Это по любви", "Забавы", "Такие девчонки", "Девочка", "Фантастика", "Дельфины"]
	source: randomSource

	time: ["3:47", "4:09", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45"]
	albums: [1, 3, 1, 5, 4, 1, 5, 1, 9, 0]
}
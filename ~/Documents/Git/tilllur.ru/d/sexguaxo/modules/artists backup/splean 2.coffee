config = "artists/splean"
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
	navigation_header_background_color: "rgba(244,124,54,"
	navigation_overlay_background: config + "/navigation darker.png"
	# navigation_header_text: "#FFFFFF"
	
	navigation_background: config + "/bg.png"
	# navigation_shadow: "rgba(0,0,0,0.5)"
	navigation_scroll_background: "rgba(0,0,0,0.06)"
	navigation_scroll_timeline: "#999"
	navigation_blur_radius: "blur(10px)"
	navigation_blur_color: "rgba(255,255,255,0.6)"
	# navigation_card_overlay_background: "#FFFFFF"



	player_background: "white"
	player_progress_base: "#CCC"
	player_progress_filled: "#FF8012"
	player_song_title: "black"
	player_album_title: "#666"
	
	player_shadow_color: "rgba(0,0,0,0.2)"
	player_shadow_y: -8
	player_shadow_blur: 20



	card_shadow_color: "rgba(0,0,0,0.2)"
	card_shadow_y: 0
	card_shadow_blur: 20
	
	# Detailed Album
	detailed_album_background: "white"
	detailed_album_title: "black"
	detailed_album_year: "#666"
	fav_songs_title: "#999"
	
	# Detailed Album Song
	detailed_album_song_title: "#000"
	detailed_album_song_number: "#666"
	detailed_album_song_time: "#666"

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

config = "artists/splean"

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

randomSource = ["1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3"]


exports.albumsData = [{title:"Пыльная быль",year:1994,tintColor:"#222",songs:["Жертва талого льда","Холодные зимы","Мне сказали слово","Под сурдинку","Гроза","Война","Пыльная быль. Сказка","Серебряные реки","Твое разбитое пенсне","Сказочный леший","Санкт-Петербургское небо","Звери","Рыба без трусов"],time:["06:01","01:31","03:08","03:26","03:44","02:30","05:20","02:52","01:23","01:42","02:29","02:36","03:04"],image: configAlbums + "0.jpeg", source: randomSource},

{title:"Коллекционер оружия",year:1995,tintColor:"#222",songs:["Будь моей тенью","Любовь идет по проводам","Черный цвет солнца","Самовар","Жертва талого льда","Что ты будешь делать","Рыба без трусов","Пыльная быль. Сказка","Нечего делать внутри","Иди через лес"],time:["05:41","04:24","07:47","05:31","05:46","05:09","03:09","05:35","03:26","06:32"],image: configAlbums + "1.jpeg", source: randomSource},

{title:"Фонарь под глазом",year:1997,tintColor:"#222",songs:["Молитва","Я не хочу домой","Бонни и Клайд","Три цвета (Первый снег)","Невский проспект","Спи в заброшенном доме","Прирожденный убийца","Частушки","Моя любовь","Англо-русский словарь (Давай, Лама)","Скоро будет солнечно","За стеной"],time:["32","03:49","02:40","04:40","05:12","04:17","03:21","04:44","03:36","04:36","04:42","01:27"],image: configAlbums + "2.jpeg", source: randomSource},

{title:"Гранатовый альбом",year:1998,tintColor:"#222",songs:["Весь этот бред","Достань гранату","Орбит без сахара","Приходи","Свет горел всю ночь","Люся сидит дома","Бог устал нас любить","Катись, колесо!","Выхода нет","Коктейли третьей мировой","Джим","Мария и Хуана","Подводная лодка"],time:["03:06","04:10","02:17","04:02","02:30","03:57","02:32","02:47","03:47","02:52","02:47","08:03","03:43"],image: configAlbums + "3.jpeg", source: randomSource},

{title:"Альтависта",year:1999,tintColor:"#222",songs:["Альтависта","Молоко и мёд","Пил-курил","Терпсихора","Далеко домой","Абсент","Добрых дел мастер","Мотоциклетная цепь","Сумасшедший автобус","Алкоголь","Встретимся завтра","Молоко и мёд"],time:["06:06","04:39","04:53","02:47","03:57","01:54","04:55","04:15","03:50","05:25","04:27","05:03"],image: configAlbums + "4.jpeg", source: randomSource},

{title:"25-й кадр",year:2001,tintColor:"#222",songs:["Линия жизни","Звезда рок-н-ролла","Всего хорошего","Моё сердце","Рики-Тики-Тави","SOS!","Fellini","Остаемся зимовать","Тебе это снится","Совсем другой","Пластмассовая жизнь","Пой мне ещё","Ленинград - Amsterdam","Fine"],time:["03:00","04:10","02:59","04:09","01:58","04:26","04:44","03:38","04:58","02:08","02:25","03:55","02:36","29"],image: configAlbums + "5.jpeg", source: randomSource},

{title:"Новые люди",year:2003,tintColor:"#222",songs:["Новые люди","Время, Назад!","Гандбол","Сломано Все","Девятиэтажный дом","Блокада","Валдай","Йог Спокоен","Северо-Запад","РЭП (Нервное Сердце)","Альтависта (Другая Точка Зрения)"],time:["03:44","04:12","02:35","04:16","04:30","03:22","04:27","02:56","03:53","03:14","04:07"],image: configAlbums + "6.jpeg", source: randomSource},

{title:"Реверсивная хроника событий",year:2004,tintColor:"#222",songs:["Океан","Семь восьмых","Шато Марго","Мы сидели и курили","Сиануквиль","Человек и Дерево","Лабиринт","Шаги","Бериллий","Паровоз","Люди на ладони","Урок географии","Всё включено","Голос за кадром","Романс"],time:["36","04:22","03:54","03:19","02:32","02:16","04:48","01:29","03:31","53","02:01","04:59","03:20","01:08","03:27"],image: configAlbums + "7.jpeg", source: randomSource},

{title:"Раздвоение личности",year:2007,tintColor:"#222",songs:["Мелькнула чья-то тень","Скажи","Матч","На счастье","Волна","Лепесток","Император","Бетховен","Маяк","Праздник","Сухари и сушки","Мобильный","Колокол","Пробки","Мамма мия","Прочь","Сын"],time:["03:16","03:12","02:51","02:44","03:29","03:38","01:15","02:44","03:49","02:21","05:31","03:25","03:40","04:03","03:01","03:20","01:51"],image: configAlbums + "8.jpeg", source: randomSource},

{title:"Сигнал из космоса",year:2009,tintColor:"#222",songs:["Настройка звука","Дыши легко","Добро пожаловать","Больше никакого рок-н-ролла","Вниз головой","Чердак","Зеленая песня","Камень","3007","Без тормозов","Корабль ждет!","Человек не спал","Ковчег","Выпусти меня отсюда","Письмо","Все так странно","Вальс","До встречи"],time:["02:40","03:53","04:11","04:12","03:05","04:07","03:30","04:59","02:11","03:14","02:44","02:52","03:32","03:11","02:29","02:03","03:07","04:22"],image: configAlbums + "9.jpeg", source: randomSource},

{title:"Обман зрения",year:2012,tintColor:"#222",songs:["Увертюра","Летела жизнь","Чёрная Волга","Лестница","Страшная тайна","Петербургская свадьба","Дочь самурая","Фибоначчи","В мире иллюзий","Праздник (Другая точка зрения)","Ковш","Солнце взойдёт","Чудак","Волшебное слово"],time:["01:44","02:30","02:46","02:18","02:24","04:20","03:36","03:27","02:58","02:39","03:01","03:35","02:29","04:24"],image: configAlbums + "10.jpeg", source: randomSource},

{title:"Резонанс. Часть 1",year:2014,tintColor:"#222",songs:["Всадник","Ай лов ю!","Старый дом","Мороз по коже","Мысль","Есть кто-нибудь живой?","Рай в шалаше","Всё наоборот","Помолчим немного","Пусть играет музыка!","Горизонт событий","Среди зимы","Дверной глазок","Подводная песня"],time:["02:50","03:20","02:39","03:05","03:52","03:10","03:13","01:22","03:42","03:13","02:35","02:42","05:23","03:28"],image: configAlbums + "11.jpeg", source: randomSource},

{title:"Резонанс. Часть 2",year:2015,tintColor:"#222",songs:["Красота","Оркестр","Песня на одном аккорде","Два плюс один","Полная луна","Танцуй!","Симфония","Нефть","Пожар","Шахматы","Исчезаем в темноте"],time:["02:58","04:11","04:10","02:37","03:38","04:10","02:54","02:14","02:53","05:53","04:05"],image: configAlbums + "12.jpeg", source: randomSource}

]




# exports.favList = {
# 	songs: ["ad"]
# 	time: ["1:1"]
# 	albums: [3]
# }
exports.favList = {
	songs: ["Выхода нет", "Мое сердце", "Танцуй", "Романс",  "Линия Жизни", "Оркестр", "Орбит без сахара", "Дочь самурая", "Рай в шалаше", "Пой мне еще"]
	source: randomSource

	time: ["3:47", "4:09", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45"]
	albums: [3, 5, 12, 7, 5, 12, 3, 10, 11, 5]
}
# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Nurutdinov Timur"
	twitter: ""
	description: ""


# init color & assets theme
Artist = require 'artist'
config = Artist.config


{Nav} = require 'nav'
{Album} = require 'album'
{Video} = require 'video'
{Playlist} = require 'playlist'
{News} = require 'news'
{TextLayer} = require "text"
{Year} = require 'year'


SongCreator = require 'create_song'
SongPlayer = require 'play_song'

AlbumCreator = require 'detailed_album'
NewsCreator = require 'detailed_news'
PlaylistCreator = require 'detailed_playlist'

Time = require 'timefromsec'


screen = new Layer
	width: 320, height: 568, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


temp = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "#1E1E1E"



favedPlaylistConst = true

# Player Init
songPath = config + "/songs/"

playerSourceCycler = Utils.cycle(Artist.favList.source)
playerNameCycler = Utils.cycle(Artist.favList.songs)

predefinedFakeQueue = []
for id in Artist.favList.albums
	predefinedFakeQueue.push(Artist.albumsData[id].title)

playerAlbumCycler = Utils.cycle(predefinedFakeQueue)

music = new VideoLayer size: 0, video: songPath+playerSourceCycler()
music.player.volume = 0.2

bg = new Layer width: 640, height: 1136, image: Artist.colorTheme.navigation_background

globalContentHeight = 1136-128-120
navigationPagesOrder = [640*0, 640*1, 640*2]

navigationPages = new PageComponent
	width: 640
	height: 1136
	y: 84*2
	scrollVertical: false
	scrollHorizontal: true
	directionLock: true
	velocityThreshold: 1
	backgroundColor: "null"


# Video Player Full Screen
videoPlayerCard = new VideoLayer
	parent: videoPageView
	width: 640
	height: 480
	backgroundColor: "green"
	opacity: 0
	y: -1136
	ignoreEvents: true

# "https://dl.dropboxusercontent.com/s/eaop1x13j6negwh/test_video.mp4"
videoNativeView = new VideoLayer
	width: temp.width
	height: temp.height
	video: ""
videoNativeView.sendToBack()

wasPlayingBeforeVideo = false

playFullScreen = (player, videoPath) ->
	if play.states.current is "hidden"
		wasPlayingBeforeVideo = true
		togglePlay()
	else
		wasPlayingBeforeVideo = false
	
	
	if Utils.isMobile() == true
		player.video = videoPath
		Utils.delay 0.2, ->
			player.bringToFront()
			player.player.webkitEnterFullScreen()
			player.player.play()

Events.wrap(videoNativeView.player).on "pause", ->
	videoNativeView.player.load()
	videoNativeView.sendToBack()
	if wasPlayingBeforeVideo
		togglePlay()
		wasPlayingBeforeVideo = false


newsPageView = new ScrollComponent
	parent: navigationPages.content
	scrollHorizontal: false
	scrollVertical: true
	speedX: 0
# 	directionLock: true
# 	directionLockThreshold: { x: 20, y: 20 }
	width: 640
	x: navigationPagesOrder[0]
	height: globalContentHeight
	backgroundColor: "null"
	contentInset:
		bottom: 80
		top: 28

musicPageView = new ScrollComponent
	parent: navigationPages.content
	scrollHorizontal: false
	scrollVertical: true
	speedX: 0
# 	directionLock: true
# 	directionLockThreshold: { x: 20, y: 20 }
	width: 640
	height: globalContentHeight
	x: navigationPagesOrder[1] + 100
	contentInset:
		bottom: 80

videoPageView = new ScrollComponent
	parent: navigationPages.content
	scrollHorizontal: false
	scrollVertical: true
	speedX: 0
	
# 	directionLock: true
# 	directionLockThreshold: { x: 20, y: 20 }
	width: 640
	height: 1016
	x: navigationPagesOrder[2] + 200
	backgroundColor: "null"
	contentInset:
		bottom: 80


# Music Page View

# Albums scroll view
albumMusicLayers = []
albumsScrollView = new PageComponent
	parent: musicPageView.content
	propagateEvents: false
	directionLock: true
	width: 640
	height: 234*2
	y: 0 + 54*2 - 1
	backgroundColor: Artist.colorTheme.navigation_scroll_background
	scrollVertical: false
	velocityThreshold: 0
	directionLockThreshold:
		x: 10
		y: 640
	contentInset: 
		right: 54*2

albumsScrollView.animationOptions =
    curve: "ease"
    time: 0.1




for i in [0...Artist.albumsData.length]
	albumMusic = new Album
		albumID: i
		image: Artist.albumsData[i].image
		width: 400
		height: 400
		x: i * (400+24) + 54*2
		y: 14*2
		parent: albumsScrollView.content
		shadowY: Artist.colorTheme.card_shadow_y
		shadowBlur: Artist.colorTheme.card_shadow_blur
		shadowColor: Artist.colorTheme.card_shadow_color
	
	albumMusicLayers.push(albumMusic)
	
	albumMusic.on Events.Tap, (event, layer) ->
		albumPrevPlace = {
			x: layer.x + albumsScrollView.content.x
			y: musicPageView.content.y + status_bar.height + navigationView.height + albumsScrollView.y + 28
			width: 400
			height: 400
		}
		
		detailedAlbumViewTwo = AlbumCreator.createDetailedAlbumPage(layer.albumID, albumPrevPlace, status_bar_color)
		
		detailedAlbumView = detailedAlbumViewTwo[0]
		detailedAlbumSongs = detailedAlbumViewTwo[1]
		
		for item in [detailedAlbumView, detailedAlbumSongs]
			item.parent = temp
		
		for item in detailedAlbumSongs
			item.on Events.Click, (event, layerInside) ->
				playPlaylist(layerInside.songID, Artist.albumsData[layer.albumID], !favedPlaylistConst)
				
		detailedAlbumView.placeBehind(playerView)

# lastAlbumFix = new Layer width: 66*2, height: 400, x: Data.albumsData.length * (400+24) + 54*2, y: 14*2, parent: albumsScrollView.content, backgroundColor: "null"

albumsScrollView.snapToPage(albumMusicLayers[albumMusicLayers.length - 1], false)





years = []
for item in Artist.albumsData
	years.push(item.year)

yearLayers = []
yearsCounter = -1
availability = false


albumsYearsScrollView = new PageComponent
	parent: musicPageView.content
	propagateEvents: false
# 	directionLock: true
	width: 640
	height: 54*2
	velocityThreshold: 0
	backgroundColor: Artist.colorTheme.navigation_scroll_background
	scrollVertical: false
	contentInset:
		top: 0
		right: 54*2
		bottom: 0
		left: 0

line = new Layer width: 10, height: 2, x: 0, y: 76, parent: albumsYearsScrollView.content, backgroundColor: Artist.colorTheme.navigation_scroll_timeline

addedYearValue = 2
for year in [(years[0]-addedYearValue)..(years[years.length-1]+addedYearValue)]
	yearsCounter++
	availability = false
	
	for availableYear in years
		if availableYear == year
			availability = true
	
# 	albumYearIndicator = new Layer width: 10, height: 10, x: yearsCounter*50*2+24, y: 36*2, borderRadius: "100%", parent: albumsYearsScrollView.content,
# 	backgroundColor: Artist.colorTheme.fav_songs_title

	
	if availability
		albumYearIndicator = new Layer width: 10, height: 10, x: yearsCounter*50*2+24, y: 36*2, borderRadius: "100%", parent: albumsYearsScrollView.content, backgroundColor: Artist.colorTheme.navigation_scroll_timeline

	
		AlbumYearTitle = new Year
			parent: albumsYearsScrollView.content
			yearID: year
			text: "#{year}"
			width: 50*2
			height: 34
			x: yearsCounter*50*2
			y: 10*2
			fontSize: 26
			fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
			textAlign: "left"
			color: Artist.colorTheme.fav_songs_title
			letterSpacing: 1
			opacity: 0.3
		
		if yearsCounter == 0
			AlbumYearTitle.opacity = 1
		
		yearLayers.push(AlbumYearTitle)
		AlbumYearTitle.on Events.Tap, (event, layer) ->
			correctYear = getYearPlace(layer.yearID, years)
			if correctYear > -1
				albumsScrollView.snapToPage(albumMusicLayers[correctYear])

line.width = yearsCounter*50*2+24
year_left = new Layer  height: 108, image: config + "/year left.png", parent: albumsYearsScrollView.content, width: addedYearValue * 54

year_right = new Layer width: addedYearValue * 54, height: 108, x: albumsYearsScrollView.content.width-addedYearValue * 54, image: config + "/year right.png", parent: albumsYearsScrollView.content



albumsScrollView.on "change:currentPage", ->
	localID = albumsScrollView.currentPage.albumID
	for item in yearLayers
		item.opacity = 0.5
	
	correctYear = getYearPlace(Artist.albumsData[localID].year, years)
	if correctYear > -1
		yearLayers[correctYear].opacity = 1
	
	albumsYearsScrollView.snapToPage(yearLayers[correctYear])


getYearPlace = (valueToFind, yearsArray) ->
	for item, i in yearsArray
		if item == valueToFind
			return i
	return -1

albumsYearsScrollView.snapToPage(yearLayers[yearLayers.length - 1], false)
yearLayers[yearLayers.length - 1].opacity = 1





# Play songs from Favourites
songFavCategoryTitle = new TextLayer
	parent: musicPageView.content
	text: "ПОПУЛЯРНЫЕ ТРЕКИ"
	width: 288*2
	height: 34
	x: 28
	y: 254*2 + 54*2
	fontSize: 28
	fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
	textAlign: "left"
	color: Artist.colorTheme.fav_songs_title
	letterSpacing: 1

songsAlbumsScrollView = new Layer
	parent: musicPageView.content
	width: 640
	height: 1400
	y: 275*2 + 54*2
	backgroundColor: "null"
	scrollHorizontal: false


songs = SongCreator.createSongsForFav(Artist.favList)
for song,i in songs
	song.y = i * song.height
	song.parent = songsAlbumsScrollView
	
	if i == songs.length - 1
		songsAlbumsScrollView.height = i * song.height + 200
	
	song.on Events.Tap, (event, layer) ->
		playPlaylist(layer.songID, Artist.favList, favedPlaylistConst)






# News Page View
for item, i in Artist.feedData
	newsItem = new News
		newsID: i
		newsTextImage: Artist.feedData[i].textImage
		newsImage: Artist.feedData[i].coverImage
		image: Artist.feedData[i].coverImage
		width: 640-56
		height: 400
		x: 28
		shadowY: Artist.colorTheme.card_shadow_y
		shadowBlur: Artist.colorTheme.card_shadow_blur
		shadowColor: Artist.colorTheme.card_shadow_color
		borderRadius: 0


	# sizes
	if i == 2 or i == 3 or i == 5 or i == 6 or i == 8 or i == 9
		newsItem.width = 140*2
		newsItem.height = 144*2
		newsItem.y = (326-16)*2
		if i == 3 or i == 6 or i == 9
			newsItem.x = 166*2
		if i == 5 or i == 6
			newsItem.y = (696-16)*2
		if i == 8 or i == 9
			newsItem.y = (1066-16)*2
	else if i == 1
		newsItem.y = (226-16)*2
		newsItem.height = 88*2
	else if i == 4
		newsItem.y = (482-16)*2
		newsItem.height = 200*2
	else if i == 7
		newsItem.y = (852-16)*2
		newsItem.height = 200*2
	else if i == 10
		newsItem.y = (1220-16)*2
		newsItem.height = 144*2
		
	newsItem.parent = newsPageView.content
	
	
	
	
	
	if i == 7
		newsItem.on Events.Tap, (event, layer) ->
			albumPrevPlace = {
				x: layer.x + 86*2
				y: newsPageView.content.y+layer.y+66*2 + navigationView.height + status_bar.height
				width: 120 * 2
				height: 120 * 2
			}
			
			
			detailedAlbumViewTwo = AlbumCreator.createDetailedAlbumPage(4, albumPrevPlace, status_bar_color)
			detailedAlbumView = detailedAlbumViewTwo[0]
			detailedAlbumSongs = detailedAlbumViewTwo[1]
			
			for item in [detailedAlbumView, detailedAlbumSongs]
				item.parent = temp
		
			for item in detailedAlbumSongs
				item.on Events.Click, (event, layerInside) ->
					playPlaylist(layerInside.songID, Artist.albumsData[layer.albumID], !favedPlaylistConst)
				
			detailedAlbumView.placeBehind(playerView)
	
	else if i == 1
		newsItem.on Events.Tap, (event, layer) ->
			playPlaylist(1, Artist.favList, favedPlaylistConst)
	else if i == 5 or i == 10
		newsItem.on Events.Tap, (event, layer) ->
			playFullScreen(videoNativeView, Artist.moviesData[0].video)
	else
		newsItem.on Events.Tap, (event, layer) ->
		# create news detailed view
			
			currentNewsItem = NewsCreator.createNewsDetailedPage(Artist.feedData[layer.newsID], status_bar_color)
			currentNewsItem.parent = temp
			currentNewsItem.placeBehind(playerView)

# Video Page View

# Main video scroll view
videoScrollView = new PageComponent
	parent: videoPageView.content
	propagateEvents: false
	directionLock: true
	width: 640
	height: 234*2
	backgroundColor: Artist.colorTheme.navigation_scroll_background
	scrollVertical: false
	velocity: 3
	directionLockThreshold:
		x: 10
		y: 640
	contentInset:
		right: 54*2


for i in [0...Artist.moviesData.length]
	videoScrollCard = new Video
		videoID: i
		x: i * (400+12*2) + 54*2
		y: 14*2
		width: 400
		height: 400
		image: Artist.moviesData[i].image
		borderRadius: 8
		parent: videoScrollView.content
		shadowY: 28
		shadowBlur: 80
		shadowColor: Artist.colorTheme.navigation_shadow
	
	videoScrollCard.on Events.Tap, (event, layer) ->
		# play video
		playFullScreen(videoNativeView, Artist.moviesData[layer.videoID].video)

videoScrollView.snapToNextPage()



# Play songs from Favourites
songFavCategoryTitle = new TextLayer
	parent: videoPageView.content
	text: "ПЛЕЙЛИСТЫ"
	width: 288*2
	height: 34
	x: 28
	y: 254*2
	fontSize: 28
	fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
	textAlign: "left"
	color: Artist.colorTheme.fav_songs_title
	letterSpacing: 1

videoPlaylistsScrollView = new Layer
	width: 640
	height: 1400
	backgroundColor: "null"
	scrollHorizontal: false
	parent: videoPageView.content
	y: 282*2

mt = 0
for item, i in Artist.playlistsData
	playlist = new Playlist
		playlistID: i
		width: 288*2
		height: 120*2
		x: 16*2
		y: (120+12)*2*i
		image: Artist.playlistsData[i].image
		shadowY: Artist.colorTheme.card_shadow_y
		shadowBlur: Artist.colorTheme.card_shadow_blur
		shadowColor: Artist.colorTheme.card_shadow_color
		parent: videoPlaylistsScrollView

	playlist.on Events.Tap, (event, layer) ->
		currentNewsItem = PlaylistCreator.createPlaylistDetailedPage(layer.playlistID, status_bar_color)
		
		currentNewsItem[0].parent = temp
# 		currentNewsItem[1].parent = temp
		currentNewsItem[0].placeBehind(playerView)
		
		currentNewsItem[1].on Events.Tap, (event, playlistLayer) ->
			playFullScreen(videoNativeView, Artist.playlistsData[playlistLayer.playlistID].video)


# songs = SongCreator.createSongsForAlbum(0)
# for i in [3..5]
# 	videoScrollCard = new Video
# 		videoID: i
# 		x: 28
# 		y: (i-3) * (144+12) * 2
# 		width: 292*2
# 		height: 144*2
# 		image: Movies.moviesData[i].image
# # 		image: "images/video/previews/0.jpg"
# 		borderRadius: 8
# 		parent: videoOthersScrollView
# 		shadowY: 28
# 		shadowBlur: 80
# 		shadowColor: "rgba(0,0,0,0.5)"
# 
# 
# 	videoScrollCard.on Events.Tap, (event, layer) ->
# # 		play song
# 		playFullScreen(videoNativeView, Movies.moviesData[layer.videoID].video)





# Player Page View

playerView = new Layer
	y: Align.bottom(16)
	width: 640
	height: 60*2
	backgroundColor: Artist.colorTheme.player_background
	shadowY: -20, shadowBlur: 40
	shadowColor: Artist.colorTheme.player_shadows



playerSongTitle = new TextLayer
	text: playerNameCycler()
	backgroundColor: "null"
	parent: playerView
	x: 110*2
	y: 12*2
	width: 200*2
	fontSize: "32px"
	color: "black"
	textAlign: "Left"
	fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
	fontWeight: "500"
	color: Artist.colorTheme.player_song_title
	letterSpacing: 0.4


playerSongAlbum = new TextLayer
	text: playerAlbumCycler()
	backgroundColor: "null"
	parent: playerView
	x: 110*2
	y: 30*2
	width: 200*2
	fontSize: "24px"
	color: "black"
	textAlign: "Left"
	fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
	fontWeight: "500"
	color: Artist.colorTheme.player_album_title





scrubber = new SliderComponent
	knobSize: 0
	y: 0
	height: 5
	width: playerView.width
	parent: playerView

scrubber.backgroundColor = Artist.colorTheme.player_progress_base
scrubber.fill.backgroundColor = Artist.colorTheme.player_progress_filled
# scrubber.knob.shadowColor = "transparent"
# scrubber.knob.backgroundColor = "#868686"
# scrubber.knob.borderWidth = 0
# scrubber.knob.borderColor = "white"





durationLeft = new Layer
	parent: playerView
	width: 87
	height: 48
	backgroundColor: "transparent"
	x: 580
	y: 10
	opacity: 0

durationRight = new Layer
	parent: playerView
	width: 40*2
	height: 28
	backgroundColor: "transparent"
	x: 266*2
	y: 32*2
	opacity: 1

durationLeft.html = "0:00"

durationLeft.style = 
	color: "#868686"
	fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
	fontSize: "24px"

durationRight.html = "0:00"

durationRight.style = 
	color: "#868686"
	fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
	fontSize: "24px"
	textAlign: "right"






playToggle = new Layer
	width: 60*2
	height: 60*2
	backgroundColor: "transparent"
	parent: playerView

play = new Layer width: 60*2, height: 60*2, image: config + "/play button.png", parent: playToggle

play.states.add
	"hidden":
		opacity: 0

pause = new Layer width: 60*2, height: 60*2, image: config + "/pause.png", parent: playToggle

pause.states.add
	"hidden":
		opacity: 0
pause.states.switchInstant "hidden"

pause.states.animationOptions = play.states.animationOptions =
	time: .1

next = new Layer width: 40*2, height: 60*2, x: 60*2, image: config + "/next.png", parent: playerView


# musicPageView.scrollToPoint({ x: 0, y: 54*2 }, false)
navigationPages.snapToPage(musicPageView, false)



# Some fun player logic
# Player Events


playToggle.onTap ->
	togglePlay()

next.onTap ->
	playNext()


togglePlay = () ->
	if play.states.current is "hidden"
		music.player.pause()
	else
		music.player.play()

	play.states.next()
	pause.states.next()


playNext = () ->
	music.video = songPath+playerSourceCycler()
	playerSongTitle.text = playerNameCycler()
	playerSongAlbum.text = playerAlbumCycler()
	music.player.play()
	
	if pause.states.current is "hidden"
		play.states.next()
		pause.states.next()




playPlaylist = (songID, albumModel, isFavedPlaylist) ->
	fakeAlbumsArray = []
	if !isFavedPlaylist
		for item, i in albumModel.source
			fakeAlbumsArray.push(albumModel.title)
	else
		for id in albumModel.albums
			fakeAlbumsArray.push(Artist.albumsData[id].title)
	
	playerSourceCycler = Utils.cycle(albumModel.source)
	playerNameCycler = Utils.cycle(albumModel.songs)
	playerAlbumCycler = Utils.cycle(fakeAlbumsArray)

	playingSongName = ""
	playingSongSource = ""
	playingSongAlbum = ""
	
	for i in [0..songID]
		playingSongName = playerNameCycler()
		playingSongSource	= songPath+playerSourceCycler()
		playingSongAlbum = playerAlbumCycler()
	
	if pause.states.current is "hidden"
		play.states.next()
		pause.states.next()
	
	music.video = playingSongSource
	playerSongTitle.text = playingSongName
	playerSongAlbum.text = playingSongAlbum
	
	Utils.delay .3, -> 
		durationRight.html = "-" + Time.timeFromSeconds music.player.duration
		scrubber.max = ~~music.player.duration
	
	music.player.play()
	
	
	




# are we scrubbing?
scrubbing = false


# scrubber.onValueChange ->
# 	durationLeft.html = timeFromSeconds @.value
# 	music.player.play()
# 
# 
# scrubber.onTouchStart ->
# 	scrubbing = true
# 	music.player.pause()
# 	scrubber.knob.animate
# 		properties: 
# 			scale: 2.8
# 			backgroundColor: "#FF0026"
# 			borderWidth: 3
# 		curve: "spring(400,35,0)"
# 	scrubber.fill.animate
# 		properties: 
# 			backgroundColor: "#FF0026"
# 		curve: "spring(400,35,0)"
# 
# 
# scrubber.onTouchEnd ->
# 	scrubbing = false
# 	music.player.currentTime = @.value

# 	scrubber.knob.animate
# 		properties: 
# 			scale: 1
# 			backgroundColor: "#AF1417"
# 			borderWidth: 0
# 		curve: "spring(400,35,0)"
# 	scrubber.fill.animate
# 		properties: 
# 			backgroundColor: "#AF1417"
# 		curve: "spring(400,35,0)"

# Player Loop

Framer.Loop.on "render", ->
	if  music.player.currentTime == music.player.duration
		playNext()
	if scrubber.max < 10
		scrubber.max = ~~music.player.duration
	if play.states.current is "hidden" and scrubbing is false
		scrubber.value = music.player.currentTime
		durationLeft.html = Time.timeFromSeconds music.player.currentTime
		durationRight.html = "-" + Time.timeFromSeconds (music.player.duration - music.player.currentTime)


# Navigation View

navTitleCenter = [0, -260, -484]

navigationView = new Layer
	width: 640
	height: 64*2
	y: 40
	image: Artist.colorTheme.navigation_header_background

navigationView.placeBehind(playerView)

navigationViewScroll = new ScrollComponent
	parent: navigationView
	width: 640
	height: 64*2
	scrollVertical: false
	contentInset: 
		right: 121*2

navigationDarker = new Layer
	parent: navigationView
	width: 640
	height: 128
	image: Artist.colorTheme.navigation_overlay_background



navtitle_1_button = new Nav width: 208, height: 64*2, x: 216, y: 0, parent: navigationViewScroll.content, backgroundColor: "null", navID: 0
navtitle_2_button = new Nav width: 182, height: 64*2, x: 488, y: 0, parent: navigationViewScroll.content, backgroundColor: "null", navID: 1
navtitle_3_button = new Nav width: 148, height: 64*2, x: 734, y: 0, parent: navigationViewScroll.content, backgroundColor: "null", navID: 2

navH = 48
navtitle_1 = new Nav width: 208, height: 32, x: 216, y: navH, image: config + "/navTitle 1.png", opacity: 0.5, parent: navigationViewScroll.content, navID: 0
navtitle_2 = new Nav width: 182, height: 32, x: 488, y: navH, image: config + "/navTitle 2.png", opacity: 1, parent: navigationViewScroll.content, navID: 1
navtitle_3 = new Nav width: 148, height: 38, x: 734, y: navH, image: config + "/navTitle 3.png", opacity: 0.5, parent: navigationViewScroll.content, navID: 2

navButtons = [navtitle_1_button, navtitle_2_button, navtitle_3_button]
navTitles = [navtitle_1, navtitle_2, navtitle_3]




for item, i in navButtons
	item.on Events.Tap, (event, layer) ->
		
		if layer.navID == 0
			navigationPages.snapToPage(newsPageView)
		else if layer.navID == 1
			navigationPages.snapToPage(musicPageView)
		else if layer.navID == 2
			navigationPages.snapToPage(videoPageView)



navigationPages.on "change:currentPage", ->
	localID = 0
	for titleItem in navTitles
		titleItem.opacity = 0.5
	
	if navigationPages.currentPage == newsPageView
		localID = 0
	else if navigationPages.currentPage == musicPageView
		localID = 1
	else if navigationPages.currentPage == videoPageView
		localID = 2
	
	navigationViewScroll.content.animate
			properties:
				x: navTitleCenter[localID]
			time: 0.1
			delay: 0.1
			curve: "spring(300, 30, 10)"
	
	navTitles[localID].opacity = 1

navigationViewScroll.scrollToPoint({x: navtitle_2.x- 240, y: 0}, false)


status_bar_fix = new Layer width: 640, height: 40, x: 0, y: 0, backgroundColor: Artist.colorTheme.navigation_header_background_color + "1)", opacity: 1
status_bar_fix.placeBehind(playerView)

# remove this layer later
status_bar_color = new Layer width: 640, height: 40, x: 0, y: 0, backgroundColor: Artist.colorTheme.navigation_header_background_color + "1)", opacity: 0

status_bar = new Layer width: 640, height: 40, x: 0, y: 0, image: config + "/status bar.png", opacity: 0


playerView.width = 640
playerView.height = 60*2
playerView.y = 1136 - 120

for item in [videoNativeView, music, bg, navigationPages, videoPlayerCard, navigationView, status_bar_fix, playerView]
	item.parent = temp



# musicPageView.content.draggable.scrollY = true
# musicPageView.content.draggable.speedY = 1
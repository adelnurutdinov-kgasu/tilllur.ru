
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
{Card} = require 'card'
{SkipCard} = require 'skipCard'


SongCreator = require 'create_song'
AlbumViewCreator = require 'albumView'
SongPlayer = require 'play_song'
Contrast = require 'contrast'

AlbumCreator = require 'detailed_album'
NewsCreator = require 'detailed_news'
PlaylistCreator = require 'detailed_playlist'

Time = require 'timefromsec'



screen = new Layer
	width: 320, height: 568, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "111"


favedPlaylistConst = true

# Player Init
songPath = config + "/songs/"

[firstAlbum, ..., lastAlbum] = Artist.albumsData
preparedForPlayingAlbum = firstAlbum

playerSourceCycler = Utils.cycle(preparedForPlayingAlbum.source)
playerNameCycler = Utils.cycle(preparedForPlayingAlbum.songs)
predefinedFakeQueue = []

# predefinedFakeQueue = []
# for id in preparedForPlayingAlbum
# 	predefinedFakeQueue.push(Artist.albumsData[id].title)

playerAlbumCycler = Utils.cycle([preparedForPlayingAlbum.title])

music = new VideoLayer size: 0, video: songPath+playerSourceCycler()
music.player.volume = 0.2

bg = new Layer width: 640, height: 1136, backgroundColor: "111"

globalContentHeight = 1136-128-120
navigationPagesOrder = [640*0, 640*1, 640*2]

navigationPages = new PageComponent
	width: 640
	height: 1136
	y: 84*2
	scrollVertical: false
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
	width: Screen.width
	height: Screen.height
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


newsPageView = new Layer
	parent: navigationPages.content
# 	scrollHorizontal: false
# 	directionLock: true
# 	directionLockThreshold: { x: 20, y: 20 }
	width: 640
	x: navigationPagesOrder[0]
	height: globalContentHeight
	backgroundColor: "null"
# 	contentInset:
# 		bottom: 80

musicPageView = new ScrollComponent
	parent: navigationPages.content
	scrollHorizontal: false
	directionLock: true
	directionLockThreshold: { x: 20, y: 20 }
	width: 640
	height: globalContentHeight
	x: navigationPagesOrder[1] + 100
	backgroundColor: "null"
	contentInset:
		bottom: 80

videoPageView = new ScrollComponent
	parent: navigationPages.content
	scrollHorizontal: false
	directionLock: true
	directionLockThreshold: { x: 20, y: 20 }
	width: 640
	height: 1016
	x: navigationPagesOrder[2] + 200
	backgroundColor: "null"
	contentInset:
		bottom: 80


# Music Page View

retina = 2
cardsTime = 0.2
cardsCurve = "spring(200, 25, 10)"
cardsLongCurve = "spring(300, 25, 3)"


# scroll = new ScrollComponent
# 	width: 640
# 	height: 845
# 	scrollHorizontal: false
# 	backgroundColor: "null"
# 	y: 0
# 	parent: musicPageView.content
# 	directionLock: true
# 	directionLockThreshold: { x: 20, y: 20 }


shuffleTitle = new TextLayer
	parent: musicPageView.content
	text: "Перемешать треки"
	width: 284*2
	height: 18*2
	x: 18*2
	y: 15*2
	fontSize: 15*2
	fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
	textAlign: "left"
	color: "white"
	opacity: 0.5
	letterSpacing: 0.2




cards = []
cardsButtons = []
contentLayers = []
cardsY = []
prevTappedCard = null

# globalLayer = new Layer

prevY = 0
for i in [0...Artist.albumsData.length]
	card = new Card()
	card.initAlbumView(i)
	
	card.y = 216*i+54*2
	card.parent = musicPageView.content
	cardsY[i] = card.y
	card.style = {"-webkit-filter": "drop-shadow(0px -12px 16px rgba(0,0,0,0.3))"}
	
	buttonCard = card.returnButtonLayer()
	buttonCard.on Events.Click, (e, l) ->
		layer = l.parent

		
		if layer == prevTappedCard
			prevTappedCard = null
			layer.desroyContent()
			
			for card in cards
			
				addedY = 0
				if layer.albumID == 0 then addedY = 0
				positionY = cardsY[card.albumID] + addedY

				card.animate
					properties: { y: positionY}
					time: cardsTime * 2
					curve: cardsLongCurve
					delay: 0.04 * card.albumID
				
				Utils.delay cardsTime * 2, ->
					musicPageView.updateContent()
			
		else
			prevTappedCard = layer
			currentID = layer.albumID
			
			for card in cards
				if card != layer
					card.desroyContent()
			
			layer.initContent()
			
# 			musicPageView.content.originX = 0
# 			musicPageView.content.originY = -1
# 			musicPageView.content.height = musicPageView.content.height + 1000
			
			detailedAlbumSongs = layer.returnSongsArray()
			
			for item in detailedAlbumSongs
				item.on Events.Click, (event, layerInside) ->
					playPlaylist(layerInside.songID, Artist.albumsData[layerInside.albumID], false)
		
			for card, i in cards
		
				positionY = 0
				if card.albumID > currentID
					positionY = cardsY[card.albumID] + cards[currentID].height - 108*retina + 16
				else
					positionY = cardsY[card.albumID]
			
				card.animate
					properties: { y: positionY }
					time: cardsTime
					curve: cardsLongCurve
		
			scrollCardsView(currentID)
			
	
	
	cards.push(card)
	cardsButtons.push(buttonCard)





# card = new Card()
# card.initAlbumView(i)
# 
# card.y = 216*i+54*2
# card.parent = musicPageView.content
# cardsY[i] = card.y
# card.style = {"-webkit-filter": "drop-shadow(0px -12px 16px rgba(0,0,0,0.3))"}


scrollCardsView = (cardID) ->
	scrollValueY = cardsY[cardID] - 8*2

	musicPageView.scrollToPoint(
		x: 0, y: scrollValueY
		true
		time: cardsTime * 4
		curve: cardsCurve
	
	Utils.delay cardsTime * 6, ->
		musicPageView.updateContent()
)






for card, i in cards
	card.y = cardsY[i] + 1000

musicPageView.scrollY = 54*2 - 8*2

for card, i in cards
		card.animate
			properties: { y: cardsY[i] }
			time: 1
			curve: cardsCurve
			delay: 0.04*i + 1



# News Page View

retina = 2
cardCounter = 0
cardsTime = 0.2
cardsCurve = "spring(200, 25, 10)"
cardsLongCurve = "spring(300, 25, 10)"

newGlobalCounter = 5

cardContent = new Layer width: 616, height: 662, x: 12, y: 288-84*2, backgroundColor: "null", parent: newsPageView

currentCard = null
nextCard = null

newsCards = []
readButtons = []
skipButtons = []


newsLeftTitle = new TextLayer
	parent: newsPageView
	text: "Доступно главных новостей: #{newGlobalCounter}"
	width: 272*2
	height: 22*2
	x: 24*2
	y: 14*2+10
	fontSize: 18*2
	fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
	textAlign: "center"
	color: "#FFF"
	letterSpacing: 0.2
	opacity: 0.5


no_news_button = new Layer width: 440, height: 184, x: 100, y: 648+100-84*2, image: "images/no news button.png", parent: newsPageView, opacity: 0

no_news_tips = new Layer width: 200, height: 200, x: 220, y: 360+80-84*2, image: "images/no news tips.png", style: {"-webkit-filter": "drop-shadow(0px -12px 16px rgba(0,0,0,0.3))"}, parent: newsPageView, opacity: 0

# no_news_image = new Layer width: 440, height: 500, x: 100, y: 332-84*2, image: "images/no news image.png", parent: newsPageView, opacity: 0




createNextCard = (layer) ->
	layer.animate
		properties: { y: 1136}
		time: cardsTime
		curve: cardsLongCurve

	Utils.delay 0.1, =>
		newGlobalCounter--
		if newGlobalCounter > 0
			newsLeftTitle.text = "Доступно главных новостей: #{newGlobalCounter}"
		
			card = getCard(++layer.cardID)
			card.placeBehind(layer)
		else
			newsLeftTitle.text = "Вы прочитали все новости"
# 			no_news_image.opacity = 1
			
			no_news_button.animate
				properties: { opacity: 1, y: 648-84*2}
				time: 0.6
				
			no_news_tips.animate
				properties: { opacity: 1, y: 360-84*2}
				time: 0.5
			


hideHandler = (event, layer) ->
	if layer.y > 240
		createNextCard(layer)
# 		layer.animate
# 			properties: { y: 1136}
# 			time: cardsTime
# 			curve: cardsLongCurve
# 	
# 		Utils.delay 0.1, =>
# 			card = getCard(++layer.cardID)
# 			card.placeBehind(layer)

readHandler = (event, l) ->
	layer = l.parent
	currentNewsItem = NewsCreator.createNewsDetailedPage(Artist.feedData[layer.cardID], status_bar_color)
	currentNewsItem.parent = tempView
	currentNewsItem.placeBehind(playerView)

returnHandler = (event, layer) ->
	layer.animate
		properties:
			x: Align.center
			y: Align.center
		curve: "spring(300, 25, 10)"
		time: 0.1
	
	Utils.delay 0.1, ->
		allowClick = true


nextCard = 1
skipHandler = (event, l) ->
	layer = l.parent
	createNextCard(layer)	
	
# 	layer.animate
# 		properties: { y: 1136}
# 		time: cardsTime
# 		curve: cardsLongCurve
# 	
# 	Utils.delay 0.1, =>
# 		card = getCard(++layer.cardID)
# 		card.placeBehind(layer)
# 	card.animate
# 			properties: { scale: 1, y: card.y + 20*retina}
# 			time: cardsTime
# 			curve: cardsCurve
	
	
# 	if nextCard < newsCards.length - 1
# 		card = newsCards[nextCard]
# 		skipButton = skipButtons[nextCard]
# 		readButton = readButtons[nextCard]
# 		nextCard++
# 		
# 		card.animate
# 			properties: { scale: 1, y: card.y + 20*retina}
# 			time: cardsTime
# 			curve: cardsCurve
# 		
# 	Utils.delay cardsTime, ->
# 		removingCard = currentCard
# 		currentCard = nextCard
# 		
# 		if typeof removingCard != "undefined" && removingCard != null
# 			removingCard.destroy()
# 		
# 		currentCard.children[0].on(Events.Click, clickHandler)
# 		
# 		nextCard = getCard()
# 		nextCard.y = nextCard.y - 20*retina
# 		nextCard.placeBehind(currentCard)




getCard = (cardID) ->
	card = new SkipCard width: 616, height: 662, x: 12, y: 80, image: "images/card #{cardID}.png", style: {"-webkit-filter": "drop-shadow(0px -12px 16px rgba(0,0,0,0.3))"}, scale: 1, cardID: cardID, opacity: 0, parent: newsPageView
	
	card.draggable = true
	card.draggable.constraints = cardContent
	card.draggable.horizontal = false
	card.directionLock = true
	card.directionLockThreshold = { x: 20, y: 20 }
	card.draggable.speedX = 0
	card.draggable.speedY = 0.6
	
	card.animate
		properties: { opacity: 1, y: 288-84*2}
		time: cardsTime / 2
	
	card.on(Events.DragEnd, hideHandler)
# 	card.on(Events.Click, newsHandler)
	
	skipButton = new Layer width: 356, height: 72, x: 244, y: 558, image: "images/skip news item.png", opacity: 0.5, parent: card, propagateEvents: false
	skipButton.on(Events.Click, skipHandler)
	
	readButton = new Layer width: 200, height: 72, x: 36, y: 558, image: "images/read button.png", parent: card
	readButton.on(Events.Click, readHandler)


# 	button.on(Events.Click, clickHandler)
	
	return card


# currentCard = getCard()
# currentCard.scale = 1
# 
# nextCard = getCard()
# nextCard.y = nextCard.y - 20*retina

# nextCard.placeBehind(currentCard)

# news = ["hello", "re", "re2", "re21", "reasd", "reasdasd"]
# 
# flag = 0
# for item, i in news
# 	cardItem = getCard()
# 	card = cardItem[0]
# 	newsCards.push(card)
# 	
# 	if i == news.length - 1
# 		card.scale = 1
# 		card.on(Events.DragEnd, hideHandler)
# 	else
# 		card.y = card.y - 20*retina
# 	
# 	if i < news.length - 2
# 		card.opacity = 0
# 	
# 	
# 	skipButton = cardItem[1]
# 	skipButtons.push(skipButton)
# 	skipButton.on(Events.Click, skipHandler)
# 	
# 	readButton = cardItem[2]
# 	readButtons.push(readButton)
# 	readButton.on(Events.Click, readHandler)



cardItem = getCard(0)
# card = [cardItem[0]]
# skipButton = [cardItem[0]]



# dragStartHandler = (event, layer) ->
# currentCard.on(Events.DragEnd, returnHandler)
# currentCard.children[0].on(Events.Click, clickHandler)


# Video Page View

# Main video scroll view
video_popular_card = new Layer width: 664, height: 476, x: -12, y: 186-84*2, image: "images/video popular card.png", parent: videoPageView.content, playlistID: 2

video_popular_card.on Events.Tap, (event, playlistLayer) ->
	try playFullScreen(videoNativeView, Artist.playlistsData[playlistLayer.playlistID].video)

popular_playlist = new Playlist width: 448, height: 30, x: 48, y: 690-84*2, image: "images/popular playlist.png", opacity: 1, parent: videoPageView.content, playlistID: 2

popular_playlist.on Events.Tap, (event, playlistLayer) ->
	currentNewsItem = PlaylistCreator.createPlaylistDetailedPage(playlistLayer.playlistID, status_bar_color)
	currentNewsItem[0].parent = tempView
	currentNewsItem[0].placeBehind(playerView)






# Playlists
playlists_title = new Layer width: 190, height: 28, x: 50, y: 820-84*2, image: "images/playlists title.png", parent: videoPageView.content

videoPlaylistsScrollView = new Layer
	width: 640
	height: 1400
	backgroundColor: "null"
	scrollHorizontal: false
	parent: videoPageView.content
	y: 350*2

mt = 0
for item, i in Artist.playlistsData
	if i == Artist.playlistsData.length - 1
		continue
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
		currentNewsItem[0].parent = tempView
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

navigationViewScroll = new Layer
	parent: navigationView
	backgroundColor: "null"
	width: 640
	height: 64*2
	scrollVertical: false
	contentInset: 
		right: 121*2

# navigationDarker = new Layer
# # 	parent: navigationView
# 	width: 640
# 	height: 128
# 	image: Artist.colorTheme.navigation_overlay_background



navtitle_1_button = new Nav width: 208, height: 64*2, x: 216, y: 0, parent: navigationViewScroll, backgroundColor: "null", navID: 0
navtitle_2_button = new Nav width: 182, height: 64*2, x: 488, y: 0, parent: navigationViewScroll, backgroundColor: "null", navID: 1
navtitle_3_button = new Nav width: 148, height: 64*2, x: 734, y: 0, parent: navigationViewScroll, backgroundColor: "null", navID: 2

navH = 48
navtitle_1 = new Nav width: 208, height: 32, x: 216, y: navH, image: config + "/navTitle 1.png", opacity: 0.5, parent: navigationViewScroll, navID: 0
navtitle_2 = new Nav width: 182, height: 32, x: 488, y: navH, image: config + "/navTitle 2.png", opacity: 1, parent: navigationViewScroll, navID: 1
navtitle_3 = new Nav width: 148, height: 38, x: 734, y: navH, image: config + "/navTitle 3.png", opacity: 0.5, parent: navigationViewScroll, navID: 2

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
	
	navigationViewScroll.animate
			properties:
				x: navTitleCenter[localID]
			time: 0.1
			delay: 0.1
			curve: "spring(300, 30, 10)"
	
	navTitles[localID].opacity = 1

# navigationViewScroll.scrollToPoint({x: navtitle_2.x- 240, y: 0}, false)

navigationViewScroll.animate
	properties: { x: navTitleCenter[1] }
	time: 0


status_bar_fix = new Layer width: 640, height: 40, x: 0, y: 0, backgroundColor: Artist.colorTheme.navigation_header_background_color + "1)", opacity: 1
status_bar_fix.placeBehind(playerView)

# remove this layer later
status_bar_color = new Layer width: 640, height: 40, x: 0, y: 0, backgroundColor: Artist.colorTheme.navigation_header_background_color + "1)", opacity: 0

status_bar = new Layer width: 640, height: 40, x: 0, y: 0, image: config + "/status bar.png"

for item in [videoNativeView, music, bg, navigationPages, videoPlayerCard, navigationView, status_bar_fix, playerView, status_bar_color, status_bar]
	item.parent = tempView


statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"
# Yandex Mobilization
## Player block


{SongLayer} = require "song"

currentSong = {
	title: ""
	album: ""
} 

screen = new Layer
	width: 320, height: 568, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "222"

background = new Layer width: 640, height: 1138, x: 0, y: 0, image: "images/background.png"


navigationPages = new PageComponent
	width: 640
	height: 1138
	scrollVertical: false
	directionLock: true
	velocityThreshold: 2

newsView = new ScrollComponent
	width: 640
	height: 1138-240
	x: 0
	backgroundColor: "null"
	parent: navigationPages.content
	scrollHorizontal: false
	directionLock: true

musicView = new Layer
	width: 640
	height: 1138
	x: 640
	backgroundColor: "yellow"
	parent: navigationPages.content


# Getting Data



albumModel1 = { 
	title: "Emotional 8"
	year: "2014"
	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
	
	image: "images/albums/1.jpg"
	tintColor: "grey"
	songsSourse: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
}

albumModel2 = { 
	title: "May 13"
	year: "2014"
	songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice",  "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix", "Nevsky Pr", "Bloody Waters", "Knock out"]
	
	image: "images/albums/2.jpg"
	tintColor: "white"
	songsSourse: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
}

albumModel3 = { 
	title: "Emotional 8"
	year: "2014"
	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
	
	image: "images/albums/3.jpg"
	tintColor: "grey"
	songsSourse: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
}

albumModel4 = { 
	title: "May 13"
	year: "2014"
	songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice",  "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix", "Nevsky Pr", "Bloody Waters", "Knock out"]
	
	image: "images/albums/4.jpg"
	tintColor: "white"
	songsSourse: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
}


albumsData = [albumModel1, albumModel2, albumModel3, albumModel4]

currentAlbumModel = albumsData[0]

# Compose Albums


albumsScrollComponent = new ScrollComponent
	height: 240+96+100
	width: 640
	y: 88
	scrollVertical: false
	directionLock: true
	velocity: 0.4
	parent: newsView.content
	propagateEvents: false


albumsViews = []

for item, i in albumsData
	album = new Layer
		albumID: i
		width: 240
		height: 240+96
		borderRadius: 8
		clip: true
		shadowY: 28
		shadowBlur: 40
		shadowColor: "rgba(0,0,0,0.5)"
	
	albumImage = new Layer
		parent: album
		width: 240
		height: 240
		image: albumsData[i].image
	
	albumInfoView = new Layer
		parent: album
		y: 240
		width: 240
		height: 96
		backgroundColor: "blue"
		backgroundColor: albumsData[i].tintColor
	
	albumTitle = new Layer
		html: albumsData[i].title
		backgroundColor: "null"
		parent: albumInfoView
		y: 2
		width: 240

	albumTitle.style =
		fontSize: "28px"
		color: "black"
		textAlign: "Center"
		fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
		fontWeight: "700"
		lineHeight: "57px"
		
	albumYear = new Layer
		html: albumsData[i].year
		backgroundColor: "null"
		parent: albumInfoView
		y: 40
		width: 240
		opacity: .6

	albumYear.style =
		fontSize: "24px"
		color: "black"
		textAlign: "Center"
		fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
		fontWeight: "700"
		lineHeight: "57px"
	
	albumNumber = new Layer
		image: "#{i}"
		opacity: 0
		parent: album

	album.x = 28 + i * (240 + 16)
	album.parent = albumsScrollComponent.content
	albumsViews.push(album)
	
# print albumsViews[0].x

for item, i in albumsViews
	item.on Events.Tap, (event, layer) ->
		showAlbumSongsView(layer.albumID)
		

albumGhost = new Layer
	width: 28
	height: albumsScrollComponent.height
	backgroundColor: "null"
	parent: albumsScrollComponent.content
	x: 28 + albumsScrollComponent.content.children.length * (240 + 16)
	

# Compose Songs


songsListView = new Layer
	width: 640
	height: albumsData[0].songs.length * 132
	parent: newsView.content
	y: 520
	backgroundColor: "null"

section_header_albums = new Layer width: 134, height: 22, x: 28, y: 46, image: "images/section header albums.png", opacity: 0.8, parent: newsView.content

section_header_tracks = new Layer width: 258, height: 22, x: 28, y: 490, image: "images/section header tracks.png", opacity: 0.8, parent: newsView.content


changeSongToggle = (layer) ->
	layer.playSongImage.opacity = 0
	layer.pauseSongImage.opacity = 1


for item, i in albumsData[0].songs
	songView = new Layer
		width: 292*2
		height: 132
		x: 28
		backgroundColor: "null"
		parent: songsListView
		albumID: i
	
	songImage = new Layer
		parent: songView
		width: 96
		height: 96
		x: 0
		y: 16
		image: albumsData[0].image
	
	
	
	
	songInfoView = new Layer
		parent: songView
		y: 10
		x: 120
		width: 240
		height: 96
		backgroundColor: "null"
	
	songAlbum = new Layer
		html: item
		backgroundColor: "null"
		parent: songInfoView
		y: 2
		width: 240

	songAlbum.style =
		fontSize: "28px"
		color: "white"
		textAlign: "Left"
		fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
		fontWeight: "700"
		lineHeight: "57px"
		
	songTitle = new Layer
		html: albumsData[0].title
		backgroundColor: "null"
		parent: songInfoView
		y: 40
		width: 240
		opacity: .6

	songTitle.style =
		fontSize: "24px"
		color: "white"
		textAlign: "Left"
		fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
		fontWeight: "700"
		lineHeight: "57px"
	
	
	songsBreaker = new Layer width: 584, height: 2, x: 0, y: 128, backgroundColor: "white", opacity: 0.5, parent: songView

	songView.on Events.Tap, (event, layer) ->
		currentSong.title = layer.children[1].children[0].html
		currentSong.album = layer.children[1].children[1].html
# 		print currentSong.title + " " + currentSong.album
		playAlbumSong(albumsData[0], layer.albumID)
	
	songView.y = i * 132

# Compose Album Songs View
# currentAlbumSongs = []

showAlbumSongsView = (albumNumber = 0) ->
	currentAlbumModel = albumsData[albumNumber]
	
	albumBackground = new Layer
		width: 640
		height: 1136
		backgroundColor: "black"
		propagateEvents: false
	
	albumBackground.parent = tempView
	
	albumBackground.onTap ->
		temp = 0
	
	albumBackground.placeBehind(playerView)
	
	scrollAlbum = new ScrollComponent
		parent: albumBackground
		width: 640
		height: 568*2 - playerView.height - 308
		y: 308
		scrollHorizontal: false
		
	
	closeAlbumButton = new Layer width: 72, height: 72, x: 284, y: 38, image: "images/closeAlbumButton.png", parent: albumBackground
	
	closeAlbumButton.onTap ->
		albumBackground.opacity = 0
		Utils.delay 0.2, ->
			albumBackground.destroy()
	
	
	albumTitle = new Layer
		html: currentAlbumModel.title
		backgroundColor: "null"
		parent: albumBackground
		y: 150
		width: 640

	albumTitle.style =
		fontSize: "40px"
		color: "white"
		textAlign: "Center"
		fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
		fontWeight: "700"
		lineHeight: "57px"
	
	albumYear = new Layer
		html: currentAlbumModel.year
		backgroundColor: "null"
		parent: albumBackground
		y: 210
		width: 640

	albumYear.style =
		fontSize: "32px"
		color: "white"
		textAlign: "Center"
		fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
		fontWeight: "700"
		lineHeight: "57px"
	
	
	
# 	currentAlbumSongs = []
	
	for item, i in currentAlbumModel.songs
	
		songView = new Layer
			albumID: i
			width: 292*2
			height: 132
			x: 28
			backgroundColor: "null"
			parent: scrollAlbum.content
		
		songView.on Events.Tap, (event, layer) ->
			currentSong.title = layer.children[1].children[0].html
			currentSong.album = layer.children[1].children[1].html
			playAlbumSong(currentAlbumModel, layer.albumID)
	
		songImage = new Layer
			parent: songView
			width: 96
			height: 96
			x: 0
			y: 16
			image: currentAlbumModel.image
	
		songInfoView = new Layer
			parent: songView
			y: 10
			x: 120
			width: 240
			height: 96
			backgroundColor: "null"
	
		songTitle = new Layer
			html: currentAlbumModel.songs[i]
			backgroundColor: "null"
			parent: songInfoView
			y: 2
			width: 240

		songTitle.style =
			fontSize: "28px"
			color: "white"
			textAlign: "Left"
			fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
			fontWeight: "700"
			lineHeight: "57px"
		
		songAlbum = new Layer
			html: currentAlbumModel.title
			backgroundColor: "null"
			parent: songInfoView
			y: 40
			width: 240
			opacity: .6

		songAlbum.style =
			fontSize: "24px"
			color: "white"
			textAlign: "Left"
			fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
			fontWeight: "700"
			lineHeight: "57px"
	
	
		songsBreaker = new Layer width: 584, height: 2, x: 0, y: 128, backgroundColor: "rgba(34,34,34,1)", parent: songView

		songView.y = i * 132
# 		currentAlbumSongs.push(songView)
	


# 	for item in currentAlbumSongs
# 		item.on Events.Tap, (event, layer) ->
# 			print layer.songID
# 			playAlbumSong(currentAlbumModel, layer.songID)

# Music File

songsPlayingList = ["images/songs/1.m4a", "images/songs/2.m4a"]

songsCycler = Utils.cycle(songsPlayingList)

music = new VideoLayer size: 0, video: songsCycler()




# Layer Setup

# normally you'd be importing a sketch file
# but for this demo we're going to
# draw almost everything in framer

# Screen.backgroundColor = "black"

playerView = new Layer
	y: 1004-100
	width: 640
	height: 264
	backgroundColor: "rgba(29,29,29,1)", shadowY: -20, shadowBlur: 40, shadowColor: "rgba(0,0,0,0.5)"



songTitle = new Layer
	html: "Владивосток"
	backgroundColor: "null"
	parent: playerView
	x: 220
	y: 18
	width: 500

songTitle.style =
	fontSize: "32px"
	color: "black"
	textAlign: "Left"
	fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
	fontWeight: "500"
	lineHeight: "57px"
	color: "white"

songArtist = new Layer
	html: "Мумми Тролль"
	backgroundColor: "null"
	parent: playerView
	x: 220
	y: 56
	width: 600
	opacity: .5

songArtist.style =
	fontSize: "24px"
	color: "black"
	textAlign: "Left"
	fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
	fontWeight: "500"
	lineHeight: "57px"
	color: "white"


scrubber = new SliderComponent
	knobSize: 20
	y: 0
	height: 5
	width: playerView.width
	parent: playerView

scrubber.backgroundColor = "#E5E5E5"
scrubber.fill.backgroundColor = "#868686"
scrubber.knob.shadowColor = "transparent"
scrubber.knob.backgroundColor = "#868686"
scrubber.knob.borderWidth = 0
scrubber.knob.borderColor = "white"

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
	width: 87
	height: 48
	backgroundColor: "transparent"
	x: 540
	y: 10
	opacity: 1

durationLeft.html = "0:00"

durationLeft.style = 
	color: "#868686"
	fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
	fontSize: "20px"
	lineHeight: "48px"

durationRight.html = "0:00"

durationRight.style = 
	color: "#868686"
	fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
	fontSize: "20px"
	lineHeight: "48px"
	textAlign: "right"


playToggle = new Layer
	width: 64
	height: 64
	backgroundColor: "transparent"
	parent: playerView
	x: 28
	y: 28

play = new Layer width: 64, height: 64, image: "images/play button.png", parent: playToggle

play.states.add
	"hidden":
		opacity: 0

pause = new Layer width: 64, height: 64, image: "images/pause.png", parent: playToggle

pause.states.add
	"hidden":
		opacity: 0
pause.states.switchInstant "hidden"

pause.states.animationOptions = play.states.animationOptions =
	time: .3

next = new Layer width: 40, height: 36, x: 132, y: 42, image: "images/next.png", parent: playerView

volume_icons = new Layer width: 562, height: 40, x: 46, y: 166, image: "images/volume icons.png", parent: playerView



volume = new SliderComponent
	knobSize: 60
	height: 5
	y: 184
	x: 90
	width: 446
	backgroundColor: "#E6E5E6"
	parent: playerView

volume.fill.backgroundColor = "#FCF6B2"
volume.knob.shadowY = 3
volume.knob.shadowBlur = 8
volume.max = 1
volume.value = .2

# Layer Events

# when we change the volume
volume.onValueChange ->
	music.player.volume = @.value

# when we tap the play toggle
playToggle.onTap ->
	if play.states.current is "hidden"
		music.player.pause()
	else
		music.player.play()
	play.states.next()
	pause.states.next()

next.onTap ->
	music.video = songsCycler()
	music.player.play()






# Play Popular Songs
playPopularSong = (songList, startSong) ->
	
	if startSong > songList.length
		startSong = 0
		
	songsCycler = Utils.cycle(songList)
	playingSong = ""
	for i in [0..startSong]
		playingSong = songsCycler()
	
	if pause.states.current is "hidden"
		play.states.next()
		pause.states.next()
	
	playerView.children[0].html = currentSong.title
	playerView.children[1].html = currentSong.album
	
	music.video = playingSong
	
	Utils.delay .3, -> 
		durationRight.html = "-" + timeFromSeconds music.player.duration
		scrubber.max = ~~music.player.duration
	
	music.player.play()


playAlbumSong = (model, songID) ->
	songList = []
	for item in model.songsSourse
		songList.push("images/songs/" + item)
		
	playPopularSong(songList, songID)






# are we scrubbing?
scrubbing = false

# when we scrub
scrubber.onValueChange ->
	durationLeft.html = timeFromSeconds @.value
	music.player.play()

# when we start scrubbing
scrubber.onTouchStart ->
	scrubbing = true
	music.player.pause()
	scrubber.knob.animate
		properties: 
			scale: 2.8
			backgroundColor: "#FF0026"
			borderWidth: 3
		curve: "spring(400,35,0)"
	scrubber.fill.animate
		properties: 
			backgroundColor: "#FF0026"
		curve: "spring(400,35,0)"

# when we stop scrubbing
scrubber.onTouchEnd ->
	scrubbing = false
	music.player.currentTime = @.value

	scrubber.knob.animate
		properties: 
			scale: 1
			backgroundColor: "#868686"
			borderWidth: 0
		curve: "spring(400,35,0)"
	scrubber.fill.animate
		properties: 
			backgroundColor: "#868686"
		curve: "spring(400,35,0)"

# Helper Functions

# this converts seconds to our pretty mm:ss format
# (i found this via googling "js format seconds mm:ss")
timeFromSeconds = (seconds) ->
	if seconds > 0
		return new Date(seconds * 1000).toISOString().substr(15, 4)
	else
		return "0:00"

# Finishing Touches

# wait a couple ms to make sure the music is loaded
# then set the duration to the song duration


# we can tap into the framer loop to repeatedly do things over time
# in this case we want to move the progress bar
# as the music plays
Framer.Loop.on "render", ->
	if scrubber.max < 10
		scrubber.max = ~~music.player.duration
	if play.states.current is "hidden" and scrubbing is false
		scrubber.value = music.player.currentTime
		durationLeft.html = timeFromSeconds music.player.currentTime
		durationRight.html = "-" + timeFromSeconds (music.player.duration - music.player.currentTime)


for item in [background, navigationPages, music, playerView]
	item.parent = tempView

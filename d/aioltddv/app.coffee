# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Nurutdinov Timur"
	twitter: ""
	description: ""


SongCreator = require 'create_song'
Data = require 'data'
{Album} = require 'album'
AlbumCreator = require 'detailed_album'

screen = new Layer
	width: 320, height: 568, backgroundColor: "1E1E1E"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


temp = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "#1E1E1E"

bg = new Layer width: 640, height: 1136, backgroundColor: "#1E1E1E"


navigationPages = new PageComponent
	width: 640
	height: 1138
	scrollVertical: false
	directionLock: true
	velocityThreshold: 1
	backgroundColor: "null"

newsPageView = new ScrollComponent
	parent: navigationPages.content
	scrollHorizontal: false
	directionLock: true
	width: 640
	height: 1016
	backgroundColor: "null" 

musicPageView = new ScrollComponent
	parent: navigationPages.content
	scrollHorizontal: false
	directionLock: true
	width: 640
	height: 1016
	x: 640
	backgroundColor: "null"

videoPageView = new ScrollComponent
	parent: navigationPages.content
	scrollHorizontal: false
	directionLock: true
	width: 640
	height: 1016
	x: 640*2
	backgroundColor: "null" 


# Music Page View

# Albums scroll view
albumsScrollView = new PageComponent
	parent: musicPageView.content
	propagateEvents: false
	directionLock: true
	width: 640
	height: 480+100
	y: 222
	backgroundColor: "null"
	scrollVertical: false
	contentInset:
		top: 0
		right: 0
		bottom: 0
		left: 0

cards = []

for i in [0...Data.albumsData.length]
	albumMusic = new Album
		albumID: i
		borderRadius: 8
		x: i * (480) + 80
		parent: albumsScrollView.content
		shadowY: 40
		shadowBlur: 80
		shadowColor: "rgba(0,0,0,0.5)"

	cards.push(albumMusic)
	albumMusic.width = 480
	albumMusic.height = 480
	albumMusic.scale = 0.75
	
	if i == 0
		albumMusic.scale = 1
	
	albumMusic.on Events.Tap, (event, layer) ->
		detailedAlbumView = AlbumCreator.createDetailedAlbumPage(layer.albumID, musicPageView.content.y)
		detailedAlbumView.parent = temp
		detailedAlbumView.placeBehind(player)
		

albumsScrollView.on "change:currentPage", (event, layer) ->
	for item,i in cards
		if item.albumID == albumsScrollView.currentPage.albumID
			item.animate
				properties:
					scale: 1
				time: 0.2
			continue
		
		item.animate
			properties:
				scale: .75
			time: 0.3



# Play songs from Favourites
songsalbumsScrollView = new Layer
	width: 640
	height: 1256
	backgroundColor: "null"
	scrollHorizontal: false
	parent: musicPageView.content
	y: 780

songs = SongCreator.createSongsForAlbum(0)
for song,i in songs
	song.y = i * song.height
	song.parent = songsalbumsScrollView
	
	if i == songs.length - 1
		songsalbumsScrollView.height = i * song.height + 200
	
	song.on Events.Tap, (event, layer) ->
		# play song
	

navigation_block = new Layer width: 640, height: 128, x: 0, y: 0, image: "images/navigation block.png"

player = new Layer width: 720, height: 340, x: -40, y: 956, image: "images/player.png"

musicPageView.updateContent()
navigationPages.snapToPage(navigationPages.content.children[1], false)

for item in [bg, navigationPages, navigation_block, player]
	item.parent = temp


statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"
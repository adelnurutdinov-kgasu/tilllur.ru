# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Nurutdinov Timur"
	twitter: ""
	description: ""


Data = require 'data'
Feed = require 'feed'
Movies = require 'youtube'
Time = require 'timefromsec'

{Nav} = require 'nav'
{Album} = require 'album'
{Video} = require 'video'
{News} = require 'news'
{TextLayer} = require "text"
{Year} = require "year"

SongCreator = require 'create_song'
SongPlayer = require 'play_song'
AlbumCreator = require 'detailed_album'
NewsCreator = require 'detailed_news'


screen = new Layer
	width: 320, height: 568, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


temp = new Layer
	parent: screen, width: screen * 2, height: screen * 2
	scale: 0.5, originX: 0, originY: 0

# Music Page View
musicPageView = new Layer width: 640, height: 1136, x: 0, y: 0, image: "images/bg.png"



# Albums scroll view
albumsScrollView = new PageComponent
	parent: musicPageView.content
	propagateEvents: false
	directionLock: true
	width: 640
	height: 480+100
	y: 138*2
	backgroundColor: "null"
	scrollVertical: false
	contentInset:
		top: 0
		right: 54*2
		bottom: 0
		left: 0


albumMusicLayers = []
for i in [0...Data.albumsData.length]
	albumMusic = new Album
		albumID: i
		image: Data.albumsData[i].image
		width: 400
		height: 400
		x: i * (400+24) + 54*2
		parent: albumsScrollView.content
		shadowY: 40
		shadowBlur: 80
		shadowColor: "rgba(0,0,0,0.5)"
	
	albumMusicLayers.push(albumMusic)
	







line = new Layer width: 1280, height: 2, x: 0, y: 244, backgroundColor: "rgba(85,85,85,1)", parent: musicPageView

albumsYearsScrollView = new PageComponent
	parent: musicPageView.content
	propagateEvents: false
	directionLock: true
	width: 640
	height: 54*2
	y: 84*2
	backgroundColor: "null"
	scrollVertical: false
	contentInset:
		top: 0
		right: 54*2
		bottom: 0
		left: 0


years = [1998, 2001, 2002, 2005, 2008]
yearLayers = []
yearsCounter = -1
availability = false

for year in [years[0]..years[years.length-1]]
	yearsCounter++
	availability = false
	
	for availableYear in years
		if availableYear == year
			availability = true
	
	albumYearIndicator = new Layer width: 10, height: 10, x: yearsCounter*50*2+24, y: 36*2, borderRadius: "100%", backgroundColor: "rgba(85,85,85,1)", parent: albumsYearsScrollView.content

	
	if availability
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
			color: "white"
			letterSpacing: 1
			opacity: 0.5
		
		if yearsCounter == 0
			AlbumYearTitle.opacity = 1
		
		yearLayers.push(AlbumYearTitle)
		AlbumYearTitle.on Events.Tap, (event, layer) ->
			correctYear = getYearPlace(layer.yearID, years)
			if correctYear > -1
				albumsScrollView.snapToPage(albumMusicLayers[correctYear])


albumsScrollView.on "change:currentPage", ->
	localID = albumsScrollView.currentPage.albumID
	for item in yearLayers
		item.opacity = 0.5
	
	correctYear = getYearPlace(Data.albumsData[localID].year, years)
	if correctYear > -1
		yearLayers[correctYear].opacity = 1
	
	albumsYearsScrollView.snapToPage(yearLayers[correctYear])



getYearPlace = (valueToFind, yearsArray) ->
	for item, i in yearsArray
		if item == valueToFind
			return i
	return -1

# songFavCategoryTitle = new TextLayer
# 	parent: musicPageView.content
# 	text: "ПОПУЛЯРНЫЕ ТРЕКИ"
# 	width: 288*2
# 	height: 34
# 	x: 28
# 	y: 254*2
# 	fontSize: 28
# 	fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
# 	textAlign: "left"
# 	color: "white"
# 	letterSpacing: 1
# 	opacity: 0.5
# 
# songsAlbumsScrollView = new Layer
# 	width: 640
# 	height: 1400
# 	backgroundColor: "null"
# 	scrollHorizontal: false
# 	parent: musicPageView.content
# 	y: 275*2
# 
# 
# songs = SongCreator.createSongsForFav(Data.favList)
# for song,i in songs
# 	song.y = i * song.height
# 	song.parent = songsAlbumsScrollView
# 	
# 	if i == songs.length - 1
# 		songsAlbumsScrollView.height = i * song.height + 200
# 	
# 	song.on Events.Tap, (event, layer) ->
# 		playPlaylist(layer.songID, Data.favList, favedPlaylistConst)
# 		
# 		
# 
# 
# 


top_temp = new Layer width: 640, height: 168, x: 0, y: 0, image: "images/top temp.png"

bottom_temp = new Layer width: 668, height: 650, x: -28, y: 716, image: "images/bottom temp.png"

player = new Layer width: 720, height: 200, x: -40, y: 956, image: "images/player.png"


for item in [musicPageView, albumsScrollView, albumsYearsScrollView, top_temp, bottom_temp, player]
	item.parent = temp

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"
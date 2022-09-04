{TextLayer} = require "text"
{Card} = require 'card'
Contrast = require 'contrast'

SongCreator = require 'create_song'

Artist = require 'artist'
config = Artist.config


exports.returnContentView = (albumID, card) ->
	localFontColor = "#000"
	localContentColor = "white"
	
	contentViewBg = new Layer width: 616, height: 874, x: 8, y: 0, borderRadius: 12, backgroundColor: localContentColor, propagateEvents: false
	
	
	contentViewBg.on Events.Click, ->
		
	shuffleBreaker = new Layer width: 616, height: 2, x: 0, y: 48*2, backgroundColor: localFontColor, opacity: 0.2, parent: contentViewBg

	
	shuffleTitle = new TextLayer
		parent: contentViewBg
		text: "Перемешать альбом"
		width: 284*2
		height: 18*2
		x: 12*2
		y: 15*2
		fontSize: 15*2
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "left"
		color: localFontColor
		opacity: 0.8
		letterSpacing: 0.2
		

	# shuffle = new Layer width: 568, height: 60, x: 24, y: 14*2, image: "images/shuffle.png", parent: contentViewBg

	# for song in Artist.albumsData[albumID].songs
	albumSongs = SongCreator.createSongsForAlbum(albumID, localFontColor)
	for song, i in albumSongs
		song.y = song.height * (i) + 48*2
		song.parent = contentViewBg
		song.albumID = albumID
		song.propagateEvents = false
	
	contentViewBg.height = song.height * albumSongs.length + 14*2 + 60 + 8*2
	studio = new Layer width: 208, height: 24, x: 216, image: "images/studio.png", parent: card, y: song.height * albumSongs.length + 14*2 + 60 + 8*2 + 108*2 + 20
	# card.height = song.height * albumSongs.length + 14*2 + 60 + 8*2 + 108*2 + 20 + 20 + studio.height+4
	
	return [contentViewBg, albumSongs]



exports.returnAlbumView = (albumID) ->
	cardColor = new Color("#{Artist.albumsData[albumID].tintColor}")
	localFontColor = cardColor
	localContentColor = cardColor
	localFontColor = Contrast.returnTextColor(cardColor)
	localContentColor = Contrast.returnContentColor(cardColor)

	card = new Card width: 640, height: 108*2+108, borderRadius: 20, borderWidth: 4, borderColor: "rgba(255,255,255,0.1)", cardID: albumID, backgroundColor: cardColor
	
	topView = new Layer width: 640, height: 108*2, backgroundColor: "null", parent: card

	image_bg = new Layer width: 156, height: 156, x: 36, y: 28, backgroundColor: "rgba(255,255,255,0)", shadowY: 20, shadowBlur: 28, shadowColor: "rgba(0,0,0,0.5)", parent: card
	
	card.imageLayer = image_bg
	

	image = new Layer width: 156, height: 156, x: 36, y: 28, image: "#{Artist.albumsData[albumID].image}", parent: card

	albumTitle = new TextLayer
		parent: card
		text: "#{Artist.albumsData[albumID].title}"
		width: 210*2
		height: 50*2
		x: 108*2
		y: 14*2
		fontSize: 18*2
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "left"
		color: localFontColor
		letterSpacing: 0.2
	
	albumYear = new TextLayer
		parent: card
		text: "#{Artist.albumsData[albumID].year}"
		width: 200*2
		height: 50*2
		x: 108*2
		y: 74*2
		fontSize: 13*2
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "left"
		color: localFontColor
		opacity: 0.8
		letterSpacing: 0.2



	


	
	
	
	
	
	return [card, topView]
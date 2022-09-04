{Song} = require "song"
{TextLayer} = require "text"
Data = require "data"

# Song (albumID)
exports.createSongsForAlbum = (albumID) ->
	songs = []
	for song, i in Data.albumsData[albumID].songs
		songs.push(@.createSong(albumID, i))
	return songs


# Song (albumID, songNumber)
exports.createSong = (albumID, songNumber) ->
	
	songView = new Song
		height: 132
		albumID: albumID
		songID: songNumber
		albumTitle: Data.albumsData[albumID].title
		songTitle: Data.albumsData[albumID].songs[songNumber]

	songImage = new Layer
		parent: songView
		image: "images/albums/#{songView.albumID}.jpg"
		width: 48*2
		height: 48*2
		x: 32
		y: 16

	songTitle = new TextLayer
		parent: songView
		text: "#{songView.songTitle}"
		width: 440
		height: 44
		x: 156
		y: 22
		fontSize: 36
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "left"
		color: "white"
		letterSpacing: 0.2

	albumTitle = new TextLayer
		parent: songView
		text: "#{songView.albumTitle}"
		width: 440
		height: 34
		x: 156
		y: 68
		fontSize: 28
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "left"
		color: "#999"
		letterSpacing: 0.5
	
	return songView
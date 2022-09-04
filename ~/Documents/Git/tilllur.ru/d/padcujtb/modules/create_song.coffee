{Song} = require "song"
{TextLayer} = require "text"

Artist = require "artist"
config = Artist.config

# Song (albumID)
exports.createSongsForAlbum = (albumID) ->
	songs = []
	for song, i in Artist.albumsData[albumID].songs
		songs.push(@.createAlbumSong(albumID, i))
	return songs
	


exports.createSongsForFav = (songsList) ->
	songs = []
	for song, i in songsList.songs
		songs.push(@.createSong(i))
	return songs




# Song (albumID, songNumber)
exports.createSong = (songNumber) ->
	
	songView = new Song
		height: 132
		albumID: Artist.favList.albums[songNumber]
		songID: songNumber

	songImage = new Layer
		parent: songView
		image: Artist.albumsData[Artist.favList.albums[songNumber]].image
		width: 48*2
		height: 48*2
		x: 32
		y: 16

	songTitle = new TextLayer
		parent: songView
		text: "#{Artist.favList.songs[songNumber]}"
		width: 440
		height: 44
		x: 156
		y: 22
		fontSize: 36
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "left"
		color: Artist.colorTheme.detailed_album_song_title
		letterSpacing: 0.2

	albumTitle = new TextLayer
		parent: songView
		text: "#{Artist.albumsData[Artist.favList.albums[songNumber]].title}"
		width: 440
		height: 34
		x: 156
		y: 68
		fontSize: 28
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "left"
		color: Artist.colorTheme.detailed_album_song_time
		letterSpacing: 0.5
	
	return songView




# Song (albumID, songNumber)
exports.createAlbumSong = (albumID, songNumber) ->
	
	songView = new Song
		height: 80
		albumID: albumID
		songID: songNumber
		# albumTitle: Artist.albumsData[albumID].time[songNumber]
		songTitle: Artist.albumsData[albumID].songs[songNumber]

	songTitle = new TextLayer
		parent: songView
		text: "#{songView.songTitle}"
		width: 440
		height: 40
		x: (28+14)*2
		y: 20
		fontSize: 32
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "left"
		color: Artist.colorTheme.detailed_album_song_title
		letterSpacing: 0.2

	songDuration = new TextLayer
		parent: songView
		text: "#{Artist.albumsData[albumID].time[songNumber]}"
		width: 120
		height: 34
		x: 232*2+28
		y: 26
		fontSize: 28
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "right"
		color: Artist.colorTheme.detailed_album_song_time
		letterSpacing: 0.5
		opacity: 0.7
	
	songNumber = new TextLayer
		parent: songView
		text: "#{songNumber+1}"
		width: 18*2
		height: 14*2
		x: 10*2
		y: 13*2
		fontSize: 24
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "right"
		color: Artist.colorTheme.detailed_album_song_number
		letterSpacing: 0.5
		opacity: 0.7
	
	return songView
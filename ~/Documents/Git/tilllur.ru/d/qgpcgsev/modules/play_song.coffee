Time = require 'timefromsec'

Artist = require "artist"
config = Artist.config

songPath = config + "/songs/"



exports.playPlaylist = (songID, albumModel) ->
	songsNames = albumModel.songs
	songsSource = albumModel.source
	# songsAlbums = albumModel.albums
	
	songsNameCycler = Utils.cycle(songsNames)
	songsSourceCycler = Utils.cycle(songsSource)
	# songAlbumIDCycler = Utils.cycle(songsAlbums)
	
	playingSongName = ""
	playingSongSource = ""
	playingSongAlbumID = 0
	for i in [0..songID]
		playingSongName = songsNameCycler()
		playingSongSource	= songPath+songsSourceCycler()
		# playingSongAlbumID = Utils.cycle(songsAlbums)
		# print playingSongAlbumID
	
	if pause.states.current is "hidden"
		play.states.next()
		pause.states.next()
	
	music.video = playingSongSource
	
	playerSongTitle.text = playingSongName
	# print playingSongAlbumID
	# print Artist.albumsArtist[playingSongAlbumID]
	playerSongAlbum.text = albumModel.title + " – " + albumModel.year
	
	Utils.delay .3, -> 
		durationRight.html = "-" + Time.timeFromSeconds music.player.duration
		scrubber.max = ~~music.player.duration
	
	music.player.play()


exports.playFavPlaylist = (songID, albumModel, music, play, pause, playerSongTitle, playerSongAlbum, durationRight, scrubber) ->
	songsNames = albumModel.songs
	songsSource = albumModel.source
	songsAlbums = albumModel.albums
	
	songsNameCycler = Utils.cycle(songsNames)
	songsSourceCycler = Utils.cycle(songsSource)
	songAlbumIDCycler = Utils.cycle(songsAlbums)
	
	playingSongName = ""
	playingSongSource = ""
	playingSongAlbumID = 0
	for i in [0..songID]
		playingSongName = songsNameCycler()
		playingSongSource = songPath+songsSourceCycler()
		playingSongAlbumID = songAlbumIDCycler()
	
	if pause.states.current is "hidden"
		play.states.next()
		pause.states.next()
	
	music.video = playingSongSource
	
	playerSongTitle.text = playingSongName
	playerSongAlbum.text = Artist.albumsArtist[playingSongAlbumID].title + " – " + Artist.albumsArtist[playingSongAlbumID].year
	
	Utils.delay .3, -> 
		durationRight.html = "-" + Time.timeFromSeconds music.player.duration
		scrubber.max = ~~music.player.duration
	
	music.player.play()



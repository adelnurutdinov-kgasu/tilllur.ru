{TextLayer} = require "text"
# {Card} = require 'card'
Contrast = require 'contrast'

SongCreator = require 'create_song'

Artist = require 'artist'
config = Artist.config




class exports.Card extends Layer
	constructor: (@options={}) ->
		@options.albumID ?= -1
		
		@options.imageLayer ?= null
		
		@options.songsArray ?= null
		@options.buttonLayer ?= null
		@options.contentLayer ?= null
		
		@options.localFontColor ?= "black"
		@options.localContentColor ?= "white"
		@options.cardColor ?= "black"
		
		@options.isContentShown ?= false

		super @options
		
		
	@define 'albumID',
		get: ->
			@options.albumID
		set: (value) ->
			@options.albumID = value

	@define 'imageLayer',
		get: ->
			@options.imageLayer
		set: (value) ->
			@options.imageLayer = value

	@define 'songsArray',
		get: ->
			@options.songsArray
		set: (value) ->
			@options.songsArray = value

	@define 'contentLayer',
		get: ->
			@options.contentLayer
		set: (value) ->
			@options.contentLayer = value

	@define 'localFontColor',
		get: ->
			@options.localFontColor
		set: (value) ->
			@options.localFontColor = value

	@define 'localContentColor',
		get: ->
			@options.localContentColor
		set: (value) ->
			@options.localContentColor = value
	
	@define 'cardColor',
		get: ->
			@options.cardColor
		set: (value) ->
			@options.cardColor = value
	
	

	initAlbumView: (albumID) ->
		@.cardColor = new Color("#{Artist.albumsData[albumID].tintColor}")
		
		@.localFontColor = Contrast.returnTextColor(@.cardColor)
		@.localContentColor = Contrast.returnContentColor(@.cardColor)

		@.width = 640
		@.height = 108*2+108
		@.borderRadius = 20
		@.borderWidth = 4
		@.borderColor = new Color(r: @.localFontColor.r, g: @.localFontColor.g, b: @.localFontColor.b, a: 0.2)
		@.albumID = albumID
		@.backgroundColor = @.cardColor
	
		topView = new Layer width: 640, height: 108*2, backgroundColor: "null", parent: @
		@.buttonLayer = topView


		image_bg = new Layer width: 156, height: 156, x: 36, y: 28, backgroundColor: "rgba(255,255,255,0)", shadowY: 2, shadowBlur: 8, shadowColor: "rgba(0,0,0,0.2)", parent: @
	
		image = new Layer width: 156, height: 156, x: 36, y: 28, image: "#{Artist.albumsData[albumID].image}", parent: @

		albumTitle = new TextLayer
			parent: @
			text: "#{Artist.albumsData[albumID].title}"
			width: 210*2
			height: 50*2
			x: 108*2
			y: 14*2
			fontSize: 18*2
			fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
			textAlign: "left"
			color: @.localFontColor
			letterSpacing: 0.2
	
		albumYear = new TextLayer
			parent: @
			text: "#{Artist.albumsData[albumID].year}"
			width: 200*2
			height: 50*2
			x: 108*2
			y: 74*2
			fontSize: 13*2
			fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
			textAlign: "left"
			color: @.localFontColor
			opacity: 0.8
			letterSpacing: 0.2
	
	
	
	
	
	returnButtonLayer: ->
		# print "inside: " + @.contentLayer
		return @.buttonLayer
	
	returnSongsArray: ->
		# print "inside: " + @.contentLayer
		return @.songsArray
	
	returnContentLayer: ->
		# print "inside: " + @.contentLayer
		return @.contentLayer


	initContent: ()->
		content = new Layer
			width: 616
			height: 874
			x: 8
			y: 108*2
			borderRadius: 12
			backgroundColor: @.localContentColor
			propagateEvents: false
			parent: @
			name: "contentLayer #{@.albumID}"
			
		@.contentLayer = content
		
		# @.contentLayer.on Events.Click, ->
		
		shuffleBreaker = new Layer width: 616, height: 2, x: 0, y: 48*2, backgroundColor: @.localFontColor, opacity: 0.2, parent: @.contentLayer

	
		shuffleTitle = new TextLayer
			parent: @.contentLayer
			text: "Перемешать альбом"
			width: 284*2
			height: 18*2
			x: 12*2
			y: 15*2
			fontSize: 15*2
			fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
			textAlign: "left"
			color: @.localFontColor
			opacity: 0.8
			letterSpacing: 0.2
		

		# shuffle = new Layer width: 568, height: 60, x: 24, y: 14*2, image: "images/shuffle.png", parent: contentViewBg

		# for song in Artist.albumsData[albumID].songs
		albumSongs = SongCreator.createSongsForAlbum(@.albumID, @.localFontColor)
		@.songsArray = albumSongs
		for song, i in albumSongs
			song.y = song.height * (i) + 48*2
			song.parent = @.contentLayer
			song.albumID = @.albumID
			song.propagateEvents = false
	
		@.contentLayer.height = albumSongs[0].height * albumSongs.length + 14*2 + 60 + 8*2
		studio = new Layer width: 208, height: 24, x: 216, image: "images/studio.png", parent: @.contentLayer, y: albumSongs[0].height * albumSongs.length + 14*2 + 60 + 8*2 + 108*2 + 20 - 108*2
		@.height = song.height * albumSongs.length + 14*2 + 60 + 8*2 + 108*2 + 20 + 20 + studio.height+4
	
		
	
	
	desroyContent: ->
		Utils.delay 0.5, =>
			@.height = 108*3
			
			if typeof @.contentLayer != "undefined" && @.contentLayer != null
				@.contentLayer.parent = null
				@.contentLayer.opacity = 0
			
				@.contentLayer.destroy()
			
			if typeof @.songsArray != "undefined" && @.songsArray != null
				for song in @.songsArray
					song.destroy()
				@.songArray = null
		
		
		
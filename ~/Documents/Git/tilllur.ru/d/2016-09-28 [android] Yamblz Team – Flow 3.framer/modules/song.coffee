class exports.Song extends Layer
	constructor: (@options={}) ->
		@options.albumID ?= -1
		@options.songID ?= -1
		@options.albumTitle ?= "May 14"
		@options.songTitle ?= "Соевые губы"
		
		 
		super @options
		
	@define 'albumID',
		get: ->
			@options.albumID
		set: (value) ->
			@options.albumID = value
			
	@define 'songID',
		get: ->
			@options.songID
		set: (value) ->
			@options.songID = value
			
	@define 'albumTitle',
		get: ->
			@options.albumTitle
		set: (value) ->
			@options.albumTitle = value
	
	@define 'songTitle',
		get: ->
			@options.songTitle
		set: (value) ->
			@options.songTitle = value
			
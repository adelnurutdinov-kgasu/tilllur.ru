class exports.Playlist extends Layer
	constructor: (@options={}) ->
		@options.playlistID ?= -1
		super @options
		
		
	@define 'playlistID',
		get: ->
			@options.playlistID
		set: (value) ->
			@options.playlistID = value


			
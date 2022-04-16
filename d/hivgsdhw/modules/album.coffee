class exports.Album extends Layer
	constructor: (@options={}) ->
		@options.albumID ?= -1
		super @options
		
		
	@define 'albumID',
		get: ->
			@options.albumID
		set: (value) ->
			@options.albumID = value


			
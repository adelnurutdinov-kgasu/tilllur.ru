class exports.Album extends Layer
	constructor: (@options={}) ->
		@options.albumID ?= -1
		
		super @options
		
		@.width = 200*2
		@.height = 200*2
		@.image = "images/albums/#{@.albumID}.jpg"
		@.borderRadius = 4
		
	@define 'albumID',
		get: ->
			@options.albumID
		set: (value) ->
			@options.albumID = value


			
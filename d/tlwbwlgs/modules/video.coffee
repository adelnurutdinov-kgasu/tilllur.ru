class exports.Video extends Layer
	constructor: (@options={}) ->
		@options.videoID ?= -1
		super @options
		
		
	@define 'videoID',
		get: ->
			@options.videoID
		set: (value) ->
			@options.videoID = value


			
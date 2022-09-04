class exports.News extends Layer
	constructor: (@options={}) ->
		@options.newsID ?= -1
		@options.newsImage ?= -1
		@options.newsTextImage ?= -1

		
		super @options
		
		@.borderRadius = 8
		
	@define 'newsID',
		get: ->
			@options.newsID
		set: (value) ->
			@options.newsID = value
			
	@define 'newsImage',
		get: ->
			@options.newsImage
		set: (value) ->
			@options.newsImage = value
	
	@define 'newsTextImage',
		get: ->
			@options.newsTextImage
		set: (value) ->
			@options.newsTextImage = value
	
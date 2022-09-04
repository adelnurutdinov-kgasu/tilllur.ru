class exports.Nav extends Layer
	constructor: (@options={}) ->
		@options.navID ?= -1
		super @options
		
		
	@define 'navID',
		get: ->
			@options.navID
		set: (value) ->
			@options.navID = value


			
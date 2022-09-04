class exports.Card extends Layer
	constructor: (@options={}) ->
		@options.cardID ?= -1
		super @options
		
		
	@define 'cardID',
		get: ->
			@options.cardID
		set: (value) ->
			@options.cardID = value


			
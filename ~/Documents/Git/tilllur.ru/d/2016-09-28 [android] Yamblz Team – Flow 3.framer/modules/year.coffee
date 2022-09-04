{TextLayer} = require "text"

class exports.Year extends TextLayer
	constructor: (@options={}) ->
		@options.yearID ?= -1
		super @options
		
		
	@define 'yearID',
		get: ->
			@options.yearID
		set: (value) ->
			@options.yearID = value


			
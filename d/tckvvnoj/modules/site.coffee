# Add the following line to your project in Framer Studio.
# myModule = require "myModule"
# Reference the contents by name, like myModule.myFunction() or myModule.myVar

class exports.Site extends ScrollComponent
		constructor: (@options={}) ->
			@options.siteID ?= -1
			super @options

		@define 'siteID',
			get: ->
				@options.siteID
			set: (value) ->
				@options.siteID = value

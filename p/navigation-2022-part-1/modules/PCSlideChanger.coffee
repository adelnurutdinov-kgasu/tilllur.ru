

SVG = require "PCSVG"

Buttons = require("PCButtons")
# Text = Buttons.Text
TextButton = Buttons.TextButton
SVGButton = Buttons.SVGButton


class exports.SlideChanger extends Layer
	
	constructor: (@options={}) ->
		
		_.defaults @options,
			name: "progress view"
			backgroundColor: null
			width: 120
			height: 56
			pages: 1
			current: 1
			slider: null
			
		
		testHadler = (event, layer) ->
			try @parent.slider.pinchToGrid()


		@currentText = new TextButton
			textAlign: "center", width: 120, letterSpacing: 3
			handler: testHadler
		
		@currentText.updateTuple({ normal: 1, hover: 0.8 })

		@prevButton = new SVGButton
			name: "prev", width: 16, height: 16, asset: SVG.prevIcon
			handler: @moveLeft
		
		@nextButton = new SVGButton
			name: "next", width: 16, height: 16, asset: SVG.nextIcon
			handler: @moveRight
		
		super @options
		
		@currentText.parent = @
		@currentText.y = Align.center(-1)
		@currentText.style =
			"font-feature-settings": "tnum"
			"font-variant-numeric": "tabular-nums lining-nums"
		
		@prevButton.parent = @
		@prevButton.x = Align.left
		@prevButton.y = Align.center
		
		@nextButton.parent = @
		@nextButton.x = Align.right
		@nextButton.y = Align.center
		
	
	@define 'slider',
		get: -> @options.slider
		set: (value) ->
			@options.slider = value
	
	@define 'pages',
		get: -> @options.pages
		set: (value) ->
			@options.pages = value
			@currentText.text = "#{@current}/#{@pages}"

	@define 'current',
		get: -> @options.current
		set: (value) ->
			@options.current = value

			if @current != -1
				# then @parent.animate(opacity: 0, curve: Spring(damrping: 1), time: 0.4)
			# else
				# @parent.animate(opacity: 1, curve: Spring(damrping: 1), time: 0.4)
				@currentText.text = "#{@current}/#{@pages}"
			
	



	moveLeft: () =>
# 		print @slider
		@slider.snapToNextPage("left", false)
	
	moveRight: () =>
# 		print @slider
		@slider.snapToNextPage("right", false)
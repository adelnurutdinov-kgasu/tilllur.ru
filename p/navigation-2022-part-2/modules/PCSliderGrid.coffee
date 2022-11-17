
{Slider5} = require "PCSlider5"

Buttons = require("PCButtons")
TextButton = Buttons.TextButton
PreviewButton = Buttons.PreviewButton


# Panels

# print "?"
class exports.SliderGrid extends Slider5
	constructor: (@options={}) ->

		grid2 = new ScrollComponent
			name: "grid2"
			width: 1400 * 2, height: 900 * 2
			scrollVertical: true, scrollHorizontal: false
			backgroundColor: null
			# ignoreEvents: false
			mouseWheelEnabled: true
			backgroundColor: "000"
		
		grid2.states =
			"shown": { opacity: 1, y: Screen.height }
			"hidden": { opacity: 0, y: Screen.height }
		
		# grid2.on Events.StateSwitchEnd, (from, to) ->
		# 	if from != to
		# 		if to == "shown" then @ignoreEvents = true
		# 		else @ignoreEvents = false
		
		grid2.stateSwitch("hidden")


		_.defaults @options,
			grid2: grid2
			lastSlideSelectedIndex: 0
			gridButtons: []
		
		super @options

		grid2.parent = @canvas
		@canvas.custom.localScroll = @

		try grid.placeBefore(@topView)


		@content.on "change:children", ->
			localScroll = @parent
			
			localScroll.addPreview(localScroll.content.children.length)
			localScroll.updatePreview()
		

		# @on Events.StateSwitchEnd, (from, to) ->
		# 	if from != to
		# 		if to == "present" then nextOpacityValue = 1
		# 		else nextOpacityValue = 0
				
		# 		@bottomView.animate(opacity: nextOpacityValue, options: { curve: Spring(damping: 1), time: 0.5 })

				
	
	
	@define 'lastSlideSelectedIndex',
		get: -> @options.lastSlideSelectedIndex
		set: (value) -> @options.lastSlideSelectedIndex = value
	
	@define 'gridButtons',
		get: -> @options.gridButtons
		set: (value) -> @options.gridButtons = value
	
	@define 'grid2',
		get: -> @options.grid2
		set: (value) -> @options.grid2 = value
	
	

	leadZero: (num, size = 2) =>
		s = num + ""
		while s.length < size then s = "0" + s
		return s


	addPreview: (imageIndex) =>
		index = imageIndex - 1
		# pW = @grid2.width / @gridSize()
		# pH = (@grid2.width / @gridSize()) * (900/1400)

		previewLayer = new PreviewButton
			text: ""
			parent: @grid2.content
			width: 280, height: 180
			borderRadius: 8
			backgroundColor: "222"
			# tuple: { normal: 1.0, hover: 0.8 }
			image: "images/page#{@leadZero(imageIndex)}@preview.png"
			custom:
				index: index
		
		previewLayer.states =
			"shown": { opacity: 0.8 }
			"hidden": { opacity: 0 }
		previewLayer.stateSwitch("hidden")
		
		@gridButtons.push previewLayer

		previewLayer.onTap ->
			localCanvas = @parent.parent.parent
			localScroll = localCanvas.custom.localScroll
			
			localScroll.lastSlideSelectedIndex = index
			localScroll.pinchToSlide()

		
		# @grid2.updateContent()
	
	updatePreview: () =>
		for item, index in @grid2.content.children
			pW = (@grid2.width - @getGridGap() * (@gridSize() + 1)) / @gridSize()
			pH = pW * (900/1400)

			item.width = pW
			item.height = pH
			item.x = index % @gridSize() * (pW + @getGridGap()) + @getGridGap()
			item.y = (index - index % @gridSize()) / @gridSize() * (pH + @getGridGap()) + @getGridGap()

		
		@grid2.updateContent()


	
	# override
	updateSize: () =>
		super
		nextState = @grid2.states.current.name
		
		@grid2.width = @canvas.width
		@grid2.height = @canvas.height - 58

		@grid2.states.shown.y = 58
		@grid2.states.hidden.y = Screen.height + 1000

		@grid2.stateSwitch(nextState)

		@updatePreview()


	gridSize: () =>
		if @canvas.width < 740 then return 2
		else if @canvas.width < 1280 then return 3
		else if @canvas.width < 1600 then return 4
		else if @canvas.width < 2000 then return 5
		return 6

	getGridGap: () =>
		return 8

	getGridScale: () =>
		ws = (@width - @getGridGap() * (@gridSize() - 1)) / @gridSize()
		return ws / @width



	isGrid: () =>
		return @grid2.states.current.name == "shown"

	pinchToGrid: () =>
		if @isGrid() then @pinchToSlide()
		else
			# if @grid.states.current.name == "fullscreen" then @changeScale()

			for item, index in @gridButtons
				if index == @lastSlideSelectedIndex
					item.stateSwitch("shown")
				else
					item.stateSwitch("hidden")
					item.animate("shown", curve: Spring(damping: 1), time: 0.5, delay: 0.12 + 0.02 * Math.abs((@lastSlideSelectedIndex - index)))
			
			@grid2.stateSwitch("shown")
			try @grid2.scrollToPoint({ x: 0, y: @gridButtons[@lastSlideSelectedIndex].y - @gridButtons[@lastSlideSelectedIndex].height / 2 }, false)
			
			@pauseVideos()

	pinchToSlide: () =>
		# print @lastSlideSelectedIndex
		@grid2.stateSwitch("hidden")
		@snapToPage(@content.children[@lastSlideSelectedIndex], false)
		
		



		
		
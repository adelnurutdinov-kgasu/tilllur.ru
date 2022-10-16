
{Slider5} = require "PCSlider5"

Buttons = require("PCButtons")
TextButton = Buttons.TextButton


# Panels

# print "?"
class exports.SliderPinch extends Slider5
	constructor: (@options={}) ->

		_.defaults @options,
			lastSlideSelectedIndex: 0
			gridButtons: []
		
		super @options

		@on Events.StateSwitchEnd, (from, to) ->
			if from != to
				if to == "present"
					nextOpacityValue = 1
				else
					nextOpacityValue = 0
				
				@bottomView.animate(opacity: nextOpacityValue, options: { curve: Spring(damping: 1), time: 0.5 })

				
		
	
	@define 'lastSlideSelectedIndex',
		get: -> @options.lastSlideSelectedIndex
		set: (value) -> @options.lastSlideSelectedIndex = value
	
	@define 'pinchButtons',
		get: -> @options.pinchButtons
		set: (value) -> @options.pinchButtons = value
		
	
	

	gridSize: () =>
		return 3

	getGridGap: () =>
		return 20

	getGridScale: () =>
		ws = (@width - @getGridGap() * (@gridSize() - 1)) / @gridSize()
		return ws / @width



	pinchToGrid: () =>

		if @isGrid()
			@pinchToSlide(@lastSlideSelectedIndex)
			return

		@stateSwitch("grid")
		@showGridCancelButton()

		scaleIndex = @getGridScale()

		@ignoreEvents = true
		@content.ignoreEvents = true

		# @scrollVertical = true
		# @content.scrollVertical = false
		@scrollHorizontal = false
		# @content.scrollHorizontal = false



		for slide, index in @content.children
			slide.gridData =
				x: (index % @gridSize() - 1) * (slide.width * scaleIndex + @getGridGap())
				y: ((index - index % @gridSize()) / @gridSize() - 1) * (slide.height * scaleIndex + @getGridGap()) + @getGridGap()
				scale: scaleIndex




		@grid.scrollToPoint({x: 0, y: @content.children[@lastSlideSelectedIndex].gridData.y }, false)
		selectedSlideDeltaY = @grid.scrollY
		@snapToPage(@content.children[0], false)

		@clip = false
		@content.clip = false

		@grid.scrollVertical = true
		@grid.mouseWheelEnabled = true

		deltaRowNumber = ((@content.children.length - (@content.children.length % @gridSize())) / @gridSize() + 1)
		@height = deltaRowNumber * (@grid.height / 3) + (deltaRowNumber + 1) * (@gridSize() / scaleIndex)


		
		
		for slide, index in @content.children
			if index == @lastSlideSelectedIndex

				slide.bringToFront()
				slide.x = 0
				slide.y = selectedSlideDeltaY

				gridDownscaleAnimation = new Animation slide,
					x: slide.gridData.x
					y: slide.gridData.y
					scale: slide.gridData.scale
					options:
						curve: Bezier(0.25, 0.1, 0.25, 1)
						time: 0.3
				
				gridDownscaleAnimation.start()

				gridDownscaleAnimation.on Events.AnimationEnd, (animation) ->
					localScroll = @layer.parent.parent
					localGridButtons = []

					for slide, index in localScroll.content.children
						# print localSlide
						
						gridBackHander = (event, layer) ->
							localScroll = @parent.parent.parent
							localScroll.lastSlideSelectedIndex = @custom.slideIndex
							localScroll.pinchToSlide()

						gridBackButton = new TextButton
							parent: slide
							width: slide.width, height: slide.height
							backgroundColor: null

							text: ""
							handler: gridBackHander
							custom:
								slideIndex: index
						
						localGridButtons.push gridBackButton

						# gridBackButton.onTap ->
						# 	localScroll = @parent.parent.parent
						# 	localScroll.lastSlideSelectedIndex = @custom.slideIndex
						# 	localScroll.pinchToSlide()
					
					localScroll.gridButtons = localGridButtons


			else
				slide.x = slide.gridData.x
				slide.y = slide.gridData.y
				slide.scale = slide.gridData.scale



		
		
		@updateContent()
		@grid.updateContent()



	



	pinchToSlide: () =>
		
		@stateSwitch("present")

		for item in @gridButtons
			item.destroy()

		@ignoreEvents = false
		@content.ignoreEvents = false

		# @scrollVertical = false
		# @content.scrollVertical = true
		@scrollHorizontal = true
		# @content.scrollHorizontal = true

		@clip = true
		@content.clip = true
		# @backgroundColor = null

		@grid.ignoreEvents = true
		# @grid.content.ignoreEvents = true

		@grid.scrollVertical = false
		@grid.mouseWheelEnabled = false

		@height = @grid.height
		@grid.scrollToTop(false)


		for slide, index in @content.children
			slide.gridData =
				x: (slide.width + 120) * index
				y: 0
				scale: 1

		for slide, index in @content.children
			slide.x = slide.gridData.x
			slide.y = slide.gridData.y
			slide.scale = slide.gridData.scale

		# for slide, index in @content.children
		# 	if index == @lastSlideSelectedIndex
		# 		slide.bringToFront()

		# 		gridUpscaleAnimation = new Animation slide,
		# 			x: slide.gridData.x
		# 			y: slide.gridData.y
		# 			scale: slide.gridData.scale
		# 			options:
		# 				curve: Bezier(0.25, 0.1, 0.25, 1)
		# 				time: 0.3
				
		# 		gridUpscaleAnimation.start()

		# 		gridUpscaleAnimation.on Events.AnimationEnd, (animation) ->
		# 			localScroll = @layer.parent.parent

		# 			for slide, index in localScroll.content.children
		# 				slide.x = slide.gridData.x
		# 				slide.y = slide.gridData.y
		# 				slide.scale = slide.gridData.scale
		# 				# slide.opacity = 1

		# 	# else
		# 		# slide.opacity = 0.5


		
		@updateContent()
		@snapToPage(@content.children[@lastSlideSelectedIndex], false)

		@updateCurrentPage()



		
		
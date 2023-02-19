
SVG = require "PCSVG"

Buttons = require("PCButtons")
SVGButton = Buttons.SVGButton

class exports.PlayerSlider extends SliderComponent

	constructor: (@options={}) ->
		
		@view = new Layer
			name: "sliderView"
			width: 100 * 2
			height: 56 * 2
			backgroundColor: "rgba(0,0,0,0.25)"
			borderRadius: 18 * 2
			custom:
				slider: null
		
		@view.draggable.enabled = true
		@view.draggable.speedX = 0
		@view.draggable.speedY = 0
		@view.draggable.propagateEvents = false

		@view.states =
			"wide": { width: 800 * 2 }
			"compact": { width: 260 * 2 }

		@view.on "change:width", ->
			sliderInside = @custom.slider
			sliderView = @

			if sliderInside
				# print "?"
				sliderInside.width = sliderView.width - ((12 + 40 + 8 + 40 + 16) + 20) * 2
				sliderInside.x = Align.left((12 + 40 + 8 + 40 + 16) * 2)
				sliderInside.y = Align.center()
				
				sliderInside.sliderOverlay.width = sliderInside.width
				sliderInside.sliderOverlay.height = 4 * 2
				sliderInside.sliderOverlay.x = 0
				sliderInside.sliderOverlay.y = 0


		_.defaults @options,
			view: null
			playerButton: null
			soundButton: null

			name: "videoSlider"
			height: 4 * 2
			knobSize: 24 * 2
			backgroundColor: null
		
		super @options
		
		@parent = @view
		@view.custom.slider = @

		@updateContent()
		@view.stateSwitch("compact")

		@style = cursor: "pointer"
		
		@.on Events.TouchStart, (event, layer) ->
			layer.value = Utils.modulate(event.point.x, [0, @sliderOverlay.width], [0, 1], true)
		
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff
	
	
	Hover: =>
# 		@opacity = 1
	HoverOff: =>
# 		@opacity = 0.5
	
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)
	
	@define 'view',
		get: -> @options.view
		set: (value) -> @options.view = value
	
	# @define 'width',
	# 	get: -> @options.width
	# 	set: (value) ->
	# 		@options.width = value
	# 		try @view = @view.width - ((12 + 40 + 8 + 40 + 16) + 20) * 2
	

	# updateForScaleLeft: () =>
	# 	@backgroundColor = "green"
	# 	@view.backgroundColor = "blue"

	# 	@view.width = 260 * 2
	# 	@view.x = Align.left()
	# 	@view.y = Align.bottom(-32 * 2)

	# 	@width = @view.width - ((12 + 40 + 8 + 40 + 16) + 20) * 2
	# 	@x = (12 + 40 + 8 + 40 + 16) * 2
	# 	@y = Align.center

	# 	@sliderOverlay.width = @width
	# 	@sliderOverlay.height = 4 * 2
	# 	@sliderOverlay.x = 0
	# 	@sliderOverlay.y = 0
		


	# updateForScaleDown: () =>
	# 	@view.width = 800 * 2
	# 	# @view.x = Align.center
	# 	# @view.y = Align.bottom(-32 * 2)

	# 	@width = @view.width - ((12 + 40 + 8 + 40 + 16) + 20) * 2


	# 	@sliderOverlay.width = @width
	# 	@sliderOverlay.height = 4 * 2
	# 	@sliderOverlay.x = 0
	# 	@sliderOverlay.y = 0
	


	
	
	
	updateContent: () =>
		@playButton = new SVGButton
			parent: @view, name: "playButton"
			width: 40 * 2, height: 40 * 2
			x: 12 * 2
			y: Align.center
			asset: SVG.playerPauseIcon
			backgroundColor: null
		
		@playButton.states =
			"playing": { asset: SVG.playerPauseIcon }
			"paused": { asset: SVG.playerPlayIcon }
		@playButton.stateSwitch("playing")
		
		

		@soundButton = new SVGButton
			parent: @view
			width: 40 * 2, height: 40 * 2
			x: (12 + 40 + 8) * 2
			y: Align.center
			asset: SVG.playerSoundIcon
			backgroundColor: null
		
		@soundButton.states =
			"sound": { asset: SVG.playerSoundIcon }
			"muted": { asset: SVG.playerSoundOffIcon }
		@soundButton.stateSwitch("muted")




		@sliderOverlay.backgroundColor = "rgba(255,255,255,0.05)"
		# @sliderOverlay.backgroundColor = "red"
		# @sliderOverlay.width = @width
		@sliderOverlay.height = 4 * 2
		@sliderOverlay.x = 0
		@sliderOverlay.y = 0
		@sliderOverlay.ignoreEvents = true
		
		@fill.backgroundColor = "white"
		@fill.opacity = 0.3
		
		@knob.backgroundColor = "null"
		@knob.opacity = 1
		@knob.draggable.momentum = false
		@knob.draggable.propagateEvents = false
		@knob.shadowColor = null
		@knob.shadowY = 0
		
		knobCursor = new Layer
			parent: @knob
			width: 4 * 2, height: 32 * 2
			x: Align.center, y: Align.center
			backgroundColor: "#ddd"
			borderRadius: 4 * 2

SVG = require "PCSVG"

Buttons = require("PCButtons")
SVGButton = Buttons.SVGButton

class exports.PlayerSlider extends SliderComponent

	constructor: (@options={}) ->
		
		@view = new Layer
			name: "sliderView"
			width: 260 * 2, height: 56 * 2
			backgroundColor: "rgba(0,0,0,0.25)"
			borderRadius: 18 * 2
		
		@view.draggable.enabled = true
		@view.draggable.speedX = 0
		@view.draggable.speedY = 0
		@view.draggable.propagateEvents = false



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
		


		
		super @options
		
		@parent = @view
		@name = "videoSlider"
		
		@backgroundColor = null
		@width = @view.width - ((12 + 40 + 8 + 40 + 16) + 20) * 2
		@height = 4 * 2
		@x = (12 + 40 + 8 + 40 + 16) * 2
		@y = Align.center
		@knobSize = 24 * 2
		
		# 12 + 40 + 8 + 40 + 16 + flex + 20

		@sliderOverlay.backgroundColor = "rgba(255,255,255,0.05)"
		# @sliderOverlay.backgroundColor = "red"
		@sliderOverlay.width = @width
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
	
	updateForScaleDown: () ->
		@view.width = 800 * 2
		@view.x = Align.center
		@view.y = Align.bottom(-32 * 2)

		@width = @view.width - ((12 + 40 + 8 + 40 + 16) + 20) * 2
		@height = 4 * 2

		# print @sliderOverlay.width
		@sliderOverlay.width = @width
		@sliderOverlay.height = 4 * 2
		@sliderOverlay.x = 0
		@sliderOverlay.y = 0
		# print @sliderOverlay.width

		# @playerSlider.width = @width - 300 * 2 * 2
		# @playerSlider.x = Align.left(300 * 2)
		# @playerSlider.y = Align.bottom(-32 * 2)
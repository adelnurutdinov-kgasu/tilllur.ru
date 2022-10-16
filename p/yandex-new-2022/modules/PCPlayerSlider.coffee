class exports.PlayerSlider extends SliderComponent
	constructor: (@options={}) ->
		
		@view = new Layer
			name: "sliderView"
			width: 184 * 2, height: 56 * 2
			backgroundColor: "rgba(0,0,0,0.25)"
			borderRadius: 56
		
		@view.draggable.enabled = true
		@view.draggable.speedX = 0
		@view.draggable.speedY = 0
		@view.draggable.propagateEvents = false
		
		
		super @options
		
		@parent = @view
		@name = "videoSlider"
		@center()
		
		@backgroundColor = null
		@height = 4 * 2
		@width = 128 * 2
		@x = Align.center
		@knobSize = 24 * 2
		
		@sliderOverlay.backgroundColor = "rgba(255,255,255,0.05)"
		@sliderOverlay.width = 128 * 2
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
			backgroundColor: "DDD"
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
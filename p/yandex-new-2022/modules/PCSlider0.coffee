

# Scale & URL handling

class exports.Slider0 extends PageComponent
	constructor: (@options={}) ->
		
		canvasBackgroundLayer = new BackgroundLayer
			name: "backgroundLayer"
		


		canvasLayer = new Layer
			name: "canvas"
			width: Screen.width
			height: Screen.height
			custom:
				localScroll: null
		
		canvasLayer.states =
			"window": { backgroundColor: "#000" }
			"fullscreen": { backgroundColor: "#222" }


		# Legacy
		legacyScroll = new ScrollComponent
			parent: canvasLayer
			name: "grid"
			width: 1400 * 2, height: 900 * 2
			scrollVertical: false, scrollHorizontal: false
			backgroundColor: null
			ignoreEvents: true
		
		legacyScroll.states =
			"window": { scale: 1 }
			"fullscreen": { scale: 1 }


		_.defaults @options,
			canvas: canvasLayer
			grid: legacyScroll
			backgroundLayer: canvasBackgroundLayer
	
			parent: legacyScroll.content
			width: legacyScroll.width, height: legacyScroll.height
			scrollVertical: false, scrollHorizontal: true
			presentationTitle: "Untitled"
		

		super @options

		@content.draggable.propagateEvents = false

		Framer.Extras.Preloader.disable()
		Framer.Extras.Hints.disable()
		document.body.style.cursor = "auto"
		
		@initScale()
		
		@updateSize()
		@backgroundLayer.on "change:size", =>
			@updateSize()
		


	

	@define 'title',
		get: -> @options.presentationTitle
		set: (value) -> @options.presentationTitle = value
	
	@define 'canvas',
		get: -> @options.canvas
		set: (value) -> @options.canvas = value
	
	@define 'grid',
		get: -> @options.grid
		set: (value) -> @options.grid = value
	
	@define 'backgroundLayer',
		get: -> @options.backgroundLayer
		set: (value) -> @options.backgroundLayer = value
	
	
	

	# isGrid: () =>
	# 	return @states.current.name == "grid"
	
	updateSize: () =>
		@initScale(@grid.states.current.name)
	
	initScale: (forState = "window") =>
		@canvas.width = Screen.width
		@canvas.height = Screen.height

		scaleX = (Screen.width - 20) / @grid.width
		scaleY = (Screen.height - 120) / @grid.height
		@grid.states.window.scale = Math.min(scaleX, scaleY)
		
		scaleX = Screen.width / @grid.width
		scaleY = Screen.height / @grid.height
		@grid.states.fullscreen.scale = Math.min(scaleX, scaleY)
		
		@grid.stateSwitch(forState)
		@canvas.stateSwitch(forState)
		
		@grid.center()
	
	
	# for react
	changeScale: () =>
		
		if @grid.states.current.name == "window" then nextState = "fullscreen"
		else nextState = "window"
		
		@grid.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		@canvas.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		@topView.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		@bottomView.animate(nextState, curve: Spring(damping: 1), time: 0.5)
	

	restartHandler: () =>
		@snapToPage(@content.children[0], false)
	
	
	openURL: (url = "https://tilllur.ru", isBlank = false) =>
		if isBlank then window.open url, '_blank'
		else
# 			window.location.hash = "?slideID"
			window.location = url
	
	openURLHome: =>
		@openURL("https://tilllur.ru", false)




# Scale & URL handling

class exports.Slider0 extends PageComponent
	constructor: (@options={}) ->
		
		canvasBackgroundLayer = new BackgroundLayer
			name: "canvas"
		
		canvasBackgroundLayer.states =
			"window": { backgroundColor: "#000" }
			"fullscreen": { backgroundColor: "#222" }
		

		gridScroll = new ScrollComponent
			parent: canvasBackgroundLayer
			name: "grid"
			width: 1400 * 2, height: 900 * 2
			scrollVertical: false, scrollHorizontal: false
			backgroundColor: null
			ignoreEvents: true
		
		gridScroll.states =
			"window": { scale: 1 }
			"fullscreen": { scale: 1 }


		_.defaults @options,
			canvas: canvasBackgroundLayer
			grid: gridScroll
	
			parent: gridScroll.content
			width: gridScroll.width, height: gridScroll.height
			scrollVertical: false, scrollHorizontal: true
			presentationTitle: "Untitled"
		

		super @options

		@content.draggable.propagateEvents = false

		@states =
			"grid": { opacity: 1 }
			"present": { opacity: 1 }
		@stateSwitch("present")

		Framer.Extras.Preloader.disable()
		Framer.Extras.Hints.disable()
		document.body.style.cursor = "auto"
		
		@initScale()
		
		@updateSize()
		@canvas.on "change:size", =>
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
	
	
	
	isGrid: () =>
		return @states.current.name == "grid"
	
	updateSize: () =>
		@initScale(@grid.states.current.name)
	
	
	initScale: (forState = "window") =>

		scaleX = (@canvas.width - 20) / @grid.width
		scaleY = (@canvas.height - 120) / @grid.height
		@grid.states.window.scale = Math.min(scaleX, scaleY)
		
		scaleX = @canvas.width / @grid.width
		scaleY = @canvas.height / @grid.height
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


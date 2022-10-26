

Assets = require "Preview_Assets"


# document.body.style.cursor = "auto"

class exports.PreviewClass1 extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			name: "Preview"

			view: null
			visible: true
			forceAndroidBar: false
			
			backgroundColor: null
			borderRadius: 42
			
			prototypeCreationYear: "20:20"
			assets: Assets.data
		
		super @options
		

		window.savePreviewMessageFramerObject(@)
		
		@states =
			"normal": { scale: 1 }
			"fill": { scale: 1 }
		

	

	@define 'view',
		get: -> @options.view
		set: (value) ->
			@options.view = value
			@width = @view.width
			@height = @view.height
			@view.parent = @
	

	@define 'visible',
		get: -> if @options.visible then return 1 else return 0
		set: (value) -> @options.visible = value
	
	
	@define 'forceAndroidBar',
		get: -> @options.forceAndroidBar
		set: (value) -> @options.forceAndroidBar = value
	

	@define 'prototypeCreationYear',
		get: -> @options.prototypeCreationYear
		set: (value) -> @options.prototypeCreationYear = value


	@define 'assets',
		get: -> @options.assets





	screenSize: (w, h) => return Screen.width == w and Screen.height == h
	viewSize: (w, h) => return @width == w and @height == h
	viewWidth: (w) => return @width == w

	logSize: () =>
		new TextLayer { text: "#{Screen.width}x#{Screen.height}", y: Align.center }	



	animateStateToNormal: () =>
		@animate("normal", curve: Spring(damping: 1), time: 0.5)
	
	animateStateToFill: () =>
		@animate("fill", curve: Spring(damping: 1), time: 0.5)
	
	stateSwitchToNormal: () =>
		@stateSwitch("normal")
	
	stateSwitchToFill: () =>
		@stateSwitch("fill")


		

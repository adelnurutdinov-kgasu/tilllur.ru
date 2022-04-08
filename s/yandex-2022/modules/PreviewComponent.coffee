# Preview Component
Assets = require "PreviewComponentAssets"
Framer.Extras.Hints.disable()
# Framer.Extras.Preloader.disable()

localColors =
	bg_color_onLight: "#eee"
	bg_color_onDark: "#222"
	content_color_onLight: "#000"
	content_color_onDark: "#FFF"

theme =
	bg_color: localColors.bg_color_onDark
	content_color: localColors.content_color_onDark


# Preview

class exports.Preview extends Layer
	constructor: (@options={}) ->
		
		_.defaults @options,
			view: null
			prototypeCreationYear: "20:22"
			name: "Preview"
			backgroundColor: null
			borderRadius: 42
			forceAndroidBar: false
			
			visible: true
			topTheme: "dark"
			bottomTheme: "dark"
			assets: Assets.data
		
		super @options
		
		@scalePreview()

		
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
	
	@define 'topTheme',
		get: -> @options.topTheme
		set: (value) -> @options.topTheme = value
	
	@define 'bottomTheme',
		get: -> @options.bottomTheme
		set: (value) -> @options.bottomTheme = value
	
	@define 'forceAndroidBar',
		get: -> @options.forceAndroidBar
		set: (value) -> @options.forceAndroidBar = value
	
	@define 'prototypeCreationYear',
		get: -> @options.prototypeCreationYear
		set: (value) -> @options.prototypeCreationYear = value
	
	@define 'assets',
		get: -> @options.assets
# 		set: (value) -> @options.showBar = value
	
	
	
	scalePreview: () =>
		if Utils.isMobile() then @previewMobile()
		else @previewDesktop()
		
# 		if false then @logSize()
	
	
	
	screenSize: (w, h) => return Screen.width == w and Screen.height == h
	viewSize: (w, h) => return @width == w and @height == h
	viewWidth: (w) => return @width == w
	
	

	
	
	previewDesktop: () =>
		Canvas.backgroundColor = theme.bg_color
		@createBars()
		@center()
		@clip = true
	
	
	previewMobile: () =>
		previewCanvas = new BackgroundLayer
			backgroundColor: theme.content_color, name: ".hiddenPreviewCanvas"
		
		@clip = false
		@center()
		@originY = 0.5
		@originX = 0.5
		
		if @viewSize(375, 812) or @viewSize(390, 844) or @viewSize(414, 896) or @viewSize(428, 926)
			
			if @screenSize(375, 768) or @screenSize(390, 797) or @screenSize(414, 852) or @screenSize(428, 879)
				@scale = Screen.width / @width
			else @setCustomPreview()
		
# 		else if @view.width == 360
			
		else @setCustomPreview()
	
	
	
	
	
	setCustomPreview: () =>
		@y = Align.top(-20)
		@originY = 0
		
		sH = (Screen.height + 40) / @height
		@scale = Math.min(Screen.width / @width, sH)
	
	
	logSize: () =>
		new TextLayer { text: "#{Screen.width}x#{Screen.height}", y: Align.center }
	
	
	
	
	createBars: () =>
		topBar = new Layer 
			parent: @, width: @width, y: Align.top, name: ".status bar"
			opacity: @visible, backgroundColor: null
		
		if @viewSize(375, 812) or @viewSize(390, 844) or @viewSize(414, 896) or @viewSize(428, 926) or @viewSize(360, 782)
			@createNotchStatusBar(topBar)
			@createHomeIndicator new Layer
				parent: @, width: @width, height: 34, y: Align.bottom, name: ".home bar", opacity: @visible, backgroundColor: null
		
		else if @viewSize(375, 667) or @viewSize(414, 736) or @viewSize(320, 568)
			@createClassicStatusBar(topBar)
		
		else if @forceAndroidBar
			@createClassicAndroidStatusBar(topBar) 
		
		else @createAndroidStatusBar(topBar)
	
	
	
	
	createAndroidStatusBar: (temp) =>
		temp.height = 32
		
		@createClassicAndroidStatusBar new Layer
			parent: temp, width: temp.width - 16, x: Align.center, y: Align.top(6)
			backgroundColor: null
	
	
	createClassicAndroidStatusBar: (barLayer) =>
		barLayer.height = 20
		
		classicCenterComponent = new TextLayer
			parent: barLayer, width: 52, height: 20, x: Align.left, y: Align.center(1)
			color: @assets.color[@topTheme], backgroundColor: null
			fontSize: 14, fontWeight: 600, textAlign: "center", fontFamily: ".system, SF Pro Text"
			text: @prototypeCreationYear
		
		classicRightomponent = new Layer
			parent: barLayer, width: 100, height: 20, x: Align.right, y: Align.center(-1)
			image: @assets.androidStatusBarRightImage[@topTheme]
	
	
	
	
	
	
	createClassicStatusBar: (barLayer) =>
		barLayer.height = 20
		
		classicLeftComponent = new Layer
			parent: barLayer, width: 100, height: barLayer.height, x: Align.left
			image: @assets.oldStatusBarLeftImage[@topTheme]
		
		classicCenterComponent = new TextLayer
			parent: barLayer, width: 54, height: 16, x: Align.center, y: Align.center
			color: @assets.color[@topTheme], backgroundColor: null
			fontSize: 12, fontWeight: 600, textAlign: "center", fontFamily: ".system, SF Pro Text"
			text: @prototypeCreationYear
		
		classicRightomponent = new Layer
			parent: barLayer, width: 100, height: barLayer.height, x: Align.right
			image: @assets.oldStatusBarRightImage[@topTheme]
		
	
	
	createNotchStatusBar: (barLayer) =>
		barLayer.height = 44
		
		notchLeftComponent = new TextLayer
			parent: barLayer, width: 54, height: 21, x: Align.left(21), y: Align.top(12)
			color: @assets.color[@topTheme], backgroundColor: null, letterSpacing: -0.17
			fontSize: 15, fontWeight: 600, textAlign: "center", fontFamily: ".system, SF Pro Text"
			text: @prototypeCreationYear
		
		notchCenterComponent = new Layer
			parent: barLayer, width: 375, height: barLayer.height, x: Align.center
			image: @assets.notch
		
		notchRightComponent = new Layer
			parent: barLayer, width: 100, height: barLayer.height, x: Align.right
			image: @assets.statusBarRightImage[@topTheme]
	
	
	
	createHomeIndicator: (barLayer) =>
		homeIndicator = new Layer
			parent: barLayer, width: 135, height: 5, x: Align.center, y: Align.bottom(-8)
			backgroundColor: @assets.color[@bottomTheme], borderRadius: 20
	
	


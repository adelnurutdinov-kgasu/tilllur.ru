# Presentation Component

SVG = require "PCSVG"


# Presentation

class exports.Presentation extends PageComponent
	constructor: (@options={}) ->
		@gap = 56
		@_theme = ""
		
		@canvas = new Layer
			width: Canvas.width, height: Canvas.height, name: "canvas"
		@canvas.states =
			"window": { backgroundColor: "#000" }
			"fullscreen": { backgroundColor: "#222" }
		
		@topView = new Layer
			width: Canvas.width, height: @gap, name: "topView"
		
		@bottomView = new Layer
			width: Canvas.width, height: @gap, name: "bottomView", y: Align.bottom
		
		
		_.defaults @options,
			parent: @canvas
			width: 1400 * 2
			height: 900 * 2
			scrollVertical: false
			scrollHorizontal: true
# 			clip: false
			
			title: ""
			gap: @gap * 2
		
		super @options
		
		for item in [@topView, @bottomView]
			item.parent = @parent
			item.sendToBack()
			item.backgroundColor = null
			item.states =
				"window": { opacity: 1 }
				"fullscreen": { opacity: 0 }
		
		
		@states =
			"window": { scale: 1 }
			"fullscreen": { scale: 1 }
		
		@initGeneral()
		@initPageChange()
		@initSizeChange()
		@initScale()
		@initShortcuts()
		
		
		# Top View
		@logoButton = new PCSVGButton
			parent: @topView, name: "logo"
			x: Align.left(32), y: Align.center
			width: 76, height: 32, asset: SVG.logoIcon
			handler: @openURLHome
		
		@titleText = new PCText
			parent: @topView, name: "title"
			text: @title, textAlign: "center"
			x: Align.center, y: Align.center, width: @topView.width / 2
		
		@copyButton = new PCCopyButton
			parent: @topView, name: "copy link"
			text: "Copy Link", textAlign: "right"
			x: Align.right(-32-20-24), y: Align.center, width: @bottomView.width / 4
			custom: { x: -32-20-24 }
		
		@fullscreenButton = new PCSVGButton
			parent: @topView, name: "fullscreen"
			x: Align.right(-32), y: Align.center
			width: 20, height: 20, asset: SVG.fullscreenIcon
			handler: @changeScale
			custom: { x: -32 }
		
		# Bottom View
		@slideChangerView = new PCSlideChanger
			parent: @bottomView, name: "slide changer"
			x: Align.center
		
		@restartButton = new PCButton
			parent: @bottomView, name: "restart"
			text: "Restart (R)", textAlign: "right"
			x: Align.right(-2000), y: Align.center, width: @bottomView.width / 4
			handler: @restartHandler
			custom: { x: -2000 }
		
		
	
	
	@define 'title',
		get: -> @options.title
		set: (value) -> @options.title = value
	
	@define 'gap',
		get: -> @options.gap
		set: (value) -> @options.gap = value
	
	@define '_theme',
		get: -> @options._theme
		set: (value) -> @options._theme = value
	
	
	
	initShortcuts: () =>
		localScroll = @
		Events.wrap(window).addEventListener "keydown", (event) ->
			if event.code is "ArrowLeft"
				localScroll.snapToNextPage("left", false)
			else if event.code is "ArrowRight"
				localScroll.snapToNextPage("right", false)
			else if event.code is "KeyC"
				localScroll.copyButton.emit Events.Tap
			else if event.code is "KeyF"
				localScroll.fullscreenButton.emit Events.Tap
			else if event.code is "KeyR"
				localScroll.restartButton.emit Events.Tap
			else if event.code is "Escape"
				if localScroll.states.current.name == "fullscreen"
					localScroll.fullscreenButton.emit Events.Tap
	
	
	initScale: (forState = "window") =>
		slideGap = 120
		
		scaleX = (Canvas.width - slideGap / 6) / @width
		scaleY = (Canvas.height - slideGap) / @height
		@states.window.scale = Math.min(scaleX, scaleY)
		
		scaleX = Canvas.width / @width
		scaleY = Canvas.height / @height
		@states.fullscreen.scale = Math.min(scaleX, scaleY)
		
		@stateSwitch(forState)
		@canvas.stateSwitch(forState)
		
		@center()
	
	
	
	
	changeScale: () =>
		
		if @states.current.name == "window" then nextState = "fullscreen"
		else nextState = "window"
		
		@animate(nextState, curve: Spring(damping: 1), time: 0.5)
		@canvas.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		@topView.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		@bottomView.animate(nextState, curve: Spring(damping: 1), time: 0.5)
	

	restartHandler: () =>
		@snapToPage(@content.children[0], false)
	
	
	
	
	
	
	initGeneral: () =>
		Framer.Extras.Preloader.disable()
		Framer.Extras.Hints.disable()
		document.body.style.cursor = "auto"
		
		local = @
		`
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
		if (prefersDarkScheme.matches) { local._theme = "dark" }
		else { local._theme = "light" }
		`
		local._theme
		
	
	initPageChange: () =>
		
		@on "change:currentPage", ->
			for item, index in @content.children
				if item == @currentPage
					@slideChangerView.current = (index + 1)
					return
# 			history.pushState(@currentPage.name, "#{@currentPage.name}", "?page=1")
# 			print @currentPage
		
		@content.on "change:children", ->
			@parent.slideChangerView.pages = @children.length
	
	
	initSizeChange: () =>
		local = @
		
		Canvas.on "change:width", =>
			local.updateSize(Canvas)
	
	
	
	
	
	updateSize: (anchor) =>
		# width
		@parent.width = anchor.width
		
		@topView.width = anchor.width
		@titleText.x = Align.center
		@copyButton.x = Align.right(@copyButton.custom.x)
		@fullscreenButton.x = Align.right(@fullscreenButton.custom.x)
		
		@bottomView.width = anchor.width
		@slideChangerView.x = Align.center
		
		# height
		@parent.height = anchor.height
		@bottomView.y = Align.bottom
		
		@initScale(@states.current.name)
		
		
	
	
	withImages: (images, named = "") =>
		return new ScreenSlide
			images: images, descriptions: [], title: named, parent: @content
			x: @content.children.length * (@width + @gap)
	
	
	openURL: (url = "https://tilllur.ru", isBlank = false) =>
		if isBlank then window.open url, '_blank'
		else
# 			window.location.hash = "?slideID"
			window.location = url
	
	openURLHome: =>
		@openURL("https://tilllur.ru", true)
	
	
	




# Slide

class Slide extends Layer
	
	constructor: (@options={}) ->
		
		_.defaults @options,
			backgroundColor: "#222"
			width: 1400 * 2
			height: 900 * 2
			borderRadius: 16 * 2
			title: ""
		
		super @options
		@name = "slide #{@parent.children.length}"
	
	
	
	@define 'title',
		get: -> @options.title
		set: (value) -> @options.title = value
	
	named: (title) =>
		@title = title
		return @
	

# Text, Button

# fontAveria = Utils.loadWebFont("Averia Serif Libre", 700) # base (bad numbers)
# fontAveria = Utils.loadWebFont("Fredoka", 600) # comisc
fontAveria = Utils.loadWebFont("Nunito", 800)

class PCText extends TextLayer
	constructor: (@options={}) ->
		
		_.defaults @options,
			fontFamily: fontAveria
			fontSize: 18
			color: "white"
			height: 20
			letterSpacing: 0.7
			letterSpacing: 0.2
			textOverflow: "ellipsis"
		
		super @options



class PCButton extends PCText
	constructor: (@options={}) ->
		
		_.defaults @options,
			opacity: 0.5
			handler: null
		
		super @options
		@style = cursor: "pointer"
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff
		
	Hover: =>
		@opacity = 0.8
	HoverOff: =>
		@opacity = 0.5
	
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)
	



# Button: SVG

class PCSVGButton extends PCButton
	constructor: (@options={}) ->
		
		_.defaults @options,
			text: ""
			asset: null
			clip: false
			autoSize: false
		
		@svgShape = new SVGLayer
			backgroundColor: "null", name: "svgShape"
		
		super @options
		@svgShape.parent = @
		@updateSVGSize()
	
	
	@define 'asset',
		get: -> @options.asset
		set: (value) ->
			@options.asset = value
			@svgShape.states =
				"onDark": { svg: value.onDark }
				"onLight": { svg: value.onLight }
			@svgShape.stateSwitch("onDark")
	
	updateSVGSize: () =>
		@svgShape.width = @width
		@svgShape.height = @height
	

# Button: Copy

class PCCopyButton extends PCButton
	constructor: (@options={}) ->
		
		_.defaults @options,
			link: "https://tilllur.ru"
			handler: @copyHandler
		
		@area = new Layer
			opacity: 0, x: -3000, html: null
		
		super @options
		@area.parent = @
	
	
	@define 'link',
		get: -> @options.link
		set: (value) ->
			@options.link = value
			@update(value)
	
	
	update: (link) =>
		@area.html = "<textarea class='js-copytextarea-class' style='opacity:0;'>#{link}</textarea>"
	
	
	copyHandler: =>
		textDiv = @area.querySelector('.js-copytextarea-class')
		textDiv.focus()
		textDiv.select()
		document.execCommand 'copy'
		
		originTitle = @text
		@text = "Done 👌"
		Utils.delay 1, => @text = originTitle









# Page Changer

class PCSlideChanger extends Layer
	
	constructor: (@options={}) ->
		
		_.defaults @options,
			name: "progress view"
			backgroundColor: null
			width: 120
			height: 56
			pages: 1
			current: 1
		
		@currentText = new PCText
			textAlign: "center", width: 120, letterSpacing: 3
# 			fontFamily: Utils.loadWebFont("Courier Prime")
# 			fontFamily: Utils.loadWebFont("Sansita", 700)
		@prevButton = new PCSVGButton
			name: "prev", width: 16, height: 16, asset: SVG.prevIcon
		@nextButton = new PCSVGButton
			name: "next", width: 16, height: 16, asset: SVG.nextIcon
		
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
	
	
	@define 'pages',
		get: -> @options.pages
		set: (value) ->
			@options.pages = value
			@currentText.text = "#{@current}/#{@pages}"
	
	@define 'current',
		get: -> @options.current
		set: (value) ->
			@options.current = value
			@currentText.text = "#{@current}/#{@pages}"



# Slide: Screens

class ScreenSlide extends Slide
	constructor: (@options={}) ->
		
		_.defaults @options,
			images: []
			descriptions: []
			
			imageSize:
				width: 375 * 2
				height: 812 * 2
				gap: 60 * 2
		
		@screenView = new Layer
			name: "screens"
			backgroundColor: "null"
		
		super @options
		
		@screenView.parent = @
		@update()
	
	
	
	
	@define 'images',
		get: -> @options.images
		set: (value) -> @options.images = value
	
	@define 'descriptions',
		get: -> @options.descriptions
		set: (value) -> @options.descriptions = value

	@define 'imageSize',
		get: -> @options.imageSize
# 		set: (value) -> @options.descriptions = value
	
	
	
	update: () =>
		for image in @images
			new Layer
				name: "#{image.split("/").pop()}"
				parent: @screenView
				width: @imageSize.width
				height: @imageSize.height
				borderRadius: 42
				image: image
				x: @screenView.children.length * (@imageSize.width + @imageSize.gap)
		
		@screenView.width = @screenView.children.length * (@imageSize.width + @imageSize.gap) - @imageSize.gap
		@screenView.height = @imageSize.height
		@screenView.center()
	
	
	
# 	addScreenView: () =>
# # 		@options.descriptions[..].pop()
# 		print @imageSize
# 		new Layer
# 			parent: @screenView
# 			width: @imageSize.width
# 			height: @imageSize.height
# 			borderRadius: 42
# 			image: @options.images[..].pop()
# 			x: @screenView.children.length * (@imageSize.width + @imageSize.gap)
# 		
# 		@screenView.width = @screenView.children.length * (@imageSize.width + @imageSize.gap) - @imageSize.gap
# 		@screenView.height = @imageSize.height
# 		@screenView.center()

	
	
# 	addImages: ( images, descriptions ) =>
# 		@images = images
# 		@descriptions = descriptions
# 		@updateScreenView()
# 		return @
	
# 	addImage: ( url, description = "" ) =>
# 		@images.push url
# 		@descriptions.push description
# 		@updateScreenView()



# testSlide = new ScreenSlide (title: "hello")
# testSlide.addImage("images/img1.png")
# testSlide.addImage("images/img2.png")
# testSlide.addImage("images/img3.png")




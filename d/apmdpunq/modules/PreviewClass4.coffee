

{PreviewClass3} = require "PreviewClass3"


class exports.PreviewClass4 extends PreviewClass3
	constructor: (@options={}) ->

		_.defaults @options,
		
		super @options

		@scalePreview()

	
	
	
	
	scalePreview: () =>
		if Utils.isMobile()
			@previewMobile()
		else
			@updateScaleState()
			@setDesktopScaleMode()
			@previewDesktop()
			@updatePreviewOnResize()


	
	
	updateScaleState: () =>
		scaleX = (Canvas.width - 112) / @width
		scaleY = (Canvas.height - 112) / @height
		@states.fill.scale = Math.min(scaleX, scaleY)
	




	setDesktopScaleMode: (forState = "normal") =>

		initState = @getStateGeneric("scale", [{ value: "fill", result: "fill" },
												{ value: "normal", result: "normal" },
												{ value: "true", result: "fill" }], forState)

		shouldShowButton = @getStateGeneric("button", [{ value: "false", result: false },
														{ value: "off", result: false }], true)

		shouldShowLogo = @getStateGeneric("logo", [{ value: "false", result: false },
													{ value: "off", result: false }], true)
		
		if shouldShowLogo then @createLogoButton()
		if shouldShowButton then @createScaleButton(initState)
		@stateSwitch(initState)
	
	
	
	previewDesktop: () =>
		Canvas.backgroundColor = "222"
		@createBars()
		@center()
		@clip = true


	updatePreviewOnResize: () =>
		localPreview = @
		
		Canvas.on "change:height", =>
			localPreview.x = Align.center
			localPreview.updateScaleState()
		
		Canvas.on "change:width", =>
			localPreview.y = Align.center
			localPreview.updateScaleState()
	
	
	
	
	
	
	
	previewMobile: () =>
		previewCanvas = new BackgroundLayer
			backgroundColor: "222", name: ".hiddenPreviewCanvas"
		
		@clip = false
		@center()
		@originY = 0.5
		@originX = 0.5

		# print @width + ' ' + @height
		
		
		if @viewSize(375, 812) or @viewSize(390, 844) or @viewSize(414, 896) or @viewSize(428, 926)
			@scale = Screen.width / @width
		else
			@setCustomPreview()
	
	

	setCustomPreview: () =>
		@y = Align.top
		@originY = 0.1
		
		@scale = (Screen.height - 120) / @height
		@borderRadius = 20
		@clip = true

		tip = new Layer
			width: 240, height: 44
			image: @assets.tip
			x: Align.center, y: Align.bottom(-30)
			opacity: 0.5




	# getStateGeneric: (key = "scale", pairs = [{ value: , result: }, {value: , result: }], defaultResult = "")
	getStateGeneric: (stateKey = "scale", statePairs = [], defaultResult = "") =>
		result = defaultResult

		for item in location.search[1..].split('&')
			keyValuePair = item.split("=")
			keyPart = keyValuePair[0]
			valuePart = keyValuePair[1]

			if keyPart == stateKey
				for pair in statePairs
					if valuePart == pair.value
						# print "ok " + " #{pair.value}" 
						result = pair.result
					# else
						# print "not " + " #{pair.value}" 
		
		return result
	
	
	
	

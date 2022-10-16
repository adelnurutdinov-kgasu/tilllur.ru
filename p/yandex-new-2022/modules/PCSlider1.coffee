
SVG = require "PCSVG"

{Slider0} = require "PCSlider0"
# {SliderPinch} = require "PCSliderPinch"
{SlideChanger} = require "PCSlideChanger"

Buttons = require("PCButtons")
Text = Buttons.Text
TextButton = Buttons.TextButton
TextButton = Buttons.TextButton
SVGButton = Buttons.SVGButton
CopyButton = Buttons.CopyButton


# Panels

class exports.Slider1 extends Slider0
	constructor: (@options={}) ->

		super @options
		
		@topView = new Layer
			parent: @canvas, name: "topView", backgroundColor: null
			width: @canvas.width, height: 56
		
		@bottomView = new Layer
			parent: @canvas, name: "bottomView", backgroundColor: null
			width: @canvas.width, height: 56, y: Align.bottom
		
		for item in [@topView, @bottomView]
			item.sendToBack()
			item.states =
				"window": { opacity: 1 }
				"fullscreen": { opacity: 0 }
		
		
		
		# Top View
		@logoButton = new SVGButton
			parent: @topView, name: "logo"
			x: Align.left(32), y: Align.center
			width: 76, height: 32, asset: SVG.logoIcon
			handler: @openURLHome
		
		@titleText = new Text
			parent: @topView, name: "title"
			text: @title, textAlign: "center", y: Align.center
		
		@copyButton = new CopyButton
			parent: @topView, name: "copy link"
			text: "Copy Link", textAlign: "right", y: Align.center
			custom: { x: -40-20-24 }
			link: window.location
		
		@fullscreenButton = new SVGButton
			parent: @topView, name: "fullscreen"
			y: Align.center
			width: 20, height: 20, asset: SVG.fullscreenIcon
			handler: @changeScale
			custom: { x: -36 }
		



		# Bottom View
		@slideChangerView = new SlideChanger
			parent: @bottomView, name: "slide changer"
			x: Align.center
			slider: @
		
		@restartButton = new TextButton
			parent: @bottomView, name: "restart"
			text: "Restart (R)", textAlign: "right"
			x: Align.right(-2000), y: Align.center
			handler: @restartHandler
			custom: { x: -2000 }
		
		


		@updateViewBuilderSize(@canvas)
		@canvas.on "change:size", =>
			@updateViewBuilderSize(@canvas)
		
		
	

	updateViewBuilderSize: (anchor) =>
		
		@topView.width = anchor.width
		
		if anchor.width < 740
			@titleText.x = Align.left(@logoButton.x)
			@titleText.y = Align.top(@topView.height + 10)
			
			@copyButton.x = Align.left(@logoButton.x)
			@copyButton.y = Align.top(@topView.height + 36)
		else
			@titleText.x = Align.center
			@titleText.y = Align.center(2)
			
			@copyButton.x = Align.right(@copyButton.custom.x)
			@copyButton.y = Align.center(2)
		
		@fullscreenButton.x = Align.right(@fullscreenButton.custom.x)
		@fullscreenButton.y = Align.center(2)
		
		@bottomView.width = anchor.width
		@slideChangerView.x = Align.center
		
		# height
		@bottomView.y = Align.bottom
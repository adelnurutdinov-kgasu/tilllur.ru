

{Slider2} = require "PCSlider2"

class exports.Slider3 extends Slider2
	constructor: (@options={}) ->
		super @options
		
		@initShortcuts()
	
	
	initShortcuts: () =>
		localScroll = @
		
		Events.wrap(window).addEventListener "keydown", (event) ->
			
			if event.code is "ArrowLeft"
				if !localScroll.isGrid() then localScroll.snapToNextPage("left", false)
			
			else if event.code is "ArrowRight"
				if !localScroll.isGrid() then localScroll.snapToNextPage("right", false)
			
			else if event.code is "KeyC"
				localScroll.copyButton.emit Events.Tap
			
			else if event.code is "KeyF"
				localScroll.fullscreenButton.emit Events.Tap
			
			else if event.code is "KeyR"
				localScroll.restartButton.emit Events.Tap
			
			else if event.code is "KeyA"
				localScroll.pinchToGrid()
			
			else if event.code is "Escape"
				if localScroll.states.current.name == "fullscreen"
					localScroll.fullscreenButton.emit Events.Tap
			
			else if event.code is "Space"
				try localScroll.currentPage.togglePlay()
	

{Slider3} = require "PCSlider3"

class exports.Slider4 extends Slider3
	constructor: (@options={}) ->
		super @options
		
		@on "change:currentPage", ->
			@updateCurrentPage()
		
		@content.on "change:children", ->
			@parent.slideChangerView.pages = @children.length
			@parent.updateCurrentPage()
		
	
	
	
	updateCurrentPage: () =>
		if !@isGrid()
			for item, index in @content.children
				if item == @currentPage
					@lastSlideSelectedIndex = index
					break
		

		@pauseBackgroundVideos()
		@updateCurrentPageSlider()

		if !@isGrid() then @playActiveVideo()
			
	


	playActiveVideo: () =>
		for currentVideoSlide in @videoSlides
			if currentVideoSlide == @currentPage
				currentVideoSlide.play()
				return


	pauseBackgroundVideos: () =>
		for currentVideoSlide in @videoSlides
			if currentVideoSlide != @currentPage
				currentVideoSlide.pause()
	
	showGridCancelButton: () =>
		@slideChangerView.current = -1
	
	updateCurrentPageSlider: () =>
		if @isGrid()
			@showGridCancelButton()
			return
		
		for item, index in @content.children
			if item == @currentPage
				@slideChangerView.current = (index + 1)
				return
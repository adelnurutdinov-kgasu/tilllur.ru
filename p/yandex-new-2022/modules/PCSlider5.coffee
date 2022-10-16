
{Slider4} = require "PCSlider4"

class exports.Slider5 extends Slider4
	constructor: (@options={}) ->
		_.defaults @options,
			activeVideoPlayer: null
			activeProgressSlider: null
			activeDrag: false
			activePlaying: true
		
		super @options
		
		Framer.Loop.on "render", =>
			if !@activeDrag and @activePlaying and !@isGrid()
				if @activeProgressSlider != undefined and @activeProgressSlider != null
					if @activeVideoPlayer != undefined and @activeVideoPlayer != null
						@activeProgressSlider.value = Utils.modulate(@activeVideoPlayer.currentTime, [0, @activeVideoPlayer.duration], [0, 1], true)



	updateCurrentPage: () =>
		super @updateContent()
		
		@selectCurrentPlayingVideo()
		@activeDrag = false
	
	
	
	@define 'activeProgressSlider',
		get: -> @options.activeProgressSlider
		set: (value) -> @options.activeProgressSlider = value
	
	@define 'activeVideoPlayer',
		get: -> @options.activeVideoPlayer
		set: (value) -> @options.activeVideoPlayer = value
	
	@define 'activeDrag',
		get: -> @options.activeDrag
		set: (value) -> @options.activeDrag = value
	
	@define 'activePlaying',
		get: -> @options.activePlaying
		set: (value) -> @options.activePlaying = value
	
	
	
	selectCurrentPlayingVideo: () =>
		currentlyNotPlaying = true

		for item in @videoSlides
			if item == @currentPage
				currentlyNotPlaying = false
				@activeProgressSlider = @currentPage.playerSlider
				@activeVideoPlayer = @currentPage.videoView.player
		
		if currentlyNotPlaying
			@activeProgressSlider = null
			@activeVideoPlayer = null

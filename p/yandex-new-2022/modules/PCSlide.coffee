
SVG = require "PCSVG"

Buttons = require("PCButtons")
Text = Buttons.Text
SVGButton = Buttons.SVGButton

{PlayerSlider} = require("PCPlayerSlider")

class SlideTemplate extends Layer
	
	constructor: (@options={}) ->
		
		_.defaults @options,
			gridData: null

			backgroundColor: "#222"
			width: 1400 * 2
			height: 900 * 2
			borderRadius: 16 * 2
			title: ""
			image: null
			clip: true
		
		
		super @options
		
		@x = (@parent.children.length - 1) * (@width + 120) 
		@parent.parent.updateContent()
		@name = "slide #{@parent.children.length}"
	
	
	
	@define 'title',
		get: -> @options.title
		set: (value) -> @options.title = value
	
	@define 'gridData',
		get: -> @options.gridData
		set: (value) -> @options.gridData = value
	
	
	
	source: (image) =>
		@image = image
		return @
	
	overlay: (image) =>
		topImage = new Layer
			parent: @, width: 1400 * 2, height: 900 * 2
			image: image
		return @
	
	randomColor: () =>
		@backgroundColor = Utils.randomColor()
		return @





# S: Slide

# ffmpeg -i input.mp4 -c:v libx264 -profile:v main -vf format=yuv420p -c:a aac -movflags +faststart output.mp4
# ffmpeg -i output.mp4 -filter:v "crop=1680:1080:120:0" -c:a copy crop.mp4


class Slide extends SlideTemplate
	
	constructor: (@options={}) ->
		
		_.defaults @options,
			shareLink: ""
		
		super @options
	
	
	@define 'shareLink',
		get: -> @options.shareLink
		set: (value) -> @options.shareLink = value
	
	
	link: (url) =>
		@shareLink = url
		
		@sharePrototypeButton = new SVGButton
			parent: @, name: "shareButton"
			x: Align.right(-98*2), y: Align.bottom(-44 * 2)
			backgroundColor: null
			width: 90 * 2, height: 90 * 2
			asset: SVG.sharePrototypeIcon
			handler: @openPrototypeURL
	
	openPrototypeURL: () =>
		presentation = @parent.parent
		presentation.openURL(@shareLink, true)










# S: Template (Video)

class SimpleVideoSlide extends Slide
	constructor: (@options={}) ->
		
		_.defaults @options,
			videoURL: null
		
		@loadingText = new Text
			width: 400, height: 70
			fontSize: 40
			opacity: 0.5
			text: "Loading"
			
		
		@videoView = new VideoLayer
			width: 1680, height: 1080
			name: "videoView", backgroundColor: "null"
		
		
		
		@videoView.player.muted = true
		@videoView.player.autoplay = false
		@videoView.player.loop = true
		
		
# 		@videoView.onTap =>
# 			@togglePlay()
		
# 		Events.wrap(@videoView.player).on "play", ->
# 			print "Video paused"
		
		super @options
		
		@loadingText.parent = @
		@loadingText.center()
		
		@videoView.parent = @
		@videoView.scale = @height / 1080
		@videoView.center()
		
# 		@clip = true
	
	
	
# 	url: () =>
# 		@video = 
	
	
	@define 'videoURL',
		get: -> @options.videoURL
		set: (value) -> @options.videoURL = value
	



	source: (video) =>
		@videoView.video = video
		return @
	
	isPaused: () =>
		return @videoView.player.paused

	play: () =>
		if !@isPaused() then return
		@videoView.player.play()
	
	pause: () =>
		if @isPaused() then return
		@videoView.player.pause()
	
	togglePlay: () =>
		if @isPaused() then @play()
		else @pause()
	


# 	loadVideo: (webURL) =>
# 		@videoView.player.muted = true
# 		@videoView.player.autoplay = true
# 		@videoView.video = @videoURL
# 		Utils.delay 10, =>
# 		@videoView.player.play()
		
		
# 		print @videoView.player.readyState
# 		Utils.delay 10, =>
# 			print @videoView.player.readyState





# S: Slide (Video)

class VideoSlide extends SimpleVideoSlide
	constructor: (@options={}) ->
		
		super @options
		

		# Play/Pause
		@playButton = new SVGButton
			parent: @, name: "playButton"
			x: Align.left(98*2), y: Align.bottom(-44 * 2)
			backgroundColor: null
			width: 90 * 2, height: 90 * 2
			asset: SVG.playIcon
		
		@playButton.states =
			"playing": { asset: SVG.pauseIcon }
			"paused": { asset: SVG.playIcon }
		
		@playButton.stateSwitch("playing")
		
		@playButton.on Events.Tap, (event, layer) ->			
			slide = @parent
			presentation = slide.parent.parent
			
			slide.togglePlay()
			presentation.activeDrag = false
			
		
		


		Events.wrap(@videoView.player).on "pause", =>
			# print "! next pause"
			@pause()
			@playButton.stateSwitch("paused")
			
			presentation = @parent.parent
			if @videoView.player == presentation.activeVideoPlayer
				presentation.activePlaying = false
		
		
		Events.wrap(@videoView.player).on "play", =>
			# print "! next play"
			@play()
			@playButton.stateSwitch("playing")
			
			presentation = @parent.parent
			if @videoView.player == presentation.activeVideoPlayer
				presentation.activePlaying = true
		
		
		

		# Progress
		@playerSlider = new PlayerSlider
		@playerSlider.parent.parent = @

		@playerSlider.parent.x = Align.left(212*2)
		@playerSlider.parent.y = Align.bottom(-61 * 2)
		
		@playerSlider.on Events.TouchStart, ->
			# print "Touch Start"
			slide = @parent.parent
			presentation = slide.parent.parent
			
			slide.pause()
			presentation.activeDrag = true
		
		@playerSlider.on "change:value", ->
			slide = @parent.parent
			presentation = slide.parent.parent
			
			if presentation.activeDrag
				slide.videoView.player.currentTime = Utils.modulate(@value, [0, 1], [0, slide.videoView.player.duration], true)
			












# S: Slide (Prototype)

class PrototypeSlide extends Slide
	constructor: (@options={}) ->
		
		@prototypeView = new Layer
			name: "prototype"
			backgroundColor: null
			borderRadius: 42
			clip: true
		
		super @options
		
		@prototypeView.parent = @
		@sized()
	
	
	
	
	@define 'pWidth',
		get: -> @options.pWidth
		set: (value) -> @options.pWidth = value
	
	@define 'pHeight',
		get: -> @options.pHeight
		set: (value) -> @options.pHeight = value
	
	
	
	
	scaled: (value) =>
		@prototypeView.scale = value
		return @
	
	bordered: (value) =>
		@prototypeView.borderRadius = value
		return @
	
	sized: (width = 375, height = 812) =>
		@prototypeView.width = width
		@prototypeView.height = height
		@prototypeView.center()
		return @
	
	
	
	
	source: (originURL) =>
		url = originURL + "?logo=off&button=off"
		
		contentView = new Layer
			parent: @prototypeView
			width: @prototypeView.width, height: @prototypeView.height, backgroundColor: null
			html: "<iframe style='position: absolute; width: 100%; height: 100%;' src='#{url}'></iframe>"
			ignoreEvents: false, clip: true
		
		return @
	
	
	
	createWebView: (webURL) =>
		
		view = new Layer
			width: @imageSize.width, height: @imageSize.height
			name: "webview", backgroundColor: null, borderRadius: @imageRadius
			clip: true
		
		contentView = new Layer
			parent: view
			width: @imageSize.width, height: @imageSize.height, backgroundColor: null
			html: "<iframe style='position: absolute; width: 100%; height: 100%;' src='#{webURL}'></iframe>"
			ignoreEvents: false, clip: true
		
		return view



module.exports = {Slide, SimpleVideoSlide, VideoSlide, PrototypeSlide}
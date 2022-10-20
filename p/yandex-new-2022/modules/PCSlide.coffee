
SVG = require "PCSVG"

Buttons = require("PCButtons")
Text = Buttons.Text
SVGButton = Buttons.SVGButton
LinkButton = Buttons.LinkButton

{PlayerSlider} = require("PCPlayerSlider")



# Slide with Images

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





# S: Slide with Link

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
	
	
	link: (url = "https://tilllur.ru", buttonTitle = "Open", type = 0) =>
		@shareLink = url

		@tintButton = new LinkButton
			parent: @, name: "linkButton"
			text: buttonTitle
			url: url
			handler: @openPrototypeURL
		
		if type == 0
			@tintButton.backgroundColor = null
			@tintButton.borderColor = "rgba(255,255,255,0.3)"
		else if type == 1
			@tintButton.backgroundColor = "rgba(0,0,0,0.25)"
			@tintButton.borderColor = null
	
	openPrototypeURL: () =>
		presentation = @parent.parent
		presentation.openURL(@shareLink, true)










# S: Template (Video)
# Override "source()"

class SimpleVideoSlide extends Slide
	constructor: (@options={}) ->
		
		_.defaults @options,
			title: "simpleVideoSlide"
		
		@loadingText = new Text
			width: 400, height: 70
			fontSize: 40
			opacity: 0.5
			textAlign: "center"
			# backgroundColor: "red"
			text: "No URL"
			
		
		@videoView = new VideoLayer
			width: 1680, height: 1080
			name: "videoView", backgroundColor: "null"
		
		
		
		@videoView.player.muted = true
		@videoView.player.autoplay = false
		@videoView.player.loop = true
		
		
		super @options

		
		@loadingText.parent = @
		@loadingText.center()
		
		@videoView.parent = @
		@videoView.scale = @height / 1080
		@videoView.center()

	
	
	# @define 'videoURL',
	# 	get: -> @options.videoURL
	# 	set: (value) -> @options.videoURL = value
	

	# override
	source: (video) =>
		@videoView.video = video
		@loadingText.text = "Loading"
		return @




	loop: (value = true) =>
		@videoView.player.loop = true
		return @
	
	mute: (value = true) =>
		@videoView.player.muted = value
		return @
	
	unmute: () =>
		@videoView.player.muted = false
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

		# Progress
		@playerSlider = new PlayerSlider
		@playerSlider.parent.parent = @

		@playerSlider.parent.x = Align.left(98*2)
		@playerSlider.parent.y = Align.bottom(-60 * 2)

		# print @playerSlider.parent
		# print @playerSlider.playButton


		@playerSlider.playButton.on Events.Tap, (event, layer) ->			
			slide = @parent.parent
			presentation = slide.parent.parent
			
			slide.togglePlay()
			presentation.activeDrag = false




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
		
		

		@playerSlider.soundButton.on Events.Tap, ->
			slide = @parent.parent
			presentation = slide.parent.parent
			
			if slide.videoView.player.muted then slide.unmute()
			else slide.mute()
		

		

		
		Events.wrap(@videoView.player).on "pause", =>
			# print "! next pause"
			@pause()
			@playerSlider.playButton.stateSwitch("paused")
			
			presentation = @parent.parent
			if @videoView.player == presentation.activeVideoPlayer
				presentation.activePlaying = false
		
		
		Events.wrap(@videoView.player).on "play", =>
			# print "! next play"
			@play()
			@playerSlider.playButton.stateSwitch("playing")
			
			presentation = @parent.parent
			presentation.activeDrag = false
			if @videoView.player == presentation.activeVideoPlayer
				presentation.activePlaying = true
		
		
		Events.wrap(@videoView.player).on "volumechange", =>
			if @videoView.player.muted
				@playerSlider.soundButton.stateSwitch("muted")
			else
				@playerSlider.soundButton.stateSwitch("sound")

				
		
class HDVideoSlide extends VideoSlide
	constructor: (@options={}) ->
		super @options
		
		@videoView.width = 1920
		@videoView.height = 1080
		@videoView.x = 440
		@videoView.y = 286

		@videoView.borderRadius = 8 * 2
		@videoView.clip = true


		@videoView.originX = 0.5
		@videoView.originY = 0.5

		@videoView.scale = 1.3666


		@playerSlider.updateForScaleDown()


			












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

		if width == 375 and height == 812 then @scaled(2.0)
		else if width == 390 and height == 844 then @scaled(1.923)
		else @scaled(2.0)

		return @
	
	
	
	# override
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



module.exports = {Slide, SimpleVideoSlide, VideoSlide, HDVideoSlide, PrototypeSlide}
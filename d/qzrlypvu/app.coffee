Canvas.backgroundColor = "222"

isDebugMode = true
isDebugMode = false

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 2

{ Preview } = require "PreviewComponent"

screen = new Layer
	width: 375
	height: 812
	image: "images/screen.png"
	image: "images/12%20%D1%8F%D0%BD%D0%B2%D0%B0%D1%80%D1%8F.png"

new Preview { view: screen }

# Proxy

boxProxy = new Layer
	opacity: 0

boxProxy.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0 }
boxProxy.stateSwitch("shown")

boxProxy.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		clipView.animate(to)
		breaker.animate(to)
		
		Utils.delay 2, =>
			boxProxy.animate(from)


# Video

getVideoFor = (parentLayer) ->
	
	videoClipView = new Layer
		parent: parentLayer
		width: 294
		height: 228
		borderRadius: 20
		clip: true
		backgroundColor: "#8C714C"
	
# 	video = new VideoLayer
# 		parent: videoClipView
# 		width: 1280 / 3.3
# 		height: 800 / 3.3
# 		video: "images/small.mp4"
# 		y: -35
# 		x: -60
	
	video = new VideoLayer
		parent: videoClipView
		width: 884 / 2
		height: 514 / 2
		x: -50
		video: "images/david2.mov"
	
	video.player.currentTime = 10
	video.player.loop = true
	video.player.volume = 0
	video.player.autoplay = !isDebugMode
	
	return videoClipView







imageView = new Layer
	parent: screen
	width: 294
	height: 228
	x: Align.center
	y: Align.top(370)
	backgroundColor: "null"
# 	opacity: 0

bottomVideo = getVideoFor(imageView)


clipView = new Layer
	parent: imageView
	width: 294 / 2
	height: 228
	clip: true
	backgroundColor: "null"

clipView.states =
	"hidden": { width: 8 }
	"shown": { width: 294 - 8 }
clipView.stateSwitch("hidden")

breaker = new Layer
	parent: imageView
	width: 2
	height: 228+40
	x: clipView.states.hidden.width
	y: Align.top(-20)
	borderRadius: 2
	backgroundColor: "rgba(207,165,107,1)"

breaker.states =
	"hidden": { x: clipView.states.hidden.width }
	"shown": { x: clipView.states.shown.width }
breaker.stateSwitch("hidden")

# imageRu = new Layer
# 	parent: clipView
# 	width: 287
# 	height: 180
# 	image: "images/imageRu.png"

topVideo = getVideoFor(clipView)


boxProxy.stateSwitch("hidden")



progress = new Layer
	parent: imageView
	width: 294
	height: 63
	y: Align.bottom(6)
	image: "images/progress.png"

helloEng = new Layer
	width: 287
	height: 180
	y: Align.bottom(-20)
	image: "images/helloEng.png"
	parent: bottomVideo

helloRu = new Layer
	width: 287
	height: 180
	y: Align.bottom(-20)
	image: "images/helloRu.png"
	parent: topVideo


topBarFix = new Layer
	parent: screen, width: screen.width, height: 44
	backgroundColor: "FBF1E7"

bottomBarFix = new Layer
	parent: screen, width: screen.width, height: 34, y: Align.bottom
	backgroundColor: "FBF1E7"


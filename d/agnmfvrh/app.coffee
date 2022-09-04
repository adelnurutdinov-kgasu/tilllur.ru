{ Preview } = require "PreviewComponent"

Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 2

screen = new Layer
	width: 375
	height: 812
	image: "images/screen.png"
	
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



imageView = new Layer
	parent: screen
	width: 287
	height: 180
	x: Align.center
	y: Align.top(382)
	image: "images/imageEng.png"


clipView = new Layer
	parent: imageView
	width: 287 / 2
	height: 180
	clip: true
	backgroundColor: "null"

clipView.states =
	"hidden": { width: 8 }
	"shown": { width: 287 - 8 }
clipView.stateSwitch("hidden")

breaker = new Layer
	parent: imageView
	width: 2
	height: 220
	x: clipView.states.hidden.width
	y: Align.top(-20)
	borderRadius: 2
	backgroundColor: "#6CC2CF"

breaker.states =
	"hidden": { x: clipView.states.hidden.width }
	"shown": { x: clipView.states.shown.width }
breaker.stateSwitch("hidden")

imageRu = new Layer
	parent: clipView
	width: 287
	height: 180
	image: "images/imageRu.png"


boxProxy.stateSwitch("hidden")


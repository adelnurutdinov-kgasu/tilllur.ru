
retina = 1

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

screenView = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }


# view
screen = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	image: "images/screen.png"

shape_1 = new Layer
	width: 56.0*retina
	height: 68.0*retina
	backgroundColor: "rgba(255,255,255,1)"

shape_1.states =
	"base":
		x: 20*retina
		y: 255*retina
	"imported":
		x: 156*retina
		y: 324*retina

shape_1.stateSwitch("base")

shape_2 = new Layer
	height: 68.0*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.9

shape_2.states =
	"base":
		width: 56.0*retina
		x: 84*retina
		y: 255*retina
	"imported":
		width: 56.0*retina
		x: 156*retina
		y: 400*retina

shape_2.stateSwitch("base")

shape_3 = new Layer
	width: 56.0*retina
	height: 68.0*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.8

shape_3.states =
	"base":
		x: 20*retina
		y: 331*retina
	"imported":
		x: 220*retina
		y: 324*retina

shape_3.stateSwitch("base")

shape_4 = new Layer
	height: 68.0*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.7

shape_4.states =
	"base":
		width: 56.0*retina
		x: 84*retina
		y: 331*retina
	"imported":
		width: 56.0*retina
		x: 220*retina
		y: 400*retina

shape_4.stateSwitch("base")

shape_5 = new Layer
	width: 56.0*retina
	height: 68.0*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.6

shape_5.states =
	"base":
		x: 20*retina
		y: 407*retina
	"imported":
		x: 284*retina
		y: 324*retina

shape_5.stateSwitch("base")

shape_6 = new Layer
	height: 68.0*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.5

shape_6.states =
	"base":
		width: 56.0*retina
		x: 84*retina
		y: 407*retina
	"imported":
		width: 56.0*retina
		x: 284*retina
		y: 400*retina

shape_6.stateSwitch("base")


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["base", "imported"]
items = [screen, shape_1, shape_2, shape_3, shape_4, shape_5, shape_6]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

forwardFlow = false
screenView.on Events.Click, ->
	nextHandler()
	
nextHandler = () ->
# 	print "-------------"
	forwardFlow = !forwardFlow
	nextState = cycler()
	for item, i in items
		if !forwardFlow then localDelay = 0.1*i
		else localDelay = 0.1*(items.length - i)
# 		print i + " " + item.name + " " + localDelay
		
		try
			item.animate(nextState, options: { delay: localDelay, time: 0.3, curve: "ease-out"})
		catch error


for item in items
	item.parent = screenView

statusBar = new Layer
	parent: screen, width: screen.width, height: 60, backgroundColor: "rgba(240,243,243,1)"

statusBar = new Layer
	parent: screen, width: screen.width, height: 32, backgroundColor: "black"
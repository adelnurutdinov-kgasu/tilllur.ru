Framer.Extras.Hints.disable()

# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 400
	height: 400
	opacity: 1
	backgroundColor: "transparent"


tutorial = new Layer
	name: "tutorial"
	parent: figmaView
	x: 186
	y: 294
	width: 214
	height: 106
	opacity: 1
	backgroundColor: "transparent"


round = new Layer
	name: "round"
	parent: tutorial
	x: -64
	y: -140
	width: 380
	height: 380
	opacity: 1
	image: "images/figma/round.png"


close16 = new Layer
	name: "close16"
	parent: tutorial
	x: 178
	y: -102
	width: 16
	height: 16
	opacity: 1
	image: "images/figma/close16.png"


textView = new Layer
	name: "textView"
	parent: tutorial
	x: 16
	y: -46
	width: 182
	height: 60
	opacity: 1
	image: "images/figma/textView.png"


base = new Layer
	name: "base"
	parent: tutorial
	x: 0
	y: 0
	width: 214
	height: 106
	opacity: 1
	image: "images/figma/base.png"


sceneStates = ["baseView"]
sceneLayers = [figmaView, tutorial, round, close16, textView, base]

for item in sceneLayers
	try item.stateSwitch(sceneStates[0])


cycler = Utils.cycle(sceneStates)
nextState = cycler()

nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error


figmaView.on Events.Click, ->
	nextStateHandler()


for item in [textView, close16]
	item.states =
		"hidden":
			opacity: 0
		"shown":
			opacity: 1
	item.stateSwitch("hidden")


round.image = "null"
round.backgroundColor = "#65E6E6"
round.borderRadius = "100%"



round.originX = 1.2
round.originY = 1.2

round.states =
	"hidden":
		scale: 0.4
	"shown":
		scale: 1

round.stateSwitch("hidden")



round.on Events.StateSwitchStart, (from, to) ->
	if to is "shown"
		textView.animate("shown", delay: 0.3, time: 0.3)
		close16.animate("shown", delay: 0.3, time: 0.3)

Utils.delay 2, ->
	round.animate("shown", curve: Bezier(.06,.91,.17,1), time: 0.6)





Screen.backgroundColor = "#222"

screen = new Layer
	width: 1333
	height: 794
	image: "images/Screen%20Shot%202020-04-08%20at%201.07.23%20PM.png"
	borderRadius: 6
	clip: true

fix = new Layer
	parent: screen
	x: 1133
	y: 489
	height: 305
	backgroundColor: "white"

fix2 = new Layer
	parent: screen
	y: 489
	height: 305
	backgroundColor: "white"

figmaView.parent = screen
figmaView.x = screen.width - figmaView.width
figmaView.y = screen.height - figmaView.height

# screen.center()



{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 8, visible: false }
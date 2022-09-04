
screenView = new Layer
	width: 2560 / 2, height: 1452 / 2, backgroundColor: "white", clip: true

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light", visible: false }

tempView = new Layer
	parent: screenView, width: screenView.width * 2, height: screenView * 2
	scale: 0.5, originX: 0, originY: 0.2, backgroundColor: "white"


# view
screen = new Layer
	width: 2560
	height: 2260
	x: 0
	y: 0
	image: "images/screen.png"

tip_2 = new Layer
	width: 496
	height: 296
	x: 32
	y: 436
	image: "images/tip 2.png"

tip_2.states =
	base:
		opacity: 0
	read:
		opacity: 1

tip_2.stateSwitch("base")

tip_1 = new Layer
	width: 496
	height: 296
	x: 32
	y: 436
	image: "images/tip 1.png"

tip_1.states =
	base:
		opacity: 1
	read:
		opacity: 0

tip_1.stateSwitch("base")


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["base", "read"]
items = [screen, tip_2, tip_1]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

clickHandler = () ->
	nextState = cycler()
	for item in items
		try
			item.stateSwitch(nextState)
		catch error
	Utils.delay 1, ->
		clickHandler()



# Utils.delay 1, ->
clickHandler()

for item in items
	item.parent = tempView
	
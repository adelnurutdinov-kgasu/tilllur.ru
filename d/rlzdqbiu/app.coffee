# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(245.00000059604645, 245.00000059604645, 245.00000059604645, 1)"


header = new Layer
	name: "header"
	parent: figmaView
	x: 0
	width: 360
	height: 260
	opacity: 1
	image: "images/figma/header.png"

header.states =
	"base":
		y: 24
	"open":
		y: -176


newsProd = new Layer
	name: "newsProd"
	parent: figmaView
	x: 0
	width: 360
	height: 481
	opacity: 1
	image: "images/figma/newsProd.png"

newsProd.states =
	"base":
		y: 292
	"open":
		y: 126


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	image: "images/figma/statusBar.png"


omnibox = new Layer
	name: "omnibox"
	parent: figmaView
	x: 0
	width: 360
	height: 50
	opacity: 1
	image: "images/figma/omnibox.png"

omnibox.states =
	"base":
		y: 134
	"open":
		y: 24


bottom = new Layer
	name: "bottom"
	parent: figmaView
	x: 0
	width: 360
	height: 100
	image: "images/figma/bottom.png"

bottom.states =
	"base":
		y: 184
		opacity: 1
	"open":
		y: 18
		opacity: 0


verticals = new Layer
	name: "verticals"
	parent: figmaView
	x: 0
	width: 360
	height: 44
	image: "images/figma/verticals.png"

verticals.states =
	"base":
		y: 240
		opacity: 0
	"open":
		y: 74
		opacity: 1


bottomBar = new Layer
	name: "bottomBar"
	parent: figmaView
	x: 0
	y: 592
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/bottomBar.png"


sceneStates = ["base", "open"]
sceneLayers = [figmaView, header, newsProd, statusBar, omnibox, bottom, verticals, bottomBar]

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


omnibox.backgroundColor = "white"
omnibox.bringToFront()




statusBar = new Layer
	parent: figmaView, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8 }
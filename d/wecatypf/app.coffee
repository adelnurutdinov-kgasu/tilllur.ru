
Canvas.backgroundColor = "222"

# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/figmaView.png"


feed = new Layer
	name: "feed"
	parent: figmaView
	x: 0
	width: 360
	height: 1236
	opacity: 1
	image: "images/figma/feed.png"

feed.states =
	"base":
		y: 32
	"scroll":
		y: -272


bg = new Layer
	name: "bg"
	parent: figmaView
	x: 0
	width: 360
	height: 60
	opacity: 1
	image: "images/figma/bg.png"

bg.states =
	"base":
		y: 580
	"scroll":
		y: 648


icons = new Layer
	name: "icons"
	parent: figmaView
	x: 0
	width: 360
	height: 60
	opacity: 1
	image: "images/figma/icons.png"

icons.states =
	"base":
		y: 580
	"scroll":
		y: 648


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: -0.0
	y: 0
	width: 360
	height: 32
	opacity: 1
	image: "images/figma/statusBar.png"


dark = new Layer
	name: "dark"
	parent: figmaView
	x: 0
	width: 360
	height: 70
	opacity: 1
	image: "images/figma/dark.png"

dark.states =
	"base":
		y: 640
	"scroll":
		y: 570


sceneStates = ["base", "scroll"]
sceneLayers = [figmaView, feed, bg, icons, statusBar, dark]

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


figmaView.backgroundColor = "#FAF9F8"
statusBar.image = null

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 24 }

topBarFix = new Layer
	parent: figmaView, width: screen.width, height: 32
	backgroundColor: "white"
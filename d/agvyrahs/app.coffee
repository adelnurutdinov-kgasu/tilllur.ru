# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


content = new Layer
	name: "content"
	parent: figmaView
	x: 0
	width: 360
	height: 2985
	opacity: 1
	image: "images/figma/content.png"

content.states =
	"shown":
		y: 115
	"hidden":
		y: -244


bottomBar = new Layer
	name: "bottomBar"
	parent: figmaView
	x: 0
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/bottomBar.png"

bottomBar.states =
	"shown":
		y: 592
	"hidden":
		y: 648


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	image: "images/figma/statusBar.png"


headerView = new Layer
	name: "headerView"
	parent: figmaView
	x: 0
	y: 24
	width: 360
	height: 93
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


verticals = new Layer
	name: "verticals"
	parent: headerView
	x: 0
	width: 360
	height: 44
	image: "images/figma/verticals.png"

verticals.states =
	"shown":
		y: 92
		opacity: 0
	"hidden":
		y: 48
		opacity: 1


header = new Layer
	name: "header"
	parent: headerView
	x: 0
	width: 360
	height: 44
	image: "images/figma/header.png"

header.states =
	"shown":
		y: 0
		opacity: 1
	"hidden":
		y: -44
		opacity: 0


omnibox = new Layer
	name: "omnibox"
	parent: headerView
	x: 0
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/omnibox.png"

omnibox.states =
	"shown":
		y: 44
	"hidden":
		y: 0


breaker = new Layer
	name: "breaker"
	parent: headerView
	x: 0
	y: 92
	width: 360
	height: 1
	opacity: 1
	backgroundColor: "rgba(0, 0, 0, 0.1)"


sceneStates = ["shown", "hidden"]
sceneLayers = [figmaView, content, bottomBar, statusBar, headerView, verticals, header, omnibox, breaker]

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


statusBar.backgroundColor = "white"
statusBar.bringToFront()

omnibox.backgroundColor = "white"
headerView.clip = true

whiterFix = new Layer
	width: 360
	height: 2
	parent: statusBar
	y: statusBar.height - 1
	backgroundColor: "white"


statusBar = new Layer
	parent: figmaView, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8, topTheme: "light", forceAndroidBar: true }

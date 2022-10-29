# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 969
	opacity: 1
	image: "images/figma/figmaView.png"


serp = new Layer
	name: "serp"
	parent: figmaView
	x: 0
	width: 360
	height: 908
	opacity: 1
	image: "images/figma/serp.png"

serp.states =
	"shown":
		y: 32
	"hidden":
		y: -121


headerView = new Layer
	name: "headerView"
	parent: figmaView
	x: 0
	width: 360
	height: 144
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"

headerView.states =
	"shown":
		y: 32
	"hidden":
		y: -16


baseView = new Layer
	name: "baseView"
	parent: headerView
	x: 0
	y: 0
	width: 360
	height: 144
	opacity: 1
	image: "images/figma/baseView.png"


back = new Layer
	name: "back"
	parent: headerView
	x: 28
	y: 66
	width: 28
	height: 28
	image: "images/figma/back.png"

back.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0


logoLeft = new Layer
	name: "logoLeft"
	parent: headerView
	x: 28
	y: 66
	width: 28
	height: 28
	image: "images/figma/logoLeft.png"

logoLeft.states =
	"shown":
		opacity: 0
	"hidden":
		opacity: 1


header = new Layer
	name: "header"
	parent: headerView
	x: 0
	y: 0
	width: 360
	height: 48
	image: "images/figma/header.png"

header.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 32
	opacity: 1
	image: "images/figma/statusBar.png"


sceneStates = ["shown", "hidden"]
sceneLayers = [figmaView, serp, headerView, baseView, back, logoLeft, header, statusBar]

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


{ Preview } = require "PreviewComponent"

screen = new Layer { width: 360, height: 720 }
new Preview { view: screen, borderRadius: 24 }

figmaView.parent = screen
statusBar.image = null
statusBar.backgroundColor = "white"

nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			if nextState is "hidden" and item is header
				item.animate(nextState, curve: Spring(damping: 1), time: 0.3)
			else if nextState is "hidden" and item is back
				item.animate(nextState, curve: Spring(damping: 1), time: 0.3)
			else if nextState is "hidden" and item is logoLeft
				item.animate(nextState, curve: Spring(damping: 1), time: 0.3, delay: 0.06)
			else
				item.animate(nextState, curve: Spring(damping: 1), time: 0.6)
		catch error
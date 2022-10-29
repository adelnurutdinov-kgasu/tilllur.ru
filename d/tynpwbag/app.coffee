# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 375
	height: 812
	opacity: 1
	backgroundColor: "transparent"


bg = new Layer
	name: "bg"
	parent: figmaView
	x: 0
	y: 0
	width: 375
	height: 812
	opacity: 1
	image: "images/figma/bg.png"


sites = new Layer
	name: "sites"
	parent: figmaView
	x: 0
	y: 44
	width: 375
	height: 84
	opacity: 1
	image: "images/figma/sites.png"


logo = new Layer
	name: "logo"
	parent: figmaView
	x: 0
	y: 128
	width: 375
	height: 108
	opacity: 1
	image: "images/figma/logo.png"


feedView = new Layer
	name: "feedView"
	parent: figmaView
	x: 0
	y: 236
	width: 375
	height: 576
	image: "images/figma/feedView.png"

feedView.states =
	"base":
		opacity: 1
	"focus":
		opacity: 0


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 375
	height: 44
	opacity: 1
	image: "images/figma/statusBar.png"


searchView = new Layer
	name: "searchView"
	parent: figmaView
	x: 0
	width: 375
	height: 352
	opacity: 1
	image: "images/figma/searchView.png"

searchView.states =
	"base":
		y: 812
	"focus":
		y: 460


sceneStates = ["base", "focus"]
sceneLayers = [figmaView, bg, sites, logo, feedView, statusBar, searchView]

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
new Preview { view: figmaView, topTheme: "light" }

statusBar.image = null


nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			if nextState is "focus" and item is feedView
				item.stateSwitch(nextState)
			else
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error
# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	x: 0
	y: 0
	width: 414
	height: 736
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


wallpaper = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 414
	height: 736
	opacity: 1
	image: "images/figma/wallpaper.png"


zen = new Layer
	parent: figmaView
	x: 0
	y: 591
	width: 414
	height: 145
	opacity: 1
	image: "images/figma/zen.png"


tabs = new Layer
	parent: figmaView
	x: 0
	y: 542
	width: 414
	height: 48
	opacity: 1
	image: "images/figma/tabs.png"


omnibox = new Layer
	parent: figmaView
	x: -1
	width: 416
	height: 64
	opacity: 1
	image: "images/figma/omnibox.png"

omnibox.states =
	"hidden":
		y: 358
	"shown":
		y: 308


informers = new Layer
	parent: figmaView
	x: 70
	width: 274.2
	height: 32
	opacity: 1
	image: "images/figma/informers.png"

informers.states =
	"hidden":
		y: 430
	"shown":
		y: 380


logo = new Layer
	parent: figmaView
	x: 87
	width: 240.0
	height: 96
	opacity: 1
	image: "images/figma/logo.png"

logo.states =
	"hidden":
		y: 222
	"shown":
		y: 196


sites = new Layer
	parent: figmaView
	x: 0
	y: 7
	width: 414
	height: 150
	opacity: 1
	image: "images/figma/sites.png"


topTabs = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 414
	height: 64
	opacity: 1
	image: "images/figma/topTabs.png"


alert = new Layer
	parent: figmaView
	x: 15
	width: 384
	height: 90
	image: "images/figma/alert.png"

alert.states =
	"hidden":
		y: 478
		opacity: 0
	"shown":
		y: 428
		opacity: 1


sceneStates = ["hidden", "shown"]
sceneLayers = [figmaView, wallpaper, zen, tabs, omnibox, informers, logo, sites, topTabs, alert]

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



alert.states.hidden.scale = 0.7
alert.states.shown.scale = 1
alert.stateSwitch("hidden")
alert.originY = 0

nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			if nextState is "shown" and item is alert
				item.opacity = 1
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error


statusBar = new Layer
	parent: figmaView, width: figmaView.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
preview = new Preview { view: figmaView, borderRadius: 16 }
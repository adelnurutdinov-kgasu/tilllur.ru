# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(242.24999696016312, 242.24999696016312, 242.24999696016312, 1)"


whiter = new Layer
	name: "whiter"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


topSection = new Layer
	name: "topSection"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 252
	opacity: 1
	image: "images/figma/topSection.png"


breaker = new Layer
	name: "breaker"
	parent: figmaView
	x: 0
	y: 251
	width: 360
	height: 1
	opacity: 1
	backgroundColor: "rgba(0, 0, 0, 1)"


news = new Layer
	name: "news"
	parent: figmaView
	x: 0
	width: 360
	height: 480
	opacity: 1
	image: "images/figma/news.png"

news.states =
	"hidden":
		y: 270
	"shown":
		y: 338


bottomBar = new Layer
	name: "bottomBar"
	parent: figmaView
	x: 0
	y: 584
	width: 360
	height: 56
	opacity: 1
	image: "images/figma/bottomBar.png"


notificationMask = new Layer
	name: "notificationMask"
	parent: figmaView
	x: 0
	y: 252
	width: 360
	height: 93
	opacity: 1
	backgroundColor: "transparent"


nofifications = new Layer
	name: "nofifications"
	parent: notificationMask
	x: 0
	width: 360
	height: 93
	opacity: 1
	image: "images/figma/nofifications.png"

nofifications.states =
	"hidden":
		y: -68
	"shown":
		y: 0


sceneStates = ["hidden", "shown"]
sceneLayers = [figmaView, whiter, topSection, breaker, news, bottomBar, notificationMask, nofifications]

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



# breaker.opacity = 0.1

breaker.bringToFront()
topSection.bringToFront()


statusBar = new Layer
	parent: figmaView, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8, forceAndroidBar: true }
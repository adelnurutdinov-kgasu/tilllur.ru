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
	height: 344
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


content = new Layer
	name: "content"
	parent: figmaView
	x: -1
	width: 361
	height: 792
	opacity: 1
	image: "images/figma/content.png"

content.states =
	"hidden":
		y: 45
	"shown":
		y: 116


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
	y: 25
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


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 25
	opacity: 1
	backgroundColor: "white"
	# image: "images/figma/statusBar.png"


sceneStates = ["hidden", "shown"]
sceneLayers = [figmaView, whiter, content, bottomBar, notificationMask, nofifications, statusBar]

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
new Preview { view: figmaView, borderRadius: 8, forceAndroidBar: true }
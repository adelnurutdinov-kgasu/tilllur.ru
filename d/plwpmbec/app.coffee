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


screen = new Layer
	name: "screen"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/screen.png"


city = new Layer
	name: "city"
	parent: figmaView
	x: 24
	y: 67
	width: 160
	height: 44
	image: "images/figma/city.png"

city.states =
	"hidden":
		opacity: 0
	"shown":
		opacity: 1


sceneStates = ["hidden", "shown"]
sceneLayers = [figmaView, screen, city]

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

city.originY = 0
city.originX = 0.29

city.states.hidden.scale = 0.5
city.states.shown.scale = 1

city.stateSwitch("hidden")



statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8, forceAndroidBar: true }
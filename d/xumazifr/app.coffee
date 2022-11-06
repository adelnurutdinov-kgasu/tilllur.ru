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


screen = new Layer
	name: "screen"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/screen.png"


teaser = new Layer
	name: "teaser"
	parent: figmaView
	y: 480
	width: 720
	height: 160
	opacity: 1
	image: "images/figma/teaser.png"

teaser.states =
	"shown":
		x: 0
	"hidden":
		x: -360
	"finish":
		x: 0


zenTeaser = new Layer
	name: "zenTeaser"
	parent: teaser
	x: 0
	y: 0
	width: 360
	height: 160
	opacity: 1
	image: "images/figma/zenTeaser.png"


newsTeaser = new Layer
	name: "newsTeaser"
	parent: teaser
	x: 360
	y: 0
	width: 360
	height: 160
	opacity: 1
	image: "images/figma/newsTeaser.png"


tabsView = new Layer
	name: "tabsView"
	parent: figmaView
	x: 0
	y: 416
	width: 360
	height: 64
	opacity: 1
	backgroundColor: "transparent"


tabLeft = new Layer
	name: "tabLeft"
	parent: tabsView
	x: 24
	y: 8
	width: 156
	height: 42
	opacity: 1
	image: "images/figma/tabLeft.png"


nowRight = new Layer
	name: "nowRight"
	parent: tabsView
	x: 196
	y: 30
	width: 125
	height: 20
	image: "images/figma/nowRight.png"

nowRight.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0
	"finish":
		opacity: 1


subtitleRight = new Layer
	name: "subtitleRight"
	parent: tabsView
	x: 180
	y: 30
	width: 156
	height: 20
	image: "images/figma/subtitleRight.png"

subtitleRight.states =
	"shown":
		opacity: 0
	"hidden":
		opacity: 1
	"finish":
		opacity: 0


titleRight = new Layer
	name: "titleRight"
	parent: tabsView
	x: 180
	y: 8
	width: 156
	height: 20
	opacity: 1
	image: "images/figma/titleRight.png"


progress = new Layer
	name: "progress"
	parent: tabsView
	x: 24
	y: 59
	width: 312
	height: 1
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


currentStep = new Layer
	name: "currentStep"
	parent: tabsView
	y: 58
	width: 156
	height: 3
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"

currentStep.states =
	"shown":
		x: 24
	"hidden":
		x: 180
	"finish":
		x: 24


newMessage = new Layer
	name: "newMessage"
	parent: tabsView
	x: 298
	y: 4
	width: 8
	height: 8
	backgroundColor: "rgba(255, 0, 0, 1)"

newMessage.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0
	"finish":
		opacity: 0


sceneStates = ["shown", "hidden", "finish"]
sceneLayers = [figmaView, screen, teaser, zenTeaser, newsTeaser, tabsView, tabLeft, nowRight, subtitleRight, titleRight, progress, currentStep, newMessage]

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


newMessage.borderRadius = "100%"


statusBar = new Layer
	parent: figmaView, width: 360, height: 24, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8, statusBar: "light" }

# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


siteView = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/siteView.png"


ntpView = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	image: "images/figma/ntpView.png"

ntpView.states =
	"site":
		opacity: 0
	"ntpStart":
		opacity: 1
	"ntp":
		opacity: 1


header = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 100
	opacity: 1
	backgroundColor: "transparent"


headerShadow = new Layer
	parent: header
	x: 0
	width: 360
	height: 100
	image: "images/figma/headerShadow.png"

headerShadow.states =
	"site":
		y: -40
		opacity: 0
	"ntpStart":
		y: -40
		opacity: 0
	"ntp":
		y: 0
		opacity: 1


headerBg = new Layer
	parent: header
	x: 0
	width: 360
	height: 84
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"

headerBg.states =
	"site":
		y: -60
	"ntpStart":
		y: -60
	"ntp":
		y: -20


headerContent = new Layer
	parent: header
	x: 0
	width: 360
	height: 64
	image: "images/figma/headerContent.png"

headerContent.states =
	"site":
		y: -40
		opacity: 0
	"ntpStart":
		y: -40
		opacity: 0
	"ntp":
		y: 0
		opacity: 1


statusBarContents = new Layer
	parent: header
	x: 242
	y: 0
	width: 118
	height: 24
	opacity: 1
	image: "images/figma/statusBarContents.png"


sceneStates = ["site", "ntpStart", "ntp"]
sceneLayers = [figmaView, siteView, ntpView, header, headerShadow, headerBg, headerContent, statusBarContents]

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



nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			if nextState is "ntpStart"
				item.stateSwitch(nextState)
			else if nextState is "site"
				item.stateSwitch(nextState)
# 				if item is headerContent
# 					item.stateSwitch(nextState)
# 				else if item is ntpView
# 					item.stateSwitch(nextState)
# 				else item.animate(nextState, curve: Spring(damping: 1), time: 0.2)
			else item.animate(nextState, curve: Spring(damping: 0.5, velocity: 0.5), time: 1)
		catch error
	
	currentState = nextState
	if currentState is "ntpStart"
		Utils.delay 0.1, ->
			nextStateHandler()



statusBar = new Layer
	parent: figmaView, width: figmaView.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16 }
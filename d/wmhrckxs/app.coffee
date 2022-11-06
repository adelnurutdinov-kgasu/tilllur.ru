# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


wallpaperBlur = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/wallpaperBlur.png"


site = new Layer
	parent: figmaView
	opacity: 1
	image: "images/figma/site.png"

site.states =
	"site":
		x: 0
		y: 0
		width: 360
		height: 640
	"carousel":
		x: 90
		y: 120
		width: 180
		height: 320


bottomColor = new Layer
	parent: figmaView
	image: "images/figma/bottomColor.png"

bottomColor.states =
	"site":
		x: 0
		y: 540
		width: 360
		height: 100
		opacity: 1
	"carousel":
		x: 90
		y: 390
		width: 180
		height: 50
		opacity: 0


bbTabs = new Layer
	parent: figmaView
	image: "images/figma/bbTabs.png"

bbTabs.states =
	"site":
		x: 148
		y: 560
		width: 64
		height: 64
		opacity: 1
	"carousel":
		x: 164
		y: 400
		width: 32
		height: 32
		opacity: 0


bbMenu = new Layer
	parent: figmaView
	image: "images/figma/bbMenu.png"

bbMenu.states =
	"site":
		x: 216
		y: 560
		width: 64
		height: 64
		opacity: 1
	"carousel":
		x: 198
		y: 400
		width: 32
		height: 32
		opacity: 0


bbChats = new Layer
	parent: figmaView
	image: "images/figma/bbChats.png"

bbChats.states =
	"site":
		x: 80
		y: 560
		width: 64
		height: 64
		opacity: 1
	"carousel":
		x: 130
		y: 400
		width: 32
		height: 32
		opacity: 0


bottomView = new Layer
	parent: figmaView
	x: 0
	y: 540
	width: 360
	height: 100
	opacity: 1
	backgroundColor: "transparent"


bbNewTab = new Layer
	parent: bottomView
	x: 284
	y: 20
	width: 64
	height: 64
	opacity: 1
	image: "images/figma/bbNewTab.png"


bbAlice = new Layer
	parent: bottomView
	x: 12
	y: 20
	width: 64
	height: 64
	opacity: 1
	image: "images/figma/bbAlice.png"


dragView = new Layer
	parent: figmaView
	x: 123
	width: 114
	height: 4
	backgroundColor: "rgba(0, 0, 0, 1)"

dragView.states =
	"site":
		y: 627
		opacity: 1
	"carousel":
		y: 428
		opacity: 0


statusBarBlack = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	# image: "images/figma/statusBarBlack.png"
	backgroundColor: null

statusBarBlack.states =
	"site":
		opacity: 1
	"carousel":
		opacity: 0


statusBarWhite = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	backgroundColor: null
	# image: "images/figma/statusBarWhite.png"


statusBarWhite.states =
	"site":
		opacity: 0
	"carousel":
		opacity: 1


sceneStates = ["site", "carousel"]
sceneLayers = [figmaView, wallpaperBlur, site, bottomColor, bbTabs, bbMenu, bbChats, bottomView, bbNewTab, bbAlice, dragView, statusBarBlack, statusBarWhite]

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


figmaView.borderRadius = 16
figmaView.clip = true

# nextStateHandler = () ->

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16 }

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


siteB = new Layer
	parent: figmaView
	opacity: 1
	backgroundColor: "transparent"

siteB.states =
	"site":
		x: 384
		y: 64
		width: 288
		height: 512
	"siteNext":
		x: 0
		y: 0
		width: 360
		height: 640


asdasd = new Layer
	parent: siteB
	x: 0
	y: 0
	opacity: 1
	image: "images/figma/asdasd.png"

asdasd.states =
	"site":
		width: 288
		height: 512
	"siteNext":
		width: 360
		height: 640


bottomColor2 = new Layer
	parent: siteB
	x: 0
	opacity: 1
	image: "images/figma/bottomColor2.png"

bottomColor2.states =
	"site":
		y: 432
		width: 288
		height: 80
	"siteNext":
		y: 540
		width: 360
		height: 100


bbTabs2 = new Layer
	parent: siteB
	image: "images/figma/bbTabs2.png"

bbTabs2.states =
	"site":
		x: 118.4
		y: 448
		width: 51.2
		height: 51.2
		opacity: 0
	"siteNext":
		x: 148
		y: 560
		width: 64
		height: 64
		opacity: 1


bbMenu2 = new Layer
	parent: siteB
	image: "images/figma/bbMenu2.png"

bbMenu2.states =
	"site":
		x: 172.8
		y: 448
		width: 51.2
		height: 51.2
		opacity: 0
	"siteNext":
		x: 216
		y: 560
		width: 64
		height: 64
		opacity: 1


bbChats2 = new Layer
	parent: siteB
	image: "images/figma/bbChats2.png"

bbChats2.states =
	"site":
		x: 64
		y: 448
		width: 51.2
		height: 51.2
		opacity: 0
	"siteNext":
		x: 80
		y: 560
		width: 64
		height: 64
		opacity: 1


siteA = new Layer
	parent: figmaView
	opacity: 1
	backgroundColor: "transparent"

siteA.states =
	"site":
		x: 0
		y: 0
		width: 360
		height: 640
	"siteNext":
		x: -338
		y: 40.9
		width: 314
		height: 558.2


site = new Layer
	parent: siteA
	x: 0
	y: 0
	opacity: 1
	image: "images/figma/site.png"

site.states =
	"site":
		width: 360
		height: 640
	"siteNext":
		width: 314
		height: 558.2


bottomColor = new Layer
	parent: siteA
	x: 0
	opacity: 1
	image: "images/figma/bottomColor.png"

bottomColor.states =
	"site":
		y: 540
		width: 360
		height: 100
	"siteNext":
		y: 471.0
		width: 314
		height: 87.2


bbTabs = new Layer
	parent: siteA
	image: "images/figma/bbTabs.png"

bbTabs.states =
	"site":
		x: 148
		y: 560
		width: 64
		height: 64
		opacity: 1
	"siteNext":
		x: 129.1
		y: 488.4
		width: 55.8
		height: 55.8
		opacity: 0


bbMenu = new Layer
	parent: siteA
	image: "images/figma/bbMenu.png"

bbMenu.states =
	"site":
		x: 216
		y: 560
		width: 64
		height: 64
		opacity: 1
	"siteNext":
		x: 188.4
		y: 488.4
		width: 55.8
		height: 55.8
		opacity: 0


bbChats = new Layer
	parent: siteA
	image: "images/figma/bbChats.png"

bbChats.states =
	"site":
		x: 80
		y: 560
		width: 64
		height: 64
		opacity: 1
	"siteNext":
		x: 69.8
		y: 488.4
		width: 55.8
		height: 55.8
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
	y: 627
	width: 114
	height: 4
	opacity: 0
	backgroundColor: "rgba(0, 0, 0, 1)"


statusBarBlack = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	backgroundColor: null
	# image: "images/figma/statusBarBlack.png"


statusBarWhite = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 0
	image: "images/figma/statusBarWhite.png"


sceneStates = ["site", "siteNext"]
sceneLayers = [figmaView, wallpaperBlur, siteB, asdasd, bottomColor2, bbTabs2, bbMenu2, bbChats2, siteA, site, bottomColor, bbTabs, bbMenu, bbChats, bottomView, bbNewTab, bbAlice, dragView, statusBarBlack, statusBarWhite]

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


asdasd.borderRadius = 16



{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16 }

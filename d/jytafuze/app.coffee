# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


darker = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	backgroundColor: "rgba(0, 0, 0, 1)"

darker.states =
	"siteNormal":
		opacity: 0
	"inside":
		opacity: 1


site = new Layer
	parent: figmaView
	opacity: 1
	image: "images/figma/site.png"

site.states =
	"siteNormal":
		x: 0
		y: 0
		width: 360
		height: 640
	"inside":
		x: 20
		y: 28
		width: 320.1
		height: 569


bottomBar = new Layer
	parent: figmaView
	x: 0
	y: 572
	width: 360
	height: 68
	opacity: 1
	image: "images/figma/bottomBar.png"


topBar = new Layer
	parent: figmaView
	image: "images/figma/topBar.png"

topBar.states =
	"siteNormal":
		x: 0
		y: 24
		width: 360
		height: 40
		opacity: 1
	"inside":
		x: 20
		y: 48
		width: 320
		height: 36
		opacity: 0


insideView = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/insideView.png"

insideView.states =
	"siteNormal":
		y: 640
	"inside":
		y: 0


statusBarBlack = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	# image: "images/figma/statusBarBlack.png"
	backgroundColor: null

statusBarBlack.states =
	"siteNormal":
		opacity: 1
	"inside":
		opacity: 0


statusBarWhite = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	# image: "images/figma/statusBarWhite.png"
	backgroundColor: null

statusBarWhite.states =
	"siteNormal":
		opacity: 0
	"inside":
		opacity: 1


sceneStates = ["siteNormal", "inside"]
sceneLayers = [figmaView, darker, site, bottomBar, topBar, insideView, statusBarBlack, statusBarWhite]

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


# exportSiteNoBar.states.siteNormal.borderRadius = 16
# exportSiteNoBar.states.inside.borderRadius = 16


{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16 }

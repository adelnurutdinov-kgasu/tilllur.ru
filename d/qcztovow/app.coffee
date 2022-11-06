
pages = new PageComponent
	width: 360
	height: 640
	scrollHorizontal: false
	scrollVertical: false

page1 = new Layer
	size: pages.size
	image: "images/left.png"
	parent: pages.content

page2 = new Layer
	size: pages.size
	x: 360 + 16
	image: "images/mid.png"
	parent: pages.content

page3 = new Layer
	size: pages.size
	x: 720 + 32
	image: "images/right.png"
	parent: pages.content


# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	x: 0
	y: 0
	width: 360
	height: 48
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


omniboxView = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 48
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


treeView = new Layer
	parent: figmaView
	x: 90
	y: 6
	width: 180
	height: 36
	opacity: 1
	backgroundColor: "rgba(242.24999696016312, 242.24999696016312, 242.24999696016312, 1)"


selected = new Layer
	parent: figmaView
	x: 90
	y: 4
	width: 60
	height: 40
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


iconMid = new Layer
	parent: figmaView
	x: 162
	y: 6
	width: 36
	height: 36
	opacity: 1
	image: "images/figma/iconMid.png"


iconLeft = new Layer
	parent: figmaView
	x: 102
	y: 6
	width: 36
	height: 36
	opacity: 1
	image: "images/figma/iconLeft.png"


iconRight = new Layer
	parent: figmaView
	x: 222
	y: 6
	width: 36
	height: 36
	opacity: 1
	image: "images/figma/iconRight.png"


iconTabs = new Layer
	parent: figmaView
	x: 300
	y: 6
	width: 36
	height: 36
	opacity: 1
	image: "images/figma/iconTabs.png"


iconAlice = new Layer
	parent: figmaView
	x: 24
	y: 6
	width: 36
	height: 36
	opacity: 1
	image: "images/figma/iconAlice.png"


breaker = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 1
	opacity: 1
	image: "images/figma/breaker.png"


sceneStates = ["base"]
sceneLayers = [figmaView, omniboxView, treeView, selected, iconMid, iconLeft, iconRight, iconTabs, iconAlice, breaker]

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

treeView.borderRadius = 18
figmaView.y = 544
figmaView.parent = pages

selected.shadowBlur = 4
selected.borderRadius = 20
selected.shadowColor = "rgba(0,0,0,0.25)"

selected.states =
	"left":
		x: 90
	"mid":
		x: 150
	"right":
		x: 210

for item in [iconLeft, iconMid, iconRight]
	item.on Events.Tap, (event, layer) ->
		if layer == iconLeft
			selected.animate("left", time: 0.2)
			pages.snapToPage(page1, time: 0.2)
		else if layer is iconMid
			selected.animate("mid", time: 0.2)
			pages.snapToPage(page2, time: 0.2)
		else if layer is iconRight
			selected.animate("right", time: 0.2)
			pages.snapToPage(page3, time: 0.2)
	

statusBar = new Layer
	parent: pages
	width: 360
	height: 24
	backgroundColor: "black"

navBar = new Layer
	parent: pages
	width: 360
	height: 48
	backgroundColor: "black"
	y: 640 - 48



# statusBar = new Layer
	# parent: figmaView, width: figmaView.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: pages, borderRadius: 16, statusBar: "light", forceAndroidBar: true }


# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	x: 0
	y: 0
	width: 375
	height: 667
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


wallpaper = new Layer
	parent: figmaView
	x: -146
	y: 0
	width: 667
	height: 667
	opacity: 1
	image: "images/figma/wallpaper.png"


panel = new Layer
	parent: figmaView
	x: 0
	width: 375
	height: 48
	image: "images/figma/panel.png"

panel.states =
	"base":
		y: 507
		opacity: 1
	"scrolled":
		y: -13
		opacity: 0


sites = new Layer
	parent: figmaView
	x: 0
	width: 375
	height: 280
	opacity: 1
	image: "images/figma/sites.png"

sites.states =
	"base":
		y: -132
	"scrolled":
		y: -652


omnibox = new Layer
	parent: figmaView
	x: 0
	width: 375
	height: 64
	opacity: 1
	image: "images/figma/omnibox.png"

omnibox.states =
	"base":
		y: 320
	"scrolled":
		y: -200


zen = new Layer
	parent: figmaView
	x: 0
	width: 375
	height: 748
	opacity: 1
	image: "images/figma/zen.png"

zen.states =
	"base":
		y: 556
	"scrolled":
		y: 36


logo = new Layer
	parent: figmaView
	x: 0
	width: 375
	height: 104
	image: "images/figma/logo.png"

logo.states =
	"base":
		y: 192
		opacity: 1
	"scrolled":
		y: -328
		opacity: 0


topBar = new Layer
	parent: figmaView
	x: 0
	width: 375
	height: 64
	image: "images/figma/topBar.png"

topBar.states =
	"base":
		y: 0
		opacity: 1
	"scrolled":
		y: -44
		opacity: 0


statusBar = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 375
	height: 20
	opacity: 1
	backgroundColor: null
	# image: "images/figma/statusBar.png"


bottomPanel = new Layer
	parent: figmaView
	x: 0
	width: 375
	height: 48
	opacity: 1
	image: "images/figma/bottomPanel.png"

bottomPanel.states =
	"base":
		y: 667
	"scrolled":
		y: 619


sceneStates = ["base", "scrolled"]
sceneLayers = [figmaView, wallpaper, panel, sites, omnibox, zen, logo, topBar, statusBar, bottomPanel]

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


# Blur

box = new Layer
	width: topBar.width
	height: topBar.height
	y: topBar.y
	backgroundColor: "rgba(255,255,255,0.6)"
	parent: figmaView

box.states =
	"base":
		y: 0
	"scrolled":
		y: -(topBar.height - statusBar.height)

box.placeBehind(topBar)
sceneLayers.push box

# box.blur = 5
# box.draggable.enabled = true
box.style =
	"-webkit-backdrop-filter": "blur(8px)"




blur = new Layer
	width: figmaView.width
	height: figmaView.height
	parent: figmaView
	backgroundColor: "rgba(255,255,255,0)"
	opacity: 0

blur.states =
	"base":
		opacity: 0
	"scrolled":
		opacity: 1

blur.placeBefore(wallpaper)
blur.style =
	"-webkit-backdrop-filter": "blur(17px)"




topBar.originY = 1



pages = new PageComponent
	size: Screen.size
	scrollHorizontal: false

page1 = new Layer
	size: pages.size
	parent: pages.content

page2 = new Layer
	size: pages.size
	y: Screen.height
	parent: pages.content

for item in [page1, page2]
	item.backgroundColor = Utils.randomColor()
	item.opacity = 0



# topBar — контент плашки навигации (без блюра)
# box —  блюр под плашкой навигации
# panel — панель многомордия на нтп
# 58 — магическое число для синка со скоростью табло, сорри

# Utils.modulate преобразует один отрезок в другой
# true/false — это лимитировать ли выходной отрезок

pages.content.on "change:y", ->
	value = pages.scrollY
	
	# движение Y
	for item in sceneLayers
		try
			if item is box or item is topBar
				item.y = Utils.modulate(value, [0, 58], [item.states.base.y, item.states.scrolled.y], true)
			else
				item.y = Utils.modulate(value, [0, Screen.height], [item.states.base.y, item.states.scrolled.y])
	
	# прозрачность
	for item in [panel, logo, blur]
		item.opacity = Utils.modulate(value, [0, Screen.height / 3], [item.states.base.opacity, item.states.scrolled.opacity])
	
	# поведение контента панели
	for item in [topBar]
		item.opacity = Utils.modulate(value, [0, 16], [item.states.base.opacity, item.states.scrolled.opacity])
		item.scale = Utils.modulate(value, [0, 16], [1, 0.97], true)




{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16 }
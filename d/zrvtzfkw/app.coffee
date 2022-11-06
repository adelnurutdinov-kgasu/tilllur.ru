# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


wallpaper = new Layer
	parent: figmaView
	x: -156
	y: -16
	width: 672
	height: 672
	opacity: 1
	image: "images/figma/wallpaper.png"


logo = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 80
	image: "images/figma/logo.png"

logo.states =
	"base":
		y: 140
		opacity: 1
	"scrolled":
		y: 473
		opacity: 0


omnibox = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 64
	opacity: 1
	image: "images/figma/omnibox.png"

omnibox.states =
	"base":
		y: 244
	"scrolled":
		y: 518


cards = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 128
	opacity: 1
	image: "images/figma/cards.png"

cards.states =
	"base":
		y: 308
	"scrolled":
		y: 594


zenTeaser = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 102
	opacity: 1
	image: "images/figma/zenTeaser.png"

zenTeaser.states =
	"base":
		y: 490
	"scrolled":
		y: 776


panel = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/panel.png"

panel.states =
	"base":
		y: 442
	"scrolled":
		y: 728


text4 = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 16
	image: "images/figma/text4.png"

text4.states =
	"base":
		y: 106
		opacity: 0
	"scrolled":
		y: 490
		opacity: 1


text5 = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 16
	image: "images/figma/text5.png"

text5.states =
	"base":
		y: -30
		opacity: 0
	"scrolled":
		y: 306
		opacity: 1


text6 = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 16
	image: "images/figma/text6.png"

text6.states =
	"base":
		y: 38
		opacity: 0
	"scrolled":
		y: 396
		opacity: 1


icon3 = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 68
	opacity: 1
	image: "images/figma/icon3.png"

icon3.states =
	"base":
		y: 38
	"scrolled":
		y: 422


icon4 = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 68
	opacity: 1
	image: "images/figma/icon4.png"

icon4.states =
	"base":
		y: -30
	"scrolled":
		y: 328


icons4 = new Layer
	parent: figmaView
	x: 0
	width: 360
	height: 68
	opacity: 1
	image: "images/figma/icons4.png"

icons4.states =
	"base":
		y: -98
	"scrolled":
		y: 238


statusBar = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	backgroundColor: "black"
	# image: "images/figma/statusBar.png"


navBar = new Layer
	parent: figmaView
	x: 0
	y: 592
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/navBar.png"


sceneStates = ["base", "scrolled"]
sceneLayers = [figmaView, wallpaper, logo, omnibox, cards, zenTeaser, panel, text4, text5, text6, icon3, icon4, icons4, statusBar, navBar]

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



pages = new PageComponent
	width: 360
	height: 640
	scrollHorizontal: false

page1 = new Layer
	height: pages.height
	width: pages.width
	parent: pages.content
	backgroundColor: "transparent"
	opacity: 0.5

page2 = new Layer
	height: pages.height
	width: pages.width
	y: pages.height
	parent: pages.content
	backgroundColor: "transparent"
	opacity: 0.5

pages.snapToPage(page2, false)

pages.content.on "change:y", ->
	value = pages.scrollY
	
	for item in sceneLayers
		try item.y = Utils.modulate(value, [640, 0], [item.states.base.y, item.states.scrolled.y])
	
	for item in [text4, text5, text6]
		try item.opacity = Utils.modulate(value, [320, 0], [item.states.base.opacity, item.states.scrolled.opacity])
	
	for item in [logo]
		try item.opacity = Utils.modulate(value, [640, 320], [item.states.base.opacity, item.states.scrolled.opacity])


{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16, statusBar: "light" }
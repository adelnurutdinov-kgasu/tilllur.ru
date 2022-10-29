# Import from Figma
# Generated with Framer Inventory




figmaView = new Layer
	name: "figmaView"
	# x: 0
	# y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/figmaView.png"


wallpaperView = new Layer
	name: "wallpaperView"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/wallpaperView.png"


sites = new Layer
	name: "sites"
	parent: figmaView
	x: 0
	width: 360
	height: 84
	opacity: 1
	image: "images/figma/sites.png"

sites.states =
	"base":
		y: 24
	"feed":
		y: -283


logoView = new Layer
	name: "logoView"
	parent: figmaView
	x: 0
	width: 360
	height: 197
	opacity: 1
	backgroundColor: "transparent"

logoView.states =
	"base":
		y: 134
	"feed":
		y: -173


logo = new Layer
	name: "logo"
	parent: logoView
	x: 0
	y: 0
	width: 360
	height: 80
	opacity: 1
	image: "images/figma/logo.png"


panelModern = new Layer
	name: "panelModern"
	parent: logoView
	x: 0
	y: 82
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/panelModern.png"


omnibox = new Layer
	name: "omnibox"
	parent: logoView
	x: 0
	y: 130
	width: 360
	height: 64
	opacity: 1
	image: "images/figma/omnibox.png"


backColor = new Layer
	name: "backColor"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	image: "images/figma/backColor.png"

backColor.states =
	"base":
		opacity: 0
	"feed":
		opacity: 1


feed = new Layer
	name: "feed"
	parent: figmaView
	x: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/feed.png"

feed.states =
	"base":
		y: 331
	"feed":
		y: 72


panelOver = new Layer
	name: "panelOver"
	parent: figmaView
	x: 0
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/panelOver.png"

panelOver.states =
	"base":
		y: 214
	"feed":
		y: 24


panelBg = new Layer
	name: "panelBg"
	parent: panelOver
	x: 0
	y: 0
	width: 360
	height: 48
	image: "images/figma/panelBg.png"

panelBg.states =
	"base":
		opacity: 0
	"feed":
		opacity: 1


panelInFeed = new Layer
	name: "panelInFeed"
	parent: panelOver
	x: 0
	y: 0
	width: 360
	height: 48
	image: "images/figma/panelInFeed.png"

panelInFeed.states =
	"base":
		opacity: 0
	"feed":
		opacity: 1


statusBarWhite = new Layer
	name: "statusBarWhite"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 0
	image: "images/figma/statusBarWhite.png"


sceneStates = ["base", "feed"]
sceneLayers = [wallpaperView, sites, logoView, logo, panelModern, omnibox, backColor, feed, panelOver, panelBg, panelInFeed, statusBarWhite]

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


feed.originY = 0
feed.states.base.scale = 344/360
feed.states.feed.scale = 1
feed.stateSwitch("base")


backColor.backgroundColor = "#F0F1F5"
panelOver.image = null

for item in logoView.children
	item.states =
		"base":
			opacity: 1
		"feed":
			opacity: 0

for item in [panelBg]
	item.states =
		"base":
			opacity: 0
		"feed":
			opacity: 1


logoView.states.feed.y += 120
sites.states.feed.y += 120

pages = new PageComponent
	width: figmaView.width
	height: figmaView.height
	scrollVertical: true
	scrollHorizontal: false
	speedY: 2

page1 = new Layer
	width: pages.width
	height: pages.height
	parent: pages.content
	backgroundColor: "null"

page2 = new Layer
	width: pages.width
	height: pages.height
	y: pages.height
	parent: pages.content
	backgroundColor: "null"

pages.content.on "change:y", ->
	value = pages.scrollY
	
	# y
	for item in [sites, logoView, feed]
		try item.y = Utils.modulate(value, [0, 640], [item.states.base.y, item.states.feed.y])
	
	for item in [panelOver]
		try item.y = Utils.modulate(value, [0, 640+10], [item.states.base.y, item.states.feed.y], true)
	
	# scale
	for item in [feed]
		try item.scale = Utils.modulate(value, [0, 640], [item.states.base.scale, item.states.feed.scale], true)
	
	
	
	
# 	# opacity
	for item in [omnibox]
		try item.opacity = Utils.modulate(value, [0, 640/2], [item.states.base.opacity, item.states.feed.opacity], true)
	
	for item in [logo]
		try item.opacity = Utils.modulate(value, [0, 640/2], [item.states.base.opacity, item.states.feed.opacity], true)
	
	for item in [panelBg]
		try item.opacity = Utils.modulate(value, [640-40, 640], [item.states.base.opacity, item.states.feed.opacity], true)
	
	
	for item in [backColor]
		item.opacity = Utils.modulate(value, [0, 640], [item.states.base.opacity, item.states.feed.opacity])
	
	for item in [panelModern]
		try item.opacity = Utils.modulate(value, [0, 640/2+40], [item.states.base.opacity, item.states.feed.opacity], true)
	
	for item in [panelInFeed]
		item.opacity = Utils.modulate(value, [640/2-40, 640/2+40], [item.states.base.opacity, item.states.feed.opacity])


feed.bringToFront()
statusBarWhite.bringToFront()
panelInFeed.placeBefore(backColor)







screen = new Layer
	width: 360, height: 640

figmaView.parent = screen
pages.parent = screen

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light", forceAndroidBar: true }
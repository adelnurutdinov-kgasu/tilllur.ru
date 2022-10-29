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


wallpaper = new Layer
	name: "wallpaper"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/wallpaper.png"


omnibox = new Layer
	name: "omnibox"
	parent: figmaView
	x: 0
	width: 360
	height: 64
	image: "images/figma/omnibox.png"

omnibox.states =
	"base":
		y: 264
		opacity: 1
	"scrolled":
		y: 597
		opacity: 0


darker = new Layer
	name: "darker"
	parent: figmaView
	x: 0
	y: 24
	width: 360
	height: 133
	opacity: 1
	image: "images/figma/darker.png"


logo = new Layer
	name: "logo"
	parent: figmaView
	x: 0
	width: 360
	height: 80
	image: "images/figma/logo.png"

logo.states =
	"base":
		y: 168
		opacity: 1
	"scrolled":
		y: 501
		opacity: 0


sitesMain = new Layer
	name: "sitesMain"
	parent: figmaView
	x: 0
	width: 360
	height: 181
	opacity: 1
	image: "images/figma/sitesMain.png"

sitesMain.states =
	"base":
		y: -24
	"scrolled":
		y: 309


backArrow = new Layer
	name: "backArrow"
	parent: figmaView
	x: 0
	width: 360
	height: 16
	image: "images/figma/backArrow.png"

backArrow.states =
	"base":
		y: 275
		opacity: 0
	"scrolled":
		y: 608
		opacity: 1


cards = new Layer
	name: "cards"
	parent: figmaView
	x: 0
	width: 360
	height: 128
	opacity: 1
	image: "images/figma/cards.png"

cards.states =
	"base":
		y: 328
	"scrolled":
		y: 661


bottomDev = new Layer
	name: "bottomDev"
	parent: figmaView
	x: 0
	width: 360
	height: 228
	opacity: 1
	image: "images/figma/bottomDev.png"

bottomDev.states =
	"base":
		y: 488
	"scrolled":
		y: 821


sitesSuggest = new Layer
	name: "sitesSuggest"
	parent: figmaView
	x: 0
	width: 360
	height: 88
	image: "images/figma/sitesSuggest.png"

sitesSuggest.states =
	"base":
		y: 171
		opacity: 0
	"scrolled":
		y: 504
		opacity: 1


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	image: "images/figma/statusBar.png"


sceneStates = ["base", "scrolled"]
sceneLayers = [figmaView, wallpaper, omnibox, darker, logo, sitesMain, backArrow, cards, bottomDev, sitesSuggest, statusBar]

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


DRAG_END_POINT = -1

nextStateHandler = () ->

#

sitesMore = sitesMain.copy()
sitesMore.parent = sitesMain
sitesMore.y = -sitesMore.height

sitesMore2 = sitesMain.copy()
sitesMore2.parent = sitesMain
sitesMore2.y = -sitesMore2.height * 2


# sitesDarker = sitesSuggest.copy()
# sitesDarker.name = "sitesDarker"
# sitesDarker.image = "null"
# sitesDarker.backgroundColor = "black"
# sitesDarker.height = sitesDarker.height + 100
# sitesDarker.states = sitesSuggest.states
# sitesDarker.parent = figmaView
# sitesDarker.placeBehind(backArrow)
# 



contentScroll = new ScrollComponent
	width: 360
	height: 640
	scrollHorizontal: false

content = new Layer
	width: 360
	height: 640 * 4
	parent: contentScroll.content
	backgroundColor: "null"

contentScroll.content.draggable.speedY = 1.4
contentScroll.content.draggable.overdrag = false
contentScroll.content.draggable.bounce = false

contentScroll.scrollToPoint( {x: 0, y: 640 * 3 }, false)

temp = new TextLayer
	fontSize: 12
	text: ""



contentScroll.content.on Events.DragEnd, (event, layer) ->
	DRAG_END_POINT = contentScroll.scrollY
# # 	temp.text = contentScroll.content.draggable.direction
# 	if contentScroll.scrollY < 640 then return
# 	if contentScroll.content.draggable.direction == "down"
# 		try
# 			contentScroll.animateStop()
# 		contentScroll.scrollToPoint({ x: 0, y: 0 + 640 }, true, { curve: Spring(tension: 400, friction: 40, velocity: contentScroll.content.draggable.velocity.y)})
# 	else if contentScroll.content.draggable.direction == "up"
# 		try
# 			contentScroll.animateStop()
# 		contentScroll.scrollToPoint({ x: 0, y: 640 + 640 }, true, { curve: Spring(tension: 400, friction: 40, velocity: contentScroll.content.draggable.velocity.y)})



contentScroll.content.on "change:y", ->
	value = contentScroll.scrollY
	
	for item in [omnibox, logo, sitesMain, cards, bottomDev, sitesSuggest, backArrow]
		item.y = Utils.modulate(value, [0 + 640 * 2, 640 + 640 * 2], [item.states.scrolled.y, item.states.base.y], false)
	
	for item in [omnibox, logo]
		item.opacity = Utils.modulate(value, [240 + 640 * 2, 480 + 640 * 2], [item.states.scrolled.opacity, item.states.base.opacity], false)
		
	for item in [sitesSuggest, backArrow, backArrow]
		item.opacity = Utils.modulate(value, [40 + 640 * 2, 480 + 640 * 2], [item.states.scrolled.opacity, item.states.base.opacity], false)
		
	
	if !contentScroll.content.draggable.isDragging
		
		
		if contentScroll.scrollY < 640
			;
# 			try
# 				contentScroll.content.animateStop()
# 				
# 			contentScroll.scrollToPoint({ x: 0, y: 40 }, false, { curve: Spring(damping: 1), time: 0.2 })
		
		
		
		else if contentScroll.scrollY > 1000 and contentScroll.scrollY < 640 * 2
# 			print "#{contentScroll.scrollY} #{contentScroll.content.draggable.direction}"
			if contentScroll.content.draggable.direction == "up"
				contentScroll.scrollToPoint({ x: 0, y: 640 * 2 }, true, { curve: Spring(tension: 400, friction: 40, velocity: contentScroll.content.draggable.velocity.y)})
		
		
		
		else if contentScroll.scrollY > 640 * 2
			if contentScroll.content.draggable.direction == "down"
# 				try
# 					contentScroll.content.animateStop()
				contentScroll.scrollToPoint({ x: 0, y: 0 + 640 * 2 }, true, { curve: Spring(tension: 400, friction: 40, velocity: contentScroll.content.draggable.velocity.y)})
			
			else if contentScroll.content.draggable.direction == "up"
				try
					contentScroll.animateStop()
				contentScroll.scrollToPoint({ x: 0, y: 640 + 640 * 2 }, true, { curve: Spring(tension: 400, friction: 40, velocity: contentScroll.content.draggable.velocity.y)})




screen = new Layer
	width: 360, height: 640

for item in [figmaView, contentScroll]
	item.parent = screen

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 12, topTheme: "light", forceAndroidBar: true }
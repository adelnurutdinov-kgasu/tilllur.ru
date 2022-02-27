currentScrollMode = 0

wallpaper = new Layer
	width: 360
	height: 640
	x: 0
	y: 0
	image: "images/wallpaper.png"

# Pages

pages = new PageComponent
	height: 640
	width: 360
	scrollHorizontal: false
	scrollVertical: true

pages.content.draggable.overdrag = false
pages.originY = 1





page1 = new Layer
	width: 360
	height: 640 - 88
	backgroundColor: "grey"
# 	backgroundColor: "transparent"

page2 = new Layer
	width: 360
	height: 316
	backgroundColor: "white"
# 	backgroundColor: "transparent"

page3 = new Layer
	width: 360
	height: 244 - 30
	backgroundColor: "white"
# 	backgroundColor: "transparent"

page4 = new Layer
	width: 360
	height: 640 - 88
	backgroundColor: "grey"
# 	backgroundColor: "transparent"

page5 = new Layer
	width: 360
	height: 530
	backgroundColor: "white"
# 	backgroundColor: "transparent"



pageLayersA = [page1, page2, page3]
for item in pageLayersA
	pages.addPage(item, "bottom")
	item.backgroundColor = "transparent"

pageLayersB = [page4, page5]
for item in pageLayersB
	item.y = 640
	item.backgroundColor = "transparent"


# pages.content.on Events.AnimationStart, (event, layer) ->
# 	currentPage = pages.currentPage	
# 	pages.content.ignoreEvents = true

pages.content.on Events.AnimationEnd, (event, layer) ->
# 	pages.content.ignoreEvents = false
	
	currentPage = pages.currentPage
	if currentPage is page3
		changePagesB()
	else if currentPage is page4
		changePagesA()


changePagesB = () ->
	currentScrollMode = 1
# 	print 'asdasdas'
# 	print currentScrollMode
	
	for item in pageLayersA
		item.parent = null
		item.y = 640
	
	for item in pageLayersB
		pages.addPage(item, "bottom")
	
	pages.snapToNextPage("bottom", false)
	buttonsMenu.y = 20
	
# 	for item in contentLayers
# 		try item.stateSwitch("more")

changePagesA = () ->
	currentScrollMode = 0
# 	print '????'
# 	print currentScrollMode
	
	for item in pageLayersB
		item.parent = null
		item.y = 640
	
	for item in pageLayersA
		pages.addPage(item, "bottom")
	
# 	for item in contentLayers
# 		try item.stateSwitch("site")
	
# 	pages.snapToNextPage("bottom", false)
	

# Panels

widgets = new Layer
	width: 360
	height: 152
	x: 0
	image: "images/widgets.png"

widgets.states =
	"site":
		y: 552
	"menu":
		y: 172
	"more":
		y: 62

widgets.stateSwitch("site")

menuView = new Layer
	width: 360
	height: 720
	x: 0
	image: "images/menu view.png"

menuView.states =
	"site":
		y: 552
	"menu":
		y: 324
	"more":
		y: 118

menuView.stateSwitch("site")

pip = new Layer
	width: 32
	height: 3
	x: 164
	image: "images/pip.png"

pip.states =
	"site":
		y: 545
		opacity: 0
	"menu":
		y: 166
		opacity: 0.5
	"more":
		y: 56
		opacity: 0.5

pip.stateSwitch("site")




widgets.backgroundColor = "#F0F0F0"
widgets.image = ""
widgets.borderRadius = 8



darker = new Layer
	width: 360
	height: 568
	x: 0
	y: 24
	image: "images/darker.png"

darker.states =
	"site":
		opacity: 0
	"menu":
		opacity: 0.5
	"more":
		opacity: 0.5

darker.stateSwitch("site")

darkerTop = new Layer
	width: 360
	height: 108
	x: 0
	y: 24
	image: "images/darker top.png"

darkerTop.states =
	"site":
		opacity: 0
	"menu":
		opacity: 1
	"more":
		opacity: 1

darkerTop.stateSwitch("site")





widget = new Layer
	width: 360
	height: 152
	x: 0
	y: 0
	image: "images/widget.png"

widget.parent = widgets

statusBar = new Layer
	width: 360
	height: 24
	x: 0
	y: 0
	image: "images/status bar.png"


# teso


darker.placeBefore(wallpaper)
darkerTop.placeBefore(darker)
menuView.clip = true

# Menu Content


color = new Layer
	width: 360
	height: 600
	x: 0
	y: 0
	image: "images/color.png"

color.states =
	"site":
		opacity: 1
	"menu":
		opacity: 0

color.stateSwitch("site")

iconsMore = new Layer
	width: 330
	height: 345
	x: 15
	y: 116
	image: "images/icons more.png"

omnibox = new Layer
	width: 346
	height: 46
	x: 7
	y: 5
	image: "images/omnibox.png"

omnibox.states =
	"site":
		opacity: 1
	"menu":
		opacity: 0

omnibox.stateSwitch("site")

breaker3 = new Layer
	width: 336
	height: 1
	x: 12
	y: 94
	image: "images/breaker 3.png"

breaker1 = new Layer
	width: 360
	height: 1
	x: 0
	y: 0
	image: "images/breaker 1.png"

qIcons = new Layer
	width: 301
	height: 21
	x: 25
	y: 57
	image: "images/q icons.png"

buttonsMenu = new Layer
	width: 210
	height: 13
	x: 75
	y: 20
	image: "images/buttons menu.png"

buttonsMenu.states =
	"site":
		opacity: 0
	"menu":
		opacity: 1

buttonsMenu.stateSwitch("site")

menuContentAnimateArray = [color, omnibox, buttonsMenu]
menuContentArray = [color, iconsMore, omnibox, breaker3, breaker1, qIcons, buttonsMenu]
for item in menuContentArray
	item.parent = menuView


fS = [0, 228]
sS = [228, 442]
aS = [0, 442]
contentLayers = [widgets, menuView]
contentLayersOpacity = [darker, darkerTop]

pages.content.on "change:y", ->
	value = pages.scrollY
# 	print value
# 	print currentScrollMode
	
	if currentScrollMode == 0
		if value >= fS[0] and value <= fS[1]
			for item in contentLayers
				try item.y = Utils.modulate(value, fS, [item.states.site.y, item.states.menu.y], true)
			
			for item in contentLayersOpacity
				try item.opacity = Utils.modulate(value, fS, [item.states.site.opacity, item.states.menu.opacity], true)
			
			for item in menuContentAnimateArray
				try item.opacity = Utils.modulate(value, fS, [item.states.site.opacity, item.states.menu.opacity], true)
		
		else
			for item in contentLayers
				try item.y = Utils.modulate(value, sS, [item.states.menu.y, item.states.more.y], true)
	
	else
		for item in contentLayers
			try item.y = Utils.modulate(value, aS, [item.states.site.y, item.states.more.y], true)
		
		for item in contentLayersOpacity
			try item.opacity = Utils.modulate(value, aS, [item.states.site.opacity, item.states.menu.opacity], true)
		
		for item in menuContentAnimateArray
			try item.opacity = Utils.modulate(value, aS, [item.states.site.opacity, item.states.menu.opacity], true)
	

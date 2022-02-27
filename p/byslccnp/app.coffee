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
	height: 262
	backgroundColor: "white"
# 	backgroundColor: "transparent"

page3 = new Layer
	width: 360
	height: 326
	backgroundColor: "white"
# 	backgroundColor: "transparent"

page4 = new Layer
	width: 360
	height: 640 - 88
	backgroundColor: "grey"
# 	backgroundColor: "transparent"

page5 = new Layer
	width: 360
	height: 588
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
	topSection.y = 0
	insidePip.y = 6
	
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

shadow = new Layer
	width: 360
	x: 0
	image: "images/shadow.png"

shadow.states =
	"site":
		height: 32
		y: 520
		opacity: 0
	"menu":
		height: 32
		y: 354
		opacity: 1
	"more":
		height: 32
		y: 40
		opacity: 1

shadow.stateSwitch("site")



widgets = new Layer
	width: 360
	height: 152
	x: 0
	image: "images/widgets.png"

widgets.states =
	"site":
		y: 552
	"menu":
		y: 414
	"more":
		y: 62

widgets.stateSwitch("site")

menuView = new Layer
	width: 360
	height: 720
	x: 0
	backgroundColor: "white"

menuView.states =
	"site":
		y: 552
		borderRadius: 0
	"menu":
		y: 378
		borderRadius: 8
	"more":
		y: 52
		borderRadius: 8

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
		opacity: 0
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
		opacity: 0
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


darker.placeBefore(wallpaper)
darkerTop.placeBefore(darker)
menuView.clip = true

# Menu Content

insidePip = new Layer
	width: 32
	height: 3
	x: 164
	y: 6
	image: "images/inside pip.png"

insidePip.states =
	"site":
		opacity: 0
	"menu":
		opacity: 1
	"more":
		opacity: 1

insidePip.stateSwitch("site")


color = new Layer
	width: 360
	height: 600
	x: 0
	y: 0
	backgroundColor: "#F0F0F0"

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
	image: "images/icons more.png"

iconsMore.states =
	"site":
		y: 97
		opacity: 0
	"menu":
		y: 97
		opacity: 1
	"more":
		y: 21 + 152
		opacity: 1

iconsMore.stateSwitch("menu")

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

qIcons.states =
	"site":
		opacity: 1
	"menu":
		opacity: 0
	"more":
		opacity: 0

qIcons.stateSwitch("site")

# Next

topSectionMin = new Layer
	width: 361
	height: 88
	x: 0
	y: 0
	image: "images/top section min.png"

topSectionMin.states =
	"site":
		opacity: 0
	"menu":
		opacity: 1
	"more":
		opacity: 0

topSectionMin.stateSwitch("site")


topSection = new Layer
	width: 360
	height: 152
	x: 0
	y: 0
	image: "images/top section.png"

topSection.states =
	"site":
		opacity: 0
	"menu":
		opacity: 0
	"more":
		opacity: 1

topSection.stateSwitch("site")




# insidePip = new Layer
# 	width: 32
# 	height: 3
# 	x: 164
# 	y: 5
# 	image: "images/inside pip.png"
# 
# insidePip.states =
# 	"site":
# 		opacity: 0
# 	"menu":
# 		opacity: 0
# 	"more":
# 		opacity: 1
# 
# insidePip.stateSwitch("site")


menuContentAnimateArray = [color, omnibox, iconsMore, qIcons, insidePip, shadow]
menuContentArray = [color, iconsMore, omnibox, breaker1, qIcons, topSectionMin, topSection, insidePip]
for item in menuContentArray
	item.parent = menuView


fS = [0, 262-88]
sS = [262-88, 262-88+326]
aS = [0, 225-88+326]
contentLayers = [shadow, widgets, menuView, iconsMore]
contentLayersOpacity = [darker, darkerTop]

pages.content.on "change:y", ->
	value = pages.scrollY
# 	print value
# 	print currentScrollMode
	
	if currentScrollMode == 0
		
		if value >= fS[0] and value <= fS[1]
			for item in contentLayers
				try item.y = Utils.modulate(value, fS, [item.states.site.y, item.states.menu.y], true)
			
			for item in menuContentAnimateArray
				try item.opacity = Utils.modulate(value, fS, [item.states.site.opacity, item.states.menu.opacity], true)
			
			for item in [topSectionMin, iconsMore, topSection, insidePip]
				try item.opacity = Utils.modulate(value, fS, [item.states.site.opacity, item.states.menu.opacity], true)
			
			for item in [menuView]
				try item.borderRadius = Utils.modulate(value, fS, [item.states.site.borderRadius, item.states.menu.borderRadius], true)
		
		
		
		
		else
			for item in contentLayers
				try item.y = Utils.modulate(value, sS, [item.states.menu.y, item.states.more.y], true)
			
			for item in contentLayersOpacity
				try item.opacity = Utils.modulate(value, sS, [item.states.menu.opacity, item.states.more.opacity], true)
			
			for item in [topSectionMin, iconsMore, topSection, insidePip]
				try item.opacity = Utils.modulate(value, sS, [item.states.menu.opacity, item.states.more.opacity], true)
			
			for item in [menuView]
				try item.borderRadius = Utils.modulate(value, sS, [item.states.site.borderRadius, item.states.more.borderRadius], true)
	
	
	
	
	else
		for item in contentLayers
			try item.y = Utils.modulate(value, aS, [item.states.site.y, item.states.more.y], true)
		
		for item in contentLayersOpacity
			try item.opacity = Utils.modulate(value, aS, [item.states.site.opacity, item.states.more.opacity], true)
		
		for item in menuContentAnimateArray
			try item.opacity = Utils.modulate(value, aS, [item.states.site.opacity, item.states.menu.opacity], true)
		
		for item in [topSectionMin, iconsMore, topSection, insidePip]
			try item.opacity = Utils.modulate(value, aS, [item.states.site.opacity, item.states.more.opacity], true)
		
		
	
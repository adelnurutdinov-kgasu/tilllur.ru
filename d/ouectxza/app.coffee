Framer.Extras.Hints.disable()
# Framer.Loop.delta = 1 / 360

# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "transparent"


content = new Layer
	name: "content"
	parent: figmaView
	width: 360
	height: 5231-160
	backgroundColor: "null"
# 	image: "images/content.png"



statusBarWhite = new Layer
	name: "statusBarWhite"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	backgroundColor: "white"



# part2 = new Layer
# 	width: 360
# 	height: 1176
# 	image: "images/part2.jpg"

part3 = new Layer
	width: 352
	height: 192
	x: 4
	image: "images/part3.png"

part4 = new Layer
	width: 360
	height: 859
	image: "images/part4.jpg"

part5 = new Layer
	width: 360
	height: 1752
	image: "images/part5.jpg"


part1 = new Layer
	width: 360
	height: 1849
	image: "images/part1.png"

sumY = 365
for item in [part1, part3, part4, part5]
	item.parent = content
	item.y = sumY
	sumY = sumY + item.height

	


{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16, forceAndroidBar: true }

figmaView.backgroundColor = "EEE"

temp = new TextLayer
	fontSize: 12
	x: 140
	text: ""

contentScroll = new ScrollComponent
	parent: figmaView
	width: content.width
	height: figmaView.height - statusBarWhite.height + 4
	y: statusBarWhite.height
	scrollHorizontal: false
	contentInset:
		bottom: 60

contentScroll.content.draggable.overdragScale = 0.1

content.y = 0
content.parent = contentScroll.content


contentScroll.states =
	"main": { x: 0 }
	"secondary": { x: -360 }
contentScroll.stateSwitch("main")



POINT = 1914-64-28-31
LAYER_DRAGGING = false
LAYER_START_Y = 0
SCROLL_TO_TOP = false

# Layer

layerTeaser = new Layer
	name: "layerTeaser"
	parent: figmaView
	x: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "null"
	

layerTeaser.states =
	"scrolled": { y: 116 }
	"hidden": { y: 640 }
	"shown": { y: 640 }
layerTeaser.stateSwitch("shown")

layerTeaser.draggable.enabled = true
layerTeaser.draggable.overdrag = false
layerTeaser.draggable.speedX = 0

layerTeaser.draggable.constraints =
	x: 0
	y: 116
	width: 360
	height: 640*2-128-116



layerTeaser.onTouchStart ->
	if layerTeaser.draggable.enabled == true
		LAYER_DRAGGING = true
		LAYER_START_Y = contentScroll.scrollY



layerTeaser.on Events.TapEnd, (event, layer) ->
	layerOpenHandler(event, layer)

layerOpenHandler = (event, layer) ->
	if !layerTeaser.draggable.isAnimating and contentScroll.scrollY > -2
		LAYER_DRAGGING = true
		LAYER_START_Y = contentScroll.scrollY
		
		scrollGuard.stateSwitch("hidden")
		layerTeaser.ignoreEvents = true
		layerTeaser.animate("scrolled", { curve: Spring(tension: 400, friction: 34, tolerance: 1)})



layerTeaser.on Events.AnimationEnd, (event, layer) ->
	if LAYER_START_Y > 0 and layerTeaser.states.current.name == "scrolled"
		contentScroll.scrollToPoint({ x: 0, y: POINT + 480 }, false)
		LAYER_START_Y = 0
		LAYER_DRAGGING = false
	else if layer.states.current.name == "shown"
		layerTeaser.ignoreEvents = false


layerTeaser.on Events.DragEnd, (event, layer) ->
	currentVelocityY = event.velocity.y
	try
		layerTeaser.animateStop()
	
	# сильный свайп
	if currentVelocityY < -0.2 or layerTeaser.y < layerTeaser.states.shown.y - 256
		scrollGuard.stateSwitch("hidden")
		layerTeaser.ignoreEvents = true
		layerTeaser.animate("scrolled", time: Utils.modulate(layerTeaser.y, [layerTeaser.states.scrolled.y, layerTeaser.states.shown.y], [0, 0.5], true), curve: Spring(damping: 1))
		
		# если довели до конца, то надо руками переместить ленту
		if layerTeaser.y == layer.states.scrolled.y
			if LAYER_START_Y < 1 then ;
			else
				contentScroll.scrollY = POINT + 640 - 44 - 48 - 70
	else
		layerTeaser.animate("shown", curve: Spring(tension: 400, friction: 40, velocity: currentVelocityY))



layerTeaser.on "change:y", ->
	
	if LAYER_DRAGGING
		valueDrag = layerTeaser.y
		
		card.scale = Utils.modulate(valueDrag, [512, 384], [card.states.layer.scale, card.states.feed.scale], true)
		card.borderRadius = Utils.modulate(valueDrag, [512, 384], [card.states.layer.borderRadius, card.states.feed.borderRadius], true)
		
		
		# Normalized Value
		if LAYER_START_Y < 1
			value = Utils.modulate(valueDrag, [388, 388 - 156], [0, 156])
			
			
			if value > 0 and value <= 268
				tempVC = 368
				contentScroll.scrollY = Utils.modulate(value, [0, 156], [POINT-156 + tempVC, POINT + tempVC], false)
			
			else if value <= 0
				contentScroll.scrollY = 0
		
		
		
		if value > 0 and value <= 156
			for item in [headerView, navigationView]
				item.y = Utils.modulate(value, [0, 156], [item.states.max.y, item.states.average.y], false)
				item.height = Utils.modulate(value, [0, 156], [item.states.max.height, item.states.average.height], false)
		
		else if value > 156 and value <= 268
			for item in [headerView, navigationView]
				item.y = Utils.modulate(value, [156, 268], [item.states.average.y, item.states.min.y], true)
				item.height = Utils.modulate(value, [156, 268], [item.states.average.height, item.states.min.height], true)
		
		else if value > 268 and value <= 360
			for item in [headerView, navigationView]
					
				item.y = Utils.modulate(value, [268, 360], [item.states.min.y, item.states.hidden.y], true)
				item.height = Utils.modulate(value, [268, 360], [item.states.min.height, item.states.hidden.height], true)

		



card = new Layer
	width: 360
	height: 414
	image: "images/card.png"

card.parent = layerTeaser
card.originX = 0.5
card.originY = 0
card.states =
	"feed":
		scale: 0.9777
		borderRadius: 8
	"layer":
		scale: 0.92
		borderRadius: 12

card.stateSwitch("layer")




omniboxFix = new Layer
	width: 360
	height: 128 + 56 + 200 - 24
	parent: contentScroll.content
	backgroundColor: "white"

# cardFix = new Layer
# 	width: 360
# 	height: 412
# 	backgroundColor: "#DDD"
# 	parent: content
# 	y: 2105

# Guard


scrollGuard = new Layer
	x: -400
	opacity: 0

scrollGuard.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0 }

scrollGuard.stateSwitch("shown")

scrollGuard.on Events.StateSwitchEnd, (from, to) ->
	if !LAYER_DRAGGING
		if from == "hidden" and to == "shown"
			layerTeaser.animate("shown", time: 0.2)
		else if from == "shown" and to == "hidden"
			layerTeaser.animate("hidden", time: 0.2)


	
	
bottomBarGuard = new Layer
	x: -400
	opacity: 0

bottomBarGuard.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0 }

bottomBarGuard.stateSwitch("shown")

bottomBarGuard.on Events.StateSwitchEnd, (from, to) ->
	if !LAYER_DRAGGING
		if from == "hidden" and to == "shown"
			bottomBarView.animate("max", time: 0.2)
		else if from == "shown" and to == "hidden"
			bottomBarView.animate("min", time: 0.2)




cardNextFix = new Layer
	width: 352
	height: 446
# 	y: 2518
# 	parent: content
	image: "images/card next.png"
	x: 4
	y: 410
	parent: layerTeaser

cardShadow.parent = layerTeaser
cardShadow.x = 0
cardShadow.y = 240
cardShadow.sendToBack()


# card_shadow = new Layer
# 	width: 360
# 	height: 160
# # 	image: "images/card%20shadow.png"
# 	image: null
# 	parent: layerTeaser
# 	y: -20
# 	backgroundColor: "transparent"
# 
# card_shadow.placeBehind(card)
# 
# framerShadow.parent = card_shadow


# Top Images

headerView = new Layer
	width: 360
	parent: figmaView
	backgroundColor: "white"
	clip: true

headerView.states =
	"max": { height: 200, y: 0 }
	"average": { height: 200, y: 0 }
	"min": { height: 200, y: -112 + 4 }
	"hidden": { height: 200, y: -112 + 4 - 64 - 24 }

headerView.stateSwitch("max")



navigationView = new Layer
	parent: figmaView
	width: 360
	backgroundColor: "white"
	clip: true

navigationView.states =
	"max": { height: 200, y: 184 }
	"average": { height: 44, y: 184 }
	"min": { height: 44, y: 72 }
	"hidden": { height: 44, y: -20 }

navigationView.stateSwitch("max")




bottomBarView = new Layer
	parent: figmaView
	x: 0
	y: 584
	width: 360
	height: 56
	opacity: 1
	backgroundColor: "null"

bottomBarView.states =
	"max": { y: 584, height: 56 }
	"average": { y: 584, height: 56 }
	"min": { y: 620 - 8, height: 56 }
	"hidden": { y: 620 - 8, height: 56 }

bottomBarView.stateSwitch("max")




bottomBarShadow.x = 0
bottomBarShadow.y = 0
bottomBarShadow.parent = bottomBarView

bottomBarColor = new Layer
	width: 360
	height: 48
	parent: bottomBarView
	y: 8
	backgroundColor: "white"

bottomBar = new Layer
	name: "bottomBar"
	parent: bottomBarView
	width: 360
	height: 56
	opacity: 1
	image: "images/bottomBar.png"

bottomBar.states =
	"max": { opacity: 1 }
	"min": { opacity: 0 }
bottomBar.stateSwitch("max")

bottomBarSmall = new Layer
	parent: bottomBarView
	width: 360
	height: 28
	image: "images/bottomBarSmall.png"

bottomBarSmall.states =
	"max": { opacity: 0 }
	"min": { opacity: 1 }
bottomBarSmall.stateSwitch("max")



omniboxGuard = new Layer
	x: -400
	opacity: 0

omniboxGuard.states =
	"max": { opacity: 0 }
	"average": { opacity: 0 }
	"min": { opacity: 0 }
	"hidden": { opacity: 0 }

omniboxGuard.stateSwitch("max")

omniboxGuard.on Events.StateSwitchEnd, (from, to) ->
	
	if from != to
		prevStableState = to
		headerView.animate(to, time: 0.2)
		navigationView.animate(to, time: 0.2)
		





navPanel = new Layer
	width: 360
	parent: navigationView
	image: "images/nav%20panel%20pp.png"

navPanel.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
navPanel.stateSwitch("shown")
 

verticals = new Layer
	width: 360
	height: 44
	parent: navigationView
	image: "images/verticals.png"

verticals.states =
	"hidden": { y: 0, opacity: 1 }
	"shown": { y: navigationView.height - 44, opacity: 0 }
verticals.stateSwitch("shown")


omnibox = new Layer
	width: 360
	height: 56
	parent: headerView
	image: "images/omnibox.png"
	backgroundColor: "white"

omnibox.states =
	"hidden": { y: 128 }
	"shown": { y: 128 }
omnibox.stateSwitch("shown")


logo = new Layer
	width: 360
	height: 104
	image: "images/logo.png"
	parent: headerView
	y: 24

logo.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
logo.stateSwitch("shown")



navigationView.on "change:height", ->
	value = navigationView.height
	navPanel.opacity = Utils.modulate(value, [navigationView.states.max.height, navigationView.states.average.height + 40], [navPanel.states.shown.opacity, navPanel.states.hidden.opacity])
	verticals.opacity = Utils.modulate(value, [navigationView.states.average.height + 40, navigationView.states.average.height], [verticals.states.shown.opacity, verticals.states.hidden.opacity], true)
	
	verticals.y = Utils.modulate(value, [navigationView.states.max.height, navigationView.states.average.height], [verticals.states.shown.y, verticals.states.hidden.y])
	omnibox.y = Utils.modulate(value, [navigationView.states.max.height, navigationView.states.average.height], [omnibox.states.shown.y, omnibox.states.hidden.y])

bottomBarView.on "change:y", ->
	value = bottomBarView.y
	bottomBar.opacity = Utils.modulate(value, [bottomBarView.states.max.y,bottomBarView.states.min.y], [bottomBar.states.max.opacity, bottomBar.states.min.opacity], true)
	bottomBarSmall.opacity = Utils.modulate(value, [bottomBarView.states.max.y,bottomBarView.states.min.y], [bottomBarSmall.states.max.opacity, bottomBarSmall.states.min.opacity], true)


bottomBarBack = new Layer
	parent: bottomBar
	width: 70
	y: 6
	height: 54
	backgroundColor: "null"

verticalsBack = new Layer
	parent: verticals
	width: 54
	height: 44
	backgroundColor: "null"


scrollToTop = (event, layer) ->
	if contentScroll.scrollY < 1
		if secondaryContentScroll.x == secondaryContentScroll.states.secondary.x
			goLeft()
		return
	
	if BACK_NOT_TO_TOP
		goLeft()
		return
	
	SCROLL_TO_TOP = true
	
	if secondaryContentScroll.x != secondaryContentScroll.states.main.x
		goLeft()
	
# 	if contentScroll.scrollY != 0
	contentScroll.scrollY = headerView.states.max.height
	contentScroll.scrollToPoint({ x: 0, y: 0 }, true, time: 0.3)
	
	if layerTeaser.y >= layerTeaser.states.scrolled.y
		layerTeaser.animate("shown", time: 0.3)
	else
		layerTeaser.stateSwitch("hidden")
		layerTeaser.animate("shown", time: 0.3)
	
	
	if !LAYER_DRAGGING
		navigationView.animate("max", time: 0.3)
		headerView.animate("max", time: 0.3)
	


bottomBarBack.on Events.TapEnd, (event, layer) ->
	scrollToTop(event, layer)

verticalsBack.on Events.TapEnd, (event, layer) ->
	scrollToTop(event, layer)


layerTeaser.placeBehind(headerView)
bottomBar.bringToFront()
statusBarWhite.bringToFront()


# Scroll

SCROLL_FINISHING = false
LAST_SUCCESS_DIRECTION = ""

contentScroll.onTouchStart ->
# 	print "3?"
	LAYER_DRAGGING = false
	SCROLL_FINISHING = false

contentScroll.content.on Events.Move, (event, layer) ->
	if LAYER_DRAGGING then return
	
	
	if contentScroll.scrollY < 10
		scrollGuard.stateSwitch("shown")
	else
		if contentScroll.direction == "down" and contentScroll.scrollY < POINT
			scrollGuard.stateSwitch("hidden")
		else if contentScroll.direction == "up" and contentScroll.scrollY < POINT
			scrollGuard.stateSwitch("shown")
	
	
	if contentScroll.scrollY < 10
		bottomBarGuard.stateSwitch("shown")
	else
		if contentScroll.direction == "down"
			bottomBarGuard.stateSwitch("hidden")
		else if contentScroll.direction == "up"
			bottomBarGuard.stateSwitch("shown")
	
	

	if contentScroll.scrollY < 360
		
	else
		if contentScroll.direction == "down"
			omniboxGuard.stateSwitch("hidden")
		else if contentScroll.direction == "up"
			omniboxGuard.stateSwitch("min")




contentScroll.content.on Events.DragEnd, ->
	currentVelocityY = event.velocity.y
	value = contentScroll.scrollY
	
	if contentScroll.content.draggable.direction == "up" or contentScroll.content.draggable.direction == "down"
		LAST_SUCCESS_DIRECTION = contentScroll.content.draggable.direction
	
	if value < 268
		try
			contentScroll.content.animateStop()
		
		if currentVelocityY < 0
			contentScroll.scrollToPoint({ x: 0, y: 268 }, true, { curve: Spring(tension: 400, friction: 34, tolerance: 1, velocity: currentVelocityY)})
		else
			contentScroll.scrollToPoint({ x: 0, y: 0 }, true, { curve: Spring(tension: 400, friction: 34, tolerance: 1, velocity: currentVelocityY)})



contentScroll.content.on Events.AnimationEnd, (event, layer) ->
	if SCROLL_TO_TOP
		SCROLL_TO_TOP = false




contentScroll.content.on "change:y", (event, layer) ->
	if LAYER_DRAGGING or SCROLL_TO_TOP then return
	value = contentScroll.scrollY
	
	
	if value <= 156
		for item in [headerView, navigationView]
			item.y = Utils.modulate(value, [0, 156], [item.states.max.y, item.states.average.y], false)
			item.height = Utils.modulate(value, [0, 156], [item.states.max.height, item.states.average.height], false)
	
	else if value > 156 and value <= 268
		for item in [headerView, navigationView]
			item.y = Utils.modulate(value, [156, 268], [item.states.average.y, item.states.min.y], true)
			item.height = Utils.modulate(value, [156, 268], [item.states.average.height, item.states.min.height], true)
	
	else if value > 268 and value <= 360
		for item in [headerView, navigationView]
			if item.y == item.states.min.y then continue
				
			item.y = Utils.modulate(value, [268, 360], [item.states.min.y, item.states.hidden.y], true)
			item.height = Utils.modulate(value, [268, 360], [item.states.min.height, item.states.hidden.height], true)
	
	
	if value >= POINT
		layerTeaser.draggable.enabled = false
		layerTeaser.ignoreEvents = true
		
		layerTeaser.y = Utils.modulate(value, [POINT, POINT + 1000], [layerTeaser.states.hidden.y, layerTeaser.states.hidden.y - 1000], false)
	else
		layerTeaser.draggable.enabled = true
		layerTeaser.ignoreEvents = false
	
	
	card.scale = Utils.modulate(value, [POINT, POINT + 60], [card.states.layer.scale, card.states.feed.scale], true)
	card.borderRadius = Utils.modulate(value, [POINT, POINT + 60], [card.states.layer.borderRadius, card.states.feed.borderRadius], true)
	
	
	
	
	
	
	if value < 268 and !contentScroll.content.draggable.isDragging and !SCROLL_FINISHING
		SCROLL_FINISHING = true
		currentVelocityY = contentScroll.content.draggable.velocity.y
		
		try
			contentScroll.content.animateStop()
		
		if currentVelocityY < 0 or (currentVelocityY == 0 and LAST_SUCCESS_DIRECTION == "up")
			contentScroll.scrollToPoint({ x: 0, y: 268 }, true, { curve: Spring(tension: 370, friction: 34, tolerance: 1, velocity: currentVelocityY)})
		else if currentVelocityY > 0 or (currentVelocityY == 0 and LAST_SUCCESS_DIRECTION == "down")
			contentScroll.scrollToPoint({ x: 0, y: 0 }, true, { curve: Spring(tension: 370, friction: 34, tolerance: 1, velocity: currentVelocityY)})
			

# Secondary

BACK_NOT_TO_TOP = false


zenNav = new Layer
	parent: contentScroll.content
	size: 50
	x: 27
	y: 95 + navigationView.y - 24
	backgroundColor: "null"

yaNav = new Layer
	parent: contentScroll.content
	size: 50
	x: 90
	y: 95 + navigationView.y - 24
	backgroundColor: "null"





yaSec = new Layer
	width: 52
	height: 44
	x: 130
	image: "images/yaSec.png"

zenSec = new Layer
	width: 52
	height: 44
	x: 66
	image: "images/zenSec.png"

for item in [yaSec, zenSec]
	item.parent = verticals
	item.states =
		"main": { opacity: 0 }
		"secondary": { opacity: 1 }
	item.stateSwitch("main")




mainVerticalButton = new Layer
	parent: verticals
	size: 48
	x: 68
	y: -2
	backgroundColor: "null"

secondaryVerticalButton = new Layer
	parent: verticals
	size: 48
	x: 132
	y: -2
	backgroundColor: "null"

mainButtonHandler = (event, layer) ->
	goLeft(event, layer)

secondaryButtonHandler = (event, layer) ->
	goRight(event, layer)

verticals.on "change:opacity", ->
	E = 0.001
	value = verticals.opacity
	
	if value >= 1 - E
		mainVerticalButton.on(Events.TapEnd, mainButtonHandler)
		secondaryVerticalButton.on(Events.TapEnd, secondaryButtonHandler)
		
		zenNav.off(Events.TapEnd, layerOpenHandler)
		yaNav.off(Events.TapEnd, secondaryButtonHandler)
		
	
	else if value <= 0 + E
		mainVerticalButton.off(Events.TapEnd, mainButtonHandler)
		secondaryVerticalButton.off(Events.TapEnd, secondaryButtonHandler)
		
		zenNav.on(Events.TapEnd, layerOpenHandler)
		yaNav.on(Events.TapEnd, secondaryButtonHandler)

zenNav.on(Events.TapEnd, layerOpenHandler)
yaNav.on(Events.TapEnd, secondaryButtonHandler)


buttonView1 = new Layer
	size: 50
	parent: part3
	y: 2
	height: 60
	width: 360

buttonView2 = new Layer
	size: 50
	parent: part3
	y: 68
	height: 60
	width: 360

buttonView3 = new Layer
	size: 50
	parent: part3
	y: 132
	height: 64
	width: 360

buttonViewAll = new Layer
	size: 50
	parent: part3
	y: Align.bottom()
	height: 54
	width: 360

for item in [buttonView1, buttonView2, buttonView3, buttonViewAll]
	item.backgroundColor = "null"
	
	if item != buttonViewAll then continue
	
	item.on Events.TapEnd, (event, layer) ->
		if layer == buttonView1
			secondaryContentScroll.scrollToPoint({ x: 0, y: savedPositionArray[0]}, false)
		else if layer == buttonView2
			secondaryContentScroll.scrollToPoint({ x: 0, y: savedPositionArray[1]}, false)
		else if layer == buttonView3
			secondaryContentScroll.scrollToPoint({ x: 0, y: savedPositionArray[2]}, false)
		else
			secondaryContentScroll.scrollToPoint({ x: 0, y: savedPositionArray[3]}, false)
		
		goRight(event, layer)


goLeft = (event, layer) ->
	try
		secondaryContentScroll.content.animateStop()
	
	BACK_NOT_TO_TOP = false
	for item in [zenSec, yaSec]
		item.stateSwitch("main")
	
	if contentScroll.scrollY < 1
		headerView.animate("max", curve: Spring(damping: 1), time: 0.5)
		navigationView.animate("max", curve: Spring(damping: 1), time: 0.5)
	
	layerTeaser.animate(x: 0, options: { curve: Spring(damping: 1), time: 0.5 })
	
	contentScroll.animate("main", curve: Spring(damping: 1), time: 0.5)
	secondaryContentScroll.animate("main", curve: Spring(damping: 1), time: 0.5)


goRight = (event, layer) ->
	try
		contentScroll.content.animateStop()
	
	BACK_NOT_TO_TOP = true
	for item in [zenSec, yaSec]
		item.stateSwitch("secondary")
	
	headerView.animate("min", curve: Spring(damping: 1), time: 0.5)
	navigationView.animate("min", curve: Spring(damping: 1), time: 0.5)
	
	layerTeaser.animate(x: -360, options: { curve: Spring(damping: 1), time: 0.5 })
	
	contentScroll.animate("secondary", curve: Spring(damping: 1), time: 0.5)
	secondaryContentScroll.animate("secondary", curve: Spring(damping: 1), time: 0.5)



secondaryContentScroll = new ScrollComponent
	parent: figmaView
	width: 360
	height: 600
	y: 24
	scrollHorizontal: false
	contentInset:
		bottom: 60

secondaryContentScroll.states =
	"main": { x: 360 }
	"secondary": { x: 0 }
secondaryContentScroll.stateSwitch("main")

secondaryContentScroll.placeBehind(contentScroll)
secondaryContentScroll.content.draggable.overdrag = false


# Sec Layers



secPart1 = part1.copy()
secPart1.parent = secondaryContentScroll.content
secPart1.y = 24 + 56 + 8 + 8

S_Y = secPart1.height + secPart1.y

# secPart2 = part2.copy()
# secPart2.parent = secondaryContentScroll.content
# secPart2.y = S_Y
# 
# S_Y = S_Y + secPart2.height



fixSec = new Layer
	width: 360
	height: 268 + 44 + 48
	y: -268
	parent: secondaryContentScroll.content
	backgroundColor: "white"



collections = new Layer
	width: 360
	height: 340
	image: "images/collections.jpg"
# 
# edadeal = new Layer
# 	width: 360
# 	height: 323
# 	image: "images/edadeal.jpg"

efir = new Layer
	width: 360
	height: 256
	image: "images/efir.jpg"

games = new Layer
	width: 360
	height: 304
	image: "images/games.jpg"

local = new Layer
	width: 360
	height: 393
	image: "images/local.jpg"

market = new Layer
	width: 360
	height: 305
	image: "images/market.jpg"

music = new Layer
	width: 360
	height: 339
	image: "images/music.jpg"

personal = new Layer
	width: 360
	height: 329
	image: "images/personal.jpg"

skills = new Layer
	width: 360
	height: 290
	image: "images/skills.jpg"

sport = new Layer
	width: 360
	height: 328
	image: "images/sport.jpg"

translate = new Layer
	width: 360
	height: 422
	image: "images/translate.jpg"

tv = new Layer
	width: 360
	height: 442
	image: "images/tv.jpg"


secondLayers = [tv, personal, local, collections, efir, games, market, music, skills, sport, translate]


savedPositionArray = [0, 0, 0, 0]
for item in secondLayers
	item.parent = secondaryContentScroll.content
	item.y = S_Y
	item.scale = 0.97
	item.borderRadius = 8
	
	if item is tv
		savedPositionArray[0] = S_Y - 100
	else if item is personal
		savedPositionArray[1] = S_Y - 100
	else if item is local
		savedPositionArray[2] = S_Y - 100
	else if item is collections
		savedPositionArray[3] = S_Y - 100
	
	S_Y += item.height-4

secondaryContentScroll.updateContent()


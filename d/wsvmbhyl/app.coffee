
# Screen.backgroundColor = "black"

# Магия
BS = {
	w: 360, wg: 180
	h: 640, hg: 200
}

# Омнибокс
PS = { h: 64 }

boxSideGap = BS.hg # Сдвиг модуляции для бокового состояния
siteGap = 24 # Расстояние между табами

screen = new Layer
	width: BS.w
	height: BS.h
	backgroundColor: "grey"
# 	clip: true

scaleFactor = Screen.width / screen.width
# screen.scale = scaleFactor
# screen.center()

# Preview

previewView = new Layer
	parent: screen
	width: BS.wg * 6
	height: BS.h + BS.hg * 2
	x: -BS.wg * 2
	y: 0
	opacity: 0
	backgroundColor: "transparent"


bTop = new Layer
	parent: previewView
	width: BS.wg * 4
	height: BS.h
	x: BS.wg
	y: 0
	borderColor: "red"
	borderWidth: 2
	borderRadius: 10
	backgroundColor: "transparent"
	opacity: 0.5

bMid = new Layer
	parent: previewView
	width: BS.wg * 4
	height: BS.h
	x: BS.wg
	y: BS.hg
	borderColor: "green"
	borderWidth: 2
	borderRadius: 10
	backgroundColor: "transparent"
	opacity: 0.5

bBot = new Layer
	parent: previewView
	width: BS.wg * 4
	height: BS.h
	x: BS.wg
	y: BS.hg * 2
	borderColor: "blue"
	borderWidth: 2
	borderRadius: 10
	backgroundColor: "transparent"
	opacity: 0.5

blBot = bBot.copy()
blBot.parent = previewView
blBot.x = bBot.x - BS.wg

brBot = bBot.copy()
brBot.parent = previewView
brBot.x = bBot.x + BS.wg

# Helpers


isCarouselEvent = () ->
	if box.midY + 44 > bBot.midY then return false else return true

isHighterThan = (layer, targetLayer) ->
	return layer.midY < targetLayer.midY

isLowerThan = (layer, targetLayer) ->
	return layer.midY > targetLayer.midY

isToTop = (event) ->
	return event.velocity.y < -0.2

isToBottom = (event) ->
	return event.velocity.y > 0.2




isLefterThan = (layer, targetLayer) ->
	return layer.midX < targetLayer.midX

isRighterThan = (layer, targetLayer) ->
	return layer.midX > targetLayer.midX

isToLeft = (event) ->
	return event.velocity.x < -0.2

isToRight = (event) ->
	return event.velocity.x > 0.2



closestBoxY = (layer, boxArray) ->
	minGap = 10000
	localClosestLayer = null
	
	for item in boxArray
		currentGap = Math.abs(layer.midY - item.midY)
		if currentGap < minGap
			minGap = currentGap
			localClosestLayer = item
	
	return localClosestLayer

closestBoxX = (layer, boxArray) ->
	minGap = 10000
	localClosestLayer = null
	
	for item in boxArray
		currentGap = Math.abs(layer.midX - item.midX)
		if currentGap < minGap
			minGap = currentGap
			localClosestLayer = item
	
	return localClosestLayer


# B-O-X

box = new Layer
	parent: previewView
	width: bBot.width
	height: bBot.height
	backgroundColor: "green"
	force2d: true
	clip: true

initBoxDraggableSpeed = () ->
	box.draggable.speedX = getBoxDraggableSpeed().x
	box.draggable.speedY = getBoxDraggableSpeed().y

getBoxDraggableSpeed = () ->
	return { x: 0.3, y: 0.4 }

box.draggable.enabled = true
initBoxDraggableSpeed()

box.draggable.constraints =
	x: 0
	y: 0
	width: previewView.width
	height: previewView.height


box.x = BS.wg
box.y = BS.hg * 2



divCarouselTarget = null
# Return from Carousel
box.on Events.Tap, (event, layer) ->
	consoleLayer.text = consoleLayer.text + " !!!"
	if event.target == divCarouselTarget then return
	animateBox(null, "bot")



# Open Carousel
carouselButton = new Layer
	parent: box
	size: 64
	x: 12 + 64 * 2 + BS.wg
	y: BS.h - 64 - BS.wg * 2 - 32
	backgroundColor: "red"

# print carouselButton.midY

carouselButton.on Events.Tap, (event, layer) ->
	divCarouselTarget = event.target
	consoleLayer.text = consoleLayer.text + " $$$$$$"
	
	setTabsScroll(false)
	animateBox(null, "mid")


# Experimental Animations

animateBox = (event, type) ->
	if event != null then localVelocity = Math.abs(event.velocity.y)
	else localVelocity = 0
	
	inputVelocity = Utils.modulate(localVelocity, [0, 5], [0, 7], true)
# 	localFriction = Utils.modulate(input.value, [0, 1], [50, 100], true)
	
	if type == "top" then inputY = bTop.y
	else if type == "mid" then inputY = bMid.y
	else if type == "bot" then inputY = bBot.y
	
	if type is "top" or type is "mid" then setTabsScroll(false)
	else setTabsScroll(true)
	
	inputAnimation = new Animation box,
		y: inputY, options: { curve: Spring(tension: 600, friction: 70, velocity: inputVelocity)}
	inputAnimation.start()

animateBoxX = (event, type) ->
	if event != null then localVelocity = Math.abs(event.velocity.x)
	else localVelocity = 0
	
	inputVelocity = Utils.modulate(localVelocity, [0, 5], [0, 7], true)
# 	localFriction = Utils.modulate(input.value, [0, 1], [50, 100], true)
	
	if type == "left" then inputX = blBot.x
	else if type == "mid" then inputX = bBot.x
	else if type == "right" then inputX = brBot.x
	
# 	if 
	
# 	box.animateStop()
	inputAnimation = new Animation box,
		x: inputX, options: { curve: Spring(tension: 600, friction: 70, velocity: inputVelocity)}
	inputAnimation.start()



box.on Events.DragEnd, (event, layer) ->
# 	siteContentScroll.content.ignoreEvents = false
	
	if isToTop(event)
		if isLowerThan(layer, bBot)
			animateBox(event, "bot")
		else if isHighterThan(layer, bBot) and isLowerThan(layer, bMid)
			animateBox(event, "mid")
		else if isHighterThan(layer, bMid) and isLowerThan(layer, bTop)
			animateBox(event, "top")
	
	else if isToBottom(event)
		if isHighterThan(layer, bTop)
			animateBox(event, "top")
		else if isLowerThan(layer, bTop) and isHighterThan(layer, bMid)
			animateBox(event, "mid")
		else if isLowerThan(layer, bMid) and isHighterThan(layer, bBot)
			animateBox(event, "bot")
	
	else
		closestLayer = closestBoxY(layer, [bBot, bMid, bTop])
		
		if closestLayer is bBot
			animateBox(null, "bot")
		else if closestLayer is bMid
			animateBox(null, "mid")
		else if closestLayer is bTop
			animateBox(null, "top")
	
	
	if isToLeft(event)
		if isLefterThan(layer, blBot)
			animateBoxX(event, "left")
		else if isRighterThan(layer, blBot) and isLefterThan(layer, bBot)
			animateBoxX(event, "left")
		else if isRighterThan(layer, bBot) and isLefterThan(layer, brBot)
			animateBoxX(event, "mid")
		else if isRighterThan(layer, brBot)
			animateBoxX(event, "right")
	
	else if isToRight(event)
		if isRighterThan(layer, brBot)
			animateBoxX(event, "right")
		else if isLefterThan(layer, brBot) and isRighterThan(layer, bBot)
			animateBoxX(event, "right")
		else if isLefterThan(layer, bBot) and isRighterThan(layer, blBot)
			animateBoxX(event, "mid")
		else if isLefterThan(layer, blBot)
			animateBoxX(event, "left")
	
	else
		closestLayer = closestBoxX(layer, [brBot, bBot, blBot])
		
		if closestLayer is blBot
			animateBoxX(null, "left")
		else if closestLayer is bBot
			animateBoxX(null, "mid")
		else if closestLayer is brBot
			animateBoxX(null, "right")


# boxTabSwipeDetected = false
boxTabSwipeDetected = true

setTabsScroll = (activeState) ->
# 	boxTabSwipeDetected = activeState
	carouselButton.ignoreEvents = !activeState
	
	for item in [siteContentScroll, siteLeftContentScroll, siteRigthContentScroll]
		item.content.ignoreEvents = !activeState
# 		item.ignoreEvents = !activeState



box.on Events.DragStart, (event, layer) ->
# 	boxTabSwipeDetected = false
# 	siteContentScroll.content.ignoreEvents = true
	setTabsScroll(true)
# 	consoleLayer.text = "stv: " + event.velocity.x + " " + event.velocity.y + " "

# box.on Events.DragMove, (event, layer) ->
# 	print box.point
# 	consoleLayer.text = "stv: " + event.velocity.x + " " + event.velocity.y

# box.on Events.SwipeLeft, (event, layer) ->
# 	consoleLayer.text = consoleLayer.text + " L "
# 
# box.on Events.SwipeRight, (event, layer) ->
# 	consoleLayer.text = consoleLayer.text + " R "
# 
# box.on Events.SwipeUp, (event, layer) ->
# 	boxTabSwipeDetected = true
# 	consoleLayer.text = consoleLayer.text + " U "
# 
# box.on Events.SwipeDown, (event, layer) ->
# 	consoleLayer.text = consoleLayer.text + " D "









box.on "change:point", ->
# 	print box.x + " " + box.y
	vScale = 1
	
	
	# Prevent Dragging to far away from left and right positions
	if isLefterThan(box, blBot)
		box.draggable.speedX = Utils.modulate(box.midX, [blBot.midX - 20, blBot.midX], [0.2, getBoxDraggableSpeed().x], true)
	else if isRighterThan(box, brBot)
		box.draggable.speedX = Utils.modulate(box.midX, [brBot.midX, brBot.midX + 20], [getBoxDraggableSpeed().x, 0.2], true)
	
	
	
	# Scale and change Y for Tabs
	# (TOP)
	if isHighterThan(box, bMid)
		siteView.scale = Utils.modulate(box.midY, [bMid.midY, bTop.midY], [siteView.states.middle.scale, siteView.states.top.scale], false)
		siteView.y = Utils.modulate(box.midY, [bMid.midY, bTop.midY], [siteView.states.middle.y, siteView.states.top.y], false)
		
		carouselButton.midY = Utils.modulate(box.midY, [originBoxMidY - BS.hg, originBoxMidY - BS.hg * 2], [originCarouselMidY + BS.hg, originCarouselMidY + BS.hg * 2], false)
		
		vScale = Utils.modulate(box.midY, [bMid.midY, bTop.midY], [0.5, 0.1], true)
		
	else
		# (BOTTOM)
		siteView.scale = Utils.modulate(box.midY, [bMid.midY, bBot.midY], [siteView.states.middle.scale, siteView.states.bottom.scale], false)
		siteView.y = Utils.modulate(box.midY, [bMid.midY, bBot.midY], [siteView.states.middle.y, siteView.states.bottom.y], false)
		
		carouselButton.midY = Utils.modulate(box.midY, [originBoxMidY, originBoxMidY - BS.hg], [originCarouselMidY, originCarouselMidY + BS.hg], false)
		
		vScale = Utils.modulate(box.midY, [bMid.midY, bBot.midY], [0.5, 1], true)
	
	
	
	# Change X for Tabs
	if boxTabSwipeDetected
		siteView.midX = Utils.modulate(box.midX, [originBoxMidX - BS.wg, originBoxMidX + BS.wg], [BS.wg - (BS.wg * 2 + siteGap) * vScale, BS.wg + (BS.wg * 2 + siteGap) * vScale], false)
		carouselButton.midX = Utils.modulate(box.midX, [originBoxMidX - BS.wg, originBoxMidX + BS.wg], [originCarouselMidX + BS.wg, originCarouselMidX - BS.wg], true)
	
	# Or for Omnibox (like horizontal swipe)
	else
		# SHOULD REWRITE THIS
# 		omniboxView.scrollX = Utils.modulate(box.midX, [originBoxMidX - 100, originBoxMidX + 100], [720, 0], false)
	
	
	# Change Carousel Button Position
		
	
	
	# Pre Swipe

	






# Site

siteView = new Layer
	parent: screen
	width: screen.width * 3 + siteGap * 2
	x: -(screen.width + siteGap)
	height: screen.height
	backgroundColor: "transparent"
	originY: 0.2
	opacity: 1
	force2d: true
	clip: true

siteView.states =
	"bottom":
		scale: 1
		y: 0
	"middle":
		scale: 0.5
		y: 40
	"top":
		scale: 0.1
		y: -80

siteView.stateSwitch("bottom")

site = new Layer
	parent: siteView
	x: screen.width + siteGap
	width: screen.width
	height: screen.height
	backgroundColor: "white"
	opacity: 1
# 	originY: 0.2




siteLeft = site.copy()
# siteLeft.backgroundColor = "blue"
siteLeft.parent = siteView
siteLeft.x = 0
# siteLeft.originX = 1.5

siteRight = site.copy()
# siteRight.backgroundColor = "green"
siteRight.parent = siteView
siteRight.x = (360 + siteGap) * 2
# siteRight.originX = -0.5




# Site Data

siteContentScroll = new ScrollComponent
	width: site.width
	height: site.height - PS.h
	parent: site
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "transparent"

siteLeftContentScroll = new ScrollComponent
	width: site.width
	height: site.height - PS.h
	parent: siteLeft
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "transparent"



siteRigthContentScroll = new ScrollComponent
	width: site.width
	height: site.height - PS.h
	parent: siteRight
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "transparent"


# for item in [siteContentScroll, siteLeftContentScroll, siteRigthContentScroll]
# 	item.on Events.Tap, (event, layer) ->
# 		animateBox(null, "bot")

originCarouselMidX = carouselButton.midX
originCarouselMidY = carouselButton.midY
originBoxMidX = box.midX
originBoxMidY = box.midY
siteOriginMidX = site.x

# print originCarouselMidY

# Panel

omniboxView = new PageComponent
	parent: screen
	width: screen.width
	height: PS.h
	y: screen.height - PS.h
	scrollVertical: false
	scrollHorizontal: false
	shadowY: -2
	shadowBlur: 4
	shadowColor: "rgba(0,0,0,0.07)"

omniboxView.content.ignoreEvents = true

for item, i in ["alice", "buttons", "sites"]
	
	panelView = new Layer
		size: omniboxView.size
		x: i * omniboxView.width
		parent: omniboxView.content
		backgroundColor: "white"
	
	
	
	if i == 0 then panelView.image ="images/panel left.jpg"
	
	else if i == 1
		for imageURL, i in ["images/bb alice.png", "images/bb chats.png", "images/bb tabs.png", "images/bb menu.png", "images/bb new tab.png"]
			buttonLayer = new Layer
				parent: panelView, size: 64, x: 12 + 64 * i
				image: imageURL
	
	else if i == 2 then panelView.image ="images/panel right.jpg"


omniboxView.snapToPage(omniboxView.content.children[1], false)



# Content

framerwiki.parent = siteLeftContentScroll.content
framerwiki.point = { x: 0, y: 0 }
siteLeftContentScroll.updateContent()

framerdark.parent = siteContentScroll.content
framerdark.point = { x: 0, y: 0 }
siteContentScroll.updateContent()


consoleLayer = new TextLayer
	backgroundColor: "white"
	fontSize: 10
	opacity: 0
	width: 360

# siteView.opacity = 0.2
# box.opacity = 1
# previewView.opacity = 1
# omniboxView.y = omniboxView.y + 100
# consoleLayer.opacity = 1


{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, visible: false }

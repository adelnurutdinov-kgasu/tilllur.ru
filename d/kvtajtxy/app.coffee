
Screen.backgroundColor = "black"
boxSize = 360
siteGap = 24

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "white"
	

# Preview

previewView = new Layer
	parent: screen
	height: boxSize * 3
	width: boxSize
	backgroundColor: "transparent"

bTop = new Layer
	parent: previewView
	size: boxSize
	x: boxSize
	borderColor: "red"
	borderWidth: 2
	borderRadius: 10
	backgroundColor: "transparent"
	opacity: 0.5

bMid = new Layer
	parent: previewView
	size: boxSize
	y: 200
	x: boxSize
	borderColor: "green"
	borderWidth: 2
	borderRadius: 10
	backgroundColor: "transparent"
	opacity: 0.5

bBot = new Layer
	parent: previewView
	size: boxSize
	y: 400
	x: boxSize
	borderColor: "blue"
	borderWidth: 2
	borderRadius: 10
	backgroundColor: "transparent"
	opacity: 0.5

blBot = bBot.copy()
blBot.parent = previewView
blBot.x = bBot.x - 100

brBot = bBot.copy()
brBot.parent = previewView
brBot.x = bBot.x + 100


previewView.height = bBot.y + bBot.height
previewView.width = bBot.width * 3
previewView.opacity = 0.2
previewView.x = Align.center
previewView.y = 50

# Helpers

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


box = new Layer
	parent: previewView
	size: boxSize

box.draggable.enabled = true
box.draggable.speedX = 0.7
box.draggable.speedY = 0.9
box.draggable.constraints =
	x: 0
	y: 0
	height: bBot.y + bBot.height
	width: box.width * 3

box.y = bBot.y
box.x = bBot.x

# Experimental Animations

animateBox = (event, type) ->
	if event != null then localVelocity = Math.abs(event.velocity.y)
	else localVelocity = 0
	
	inputVelocity = Utils.modulate(localVelocity, [0, 5], [0, 7], true)
# 	localFriction = Utils.modulate(input.value, [0, 1], [50, 100], true)
	
	if type == "top" then inputY = bTop.y
	else if type == "mid" then inputY = bMid.y
	else if type == "bot" then inputY = bBot.y
	
# 	box.animateStop()
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
	
# 	box.animateStop()
	inputAnimation = new Animation box,
		x: inputX, options: { curve: Spring(tension: 600, friction: 70, velocity: inputVelocity)}
	inputAnimation.start()



box.on Events.DragEnd, (event, layer) ->
	
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

# Site

siteView = new Layer
	parent: screen
	width: screen.width * 3 + siteGap * 2
	x: -(screen.width + siteGap)
	height: screen.height
	backgroundColor: "transparent"
	originY: 0.2
# 	opacity: 0.5
	force2d: true
	clip: true

siteView.states =
	"bottom":
		scale: 1
		y: 0
	"middle":
		scale: 0.4
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
	backgroundColor: "red"
	opacity: 0.8
# 	originY: 0.2




siteLeft = site.copy()
siteLeft.backgroundColor = "blue"
siteLeft.parent = siteView
siteLeft.x = 0
# siteLeft.originX = 1.5

siteRight = site.copy()
siteRight.backgroundColor = "green"
siteRight.parent = siteView
siteRight.x = (360 + siteGap) * 2
# siteRight.originX = -0.5

site.on "change:scale", ->
# 	if isHighterThan(box, bMid)
# 		siteLeft.originX = Utils.modulate(box.midY, [bMid.midY, bMid.midY - 100], [1.5, 1.4], true)
# 		siteRight.originX = Utils.modulate(box.midY, [bMid.midY, bMid.midY - 100], [-0.5, -0.4], true)
# 		siteLeft.scale = Utils.modulate(box.midY, [bMid.midY, bMid.midY - 150], [site.states.middle.scale, 0], true)
# 		siteRight.scale = Utils.modulate(box.midY, [bMid.midY, bMid.midY - 150], [site.states.middle.scale, 0], true)
# 	else
# 		siteLeft.originX = 1.5
# 		siteLeft.scale = site.scale
# 		siteRight.scale = site.scale

site.on "change:y", ->
# 	siteLeft.y = site.y
# 	siteRight.y = site.y
# 	
# 	if isHighterThan(box, bMid)
# 		siteLeft.opacity = Utils.modulate(box.midY, [bMid.midY-50, bMid.midY - 100], [1, 0], true)
# 		siteRight.opacity = Utils.modulate(box.midY, [bMid.midY-50, bMid.midY - 100], [1, 0], true)
# 
# site.on "change:x", ->
# 	vScale = Utils.modulate(box.midY, [bTop.midY, bBot.midY], [0.1, 1], true)
# 	siteLeft.x = -(360 + 16) + site.x
# 	siteRight.x = site.x + 376



box.on "change:point", ->
	
	if isHighterThan(box, bMid)
		siteView.scale = Utils.modulate(box.midY, [bMid.midY, bTop.midY], [siteView.states.middle.scale, siteView.states.top.scale], true)
		siteView.y = Utils.modulate(box.midY, [bMid.midY, bTop.midY], [siteView.states.middle.y, siteView.states.top.y], true)
	
	else
		siteView.scale = Utils.modulate(box.midY, [bMid.midY, bBot.midY], [siteView.states.middle.scale, siteView.states.bottom.scale], true)
		siteView.y = Utils.modulate(box.midY, [bMid.midY, bBot.midY], [siteView.states.middle.y, siteView.states.bottom.y], true)
	
	if isHighterThan(box, bMid)
		vScale = Utils.modulate(box.midY, [bMid.midY, bTop.midY], [0.4, 0.1], true)
	else
		vScale = Utils.modulate(box.midY, [bMid.midY, bBot.midY], [0.4, 1], true)
	
	siteView.midX = Utils.modulate(box.midX, [originBoxMidX - 100, originBoxMidX + 100], [screen.midX - (screen.width + siteGap) * vScale, screen.midX + (screen.width + siteGap) * vScale], true)
	
# 	if isHighterThan(box, bMid)
# 		pos = Utils.modulate(box.midX, [blBot.midX, brBot.midX], [-1, 1], true)
# 		if pos >= 0
# 			site.opacity = Utils.modulate(pos, [0.5, 1], [1, 0], true)
# 		else
# 			site.opacity = Utils.modulate(pos, [-1, -0.5], [0, 1], true)


originBoxMidX = box.midX
siteOriginMidX = site.x

box.on "change:x", ->
# 	if isLowerThan(box, bMid)
# 		site.midX = Utils.modulate(box.midX, [originBoxMidX - boxSize, originBoxMidX + boxSize], [screen.midX - screen.width, screen.midX + screen.width], false)
# 	else if isHighterThan(box, bMid)
# 		site.midX = Utils.modulate(box.midX, [originBoxMidX - boxSize, originBoxMidX + boxSize], [screen.midX - 100, screen.midX + 100], false)
	
	


{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

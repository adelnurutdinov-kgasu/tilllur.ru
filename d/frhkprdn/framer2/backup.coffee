# This imports all the layers for "fs-ios-promo-pull-to-refresh-2x" into fsIosPromoPullToRefresh2XLayers4

newBg = new Layer
	width: 640, height: 1136-128, y: 128, backgroundColor: "black"
coloredBg = new Layer
	width: 640, height: 1136-128, y: 128, backgroundColor: "#BB133E"

sketch = Framer.Importer.load "imported/fs-ios-promo-pull-to-refresh-2x"
Framer.Shortcuts.initialize(sketch)

content.z = 100

nav_bar.shadowY = 2
nav_bar.shadowBlur = 4
nav_bar.shadowColor = "rgba(0,0,0, 0.3)"

shape.states.add
	"Home":
		x: shape.originalFrame.x + 100
		opacity: 0
	"Refreshed":
		x: shape.originalFrame.x
		opacity: 1
		
round.states.add
	"Home":
		x: round.originalFrame.x - 100
		opacity: 0
	"Refreshed":
		x: round.originalFrame.x
		opacity: 1
		
dragon.states.add
	"Home":
		x: dragon.originalFrame.x - 60
		opacity: 0
	"Refreshed":
		x: dragon.originalFrame.x
		opacity: 1
		
letters.states.add
	"Home":
		x: letters.originalFrame.x + 60
		opacity: 0
	"Refreshed":
		x: letters.originalFrame.x
		opacity: 1
		
content.states.add
	"Home":
		y: 128
	"Refreshed":
		y: content.originalFrame.y

spinround.opacity = 0

spinner = [spinsmall, spinbig]
for item in spinner
	item.states.add
		"Home":
			opacity: 0
			scale: 0.5
		"Refreshed"
			opacity: 1
			scale: 1
		
# Animation Timing
MaterialCurve = "cubic-bezier(0.2, 0.0, 0.2, 1)"
MaterialTime = "0.6"

Framer.Defaults.Animation = 
	curve: MaterialCurve
	time: MaterialTime



movingLayers = [dragon, shape, letters, round]
for item in movingLayers
	item.states.switchInstant("Home")
for item in spinner
	item.states.switchInstant("Home")
content.states.switchInstant("Home")
	
content.draggable.enabled
content.draggable.speedY = 0.8
content.draggable.speedX = 0

dragStartingPoint = 128
dragFinishingPoint = 640

values = [dragStartingPoint, dragFinishingPoint]
valuesMax = [dragStartingPoint, dragFinishingPoint/2]

rotationIsOn = false

content.on Events.DragMove, ->
	if content.y <= dragStartingPoint
		content.y = content.originalFrame.y
		rotationIsOn = false
		for item in movingLayers
			item.scale = 1
			
	else if content.y < 360
		if !rotationIsOn
			content.draggable.speedY = Utils.modulate(content.y, values, [0.8, 0.2], true)
			shape.x = Utils.modulate(content.y, valuesMax, [shape.originalFrame.x + 100, shape.originalFrame.x], true)
			round.x = Utils.modulate(content.y, valuesMax, [round.originalFrame.x - 100, round.originalFrame.x], true)
			dragon.x = Utils.modulate(content.y, valuesMax, [dragon.originalFrame.x + 60, dragon.originalFrame.x], true)
			letters.x = Utils.modulate(content.y, valuesMax, [letters.originalFrame.x - 60, letters.originalFrame.x], true)
			coloredBg.opacity = Utils.modulate(content.y, valuesMax, [1, 0.6], true)
	
	
			for item in movingLayers
				item.opacity = Utils.modulate(content.y, valuesMax, [0, 0.8], true)
				item.scale = Utils.modulate(content.y, valuesMax, [0.5, 1], true)
		
	else
		for item in movingLayers
			item.scale = 0.5
			item.animate {
				properties: {opacity: 0}
				time: 0
			}
			
		if !rotationIsOn
			rotationIsOn = true
			for item in spinner
				item.opacity = 1
				item.animate
					properties: {scale: 1}
					time: 0.4
		
		
	
	
content.on Events.DragEnd, ->
	if content.y < 360
		content.animate {
			properties: {y: 128}
		}
	else 
		refreshingAnimation = content.animate {
			properties: {y: 360}
		}
		refreshingAnimation.on 'end', ->
			content.animate {
				properties: {y: 128}
				delay: 1
			}
			for item in spinner
				item.animate
					properties: {opacity: 0, scale: 0.5}
					delay: 1
	for item in movingLayers
		item.states.switch("Home")
# 	for item in spinner
# 		print "animationOptions is (" + item.animationOptions
		

spin = (item) ->
	item.animate
		properties:
			rotation: 360
		time: 1
		curve: "linear"
	Utils.delay 1, ->
		item.rotation = 0
		spin(item)

spinFaster = (item) ->
	item.animate
		properties:
			rotation: 720
		time: 1.2
		curve: "linear"
	Utils.delay 1.2, ->
		item.rotation = 0
		spinFaster(item)
		
spin(spinbig)
spinFaster(spinsmall)
		
# spin = (item) ->
# 	item.animate
# 		properties:
# 			rotation: 720
# 		time: 1.5
# 		curve: "linear"
# 	Utils.delay 1.5, ->
# 		item.rotation = 0
# 		spin(item)
# 		
# spinFaster = (item) ->
# 	item.animate
# 		properties:
# 			rotation: 1800
# 		time: 1.5
# 		curve: "linear"
# 	Utils.delay 1.5, ->
# 		item.rotation = 0
# 		spinFaster(item)

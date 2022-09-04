# This imports all the layers for "fs-ios-promo-pull-to-refresh-2x" into fsIosPromoPullToRefresh2XLayers4

newBg = new Layer
	width: 320, height: 568, backgroundColor: "black"
coloredBg = new Layer
	parent: newBg
	width: 320, height: 568, backgroundColor: "#BB133E"

sketch = Framer.Importer.load "imported/fs-ios-promo-pull-to-refresh-2x"


{ Preview } = require "PreviewComponent"
new Preview { view: newBg, borderRadius: 16, topTheme: "light" }

sketch["status_bar"].image = null
sketch["status_bar"].backgroundColor = null

sketch.content.bringToFront()

sketch["main_pulled"].parent = newBg
sketch["main_pulled"].scale = 0.5
sketch["main_pulled"].originX = 0
sketch["main_pulled"].originY = 0

sketch.nav_bar.shadowY = 2
sketch.nav_bar.shadowBlur = 4
sketch.nav_bar.shadowColor = "rgba(0,0,0, 0.3)"

sketch.shape.states.add
	"Home":
		x: sketch.shape.x + 100
		opacity: 0
	"Refreshed":
		x: sketch.shape.x
		opacity: 1
		
sketch.round.states.add
	"Home":
		x: sketch.round.x - 100
		opacity: 0
	"Refreshed":
		x: sketch.round.x
		opacity: 1
		
sketch.dragon.states.add
	"Home":
		x: sketch.dragon.x - 60
		opacity: 0
	"Refreshed":
		x: sketch.dragon.x
		opacity: 1
		
sketch.letters.states.add
	"Home":
		x: sketch.letters.x + 60
		opacity: 0
	"Refreshed":
		x: sketch.letters.x
		opacity: 1

sketch.content.states.add
	"Home":
		y: 128
	"Refreshed":
		y: sketch.content.y

sketch.spinround.opacity = 0

spinner = [sketch.spinsmall, sketch.spinbig]
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



movingLayers = [sketch.dragon, sketch.shape, sketch.letters, sketch.round]
item.stateSwitch("Home") for item in movingLayers
item.stateSwitch("Home") for item in spinner	
sketch.content.stateSwitch("Home")
	
sketch.content.draggable.enabled
sketch.content.draggable.speedY = 0.8
sketch.content.draggable.speedX = 0

dragStartingPoint = 128
dragFinishingPoint = 640

values = [dragStartingPoint, dragFinishingPoint]
valuesMax = [dragStartingPoint, dragFinishingPoint/2]

rotationIsOn = false


stateNames = ["Home", "Refreshed"]
sketch.content.on Events.DragMove, ->
	if sketch.content.y <= dragStartingPoint
		rotationIsOn = false
		
		sketch.content.stateSwitch("Home")		
		item.scale = 1 for item in movingLayers
			
	else if sketch.content.y < 360
		if !rotationIsOn
			
			coloredBg.opacity = Utils.modulate(sketch.content.y, valuesMax, [1, 0.6], true)
			sketch.content.draggable.speedY =
				Utils.modulate(sketch.content.y, values, [0.8, 0.2], true)
				
			
			sketch.shape.x = Utils.modulate(sketch.content.y, valuesMax, [sketch.shape.states["Home"].x, sketch.shape.states["Refreshed"].x], true)
			sketch.round.x = Utils.modulate(sketch.content.y, valuesMax, [sketch.round.states["Home"].x, sketch.round.states["Refreshed"].x], true)
			sketch.dragon.x = Utils.modulate(sketch.content.y, valuesMax, [sketch.dragon.states["Home"].x, sketch.dragon.states["Refreshed"].x], true)
			sketch.letters.x = Utils.modulate(sketch.content.y, valuesMax, [sketch.letters.states["Home"].x, sketch.letters.states["Refreshed"].x], true)
			
			
	
	
			for item in movingLayers
				item.opacity = Utils.modulate(sketch.content.y, valuesMax, [0, 0.8], true)
				item.scale = Utils.modulate(sketch.content.y, valuesMax, [0.5, 1], true)
		
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
		
		
	
	
sketch.content.on Events.DragEnd, ->
	if sketch.content.y < 360
		sketch.content.animate {
			properties: {y: 128}
		}
	else 
		refreshingAnimation = sketch.content.animate {
			properties: {y: 360}
		}
		refreshingAnimation.on 'end', ->
			sketch.content.animate {
				properties: { y: 128 }
				delay: 1
			}
			
			for item in spinner
				item.animate
					properties: {opacity: 0, scale: 0.5}
					delay: 1
	
	for item in movingLayers
		item.stateSwitch("Home")

# sketch.content.on Events.AnimationEnd, ->
# 	if @y == 128 then item.opacity = 1 for item in movingLayers

# Spenners

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
		
spin(sketch.spinbig)
spinFaster(sketch.spinsmall)
		

statusBar = new Layer
	width: newBg.width, height: 20, parent: newBg, backgroundColor: "AA2941"
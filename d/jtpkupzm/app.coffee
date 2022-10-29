Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"

screen = new Layer
	width: 375
	height: 812
	image: "images/screen.png"

new Preview { view: screen }


frameImages = ["images/frame0.png", "images/frame1.png", "images/frame2.png", "images/frame3.png", "images/frame4.png"]

Framer.Extras.Preloader.enable()
Framer.Extras.Preloader.addImage(item) for item in frameImages



frame = new Layer
	parent: screen
	width: 375
	height: 80
	y: 44
	backgroundColor: "null"


gradient = new Layer
	parent: frame
	width: 375
	height: 80
	image: "images/gradient.png"

logo = new Layer
	parent: frame
	width: 375
	height: 80
	image: "images/logo.png"

freeze = new Layer
	parent: frame
	width: 375
	height: 80
	image: "images/freeze.png"

for item in [gradient, freeze]
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	item.stateSwitch("shown")








sideButtons = new Layer
	parent: screen
	y: 44
	width: 375
	height: 80
	image: "images/sideButtons.png"

frameLayers = []
for item in frameImages
	overrideImage = new Layer
		parent: frame
		width: 375
		height: 80
		image: item
	
	overrideImage.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	overrideImage.stateSwitch("hidden")
	
	frameLayers.push(overrideImage)


# for i in [0...5]
# 	buttonSmall = new Layer
# 		parent: buttonView
# 		width: 40
# 		height: 80
# 		x: i * 40
# 		backgroundColor: "null"
# 		custom:
# 			imageIndex: i
# 	
# 	buttonSmall.on Events.TouchMove, (event, layer) ->
# 		event.stopPropagation()
# 		frame.image = frameImages[@custom.imageIndex]
# 
# screen.onTouchMove ->
# 	frame.image = null


screen.on Events.Tap, (event, layer) ->
# 	print "ok"
	if Utils.isMobile() then point = event.start
	else point = event.point
	
	calculatePoint(point)


screen.on Events.TouchMove, (event, layer) ->
# 	if Utils.isMobile() then point = event.start
# 	else point = event.point

	calculatePoint(event.point)


makeWarm = () ->
	sum = 0
	for item in frameLayers
		if item.states.current.name == "shown" then sum++
	
	if sum == frameLayers.length
		freeze.animate("hidden")
		gradient.animate("hidden")

showFrame = (index) ->
	frameLayers[index].animate("shown")
	makeWarm()


calculatePoint = (point) ->
	if point.y >= 40 and point.y <= 120
		
		if point.x >= 88 + 40*0 and point.x <= 88 + 40*1
			showFrame(0)
		else if point.x >= 88 + 40*1 and point.x <= 88 + 40*2
			showFrame(1)
		else if point.x >= 88 + 40*2 and point.x <= 88 + 40*3
			showFrame(2)
		else if point.x >= 88 + 40*3 and point.x <= 88 + 40*4
			showFrame(3)
		else if point.x >= 88 + 40*4 and point.x <= 88 + 40*5
			showFrame(4)
		else frame.image = null
		
	else frame.image = null


box = new Layer
	parent: screen
	y: 187
	width: 375
	height: 625
	backgroundColor: "null"

box.onTap ->
	for item in frameLayers
		item.stateSwitch("hidden")
	
	freeze.stateSwitch("shown")
	gradient.stateSwitch("shown")

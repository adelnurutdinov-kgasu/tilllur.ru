# Screen
screen = new Layer
	width: 360
	height: 640
	image: "images/screen.png"

# screen.center()

# fix = new Layer
# 	y: 594
# 	width: 85
# 	height: 46
# 	backgroundColor: "white"
# 	opacity: 0.8
# 
# 
# fix2 = new Layer
# 	y: 594
# 	width: 248
# 	height: 46
# 	backgroundColor: "white"
# 	opacity: 0.8
# 	x: 140

fix = new Layer
	parent: screen
	y: 594
	x: 88
	width: 51
	height: 46
	backgroundColor: "white"
	opacity: 1

chat = new Layer
	parent: screen
	width: 28
	height: 28
	image: "images/chat.png"
	y: 602
	x: 95

chat.states =
	"prepare":
		scale: 0.9
	"normal":
		scale: 1

chat.on Events.StateSwitchEnd, (from, to) ->
	if to is "prepare"
		@animate("normal", time: 0.12, curve: Bezier.easeInOut)



bornView = new Layer
	parent: screen
	size: 48
	x: 85
	y: 592
	backgroundColor: "null"

createIcon = () ->
	
	currentChoice = Utils.randomChoice([0, 1, 2, 3])
	arrayY = [-200, -140, -100, -60]
	arrayTime = [1.2, 1, 0.8, 0.6]
	
	iconView = new Layer
		backgroundColor: "null"
# 		backgroundColor: Utils.randomColor()
		size: 32
		parent: bornView
		x: Align.center
		y: Align.center
	
	iconView.states =
		"top":
			y: arrayY[currentChoice]
		"bottom":
			y: 100
	
	iconView.animate("top", time: arrayTime[currentChoice], curve: Bezier.easeOut)
	
	iconView.on Events.StateSwitchEnd, (from, to) ->
		if to is "top"
			@animate("bottom", time: arrayTime[currentChoice], curve: Bezier.easeIn)
		else if to is "bottom"
			@destroy()
	
	
	
	iconLayer = new Layer
		borderRadius: "100%"
# 		backgroundColor: Utils.randomColor()
		image: "images/avatars/avatar" + Utils.randomChoice([0..31]) + ".jpg"
		size: iconView.size
		parent: iconView
		scale: 0.5
	
	iconLayer.states =
		"hidden":
			x: Utils.randomChoice([-200, -140, -70, 70, 140, 200]) + Utils.randomChoice([0, 2, 4, 6, 8, 14, 20])
	
	iconLayer.animate(scale: 1, time: 2)
	iconLayer.animate("hidden", time: Utils.randomChoice([5,6]))




button = new Layer
	backgroundColor: "null"

button.onTap ->
	createIcon()


startIcon = () ->
	chat.animate("prepare", time: 0.2, curve: Bezier.easeInOut)
	Utils.delay 0.2, ->
		createIcon()

startSimulation = () ->
	startIcon()
	nextDelay = Utils.randomChoice([0.4, 0.6, 0.8, 1, 2])
	Utils.delay nextDelay, ->
		startSimulation()

startSimulation()


statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 8, topTheme: "light", forceAndroidBar: true }

{ Preview } = require "PreviewComponent"

# Screen
screen = new Layer
	width: 375
	height: 812
	image: "images/re.png"

fix = new Layer
	parent: screen
	y: 594
	x: 88
	width: 51
	height: 46
	backgroundColor: "white"
	opacity: 0

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
		opacity: 0
	"normal":
		scale: 1
		opacity: 0

chat.on Events.StateSwitchEnd, (from, to) ->
	if to is "prepare"
		@animate("normal", time: 0.12, curve: Bezier.easeInOut)


new Preview { view: screen }




bornView = new Layer
	parent: screen
	size: 48
	x: 178
	y: 557
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
# 		rotation: -90
	
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
		rotation: -90
	
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
	nextDelay = Utils.randomChoice([0.2, 0.3, 0.1, 0.6, 0.5])
	Utils.delay nextDelay, ->
		startSimulation()

startSimulation()



topBarFix = new Layer
	parent: screen, width: screen.width, height: 44
	backgroundColor: "F3F3F2"

bottomBarFix = new Layer
	parent: screen, width: screen.width, height: 34, y: Align.bottom
	backgroundColor: "F3F3F2"



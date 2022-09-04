# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Nurutdinov Timur"
	twitter: ""
	description: ""


retina = 1

screen = new Layer
	width: 375, height: 667

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


bg = new Layer
	width: 375*retina
	height: 667*retina
	image: "images/bg_@3x.png"

widget = new Layer width: 359*retina, height: 200*retina, x: 8*retina, y: 386*retina, backgroundColor: "rgba(255,255,255,1)", parent: bg, clip: true

horizon = new Layer width: 359*retina, height: 2*retina, y: 157*retina, backgroundColor: "rgba(0,0,0,1)", opacity: 0.2, parent: widget

character = new Layer
	width: 59*retina
	height: 70*retina
	image: "images/run@3x.gif"
	parent: widget
	x: 16*retina
	y: 110*retina

jumpTime = 0.4
widget.on Events.TapStart, ->
	bg.center()
	jumpHandler()
	

jumpHandler = Utils.throttle jumpTime*2.5, ->
	character.image = "images/jumping@3x.png"
	
	character.animate
		properties: { y: 20*retina }
		time: jumpTime
	
	Utils.delay jumpTime+0.2, ->
		character.animate
			properties: { y: 110*retina }
			time: jumpTime+0.2
	
	Utils.delay jumpTime*2+0.2, ->
		character.image = "images/run@3x.gif"

# obstacle

# obstacle = new Layer
# 	width: 141
# 	image: "images/Obstacle2@3x.png"
# 	parent: widget
# 	x: 400*retina
# 	y: 234
# 	height: 126

obstacle = new Layer
	width: 57*retina
	height: 57*retina
	image: "images/obstacle_@3x.png"
	parent: widget
	y: 126*retina
	x: 400*retina


runObstacle = () ->
	obstacle.animate
		properties: { x: -100*retina, rotation: -360 }
		time: 2
		curve: "linear"
	
	Utils.delay 3, ->
		obstacle.x = 400*retina
		obstacle.rotation = 0
		runObstacle()




# floor
floorView1 = new Layer
	width: 670*retina
	height: 34*retina
	y: 166*retina
	image: "images/floorView_@3x.png"
	parent: widget

floorView2 = new Layer
	width: 670*retina
	height: 34*retina
	x: 670*retina
	y: 166*retina
	image: "images/floorView_@3x.png"
	parent: widget
	
# bgViews = [bgView1, bgView2]

runFloorTime = 10
runFloor = () ->
	floorView1.animate
		properties: { x: -670*retina }
		time: runFloorTime
		curve: "linear"
	
	floorView2.animate
		properties: { x: 0*retina }
		time: runFloorTime
		curve: "linear"
		
	Utils.delay runFloorTime, ->
		floorView1.x = 0
		floorView2.x = 670*retina
		runFloor()


# bgViews
bgView1 = new Layer
	width: 670*retina
	height: 166*retina
	image: "images/bgView_@3x.png"
	parent: widget

bgView2 = new Layer
	width: 670*retina
	height: 166*retina
	x: 670*retina
	image: "images/bgView_@3x.png"
	parent: widget
	
bgViews = [bgView1, bgView2]

runBgTime = 30
runBg = () ->
	bgView1.animate
		properties: { x: -670*retina }
		time: runBgTime
		curve: "linear"
	
	bgView2.animate
		properties: { x: 0*retina }
		time: runBgTime
		curve: "linear"
		
	Utils.delay runBgTime, ->
		bgView1.x = 0
		bgView2.x = 670*retina
		runBg()



character.placeBefore(bgView2)
obstacle.placeBefore(character)

runObstacle()
runFloor()
runBg()

bg.parent = screen
statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "38726B"
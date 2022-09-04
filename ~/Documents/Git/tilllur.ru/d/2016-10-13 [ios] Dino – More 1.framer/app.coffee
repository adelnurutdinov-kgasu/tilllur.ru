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

smallTime = 0.2
jumpTime = smallTime * 2
delayTime = 2

canJump = false

# Base Init
bg = new Layer
	width: 375*retina
	height: 667*retina
	image: "images/bg_@3x.png"

topline = new Layer width: 359*retina, height: 32*retina, x: 8*retina, y: 354*retina, image: "images/topline.png", parent: bg

next_app = new Layer width: 359*retina, height: 141*retina, x: 8*retina, y: 502*retina, image: "images/next app.png", parent: bg

widget = new Layer width: 359*retina, height: 108*retina, x: 8*retina, y: 386*retina, backgroundColor: "rgba(255,255,255,1)", parent: bg, clip: true

scene = new Layer width: 454*retina, height: 200*retina, x: 0*retina, y: 0*retina, image: "images/scene.png", parent: widget, y: -46*retina

# Character
character = new Layer
	width: 59*retina
	height: 70*retina
	image: "images/run@3x.gif"
	parent: widget
	x: 16*retina
	y: 110*retina

bad_1 = new Layer width: 52*retina, height: 51*retina, x: 400*retina, y: 139*retina, image: "images/bad 1.png", parent: widget

widget.on Events.TapStart, ->
	bg.center()
	jumpHandler()
	

jumpHandler = Utils.throttle jumpTime*2.5, ->
	if canJump
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

# Init View

darker = new Layer width: 359*retina, height: 500*retina, x: 0*retina, y: 0*retina, parent: widget

darker.states.add {
	start: { backgroundColor: "rgba(0,0,0,0.5)"}
	failed: { backgroundColor: "rgba(0,0,0,0.8)"}
	end: { backgroundColor: "rgba(0,0,0,0)"}
}
darker.states.switchInstant "start"

game_over = new Layer width: 100*retina, height: 15*retina, x: 209*retina, y: 76*retina, image: "images/game over.png", parent: widget

game_over.states.add {
	start: { opacity: 0}
	end: { opacity: 1}
}
game_over.states.switchInstant "start"

start_tip = new Layer width: 177*retina, height: 18*retina, x: 168*retina, y: 76*retina, image: "images/start tip.png", parent: widget

start_tip.states.add {
	start: { opacity: 0.6 }
	failed: { opacity: 0.2 }
	end: { opacity: 0}
}
start_tip.states.switchInstant "start"





restart_button = new Layer width: 140*retina, height: 44*retina, x: 189*retina, y: 106*retina, image: "images/restart button.png", parent: widget

restart_button.states.add {
	start: { opacity: 0}
	end: { opacity: 1}
}
restart_button.states.switchInstant "start"

char_end = new Layer image: "images/char_end.png", parent: widget

char_end.states.add {
	start: { width: 85*retina, height: 101*retina, x: -9*retina, y: 101*retina, opacity: 0}
	end: { width: 254*retina, height: 302*retina, x: -95*retina, y: 40*retina, opacity: 1}
}
char_end.states.switchInstant "start"



char_start = new Layer width: 130*retina, height: 144*retina, x: 18*retina, image: "images/char start.png", parent: widget

char_start.states.add {
	start: { y: 4*retina, rotation: 0, scale: 1}
	failed: { y: 20*retina, rotation: -11, scale: 1.4}
	end: { y: 240*retina, rotation: 0, scale: 1}
}
char_start.states.switchInstant "start"





# Start and End scene
endTips = [game_over, restart_button]

initScene = Utils.throttle delayTime, ->
	Utils.delay 0.1, ->
		canJump = true
	
	arrowWrapper.animate
		properties: { opacity: 0 }
		time: smallTime
	
	bad_1.x = 400*retina
	bad_1.opacity = 1
	bad_1.animate
		properties: { x: 60*retina }
		time: delayTime
		curve: "linear"
	
	character.animate
		properties: { opacity: 1}
		time: smallTime
	
	widget.animate
		properties: { height: 200*retina }
		time: smallTime
	
	scene.animate
		properties: { y: 0 }
		time: smallTime
	
	next_app.animate
		properties: { y: 594*retina }
		time: smallTime
		
	darker.states.switch("end", time: smallTime)
	char_start.states.switch("end", time: smallTime)
	char_end.states.switch("start", time: smallTime)
	start_tip.states.switch("end", time: smallTime)
	restart_button.states.switch("start", time: smallTime)
	game_over.states.switch("start", time: smallTime)
	
	Utils.delay delayTime, ->
		endScene()


endScene = () ->
	canJump = false
	darker.states.switch("start", time: smallTime)
# 	char_start.states.switch("end", time: smallTime)
	char_end.states.switch("end", time: smallTime / 2)
	start_tip.states.switch("end", time: smallTime)
	restart_button.states.switch("end", time: smallTime)
	game_over.states.switch("end", time: smallTime)
	
	character.animate
		properties: { opacity: 0}
		time: smallTime / 2 
	
	bad_1.animate
		properties: { opacity: 0 }
		time: smallTime

restart_button.propagateEvents = false


topline.on Events.Click, ->
	initScene()

restart_button.on Events.Click, ->
	initScene()

arrowWrapper = new Layer width: 26*retina, height: 14*3*retina, backgroundColor: "transparent", x: 654 / 2 - 10, y: 791 / 2

arrowWrapper2 = new Layer width: 26*retina, height: 14*3*retina, backgroundColor: "transparent", x: 560 / 2 - 10, y: 786 / 2, rotation: 45, opacity: 0

# Create arrows
arrowID = 0
localArrows = []

initArrowsWrapper = (localArrowWrapper) ->
# 	print "start init " + arrowID
	
	arrow_1 = new Layer
		width: 26*retina, height: 14*retina, image: "images/arrow 1.png", parent: localArrowWrapper, name: arrowID++ + ""
	
	arrow_2 = new Layer
		width: 26*retina, height: 14*retina, y: 14*retina, image: "images/arrow 2.png", parent: localArrowWrapper, name: arrowID++ + ""

	arrow_3 = new Layer
		width: 26*retina, height: 14*retina, y: 28*retina, image: "images/arrow 3.png", parent: localArrowWrapper, name: arrowID++ + ""

	localArrows = [arrow_1, arrow_2, arrow_3]
	
	animateArrow(localArrows[2])
	Utils.delay smallTime/3, =>
# 		print localArrows[1].name
		animateArrow(localArrows[1])
	Utils.delay smallTime/3*2, =>
		animateArrow(localArrows[0])
# 		print "finish init " + arrowID


animateArrow = (localArrow) ->
		animationA = new Animation
			layer: localArrow
			properties:
				opacity: 0
			time: smallTime*2+0.1
	 
		animationB = animationA.reverse()
		animationA.on(Events.AnimationEnd, animationB.start)
		animationB.on(Events.AnimationEnd, animationA.start)
	 
		animationA.start()

Utils.delay 1, ->
	initArrowsWrapper(arrowWrapper)
Utils.delay 2, ->
	initArrowsWrapper(arrowWrapper2)

start_tip.on Events.TapStart, ->
	arrowWrapper2.animate
		properties: { opacity: 1 }
		time: smallTime/2
	
	char_start.states.switch("failed", time: smallTime)
	darker.states.switch("failed", time: smallTime)
	start_tip.states.switch("failed", time: smallTime)
	

start_tip.on Events.TapEnd, ->
	arrowWrapper2.animate
		properties: { opacity: 0 }
		time: smallTime/2
	
	char_start.states.switch("start", time: smallTime)
	darker.states.switch("start", time: smallTime)
	start_tip.states.switch("start", time: smallTime)


for item in [bg, arrowWrapper, arrowWrapper2]
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "38726B"

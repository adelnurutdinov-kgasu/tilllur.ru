# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Nurutdinov Timur"
	twitter: ""
	description: ""



{TextLayer} = require 'text'
{AudioPlayer} = require 'audio'

# Setup Sounds

soundJump = new AudioPlayer audio: "images/jump.wav"
soundJump.player.volume = 1

soundGameOver = new AudioPlayer audio: "images/game over.wav"
soundGameOver.player.volume = 1

soundStartGame = new AudioPlayer audio: "images/start game.aiff"
soundStartGame.player.volume = 1

retina = 1

screen = new Layer
	width: 375, height: 667

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

smallTime = 0.2
jumpTime = smallTime * 2
delayTime = 2

canJump = false
maxValue = -1
value = 0

# Base Init
bg = new Layer
	width: 375*retina
	height: 667*retina
	image: "images/bg_@3x.png"

container = new Layer width: 359*retina, height: 108*retina, parent: bg, x: 8*retina, y: 386*retina, clip: true



topline = new Layer width: 359*retina, height: 32*retina, x: 8*retina, y: 354*retina, image: "images/topline.png", parent: bg

next_app = new Layer width: 359*retina, height: 141*retina, x: 8*retina, y: 502*retina, image: "images/next app.png", parent: bg

widget = new Layer width: 359*retina, height: 200*retina, y: -80*retina, backgroundColor: "rgba(255,255,255,1)", parent: container, clip: true


# Character
character = new Layer
	width: 59*retina
	height: 70*retina
	image: "images/dino.png"
	parent: widget
	x: 16*retina
	y: 110*retina

bad_1 = new Layer width: 52*retina, height: 51*retina, x: 400*retina, y: 139*retina, image: "images/bad 1.png", parent: widget

widget.on Events.TapStart, ->
	bg.center()
	jumpHandler()
	

jumpHandler = Utils.throttle jumpTime*2.5, ->
	if canJump
		soundJump.player.currentTime = 0
		soundJump.player.play()
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

# Obstacle
obstacle = new Layer
	width: 57*retina
	height: 57*retina
	image: "images/bad 1.png"
	parent: widget
	y: 126*retina
	x: 400*retina


runObstacle = () ->
	if canJump
		obstacle.animate
			properties: { x: -100*retina }
			time: 2
			curve: "linear"
	
		Utils.delay 3, ->
			if canJump
				obstacle.x = 400*retina
				runObstacle()
			else
				Utils.delay jumpTime/2, ->
					runObstacle()
	else
		Utils.delay jumpTime/2, ->
			runObstacle()

darkerHeader = new Layer width: 359*retina, height: 30*retina, x: 8*retina, y: 386*retina, image: "images/darker.png"

# Start Button
start_button = new Layer width: 100*retina, height: 44*retina, x: 138*retina, y: 418*retina, image: "images/start button.png"

focusStart = () ->
	start_button.animate
		properties: { scale: 0.9 }
		time: jumpTime
	
	Utils.delay jumpTime, ->
		start_button.animate
			properties: { scale: 1 }
			time: jumpTime
	
	Utils.delay jumpTime*2, ->
		focusStart()

# Arrow
arrow = new Layer width: 47*retina, height: 24*retina, x: (335-10)*retina, y: (394+10)*retina, image: "images/arrow.png", rotation: -90, opacity: 0

moveArrow = Utils.throttle jumpTime*2, ->
	arrow.animate
		properties: { y: (394+20)*retina }
		time: jumpTime
	
	Utils.delay jumpTime, ->
		arrow.animate
			properties: { y: (394+10)*retina }
			time: jumpTime
		
	Utils.delay jumpTime*2, ->
		moveArrow()

# Background
bgView1 = new Layer
	width: 454*retina
	height: 200*retina
	image: "images/bgView.png"
	parent: widget

bgView2 = new Layer
	width: 454*retina
	height: 200*retina
	x: bgView1.width
	image: "images/bgView.png"
	parent: widget
	
bgViews = [bgView1, bgView2]

runBgTime = 10
runBg = () ->
# 	print "here " + canJump
	if canJump
		bgView1.animate
			properties: { x: -454*retina }
			time: runBgTime
			curve: "linear"
		
		bgView2.animate
			properties: { x: 0*retina }
			time: runBgTime
			curve: "linear"
			
		Utils.delay runBgTime, ->
			if canJump
				bgView1.x = 0
				bgView2.x = 454*retina
				runBg()
			else
				Utils.delay jumpTime/2, ->
					runBg()
			
	else
		Utils.delay jumpTime/2, ->
			runBg()

# Stats
ops = new Layer width: 33*retina, height: 15*retina, x: (179-8)*retina, y: 8*retina, image: "images/ops.png", parent: widget

score = new TextLayer width: 30*retina, height: 11*retina, x: (330-12)*retina, y: 8*retina, text: "0000", textAlign: "right", fontSize: "12", color: "white", letterSpacing: "1", fontWeight: "500", parent: widget

highscore = new Layer width: 92*retina, height: 9*retina, x: (260-4)*retina, y: (22+4)*retina, image: "images/highscore.png", opacity: 0.6, parent: widget

incScore = () ->
	if canJump
		++value

updateScore = () ->
	incScore()
	
	if value > 9
		localValue = "00" + value
	else if value > 99
		localValue = "0" + value
	else if value > 999
		localValue = "" + value
	else
		localValue = "000" + value

	score.text = localValue
	Utils.delay jumpTime, ->
		updateScore()

# Collision
checkCollision = () ->
	if canJump
		if character.x + character.width < obstacle.x or character.x > obstacle.x + obstacle.width
	# 		print "ok"
		else if character.y < 100
	# 		print "ok"
		else
			endGame()
	
	Utils.delay 0.2, ->
		checkCollision()

# Game Over

darker = new Layer width: 359*retina, height: 200*retina, x: 0*retina, y: 0*retina, parent: widget

darker.states.add {
	start: { backgroundColor: "rgba(0,0,0,0)", opacity: 1}
	end: { backgroundColor: "rgba(0,0,0,1)", opacity: 0.5}
}
darker.states.switchInstant "start"



game_over = new Layer width: 100*retina, height: 15*retina, x: 209*retina, y: (76+20)*retina, image: "images/game over.png", parent: widget

game_over.states.add {
	start: { opacity: 0}
	end: { opacity: 1}
}
game_over.states.switchInstant "start"

restart_button = new Layer image: "images/restart button.png", parent: widget, width: 224*retina, height: 132*retina, x: 147*retina, y: (96+20)*retina

restart_button.states.add {
	start: { opacity: 0 }
	end: { opacity: 1}
}
restart_button.states.switchInstant "start"

char_end = new Layer image: "images/char_end.png", parent: widget

char_end.states.add {
	start: { width: 85*retina, height: 101*retina, x: -9*retina, y: 101*retina, opacity: 0 }
	end: { width: 254*retina, height: 302*retina, x: -95*retina, y: 40*retina, opacity: 1}
}
char_end.states.switchInstant "start"

gameOverArray = [darker, game_over, restart_button]

character.placeBefore(bgView2)
obstacle.placeBefore(bgView2)
highscore.placeBefore(darker)
score.placeBefore(darker)


topline.on Events.Click, ->
	topline.ignoreEvents = true
	arrow.opacity = 0
	
	if !canJump
		startGame()

	darkerHeader.opacity = 0
	
	container.animate
		properties: { height: 200*retina }
		time: jumpTime / 2
	
	widget.animate
		properties: { y: 0 }
		time: jumpTime / 2
	
	next_app.animate
		properties: { y: 594*retina }
		time: jumpTime / 2

# Start & End
startGame = () ->
	checkCollision()
	restart_button.off(Events.Click, restartHandler)
	
	soundStartGame.player.currentTime = 0
	soundStartGame.player.play()
	
	character.image = "images/run@3x.gif"
	character.y = 110*retina
	character.opacity = 1
	obstacle.x = 400*retina
	bgView1.x = 0
	bgView2.x = 454*retina
	
	canJump = true
	value = 0
	
	highscore.opacity = 0
	
	start_button.ignoreEvents = true
	start_button.opacity = 0
	
	char_end.states.switch("start", curve: "spring(200, 20, 0)", time: jumpTime/2)
	for item in gameOverArray
		item.states.switch("start", time: 0)
	
	if topline.ignoreEvents
		arrow.opacity = 0
	else
		arrow.opacity = 1
	
	moveArrow()


endGame = () ->
	canJump = false
	arrow.opacity = 0
	soundGameOver.player.play()
	soundJump.player.pause()
	
	if maxValue < value
		maxValue = value
		highscore.opacity = 1
	
	character.image = "images/dino.png"
	bgView1.animateStop()
	bgView2.animateStop()
	character.animateStop()
	character.opacity = 0
	obstacle.animateStop()
	score.animateStop()
	
	char_end.states.switch("end", curve: "spring(200, 20, 0)", time: jumpTime/2)
	for item in gameOverArray
		item.states.switch("end", time: 0)
	
	restart_button.on(Events.Click, restartHandler)

restartHandler = () ->
	startGame()

start_button.on Events.Click, ->
	startGame()

focusStart()
runObstacle()
runBg()
updateScore()
moveArrow()


for item in [soundJump, soundGameOver, soundStartGame, bg, darkerHeader, start_button, arrow]
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "38726B"
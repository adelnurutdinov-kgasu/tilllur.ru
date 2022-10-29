document.body.style.cursor = "auto"

{ Preview } = require "PreviewComponent"

Framer.Defaults.Animation =
	# curve: Spring(damping: 0.8, mass: 10, velocity: 1)
	# time: 2
	curve: Spring(damping: 0.8)
	time: 1

screen = new Layer
	width: 1080, height: 1920
	backgroundColor: "white"
	# scale: 720/1080


new Preview { view: screen, visible: false, borderRadius: 0 }


# video = new VideoLayer
# 	parent: screen
# 	width: 1080
# 	height: 1920
# 	video: "images/test.mp4"

# video.player.play()

arrow = new Layer
	parent: screen
	width: 1920
	height: 1920
	image: "images/arrow.png"
	# originX: 0.5
	# originY: 0.3

arrow.states =
	"init":
		x: 100
		y: -200
		opacity: 0
	"start":
		x: 0
		y: -100
		opacity: 1
	"shown":
		x: -180 * 3
		y: 70 * 3
	"third":
		x: -90 * 3
		y: 120 * 3


camera = new Layer
	parent: screen
	width: 1080
	height: 1920
	image: "images/camera.png"
	# originX: 0
	# originY: 1.0

camera.states =
	"init":
		x: -100
		y: 200
		opacity: 0
	"start":
		x: 0
		y: 100
		opacity: 1
	"shown":
		x: 80 * 3
		y: -130 * 3
	"third":
		x: -100 * 3
		y: -80 * 3

alice = new Layer
	parent: screen
	width: 1080
	height: 1920
	image: "images/alice.png"
	# originX: 0.5
	# originY: 0.8

alice.states =
	"init":
		x: -100
		y: -100
		opacity: 0
	"start":
		x: 0
		y: 0
		opacity: 1
	"shown":
		x: 110 * 3
		y: 80 * 3
	"third":
		x: 160 * 3
		y: -80 * 3

item.stateSwitch("init") for item in [arrow, camera, alice]


isCenter = false
cycler = Utils.cycle(["init", "start", "init"])
cycler()

screen.onTap ->
	nextState = cycler()
	# if !isCenter
	# 	nextState = "shown"

	# else
	# 	nextState = "start"

	animationOptions = 
		curve: Spring(damping: 0.8), time: 1.4
	
	for item in [arrow, camera, alice]
		item.animate(nextState, animationOptions)
	
	# isCenter = !isCenter


# box = new Layer
# 	parent: screen
# 	width: screen.width
# 	height: screen.height
# 	backgroundColor: "red"
# 	opacity: 0.4


Utils.delay 0.7, ->
	screen.emit Events.Tap

Utils.delay 0.7 + 1.2, ->
	timeV = 0.8
	scaleUp = 1.1
	scaleDown = 0.9

	animationOptions = 
		curve: Spring(damping: 0.6), time: timeV
	
	arrow.animate(scale: scaleUp, options: animationOptions)
	alice.animate(scale: scaleDown - 0.2, opacity: 0.6, options: animationOptions)
	camera.animate(scale: scaleDown, options: animationOptions)

	Utils.delay timeV - 0.2, =>
		arrow.animate(scale: scaleDown, options: animationOptions)
		alice.animate(scale: scaleUp, opacity: 1.0, options: animationOptions)
		camera.animate(scale: scaleDown, options: animationOptions)

		Utils.delay timeV - 0.2, =>
			arrow.animate(scale: scaleDown, options: animationOptions)
			alice.animate(scale: scaleDown, opacity: 0.6, options: animationOptions)
			camera.animate(scale: scaleUp, options: animationOptions)

			Utils.delay timeV - 0.2, =>
				arrow.animate(scale: 1.0, options: animationOptions)
				alice.animate(scale: 1.0, opacity: 1.0, options: animationOptions)
				camera.animate(scale: 1.0, options: animationOptions)

				Utils.delay timeV, =>
					screen.emit Events.Tap



screen.parent.scale = 0.51


# Utils.delay 0.2 + 1.2 + 1.4, ->
# 	arrow.animate(scale: 1.0, options: animationOptions)

# Utils.delay 2 + 2.2 + 2.2, ->
# 	screen.emit Events.Tap

# Utils.delay 2 + 2.2 + 2.2 + 2.2, ->
# 	screen.emit Events.Tap

# Utils.delay 2 + 2.2 + 2.2 + 2.2 + 2.2, ->
# 	screen.emit Events.Tap
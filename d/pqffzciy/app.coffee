# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Nurutdinov Timur"
	twitter: ""
	description: ""


bigSpring = "spring(200,15, -3)"
gentleSpring = "spring(40,5, 0)"
swingSpring = "spring(120,15, 0)"
smoothSpring = "spring(100,20, 0)"
slowSpring = "spring(100,15, -3)"
snapSpring = "spring(200, 20, 0)"
tightSpring = "spring(300, 25, 0)"
straightSpring = "spring(500, 40, 0)"
superSlowSpring = "spring(30,20,0)"


screen = new Layer
	width: 320, height: 568, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


temp = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0


base = new Layer width: 672, height: 2086, x: -16, y: 0, image: "images/base.png"


darker = new Layer width: Screen.width, height: Screen.height, backgroundColor: "#000", opacity: 0.5

player_min = new Layer width: 720, height: 264, x: -40, y: 956, image: "images/player min.png"
player_min.states.add
	hidden: y: 1136

player_max = new Layer width: 640, height: 548, x: 0, y: 628, image: "images/player max.png", style: {"-webkit-filter": "drop-shadow(0px -20px 40px rgba(0,0,0,0.5))"}
bar = new Layer width: 640, height: 36, x: 0, y: 0, image: "images/bar.png", parent: player_max

player_max_constraints = new Layer width: 640, height: 548+548, x: 0, y: 628, opacity: 0

player_max.draggable = true
player_max.draggable.speedX = 0
player_max.draggable.speedY = 0.7
player_max.draggable.constraints = player_max_constraints
player_max.draggable.overdragScale = 0.1
player_max.draggable.bounceOptions =
	friction: 100,
	tension: 1000,
	tolerance: 0.0001

darker.states.add
	hidden: opacity: 0
darker.states.switchInstant("hidden")
player_max_constraints.states.add
	hidden: y: 1136
player_max.states.add
	hidden: y: 1136
player_max.states.switchInstant("hidden")

player_max.states.animationOptions =
	curve: tightSpring
	time: 0.1
player_min.states.animationOptions =
	curve: snapSpring
	time: 0.1





player_min.on Events.Click, ->
	player_max_constraints.states.next()
	player_max.states.next()
	player_min.states.next()
	darker.states.next()

bar.on Events.Click, ->
	player_max_constraints.states.next()
	player_max.states.next()
	player_min.states.next()
	darker.states.next()

darker.on Events.Click, ->
	if darker.states.current != "hidden"
		player_max_constraints.states.next()
		player_max.states.next()
		player_min.states.next()
		darker.states.next()

bounds = [628, 628 + 140]
player_max.on Events.Move, ->
	if player_max.y > bounds[1]
		player_max_constraints.states.next()
		player_max.states.next()
		player_min.states.next()
		darker.states.next()

for item in [base, darker, player_min, player_max, player_max_constraints]
	item.parent = temp

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"
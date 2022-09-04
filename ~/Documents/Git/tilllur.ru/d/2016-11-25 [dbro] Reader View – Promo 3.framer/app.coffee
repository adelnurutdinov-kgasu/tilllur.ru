

screenView = new Layer
	width: 2560 / 2, height: 1452 / 2, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light", visible: false }

tempView = new Layer
	parent: screenView, width: screenView.width * 2, height: screenView * 2
	scale: 0.5, originX: 0, originY: 0.2, backgroundColor: "black"


# view
screen = new Layer
	width: 2560
	height: 1574
	x: 0
	y: 0
	image: "images/screen.png"

try_oval = new Layer
	width: 292
	height: 292
	x: 248
	y: 286
	borderRadius: "100%"
	backgroundColor: "rgba(255,219,77,1)"

try_oval.states = 
	"small": { scale: 1 }
	"big": { scale: 1.4 }

try_oval.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "small"
		try_oval.animate("big")
	else
		try_oval.animate("small")

try_oval.animate("big")

arrow = new Layer
	width: 16
	height: 100
	x: 382
	y: 172
	image: "images/arrow.png"

# round_small = new Layer
# 	width: 336
# 	height: 336
# 	x: 1246
# 	y: 740
# 	image: "images/round small.png"

# round_big = new Layer
# 	width: 584
# 	height: 584
# 	x: 1688
# 	y: 448
# 	image: "images/round big.png"

# round_middle = new Layer
# 	width: 400
# 	height: 400
# 	x: 520
# 	y: 436
# 	image: "images/round middle.png"

try_text = new Layer
	width: 250
	height: 92
	x: 270
	y: 386
	image: "images/try text.png"

startPosition = 1200
endPosition = 600
tightSpring = "spring(22, 10, 10)"


for item in [screen, try_oval, arrow, try_text]
	item.parent = tempView



createOvalBig = () ->
	round_big = new Layer
		parent: tempView
		width: 584
		height: 584
		x: 1500 + Utils.randomNumber(150)
		y: startPosition
		image: "images/round big.png"
	
	round_big.animate( y: endPosition, options: { time: Utils.randomNumber(3) + 30 })
# 	round_big.animate( y: endPosition + Utils.randomNumber(100), options: { curve: tightSpring })
	round_big.on Events.AnimationEnd, ->
		round_big.destroy()
		createOvalBig()

createOvalMiddle = () ->
	round_big = new Layer
		parent: tempView
		width: 400
		height: 400
		x: 400 + Utils.randomNumber(150)
		y: startPosition
		image: "images/round big.png"
	
	round_big.animate( y: endPosition, options: { time: Utils.randomNumber(3) + 20 })
# 	round_big.animate( y: endPosition + 50 + Utils.randomNumber(100), options: { curve: tightSpring })	
	round_big.on Events.AnimationEnd, ->
		round_big.destroy()
		createOvalMiddle()
		
createOvalSmall = () ->
	round_big = new Layer
		parent: tempView
		width: 336
		height: 336
		x: 700 + Utils.randomNumber(50)
		y: startPosition
		image: "images/round big.png"
	
	round_big.animate( y: endPosition, options: { time: Utils.randomNumber(3) + 10 })
# 	round_big.animate( y: endPosition + 300 + Utils.randomNumber(100), options: { curve: tightSpring })
	round_big.on Events.AnimationEnd, ->
		round_big.destroy()
		createOvalSmall()

createOvalBig()
createOvalMiddle()
createOvalSmall()


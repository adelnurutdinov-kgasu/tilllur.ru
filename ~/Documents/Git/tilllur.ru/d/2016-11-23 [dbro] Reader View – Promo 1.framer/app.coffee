# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Timur Nurutdinov"
	twitter: ""
	description: ""


{SVGLayer} = require 'SVGLayer'

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
	height: 1452
	x: 0
	y: 0
	backgroundColor: "rgba(255,255,255,1)"

logo = new Layer
	width: 592
	height: 190
	x: 0
	y: 0
	image: "images/logo.png"

title = new Layer
	width: 1416
	height: 204
	x: 572
	y: 218
	image: "images/title.png"

button = new Layer
	width: 400
	height: 100
	x: 1114
	y: 488
	image: "images/button.png"

image_base = new Layer
	width: 1616
	height: 1344
	x: 472
	y: 726
	image: "images/image base.png"
	style: {"-webkit-filter": "drop-shadow(0px 10px 24px rgba(0,0,0,0.5))"}

image_base.states =
	base:
		opacity: 1
	move:
		opacity: 1
	back:
		opacity: 1
	changed:
		opacity: 0

image_base.stateSwitch("base")

image_new = new Layer
	width: 1616
	height: 1344
	x: 472
	y: 726
	image: "images/image new.png"
	style: {"-webkit-filter": "drop-shadow(0px 10px 24px rgba(0,0,0,0.5))"}

image_new.states =
	base:
		opacity: 0
	changed:
		opacity: 1

image_new.stateSwitch("base")

bg = new Layer

	shadowColor: "rgba(0,0,0,0.5)"

bg.states =
	base:	
		width: 44
		height: 44
		x: 688
		y: 738
		borderRadius: 0
		backgroundColor: "rgba(255,255,255,1)"
		shadowY: 0
		shadowBlur: 0
	move:	
		width: 144
		height: 144
		x: 638
		y: 688
		borderRadius: 0
		backgroundColor: "rgba(255,255,255,1)"
		shadowY: 20
		shadowBlur: 32
	back:	
		width: 44
		height: 44
		x: 688
		y: 738
		borderRadius: 0
		backgroundColor: "rgba(255,255,255,1)"
		shadowY: 0
		shadowBlur: 0
	changed:	
		width: 44
		height: 44
		x: 688
		y: 738
		borderRadius: 4
		backgroundColor: "rgba(102,102,102,1)"
		shadowY: 0
		shadowBlur: 0

bg.stateSwitch("base")

shape_2 = new Layer
	width: 32
	height: 32
	x: 694
	y: 744
	image: "images/shape 2.png"

shape_2.states =
	base:
		opacity: 0
	changed:
		opacity: 1

shape_2.stateSwitch("base")

try_text = new Layer
	width: 248
	height: 90
	x: 278
	y: 516
	image: "images/try text.png"



try_text.states =
	base:
		opacity: 0
	changed:
		opacity: 1

try_text.stateSwitch("base")

choose = new Layer
	width: 158
	height: 146
	x: 552
	y: 556
	image: "images/choose.png"

choose.states =
	base:
		opacity: 0
	changed:
		opacity: 1

choose.stateSwitch("base")

shape = new Layer

	image: "images/shape.png"

shape.states =
	base:	
		width: 32
		height: 32
		x: 694
		y: 744
		opacity: 1
	move:
		width: 88
		height: 88
		x: 666
		y: 716
		opacity: 1
	back:
		width: 32
		height: 32
		x: 694
		y: 744
		opacity: 1
	changed:	
		width: 32
		height: 32
		x: 694
		y: 744
		opacity: 0

shape.stateSwitch("base")


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["base", "move", "back", "changed"]
items = [screen, logo, title, button, image_base, image_new, bg, shape_2, try_text, choose, shape]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

nextStateHandler = () ->
	nextState = cycler()
	for item in items
		try
			if nextState is "move"
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
			else
				item.animate(nextState)
		catch error

# cycleButton.on Events.Click, ->

flag = true
localItems = [image_base, image_new, bg, shape_2, shape]

changeHandler = () ->
	for item in localItems
		try
			if flag
				item.stateSwitch("base")
			else
				item.stateSwitch("changed")
		catch error
	flag = !flag


Utils.delay 1, ->
	nextStateHandler()
	Utils.delay 1, ->
		nextStateHandler()
		Utils.delay 1, ->
			nextStateHandler()
			screenView.on(Events.Click, changeHandler)


for item in [screen, logo, title, button, image_base, image_new, bg, shape_2, shape, try_text, choose, cycler]
	item.parent = tempView

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "000"


view = new Layer
	parent: screen
	width: (360 + 16) * 3 - 16
	height: 576
	height: 640 - 24
	y: 24
	backgroundColor: "transparent"

view.states =
	"init":
		scale: 0.6
		y: 600
	"hidden":
		scale: 0.8
		y: 24
	"shown":
		scale: 1
		y: 24

view.x = Align.center()


view.originY = 0.5
view.stateSwitch("init")




left = new Layer
	width: 360
	height: 616
	image: "images/left.png"

mid = new Layer
	width: 360
	height: 616
	image: "images/mid.png"

right = new Layer
	width: 360
	height: 616
	image: "images/right.png"



for item, i in [left, mid, right]
# 	item.height = 640 - 24
# 	print item.name
# 	item.image = "images/big/" + item.name + ".png"
# 	print item.image
	item.parent = view
	item.x = (360 + 16) * i
	item.borderRadius = 16

op = {
	time: 0.5
	curve: Spring(damping: 1)
}

toggler = false
screen.on Events.Tap, ->
	if !toggler
		view.animate("shown", op)
		header.animate(opacity: 1, options: op)
		for item in [left, mid, right]
			item.animate(borderRadius: 0, options: op)
	else
		view.animate("hidden", op)
		header.animate(opacity: 0, options: op)
		for item in [left, mid, right]
			item.animate(borderRadius: 16, options: op)
	
	toggler = !toggler
		


Utils.delay 1, ->
# 	view.originY = 0.8
	view.animate("hidden")

view.on Events.StateSwitchEnd, (from, to) ->
	if to is "hidden"
		view.animate("shown", op)
		header.animate(opacity: 1, options: op)
		for item in [left, mid, right]
			item.animate(borderRadius: 0, options: op)

header_back = new Layer
	parent: screen
	width: 360
	height: 100
	image: "images/header%20back.png"


header = new Layer
	parent: screen
	width: 360
	height: 100
	image: "images/header.png"
	opacity: 0


statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, statusBar: "light" }
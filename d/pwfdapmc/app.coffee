
screen = new Layer
	width: 320, height: 568, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


temp = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0



bg = new Layer
	width: 640
	height: 1136
	image: "images/bg.png"

icon = new Layer width: 120, height: 121, x: 488, y: 230, image: "images/icon.png"

title = new Layer width: 149, height: 19, x: 473, y: 362, image: "images/title.png"


re = new Layer
	width: 640
	height: 1136
	image: "images/re.png"
	opacity: 0
	y: -386
	x: 165




# set positions
re.scale = 0.1
re.originX = 0.61
re.originY = 0.61
icon.originX = 0.61
icon.originY = 0.61

# start app
screen.on Events.Click, ->
	re.animate
		properties:
			scale: 1
			opacity: 1
			y: 0
			x: 0
		time: 0.4
	bg.animate
		properties:
			scale: 8.4
			x: -1914
			y: 2310
		time: 0.4
	icon.animate
		properties:
			opacity: 0
		time: 0.05
	title.animate
		properties:
			opacity: 0
		time: 0.2


for item in [bg, icon, title, re]
	item.parent = temp

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"
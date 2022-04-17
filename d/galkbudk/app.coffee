retina = 1

screenView = new Layer
	width: 360, height: 640 - 40

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }

bg = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(50,50,50,1)"


screen = new Layer
	width: 392*retina
	height: 585*retina
	x: -16*retina
	y: 49*retina
	image: "images/screen.png"



# status_bar_bg = new Layer
# 	width: 360*retina
# 	height: 24*retina
# 	x: 0*retina
# 	y: 0*retina
# 	backgroundColor: "rgba(0,0,0,1)"

bottom = new Layer
	width: 360*retina
	height: 103*retina
	x: 0*retina
	y: 538*retina
	image: "images/bottom.png"


scroll = new ScrollComponent
	width: 360*retina
	height: 145*retina
	x: 0*retina
	y: 393*retina
# 	backgroundColor: "rgba(216,216,216,1)"

grid = new Layer
	width: 328*retina
	height: 442*retina
	x: 16*retina
	y: 15*retina
	image: "images/grid.png"

scroll.scrollHorizontal = false
scroll.contentInset =
	bottom: 24*retina
grid.parent = scroll.content

for item in [bg, screen, bottom, scroll]
	item.parent = screenView

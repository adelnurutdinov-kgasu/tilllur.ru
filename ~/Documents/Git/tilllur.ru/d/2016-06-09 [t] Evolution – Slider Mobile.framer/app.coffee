retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }




bg = new Layer width: 375*retina, height: 667*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(255,255,255,1)"

header = new Layer width: 379*retina, height: 141*retina, x: -2*retina, y: 0*retina, image: "images/header.png"

scroll = new ScrollComponent width: 375*retina, height: 529*retina, x: 0*retina, y: 138*retina, scrollHorizontal: false, directionLock: true

content = new Layer width: 375*retina, height: 1911*retina, x: 0*retina, y: 240*retina, image: "images/content.png", parent: scroll.content


page = new PageComponent
	width: screen.width
	height: 180*retina
	y: 30*retina
	scrollVertical: false
	parent: scroll.content
	directionLock: true
	contentInset:
		right: 16

# page_0 = 

page_1 = new Layer width: 300*retina, height: 180*retina, x: 28*retina, y: 0*retina, image: "images/page 1.png", parent: page.content

page_2 = new Layer width: 320*retina, height: 180*retina, x: 334*retina, y: 0*retina, image: "images/page 2.png", parent: page.content

page_3 = new Layer width: 210*retina, height: 180*retina, x: 660*retina, y: 0*retina, image: "images/page 3.png", parent: page.content

# page_4 = new Layer width: 27*retina, height: 180*retina, x: 870*retina, y: 0*retina, backgroundColor: "rgba(255,255,255,1)", parent: page.content
# 
# page_5 = new Layer width: 58*retina, height: 180*retina, x: 897*retina, y: 0*retina, backgroundColor: "rgba(255,255,255,1)", parent: page.content




for item in [bg, header, scroll]
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(251,254,254,1)"

page.updateContent()
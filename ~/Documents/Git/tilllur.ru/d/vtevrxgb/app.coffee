screen = new Layer
	width: 320, height: 568, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

temp = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "222"



bg = new Layer width: 640, height: 1136, x: 0, y: 0, image: "images/bg.png"

pageView = new ScrollComponent
	scrollHorizontal: false
	width: 640
	height: 1016
	backgroundColor: "null"

ccontent = new Layer width: 456, height: 2248, x: -28, y: 172, image: "images/content.png", parent: pageView.content


tempValue = 176

scrollView = new PageComponent
	parent: pageView.content
# 	propagateEvents: false
	width: 640+tempValue
	height: 480+100
	y: 222
	x: -tempValue
	backgroundColor: "null"
	scrollVertical: false
	contentInset:
		top: 0
		right: 0
		bottom: 0
		left: 0

cards = []

for i in [0..7]
	card = new Layer
		name: "page#{i}"
		width: 400
		height: 400
		borderRadius: 8
		x: i * (400-24) + tempValue+32
		scale: 0.8
		parent: scrollView.content
		image: "images/albums/#{i+1}.jpg"
		shadowY: 40
		shadowBlur: 80
		shadowColor: "rgba(0,0,0,0.5)"

	cards.push(card)
	
	if i == 0
		card.scale = 1
		

scrollView.on "change:currentPage", (event, layer) ->
# 	print scrollView.currentPage.name
# 	print scrollView.closestPage.name
# 	print "-----"
	
	for item,i in cards
		if item.name == scrollView.currentPage.name
			item.animate
				properties:
					scale: 1
				time: 0.2
			continue
		
		item.animate
			properties:
				scale: .8
			time: 0.3

top_block_bg = new Layer width: 640, height: 80, x: 0, y: 10, backgroundColor: "black"

top_block = new Layer width: 640, height: 160, x: 0, y: 10, image: "images/top block.png"

player = new Layer width: 720, height: 340, x: -40, y: 956, image: "images/player.png"

for item in [bg, pageView, top_block_bg, top_block, player]
	item.parent = temp

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"
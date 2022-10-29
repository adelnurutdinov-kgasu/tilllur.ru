

# Screen.backgroundColor = "#EEE"


contentScroll = new PageComponent
	width: 360
	height: 640
	scrollHorizontal: false

contentScroll.content.draggable.speedY = 1.4
contentScroll.content.draggable.overdrag = false
contentScroll.content.draggable.bounce = false

for i in [0, 1, 2, 3]
	page = new Layer
		width: 360
		height: 640
		parent: contentScroll.content
		y: i * 640
		backgroundColor: Utils.randomColor()
		opacity: 0

contentScroll.updateContent()
contentScroll.snapToPage(contentScroll.content.children[2], false)
# contentScroll.scrollToPoint( {x: 0, y: 640 * 2 }, false)

temp = new TextLayer
	width: 360
	textAlign: "center"
	fontSize: 12
	color: "black"
	text: ""



feed = new Layer
	width: 360
	height: 1200
	y: -306
	image: "images/feed.png"
	opacity: 1

# 80

#

scrollGuard = new Layer
	opacity: 0

scrollGuard.states =
	"hidden": { }
	"shown": { }
scrollGuard.stateSwitch("shown")

scrollGuard.on Events.StateSwitchEnd, (from, to) ->
	if to != from
		if to is "hidden"
			layerView.animate(y: 640, options: { time: 0.3 } )
			bottom_bar.animate(y: 640, options: { time: 0.3 } )
		else
			layerView.animate(y: 488, options: { time: 0.3 } )
			bottom_bar.animate(y: 640-56, options: { time: 0.3 } )

# Status Bar


header = new Layer
	width: 360
	height: 152
	y: 24
	image: "images/header.png"

status_bar = new Layer
	width: 360
	height: 24
	# image: "images/status%20bar.png"
	backgroundColor: "white"

bottom_bar = new Layer
	width: 360
	height: 56
	image: "images/bottom%20bar.png"
	y: 640 - 56

layerView = new Layer
	width: 360
	height: 152
	y: 488
	image: "images/layer.png"


bottom_bar.bringToFront()
temp.bringToFront()

headerBreaker = new Layer
	width: 360
	height: 1
	parent: header
	y: header.height
	opacity: 0
	backgroundColor: "rgba(225,226,229,1)"

# layerView.opacity = 0
# tempHeader = new Layer
# 	width: 360
# 	height: 24 + 50

contentScroll.content.on "change:y", ->
	value = contentScroll.scrollY
# 	temp.text = value
	
	if value >= 0 and value <= 640
		feed.y = Utils.modulate(value, [640, 0], [-60, 80])
	
	else if value >= 640 and value <= 1280
		feed.y = Utils.modulate(value, [1280, 640], [-306, -60])
		layerView.y = Utils.modulate(value, [1280 - 320, 1280], [640, 488], true)
	
	else if value >= 1280 and value <= 1920
		feed.y = Utils.modulate(value, [1920, 1280], [-632, -306])
		header.y = Utils.modulate(value, [1280 + (102 + 100), 1280], [-102 + 24, 24], true)
		
		headerBreaker.opacity = Utils.modulate(value, [1280 + (102 + 100 + 1), 1280 + (102 + 100)], [1, 0], true)
		
		if contentScroll.content.draggable.direction == "up"
			scrollGuard.stateSwitch("hidden")
# 			layerView.animate(y: 640, options: { time: 0.3 } )
# # 			layerView.animate(y: 488+48, options: { time: 0.3 } )
# 			bottom_bar.animate(y: 640, options: { time: 0.3 } )
		else if contentScroll.content.draggable.direction == "down"
			scrollGuard.stateSwitch("shown")
# 			layerView.animate(y: 488, options: { time: 0.3 } )
# 			bottom_bar.animate(y: 640-56, options: { time: 0.3 } )
		
# 		layerView.y = Utils.modulate(value, [1920, 1920 - 120], [640, 488], true)
# 		bottom_bar.y = Utils.modulate(value, [1920, 1920 - 120], [640, 640-56], true)
		

screen = new Layer
	width: 360, height: 640
	backgroundColor: "eee"


for item in [feed, layerView, header, status_bar, bottom_bar, contentScroll]
	item.parent = screen

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light", forceAndroidBar: true }
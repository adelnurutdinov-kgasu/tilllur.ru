Framer.Extras.Hints.disable()
Utils.insertCSS('@import url(css/project.css)')

# Base

phone = new Layer
	width: 360
	height: 640
	backgroundColor: "white"
	

screen = new Layer
	parent: phone
	y: 16
	width: 360
	height: 640 - 16
	backgroundColor: "black"

# wall = new Layer
# 	parent: screen
# 	y: - 16
# 	width: 360
# 	height: 640
# 	image: "images/base.png"
# 	opacity: 0

topBar.parent = screen
topBar.shadowY = 2
topBar.shadowBlur = 2
topBar.shadowColor = "rbga(0,0,0,0.07)"
# topBar.y = -2

# progressView = new Layer
# 	height: 2
# 	width: 104
# 	backgroundColor: "black"
# 	parent: topBar
# 	y: 42
# 	borderRadius: 2


tab.states =
	"left": { x: 16 }
	"mid": { x: 128 }
	"right": { x: 240 }
	
tab.stateSwitch("mid")


# cover = new Layer
# 	width: 360
# 	height: 10
# 	image: "images/cover.png"
# 	parent: topBar
# 	y: 38
# 	opacity: 0

# 
# leftView = new Layer
# 	height: 2
# 	width: 104
# 	backgroundColor: "black"
# 	parent: topBar
# 	y: 42
# 	x: 16
# 
# midView = new Layer
# 	height: 2
# 	width: 104
# 	backgroundColor: "black"
# 	parent: topBar
# 	y: 42
# 	x: 128
# 
# rightView = new Layer
# 	height: 2
# 	width: 104
# 	backgroundColor: "black"
# 	parent: topBar
# 	y: 42
# 	x: 240

for item, i in [titleLeft, titleMid, titleRight]
	item.borderRadius = 2
	item.states =
		"hidden": { opacity: 0.5 }
		"shown": { opacity: 1 }
	if i == 1 then item.stateSwitch("shown") else item.stateSwitch("hidden")
	




pages = new PageComponent
	width: 360
	height: Screen.height
	scrollVertical: false
	parent: screen

pages.sendToBack()

for item, i in ["left", "mid", "right"]
	page = new Layer
		width: 360
		x: (360 + 0) * i
		height: pages.height
		parent: pages.content
		backgroundColor: "null"

pages.snapToPage(pages.content.children[1], false)

T = 0.4

pages.on "change:currentPage", ->
	if pages.currentPage == pages.content.children[0]
		titleLeft.animate("shown", time: T)
		titleMid.animate("hidden", time: T)
		titleRight.animate("hidden", time: T)
	else if pages.currentPage == pages.content.children[1]
		titleLeft.animate("hidden", time: T)
		titleMid.animate("shown", time: T)
		titleRight.animate("hidden", time: T)
	else if pages.currentPage == pages.content.children[2]
		titleLeft.animate("hidden", time: T)
		titleMid.animate("hidden", time: T)
		titleRight.animate("shown", time: T)


cardBounds = [360, 360*2]
pages.content.on "change:x", ->
	value = pages.scrollX
	tab.x = Utils.modulate(value, [0, (360+16)*2], [tab.states.left.x, tab.states.right.x], true)
	
	
	darker.opacity = Utils.modulate(value, [360, (360+16)*2], [0, 1], true)
	
	for item in [cardView]
		try 
			item.x = Utils.modulate(value, cardBounds, [item.states.hidden.x, item.states.shown.x], true)
			item.y = Utils.modulate(value, cardBounds, [item.states.hidden.y, item.states.shown.y], true)
			item.height = Utils.modulate(value, cardBounds, [item.states.hidden.height, item.states.shown.height], true)
			item.borderRadius = Utils.modulate(value, cardBounds, [item.states.hidden.borderRadius, item.states.shown.borderRadius], true)

# Colors

topBarColor =
	base: "#FFF"
	dark: "#222"

textColor =
	base: "#000"
	dark: "#FFF"

tabColor = 
	base: "#000"
	dark: "#DDD"


changeTheme = (theme = "dark") ->
	topBar.backgroundColor = topBarColor[theme]
	tab.backgroundColor = tabColor[theme]
	for item in [titleLeft, titleMid, titleRight]
		item.color = textColor[theme]

# changeTheme("base")
# changeTheme()

# Logic + Button

phone.borderRadius = 0
phone.clip = true
# phone.x = Align.center()
# phone.y = Align.center(20)

for item in [titleLeft, titleMid, titleRight]
	item.padding =
		top: 12
	item.fontFamily = "YS Web Medium"
	
	item.on Events.Tap, (event, layer) ->
		if layer is titleLeft
			pages.snapToPage(pages.content.children[0])
		else if layer is titleMid
			pages.snapToPage(pages.content.children[1])
		else if layer is titleRight
			pages.snapToPage(pages.content.children[2])
	
	item.on Events.TouchStart, (event, layer) ->
		layer.opacity = layer.opacity / 2

phone.on Events.TouchEnd, ->
	index = -1
	for item, i in pages.content.children
		if pages.currentPage == item then index = i
	
	for item, i in [titleLeft, titleMid, titleRight]
		if i != index then item.stateSwitch("hidden") else item.stateSwitch("shown")

button = new TextLayer
	text: "Цвет"
	textAlign: "center"
	fontWeight: "500"
	color: "#4694F0"
	padding: 
		top: 9
	backgroundColor: "#fff"
	borderColor: "#4694F0"
	borderWidth: 1
	fontSize: 16
	width: 92
	height: 40
	borderRadius: 8
	x: Align.center()
	y: phone.y - 60

isDark = false
button.on Events.Tap, ->
	if !isDark then changeTheme() else changeTheme("base")
	isDark = !isDark

# Content

fixWhite = new Layer
	parent: phone
	width: 360
	height: 20
	backgroundColor: "white"

# midScreen = new Layer
# 	width: 360
# 	height: 640
# 	image: "images/over%202.png"
# 	parent: pages.content.children[1]
# 	y: -16

# buttonRightScreen = new Layer
# 	parent: midScreen
# 	x: 216
# 	y: 336
# 	width: 144
# 	height: 129
# 	backgroundColor: "null"
# 
# buttonRightScreen.on Events.Tap, (event, layer) ->
# 	pages.snapToPage(pages.content.children[2])

# rightScreen = new Layer
# 	width: 360
# 	height: 640
# 	image: "images/over%203.png"
# 	parent: pages.content.children[2]
# 	y: -16
# 
# leftScreen = new Layer
# 	width: 360
# 	height: 640
# 	image: "images/over%201.png"
# 	parent: pages.content.children[0]
# 	y: -16



# 
# over_1 = new Layer
# 	width: 360
# 	height: 640
# 	image: "images/over%201.png"
# 
# over_2 = new Layer
# 	width: 360
# 	height: 640
# 	image: "images/over%202.png"
# 
# over_3 = new Layer
# 	width: 360
# 	height: 640
# 	image: "images/over%203.png"


# phone.pinchable.enabled = true
# phone.pinchable.rotate = false
# phone.pinchable.maxScale = 1.2
# 
# phone.on Events.PinchEnd, (event, layer) ->
# 	phone.animate(x: 0, y: 0, scale: 1, options: {time: 0.2})


# wall.sendToBack()
base = new Layer
	width: 360
	height: 640
	image: "images/base.png"
	parent: pages.content.children[1]
	y: -16

cardView = new Layer
	parent: pages
	backgroundColor: "white"
	clip: true

cardView.states =
	"hidden":
		x: 216
		y: 336-16
		height: 124
		width: 360
		borderRadius: 6
	"shown":
		x: 0
		y: 156
		height: 480
		width: 360
		borderRadius: 0

cardView.stateSwitch("hidden")


darker = new Layer
	width: 360
	height: 640
	backgroundColor: "rgba(0,0,0,0.5)"
	opacity: 0
	parent: pages.content.children[1]




news = new Layer
	width: 360
	height: 480
	image: "images/news.png"
	parent: cardView


yandex = new Layer
	width: 360
	height: 640
	image: "images/yandex.png"
	parent: pages.content.children[2]



{ Preview } = require "PreviewComponent"
new Preview { view: phone, borderRadius: 8, forceAndroidBar: true }
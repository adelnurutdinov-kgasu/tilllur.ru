Framer.Extras.Hints.disable()
Utils.insertCSS('@import url(css/project.css)')

# Base

phone = new Layer
	width: 360
	height: 640
	backgroundColor: "black"

screen = new Layer
	parent: phone
	y: 24
	width: 360
	height: 640
	backgroundColor: "black"

topBar.parent = screen
topBar.shadowY = 2
topBar.shadowBlur = 2
topBar.shadowColor = "rbga(0,0,0,0.07)"

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
		x: (360 + 16) * i
		height: pages.height
		parent: pages.content
		backgroundColor: Utils.randomColor()

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
	
pages.content.on "change:x", ->
	value = pages.scrollX
	tab.x = Utils.modulate(value, [0, (360+16)*2], [tab.states.left.x, tab.states.right.x], true)

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

# button = new TextLayer
# 	text: "Цвет"
# 	textAlign: "center"
# 	fontWeight: "500"
# 	color: "#4694F0"
# 	padding: 
# 		top: 9
# 	backgroundColor: "#fff"
# 	# borderColor: "#4694F0"
# 	# borderWidth: 1
# 	fontSize: 16
# 	width: 92
# 	height: 40
# 	borderRadius: 8
# 	x: Align.center()
# 	y: phone.y - 60




{ Preview } = require "PreviewComponent"
preview = new Preview { view: phone, borderRadius: 16, statusBar: "light" }


isDark = false
preview.on Events.Tap, ->
	if !isDark then changeTheme() else changeTheme("base")
	isDark = !isDark
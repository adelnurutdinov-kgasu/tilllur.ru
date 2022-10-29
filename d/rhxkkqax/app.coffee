Framer.Extras.Hints.disable()
Canvas.backgroundColor = "222"
panel = require 'ControlPanel'

presentationMode = false

# Types

types =
	"1": { s: 20, width: 320, height: 480, name: "2G, 3G, 3GS, 4, 4S" }
	"2": { s: 20, width: 320, height: 568, name: "5, 5s, 5c, SE"}
	"3": { s: 20, width: 375, height: 667, name: "6, 6s, 7, 8" }
	"4": { s: 20, width: 414, height: 736, name: "6+, 6s+, 7+, 8+" }
	"5": { s: 44, width: 375, height: 812, name: "11 Pro, X, Xs" }
	"6": { s: 44, width: 414, height: 896, name: "11, Xr, 11 Pro Max, Xs Max" }

device = (index = "0") ->
	selectedTitle.text = types[index].name
	statusBar.height = types[index].s
	if statusBar.height == 44
		safeAreaBottom.height = 34
	else
		safeAreaBottom.height = 0
	
	mordaView.width = types[index].width
	mordaView.height = types[index].height


device4 = (event, layer, index = "1") ->
	device(index)

device5 = (event, layer, index = "2") ->
	device(index)

device8 = (event, layer, index = "3") ->
	device(index)

device8Plus = (event, layer, index = "4") ->
	device(index)

devicePro = (event, layer, index = "5") ->
	device(index)

deviceProX = (event, layer, index = "6") ->
	device(index)


# Screen

screen = new Layer
	width: 414
	height: 896
	backgroundColor: "null"
# 	clip: true
# 	borderRadius: 8
# 	x: Align.center
# 	y: Align.center

if presentationMode
	screen.scale = (Canvas.height - 40 * 2) / screen.height


selectedTitle = new TextLayer
	text: types["1"].name
	fontSize: 15
	color: "white"
	x: screen.maxX + 40
	y: screen.minY + 80


for key, item of types
	new Layer
		parent: screen
		width: item.width
		height: item.height
		backgroundColor: "null"
		borderRadius: 8
		borderColor: "rgba(255,255,255,0.2)"
		borderWidth: 1



mordaView = new Layer
	parent: screen
	backgroundColor: "FAF9F8"
	clip: true
	borderRadius: 8







statusBar = new Layer
	parent: mordaView
	backgroundColor: "red"

header = new Layer
	parent: mordaView
	height: 244
	backgroundColor: "white"
	borderRadius: 24

gap1 = new Layer
	parent: mordaView
	backgroundColor: "null"
	height: 6

geoView = new Layer
	parent: mordaView
	height: 94
	backgroundColor: "white"
	borderRadius: 24

gap2 = new Layer
	parent: mordaView
	backgroundColor: "null"
	height: 6

card = new Layer
	parent: mordaView
	height: 800
	backgroundColor: "white"
	borderRadius: 24

bottomBar = new Layer
	parent: mordaView
	height: 48
	backgroundColor: "white"

safeAreaBottom = new Layer
	parent: mordaView
	height: 0
	backgroundColor: "blue"


mordaView.on "change:width", ->
	updateViewWidth()

mordaView.on "change:height", ->
	updateViewHeight()

updateViewHeight = () ->
	
	safeAreaBottom.y = Align.bottom()
	bottomBar.y = Align.bottom(-safeAreaBottom.height)
	
	sumY = 0
	for item in [statusBar, header, gap1, geoView, gap2, card]
		item.y = sumY
		sumY += item.height
	

updateViewWidth = () ->
	for item in [statusBar, header, gap1, geoView, gap2, card, bottomBar, safeAreaBottom]
		item.width = item.parent.width





statusBar.bringToFront()

headerFix = new Layer
	parent: header
	height: 100
	backgroundColor: "white"


logo = new Layer
	parent: header
	width: 200
	height: 94
	image: "images/logo%20(1).png"

omnibox = new Layer
	parent: header
	y: 94
	width: 375
	height: 60
	backgroundColor: "null"

safeAreaBottomImage = new Layer
	parent: safeAreaBottom
	width: 375
	height: 34
	image: "images/Home%20Bar%20(2).png"


shadowBottomBar.parent = bottomBar
shadowBottomBar.y = -8



omniLeft = new Layer
	parent: omnibox
	width: 240
	height: 60
	image: "images/omniLeft.png"

omniRight = new Layer
	parent: omnibox
	width: 240
	height: 60
	image: "images/omniRight.png"




safeAreaBottom.on "change:width", ->
	headerFix.width = @width
	omnibox.width = @width
	shadowBottomBar.width = @width
	
	logo.x = Align.center
	safeAreaBottomImage.x = Align.center
	omniRight.x = Align.right
	omniLeft.x = Align.left

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 0, visible: false }


preview.addSection("320", [
	{ title: types["1"].name, handler: device4 },
	{ title: types["2"].name, handler: device5 },
])

preview.addSection("375", [
	{ title: types["3"].name, handler: device8 },
	{ title: types["5"].name, handler: devicePro },
])

preview.addSection("414", [
	{ title: types["4"].name, handler: device8Plus },
	{ title: types["6"].name, handler: deviceProX },
])

# panel.header("320", "left")
# panel.button(types["1"].name, device4, "left", "w")
# panel.button(types["2"].name, device5, "left", "w2")

# panel.header("375", "left")
# panel.button(types["3"].name, device8, "left", "w3")
# panel.button(types["5"].name, devicePro, "left", "w3")

# panel.header("414", "left")
# panel.button(types["4"].name, device8Plus, "left", "w4")
# panel.button(types["6"].name, deviceProX, "left", "w5")


device4()


# Fixes

geoView.opacity = 0
card.opacity = 0
mordaView.backgroundColor = "white"


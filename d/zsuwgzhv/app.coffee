Framer.Extras.Hints.disable()
Canvas.backgroundColor = "222"
panel = require 'ControlPanel'

presentationMode = false

# Decoration

decorateArray = []
decorationMode = false

decorateButton = (layer) ->
	decorateArray.push(layer)
	if decorationMode then showTipsFor(layer)
	else hideTipsFor(layer)



showTipsFor = (layer) ->
	layer.backgroundColor = Utils.randomColor()
	layer.opacity = 0.2

hideTipsFor = (layer) ->
	layer.backgroundColor = null
	layer.opacity = 1



continueDecoration = () ->
	showTipsFor(item) for item in decorateArray

pauseDecoration = () ->
	hideTipsFor(item) for item in decorateArray



# checkDecoration = () ->
# 	if isShowTips then continueDecoration()
# 	else pauseDecoration()

# Types

types =
# 	"1": { s: 20, r: 8, width: 320, height: 480, name: "2G, 3G, 3GS, 4, 4S" }
	"2": { s: 20, r: 8, width: 320, height: 568, name: "5, 5s, 5c, SE"}
	"3": { s: 20, r: 8, width: 375, height: 667, name: "6, 6s, 7, 8" }
	"4": { s: 20, r: 8, width: 414, height: 736, name: "6+, 6s+, 7+, 8+" }
	"5": { s: 44, r: 42, width: 375, height: 812, name: "11 Pro, X, Xs" }
	"6": { s: 44, r: 42, width: 414, height: 896, name: "11, Xr, 11 Pro Max, Xs Max" }

device = (index = "0") ->
	selectedTitle.text = "#{types[index].name} — w: #{types[index].width}, h: #{types[index].height}"
	statusBar.height = types[index].s
	if statusBar.height == 44
		safeAreaBottom.height = 34
	else
		safeAreaBottom.height = 0
	
	screenView.width = types[index].width
	screenView.height = types[index].height
	screenView.borderRadius = types[index].r


# device4 = (event, layer, index = "1") ->
# 	device(index)

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



{ Preview } = require "PreviewComponent"

# Screen

screen = new Layer
	width: 414
	height: 896
	backgroundColor: null


screenView = new Layer
	parent: screen
	backgroundColor: "FAF9F8"
	clip: true
	borderRadius: 8

checkScreen = new Layer
	parent: screen
	width: 375
	height: 812
	image: "images/checkScreen.png"
	opacity: 0




statusBar = new Layer
	parent: screenView
	y: Align.top
	backgroundColor: "red"

safeAreaBottom = new Layer
	parent: screenView
	y: Align.bottom
	backgroundColor: "green"

decorateButton(statusBar)
decorateButton(safeAreaBottom)

if presentationMode
	screen.scale = (Canvas.height - 40 * 2) / screen.height


new Preview { view: screen, visible: false, borderRadius: 0 }

# Views

progressView = new Layer
	parent: screenView
	height: 4
	borderRadius: 8
	backgroundColor: "black"
	opacity: 0.13


crossButton = new Layer
	parent: screenView
	size: 28

decorateButton(crossButton)


tintButton = new TextLayer
	parent: screenView
	text: "Попробовать"
	textAlign: "center"
	backgroundColor: "333333"
	borderRadius: 20
	color: "white"
	padding: 
		top: 21
		left: 28
		right: 28
	fontSize: 22
	height: 72
	originY: 1


textView = new TextLayer
	parent: screenView
	text: "Смотреть видео с русской озвучкой"
	fontSize: 32
	color: "black"
	originY: 0

contentView = new Layer
	parent: screenView
	opacity: 0.5

decorateButton(contentView)


content1 = new Layer
	parent: contentView
	width: 294
	height: 228
	image: "images/test.png"


# Resize

selectedTitle = new TextLayer
	text: types["2"].name
	width: screen.width
	fontSize: 15
	lineHeight: 1.6
	color: "white"
	x: Align.center
	textAlign: "left"
	y: Align.top(20)
	opacity: 0.5
	letterSpacing: 1


for key, item of types
	new Layer
		parent: screen
		width: item.width
		height: item.height
		backgroundColor: null
# 		borderRadius: 8
		borderColor: "rgba(255,255,255,0.1)"
		borderWidth: 1


screenView.on "change:width", ->
	updateViewWidth()

screenView.on "change:height", ->
	updateViewHeight()



updateViewHeight = () ->
	safeAreaBottom.y = Align.bottom
	
	progressView.y = Align.top(statusBar.height + 20)
	crossButton.y = Align.top(progressView.y + progressView.height + 17)
	
	tScale = getFitRatio(textView, { width: screenView.width, height: textView.height})
	safeH = Math.max(18, safeAreaBottom.height)
	
	textView.y = Align.top(statusBar.height + 136 * tScale)
	textView.scale = tScale
	tintButton.y = Align.bottom(-safeH - 26)
	tintButton.scale = tScale
	
	contentView.height = (screenView.height - safeH - 26 - tintButton.height * tScale) - (statusBar.height + 136 * tScale + textView.height * tScale)
	contentView.y = Align.top(statusBar.height + 136 * tScale + textView.height * tScale)
	content1.y = Align.center
	content1.scale = getFitRatio(content1, contentView)


updateViewWidth = () ->
	statusBar.width = screenView.width
	safeAreaBottom.width = screenView.width
	
	progressView.width = screenView.width - 20*2 - 10
	progressView.x = Align.center
	crossButton.x = Align.right(-26)
	
	tintButton.x = Align.center
	textView.width = 375
	textView.scale = getFitRatio(textView, { width: screenView.width, height: textView.height})
	textView.x = Align.center
	
	contentView.width = screenView.width
	content1.x = Align.center
	content1.scale = getFitRatio(content1, contentView)






getFitRatio = (layer, contentArea) ->
	# override area
	contentLayer =
		width: contentArea.width - 40 * 2
		height: contentArea.height
	
	ratioA = contentLayer.width / layer.width
	newWidth = ratioA * layer.width
	newHeight = ratioA * layer.height
	
	if newWidth > contentLayer.width or newHeight > contentLayer.height
		ratioA = contentLayer.height / layer.height
	
	return ratioA




panel.header("320", "left")
# panel.button(types["1"].name, device4, "left", "w")
panel.button(types["2"].name, device5, "left", "w2")

panel.header("375", "left")
panel.button(types["3"].name, device8, "left", "w3")
panel.button(types["5"].name, devicePro, "left", "w3")

panel.header("414", "left")
panel.button(types["4"].name, device8Plus, "left", "w4")
panel.button(types["6"].name, deviceProX, "left", "w5")

devicePro()

screenView.bringToFront()
checkScreen.bringToFront()

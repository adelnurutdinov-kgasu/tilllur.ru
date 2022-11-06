layerBaseArray = require 'layerBase'
layerOldAlertArray = require 'layerOldAlert'
layerNewAlertArray = require 'layerNewAlert'
# print layerBaseArray.layers["bottomBar"]

topOffset = 80

textInfoConst = new TextLayer
	x: 16
	y: 16
	fontSize: 12
	text: "Доступная для отрисовки интерфейса область:"

textInfo = new TextLayer
	x: 16
	y: 16 + 16
	fontSize: 20
	color: "black"

figmaView = 
	base: layerBaseArray.layers["figmaView"],
	oldAlert: layerOldAlertArray.layers["figmaView"],
	newAlert: layerNewAlertArray.layers["figmaView"],
	
bottomBar = 
	base: layerBaseArray.layers["bottomBar"],
	oldAlert: layerOldAlertArray.layers["bottomBar"],
	newAlert: layerNewAlertArray.layers["bottomBar"]
	
layer = 
	base: layerBaseArray.layers["layer"],
	oldAlert: layerOldAlertArray.layers["layer"],
	newAlert: layerNewAlertArray.layers["layer"],



source = layerBaseArray.layers["source"]
text = layerBaseArray.layers["text"]
title = layerBaseArray.layers["title"]


for item in [figmaView.base, figmaView.oldAlert, figmaView.newAlert]
	item.clip = true
	item.borderRadius = 12
	item.shadowY = 4
	item.shadowBlur = 10
	item.shadowColor = "rgba(0,0,0,0.1)"

for item in [bottomBar.base, bottomBar.oldAlert, bottomBar.newAlert]
	item.shadowY = -2
	item.shadowBlur = 3
	item.shadowColor = "rgba(0,0,0,0.1)"

# Resize
Canvas.backgroundColor = "#eee"

CanvasContent = new Layer
	backgroundColor: "null"
# 	backgroundColor: "red"
# 	opacity: 0.1


# Lines

# Lines

lineView = new Layer
	width: Canvas.width
	height: 150
	backgroundColor: "null"
	y: CanvasContent.y + 592

lineView.sendToBack()

line1 = new Layer
	parent: lineView
	width: lineView.width
	height: 1
	backgroundColor: "red"

line2 = new Layer
	parent: lineView
	width: lineView.width
	height: 1
	y: line1.y + 48
	backgroundColor: "red"

line3 = new Layer
	parent: lineView
	width: lineView.width
	height: 1
	y: line1.y + 48 + 52
	backgroundColor: "red"

line4 = new Layer
	parent: lineView
	width: lineView.width
	height: 1
	y: line1.y + 48 + 52 + 48
	backgroundColor: "red"


text1 = new TextLayer
	parent: lineView
	text: "16.7%"
	fontSize: 16
	color: "black"
	y: - 20
	x: 16
	fontWeight: 600

text2 = new TextLayer
	parent: lineView
	text: "39.7%"
	fontSize: 16
	color: "black"
	y: - 20 + 48
	x: 16
	fontWeight: 600

text3 = new TextLayer
	parent: lineView
	text: "22.4%"
	fontSize: 16
	color: "black"
	y: - 20 + 48 + 52
	x: 16
	fontWeight: 600

text4 = new TextLayer
	parent: lineView
	text: "15.0%"
	fontSize: 16
	color: "black"
	y: - 20 + 48 + 52 + 48
	x: 16
	fontWeight: 600
	

# textTitle = new TextLayer
# 	text: "Прод"
# 	fontSize: 16
# 	color: "black"
# 	y: 48
# 	x: topOffset
# 	fontWeight: 600
# 
# textTitle2 = new TextLayer
# 	text: "Эксперимент"
# 	fontSize: 16
# 	color: "black"
# 	y: 48
# 	x: topOffset + figmaView.width + 40
# 	fontWeight: 600

lines = [line1, line2, line3, line4]
gapTexts = [text1, text2, text3, text4]
gaps = [640, 682, 740, 10000]

changeLines = (localLine) ->
	for currentLine, i in lines
		if currentLine != localLine
			currentLine.opacity = 0.1
			gapTexts[i].opacity = 0.1
		else
			currentLine.opacity = 1
			gapTexts[i].opacity = 1
	

checkLines = (value) ->
	if value < 580
		changeLines(null)
	else if value < gaps[0]
		changeLines(line1)
	else if value < gaps[1]
		changeLines(line2)
	else if value < gaps[2]
		changeLines(line3)
	else if value < gaps[3]
		changeLines(line4)

Canvas.on "change:width", ->
	resizeWidth()

Canvas.on "change:height", ->
	resize()

# Resize


resizeWidth = () ->
	CanvasContent.width = Canvas.width - 120*2
	CanvasContent.x = 120

resize = () ->
	CanvasContent.height = Canvas.height - 120
	CanvasContent.y = 60
	checkLines(CanvasContent.height)
	lineView.y = CanvasContent.y + 592
	
	resizeLeft()
	resizeMid()
	resizeRight()




teaserSize =
	line0: 38
	line1: 58
	line2: 78
	line4: 118 - 1
	line6: 158


# input: визуально доступная часть от верха экрана
getTeaserSize = (vH) ->
	if vH < 632 then return teaserSize.line2
	else if vH < 718 then return teaserSize.line4
	return teaserSize.line6

getTeaserSizeWithAlert = (vH) ->
	if vH < 672 then return teaserSize.line1
	else if vH < 718 then return teaserSize.line2
	return teaserSize.line4



resizeLeft = () ->
	figmaView.base.x = CanvasContent.x
	figmaView.base.y = CanvasContent.y
	figmaView.base.height = CanvasContent.height
	bottomBar.base.y = figmaView.base.height - bottomBar.base.height
	
	# Layer
# 	maxValue = Math.min(0 + (CanvasContent.height - 640), 42)
# 	minValue = Math.max(maxValue, -4)

	layer.base.states.base.y = figmaView.base.height - 474 - bottomBar.base.height - getTeaserSize(figmaView.base.height)
	layer.base.stateSwitch("base")
# 	textInfo.text = layer.base.states.base.y
	textInfo.text = (figmaView.base.height)
	
	# Zen
	

figmaView.oldAlert.opacity = 0
figmaView.oldAlert.sendToBack()

resizeMid = () ->
# 	figmaView.oldAlert.x = CanvasContent.x + 400
# 	figmaView.oldAlert.y = CanvasContent.y
# 	figmaView.oldAlert.height = CanvasContent.height
# 	bottomBar.oldAlert.y = figmaView.oldAlert.height - bottomBar.oldAlert.height
# 	
# 	# Layer
# 	maxValue = Math.min(0 + (CanvasContent.height - 640) + 56, 140)
# # 	minValue = Math.max(maxValue, 0)
# 	layer.oldAlert.states.base.y = maxValue
# 	layer.oldAlert.stateSwitch("base")







resizeRight = () ->
	figmaView.newAlert.x = CanvasContent.x + 460
	figmaView.newAlert.y = CanvasContent.y
	figmaView.newAlert.height = CanvasContent.height
	bottomBar.newAlert.y = figmaView.newAlert.height - bottomBar.newAlert.height
	
	# Layer
# 	maxValue = Math.min(0 + (CanvasContent.height - 640) + 56, 80)
# 	minValue = Math.max(maxValue, 108)
# layer.newAlert.states.base.y = maxValue
	
	layer.newAlert.states.base.y = figmaView.newAlert.height - 474 - bottomBar.newAlert.height - getTeaserSizeWithAlert(figmaView.newAlert.height)
	layer.newAlert.stateSwitch("base")



resizeWidth()
resize()

# lineView.bringToFront()

jCard1 = new Layer
	width: 360
	height: 430
	image: "images/jenner%20card.png"
	parent: figmaView.base
	y: 400-22

jCard2 = new Layer
	width: 360
	height: 430
	image: "images/jenner%20card.png"
	parent: figmaView.newAlert
	y: 400-22+80


jCard1.placeBehind(layer.base)
jCard2.placeBehind(layer.newAlert)

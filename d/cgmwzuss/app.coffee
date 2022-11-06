layerBaseArray = require 'layerBase'
layerOldAlertArray = require 'layerOldAlert'
layerNewAlertArray = require 'layerNewAlert'
# print layerBaseArray.layers["bottomBar"]

topOffset = 80

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




resizeLeft = () ->
	figmaView.base.x = CanvasContent.x
	figmaView.base.y = CanvasContent.y
	figmaView.base.height = CanvasContent.height
	bottomBar.base.y = figmaView.base.height - bottomBar.base.height
	
	# Layer
	maxValue = Math.min(0 + (CanvasContent.height - 640), 42)
	minValue = Math.max(maxValue, -4)
	layer.base.states.base.y = minValue
	layer.base.stateSwitch("base")
	
	# Zen
	


resizeMid = () ->
	figmaView.oldAlert.x = CanvasContent.x + 400
	figmaView.oldAlert.y = CanvasContent.y
	figmaView.oldAlert.height = CanvasContent.height
	bottomBar.oldAlert.y = figmaView.oldAlert.height - bottomBar.oldAlert.height
	
	# Layer
	maxValue = Math.min(0 + (CanvasContent.height - 640) + 56, 140)
# 	minValue = Math.max(maxValue, 0)
	layer.oldAlert.states.base.y = maxValue
	layer.oldAlert.stateSwitch("base")







resizeRight = () ->
	figmaView.newAlert.x = CanvasContent.x + 400 * 2
	figmaView.newAlert.y = CanvasContent.y
	figmaView.newAlert.height = CanvasContent.height
	bottomBar.newAlert.y = figmaView.newAlert.height - bottomBar.newAlert.height
	
	# Layer
	maxValue = Math.min(0 + (CanvasContent.height - 640) + 56, 80)
# 	minValue = Math.max(maxValue, 108)
	layer.newAlert.states.base.y = maxValue
	layer.newAlert.stateSwitch("base")



resizeWidth()
resize()

# lineView.bringToFront()
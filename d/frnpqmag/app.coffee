Framer.Extras.Hints.disable()

MS = 0.133333
MGAP = 0.5
MThreshhold = 0.9

DELTA_Y = 60

# Framer.Loop.delta = 1 / 120

phone = new Layer
	width: 360
	height: 640
	backgroundColor: "black"

phoneContent = new Layer
	parent: phone
	width: 360
	height: 640
	backgroundColor: "eee"
	image: "images/base%20nav.png"

darker = new Layer
	parent: phone
	width: 360
	height: 640
	backgroundColor: "black"
	opacity: 0

# Data

ICONY_1 = -14
ICONY_2 = 71

data = [
	{
		x: -132
		y: ICONY_1
		title: "Афиша1"
		imageIcon: "images/afishaIcon.png"
	},
	{
		x: -66
		y: ICONY_1
		title: "Афиша2"
		imageIcon: "images/afishaIcon.png"
	},
	{
		x: 0
		y: ICONY_1
		title: "Афиша3"
		imageIcon: "images/afishaIcon.png"
	},
	{
		x: 66
		y: ICONY_1
		title: "Афиша4"
		imageIcon: "images/afishaIcon.png"
	},
	{
		x: 132
		y: ICONY_1
		title: "Афиша5"
		imageIcon: "images/afishaIcon.png"
	},
	
	
	
	{
		x: -132
		y: ICONY_2
		title: "6"
		imageIcon: "images/afishaIcon.png"
	},
	{
		x: -66
		y: ICONY_2
		title: "7"
		imageIcon: "images/afishaIcon.png"
	},
	{
		x: 0
		y: ICONY_2
		title: "8"
		imageIcon: "images/afishaIcon.png"
	},
	{
		x: 66
		y: ICONY_2
		title: "9"
		imageIcon: "images/afishaIcon.png"
	},
	{
		x: 132
		y: ICONY_2
		title: "10"
		imageIcon: "images/afishaIcon.png"
	},
]


# Create App

getAppIndex = (appTitle) ->
	for currentData, i in data
		if currentData.title == appTitle then return i
	return -1

# addContent = (appIcon)

appLaunched = false



createApp = (dataInstance) ->
	
	afisha = new Layer
		parent: phone
		width: 360
		height: 640
		backgroundColor: "white"
		clip: true
	
	afisha.pinchable.enabled = true
	afisha.pinchable.rotate = false
	afisha.pinchable.centerOrigin = false
	afisha.pinchable.minScale = MS
	afisha.pinchable.maxScale = 1
	
	afisha.name = dataInstance.title
	afisha.scale = MS
	afisha.x = dataInstance.x
	afisha.y = dataInstance.y
	afisha.height = 360
	afisha.borderRadius = 12/MS
	
	
	afishaContent = new Layer
		parent: afisha
		width: 360
		height: 640
		backgroundColor: "white"
		image: "images/afisha.png"
		opacity: 0
	
	
	closeIcon = new Layer
		parent: afishaContent
		width: 100
		height: 60
		x: 360 - 100
		propagateEvents: true
		opacity: 0
	
	closeIcon.on Events.Tap, ->
		currentLayer = @parent.parent
		currentIndex = getAppIndex(currentLayer.name)
		appData = data[currentIndex]
		currentLayer.animate(x: appData.x, y: appData.y, scale: MS, options: {time: 0.4})
	
	
	afishaIcon = new Layer
		parent: afisha
		width: 360
		height: 360
		image: "images/afishaIcon.png"
# 		scaleY: 640/360
		originY: 0
# 		opacity: 0
	
# 	afishaBorder = new Layer
# 		parent: afisha
# 		width: 360
# 		height: 640
# 		borderWidth: 1/MS
# 		borderRadius: 12/MS
# 		borderColor: "black"
# 		backgroundColor: "null"
	
	
	
	afisha.on Events.PinchStart, (event, layer) ->
		appLaunched = false
	
	afisha.on Events.PinchEnd, (event, layer) ->
		currentIndex = getAppIndex(layer.name)
		appData = data[currentIndex]
		
		if @scale < MThreshhold
			appLaunched = false
			@animate(x: appData.x, y: appData.y, scale: MS, options: {time: 0.2})
		else
			appLaunched = true
			@animate(x: 0, y: 0, scale: 1, options: {time: 0.2})
	
	
	afisha.on "change:scale", ->
		currentIndex = getAppIndex(@name)
		appData = data[currentIndex]
		
		@borderRadius = Utils.modulate(@scale, [1, MGAP], [0, 12/MS], true)
		@height = Utils.modulate(@scale, [1, MGAP], [640, 360], true)
		@children[0].opacity = Utils.modulate(@scale, [1, MGAP], [1, 0], true)
		@children[1].scaleY = Utils.modulate(@scale, [1, MGAP], [2, 1], true)
		@children[1].opacity = Utils.modulate(@scale, [MGAP, MGAP - 0.2], [0, 1], true)
		
		if appLaunched
			@x = Utils.modulate(@scale, [1-0.2, MS], [0, appData.x], true)
		else
			@x = Utils.modulate(@scale, [1, MS], [0, appData.x], true)
		
		darker.opacity = Utils.modulate(@scale, [1, MS + 0.2], [0.5, 0], true)
		
		if @scale < MGAP
			@y = Utils.modulate(@scale, [MGAP, MS], [appData.y + DELTA_Y, appData.y], true)
		else
			@y = Utils.modulate(@scale, [1, MGAP], [0, appData.y + DELTA_Y], true)
	
	
	afisha.on Events.Tap, (event, layer) ->
		if @scale < 1
			@bringToFront()
			appLaunched = true
# 			afishaFrame.parent = @children[0]
			@animate(x: 0, y: 0, scale: 1, options: {time: 0.4})


# afishaFrame = new Layer
# 	width: 360
# 	height: 640
# 	html: "<iframe style='position: absolute; width: 100%; height: 100%; allowfullscreen;' src='https://tap-afisha.yandex.ru/'></iframe>"
# 
	# afishaFrame.sendToBack()




for currentData in data
	createApp(currentData)


statusBar = new Layer
	parent: phone, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: phone, borderRadius: 8, forceAndroidBar: true }
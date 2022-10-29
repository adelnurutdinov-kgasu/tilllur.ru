# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(238.00000101327896, 238.00000101327896, 238.00000101327896, 1)"


top = new Layer
	name: "top"
	parent: figmaView
	x: 0
	width: 360
	height: 250
	opacity: 1
	image: "images/figma/top.png"

top.states =
	"hidden":
		y: 24
	"shown":
		y: -38


alerts = new Layer
	name: "alerts"
	parent: figmaView
	x: 0
	width: 360
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"

alerts.states =
	"hidden":
		y: 280
		height: 128
	"shown":
		y: 218
		height: 312


alertHeader = new Layer
	name: "alertHeader"
	parent: alerts
	x: 0
	y: 0
	width: 360
	height: 54
	opacity: 1
	image: "images/figma/alertHeader.png"


alert1 = new Layer
	name: "alert1"
	parent: alerts
	x: 12
	y: 59
	height: 56
	opacity: 1
	backgroundColor: "rgba(245.00000059604645, 245.00000059604645, 245.00000059604645, 1)"

alert1.states =
	"hidden":
		width: 270
	"shown":
		width: 336


icon1 = new Layer
	name: "icon1"
	parent: alert1
	x: 12
	y: 14
	width: 28
	height: 28
	opacity: 1
	image: "images/figma/icon1.png"


text = new Layer
	name: "text"
	parent: alert1
	x: 48
	y: 10
	width: 244
	height: 36
	opacity: 1
	image: "images/figma/text.png"


alert2 = new Layer
	name: "alert2"
	parent: alerts
	width: 336
	height: 56
	opacity: 1
	backgroundColor: "rgba(245.00000059604645, 245.00000059604645, 245.00000059604645, 1)"

alert2.states =
	"hidden":
		x: 290
		y: 59
	"shown":
		x: 12
		y: 121


icon2 = new Layer
	name: "icon2"
	parent: alert2
	x: 12
	y: 14
	width: 28
	height: 28
	opacity: 1
	image: "images/figma/icon2.png"


text2 = new Layer
	name: "text2"
	parent: alert2
	x: 48
	y: 19
	width: 132
	height: 18
	opacity: 1
	image: "images/figma/text2.png"


alert3 = new Layer
	name: "alert3"
	parent: alerts
	width: 336
	height: 56
	opacity: 1
	backgroundColor: "rgba(245.00000059604645, 245.00000059604645, 245.00000059604645, 1)"

alert3.states =
	"hidden":
		x: 360
		y: 121
	"shown":
		x: 12
		y: 183


icon3 = new Layer
	name: "icon3"
	parent: alert3
	x: 12
	y: 12
	width: 58
	height: 32
	opacity: 1
	image: "images/figma/icon3.png"


text3 = new Layer
	name: "text3"
	parent: alert3
	x: 82
	y: 10
	width: 216
	height: 36
	opacity: 1
	image: "images/figma/text3.png"


alert4 = new Layer
	name: "alert4"
	parent: alerts
	width: 336
	height: 56
	opacity: 1
	backgroundColor: "rgba(245.00000059604645, 245.00000059604645, 245.00000059604645, 1)"

alert4.states =
	"hidden":
		x: 430
		y: 183
	"shown":
		x: 12
		y: 245


icon4 = new Layer
	name: "icon4"
	parent: alert4
	x: 12
	y: 12
	width: 52
	height: 32
	opacity: 1
	image: "images/figma/icon4.png"


text4 = new Layer
	name: "text4"
	parent: alert4
	x: 82
	y: 12
	width: 141
	height: 32
	opacity: 1
	image: "images/figma/text4.png"


news = new Layer
	name: "news"
	parent: figmaView
	x: 0
	width: 360
	height: 388
	opacity: 1
	image: "images/figma/news.png"

news.states =
	"hidden":
		y: 414
	"shown":
		y: 536


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	backgroundColor: "white"
	# image: "images/figma/statusBar.png"


bottom = new Layer
	name: "bottom"
	parent: figmaView
	x: 0
	y: 576
	width: 360
	height: 64
	opacity: 1
	image: "images/figma/bottom.png"


sceneStates = ["hidden", "shown"]
sceneLayers = [figmaView, top, alerts, alertHeader, alert1, icon1, text, alert2, icon2, text2, alert3, icon3, text3, alert4, icon4, text4, news, statusBar, bottom]

for item in sceneLayers
	try item.stateSwitch(sceneStates[0])


cycler = Utils.cycle(sceneStates)
nextState = cycler()

nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error


figmaView.on Events.Click, ->
	nextStateHandler()



# darker = new Layer
# 	width: 360
# 	height: 640
# 	backgroundColor: "black"
# 	parent: figmaView
# 
# darker.states =
# 	"shown":
# 		opacity: 0.5
# 	"hidden":
# 		opacity: 0
# darker.stateSwitch("hidden")
# 
# sceneLayers.push(darker)


for item in [alert1, alert2, alert3, alert4]
	item.clip = true
	item.borderRadius = 12

alerts.clip = true
alerts.borderRadius = 16

# darker.bringToFront()
alerts.bringToFront() 


contentScroll = new PageComponent
	width: 360
	height: 640
	scrollHorizontal: true
	scrollVertical: false

page1 = new Layer
	width: 360
	height: 640
	parent: contentScroll.content

page2 = new Layer
	width: 360
	height: 640
	x: 360
	parent: contentScroll.content

for item in [page1, page2]
	item.backgroundColor = "null"


contentScroll.on Events.Tap, ->
	contentScroll.snapToPage(page1, true, time: 0.5)


contentScroll.content.on "change:x", ->
	value = contentScroll.scrollX
	
	for item in [alert1, alert2, alert3, alert4]
		try
			item.width = Utils.modulate(value, [0, 360], [item.states.hidden.width, item.states.shown.width])
			item.y = Utils.modulate(value, [0, 360], [item.states.hidden.y, item.states.shown.y])
			item.x = Utils.modulate(value, [0, 360], [item.states.hidden.x, item.states.shown.x])
	
	for item in [alerts]
		try
			item.height = Utils.modulate(value, [0, 360], [item.states.hidden.height, item.states.shown.height])
	
	for item in [alerts, news, top]
		try
			item.y = Utils.modulate(value, [0, 360], [item.states.hidden.y, item.states.shown.y])
	
	for item in []
		try
			item.opacity = Utils.modulate(value, [0, 360], [item.states.hidden.opacity, item.states.shown.opacity])


{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16, topTheme: "light", forceAndroidBar: true }
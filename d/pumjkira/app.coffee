Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5



# Screen

{ Preview } = require "PreviewComponent"

flow = new FlowComponent
	width: 390
	height: 844

preview = new Preview { view: flow }

screen = new Layer
	name: "screen"
	width: 390
	height: 844
	x: Align.center
	y: Align.center
	image: "images/test.jpg"

flow.showNext(screen)
screen.sendToBack()

# Images

startData = [
	"images/market.png",
	"images/games.png",
	"images/maps.png",
	"images/taxi.png",
	"images/devices.png",
	"images/uslugi.png",
	"images/kinopoisk.png",
]

moreData = [
	"images/reader.png",
	"images/steps.png",
	"images/football.png",
]

# Widgets

lastOpenedWidget = null

widgetScroll = new ScrollComponent
	name: "widgetScroll"
	width: 390
	height: 120
	parent: screen
	y: 188 + 8
	scrollVertical: false
	scrollHorizontal: true
	directionLock: true
	contentInset:
		right: 16


Array::remove = (e) -> @[t..t] = [] if (t = @indexOf(e)) > -1

# setLastRecent = (widgetLayer = null) ->
# 	if widgetLayer == null then return
# 	
# 	

# 	if lastOpenedWidget != null and lastOpenedWidget.states.current.name == "normal"
# 		openedIndex = widgetScroll.content.children.indexOf(lastOpenedWidget)
# 		widgetScroll.content.children.splice(openedIndex, 1) 


addToPinned = (widgetLayer) ->
	normalArray = widgetScroll.content.children.filter (item) -> item.states.current.name == "normal"
	
	
	pinnedArray = widgetScroll.content.children.filter (item) -> item.states.current.name == "pinned"
	
	composedArray = pinnedArray.concat(normalArray)
	for item, i in composedArray
		item.x = i * (120 + 8) + 16



addWidget = (title = "Почта", index = -1) ->
	widget = createWidget(title, index)
	
	widget.x = widgetScroll.content.children.length * (120 + 8) + 16
	widget.parent = widgetScroll.content
	widgetScroll.updateContent()



createWidget = (title = "Почта", index = -1) ->
	widgetView = new Layer
		name: "widgetView"
		size: 120
		backgroundColor: Utils.randomColor()
		borderRadius: 16
	
	if index >= 0
		widgetView.image = startData[index]
		widgetView.backgroundColor = "null"
	
	
	widgetView.states =
		"normal": { opacity: 1 }
		"pinned": { opacity: 1 }
	widgetView.stateSwitch("normal")
	
	
	# widgetView.onClick ->
	# 	lastOpenedWidget = @
	# 	# flow.transition(modalView, bottomToTopTransition)
	# 	flow.transition(modalView, bottomToTopTransition)
	
	
	pin = new Layer
		name: "pin"
		parent: widgetView
		size: 24
		x: Align.right(-4)
		y: Align.top(4)
		borderRadius: 16
		backgroundColor: "black"
		animationOptions: 
			time: 0.3
			curve: Spring(damping: 1)
	
	pin.states =
		"shown": { opacity: 0.5 }
		"hidden": { opacity: 0.1 }
	pin.stateSwitch("hidden")
	
	pin.on Events.StateSwitchStart, (from, to) ->
		if to is "shown"
			@parent.stateSwitch("pinned")
		else
			@parent.stateSwitch("normal")
		
		addToPinned(@parent)
	
	pin.on Events.Click, (event, layer) ->
		event.stopPropagation()
		@stateCycle("shown", "hidden")
	
	return widgetView



for i in [0...5]
	addWidget("", i)



# Navigation

modalView = new Layer
	name: "modalView"
	width: screen.width
	height: screen.height
	backgroundColor: "white"

# modalView.sendToBack()

modalView.onTap ->
	print "?"
# 	setLastRecent(lastOpenedWidget)
	flow.showPrevious()




bottomToTopTransition = (nav, layerA, layerB, overlay = null) ->
	transition =
		layerA:
			show: { opacity: 1 }
			hide: { opacity: 0.5 }
		layerB:
			show: { y: 0 }
			hide: { y: screen.height + 40 }


flow.showNext(modalView, animate: false)
flow.showPrevious(animate: false)

topBarFix = new Layer
	name: "topBarFix"
	parent: screen, width: screen.width, height: 44
	backgroundColor: "white"

bottomBarFix = new Layer
	name: "bottomBarFix"
	parent: screen, width: screen.width, height: 34, y: Align.bottom
	backgroundColor: "white"



# preview.printTree()
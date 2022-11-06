# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "transparent"


bg = new Layer
	name: "bg"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/bg.png"


head = new Layer
	name: "head"
	parent: figmaView
	x: 0
	y: 24
	width: 360
	height: 304
	opacity: 1
	image: "images/figma/head.png"


feed = new Layer
	name: "feed"
	parent: figmaView
	x: 0
	width: 360
	height: 360
	opacity: 1
	image: "images/figma/feed.png"

feed.states =
	"hidden":
		y: 428
	"shown":
		y: 328


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	image: "images/figma/statusBar.png"


site = new Layer
	name: "site"
	parent: figmaView
	x: 0
	y: 24
	width: 360
	height: 559
	image: "images/figma/site.png"

site.states =
	"hidden":
		opacity: 1
	"shown":
		opacity: 0


omni = new Layer
	name: "omni"
	parent: figmaView
	x: 0
	y: 552
	width: 360
	height: 88
	image: "images/figma/omni.png"

omni.states =
	"hidden":
		opacity: 1
	"shown":
		opacity: 0


sceneStates = ["hidden", "shown"]
sceneLayers = [figmaView, bg, head, feed, statusBar, site, omni]

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


figmaView.clip = true
figmaView.borderRadius = 8

# figmaView.center()

# Canvas.backgroundColor = "#111"

nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			if nextState is "shown"
				feed.stateSwitch("hidden")
		
			if nextState is "hidden" and item is feed
				item.animate(opacity: item.states.hidden.opacity, time: 0.1)
			else if nextState is "hidden"
				item.animate(nextState, time: 0.1)
			
			else if item is omni and nextState is "shown"
				item.animate(nextState, time: 0.1)
			else if item is site and nextState is "shown"
				item.animate(nextState, time: 0.1)
			else
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
			
# 			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error


figmaView.on Events.Click, ->
	nextStateHandler()



statusBar = new Layer
	parent: figmaView, width: screen.width, height: 20, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8, statusBar: "light", forceAndroidBar: true }
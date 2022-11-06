# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


contentView = new Layer
	name: "contentView"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/contentView.png"


darker = new Layer
	name: "darker"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/darker.png"


bottomBar = new Layer
	name: "bottomBar"
	parent: figmaView
	x: 0
	y: 592
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/bottomBar.png"


bottomBarWhiter = new Layer
	name: "bottomBarWhiter"
	parent: figmaView
	x: 0
	y: 592
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/bottomBarWhiter.png"


view = new Layer
	name: "view"
	parent: figmaView
	x: 0
	y: 336
	width: 360
	height: 256
	opacity: 1
	image: "images/figma/view.png"


sceneStates = ["велком"]
sceneLayers = [figmaView, contentView, darker, bottomBar, bottomBarWhiter, view]

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

view.originX = 0.3
view.originY = 1.2
view.placeBehind(bottomBar)

view.states.hidden =
	scale: 0.1
view.states.shown =
	scale: 1

view.stateSwitch("hidden")


# iOS
# figmaView.on Events.Tap, ->
# 	view.animate("hidden", curve: Spring(damping: 1), time: 0.4)
# 	bottomBarWhiter.animate(opacity: 0, { time: 0.3 } )
# 	darker.animate(opacity: 0, { time: 0.3 } )
# 
# Utils.delay 1, ->
# 	view.animate("shown", curve: Spring(damping: 1), time: 0.4)

# Android
figmaView.on Events.Tap, ->
	view.stateSwitch("hidden")
	bottomBarWhiter.animate(opacity: 0, { time: 0.24 } )
	darker.animate(opacity: 0, { time: 0.24 } )

Utils.delay 1, ->
	view.animate("shown", curve: Bezier.easeOut, time: 0.24 )



statusBar = new Layer
	parent: figmaView
	width: figmaView.width
	height: 24
	backgroundColor: "white"

statusBar.placeBefore(contentView)
	

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8, topTheme: "light", forceAndroidBar: true }
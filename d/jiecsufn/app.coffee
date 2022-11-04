# Use desktop cursor
document.body.style.cursor = "auto"

# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 200
	height: 200
	opacity: 1
	backgroundColor: "white"


bg = new Layer
	name: "bg"
	parent: figmaView
	x: 0
	y: 0
	width: 208
	height: 164
	opacity: 1
	image: "images/figma/bg.png"


message = new Layer
	name: "message"
	parent: figmaView
	x: 14
	y: 54
	width: 180
	height: 102
	opacity: 1
	image: "images/figma/message.png"


dots = new Layer
	name: "dots"
	parent: figmaView
	x: 29
	y: 43
	width: 30
	height: 6
	opacity: 1
	backgroundColor: "transparent"


dot0 = new Layer
	name: "dot0"
	parent: dots
	x: 0
	y: 0
	width: 6
	height: 6
	opacity: 1
	image: "images/figma/dot0.png"


dot1 = new Layer
	name: "dot1"
	parent: dots
	x: 12
	y: 0
	width: 6
	height: 6
	opacity: 1
	image: "images/figma/dot1.png"


dot2 = new Layer
	name: "dot2"
	parent: dots
	x: 24
	y: 0
	width: 6
	height: 6
	opacity: 1
	image: "images/figma/dot2.png"


sceneStates = ["notification"]
sceneLayers = [figmaView, bg, message, dots, dot0, dot1, dot2]

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


for dot, i in dots.children
	dot.image = "null"
	dot.backgroundColor = "black"
	dot.borderRadius = "100%"
	dot.states =
		"shown":
			opacity: 1
		"hidden":
			opacity: 0.4
	
	if i != 0 then dot.stateSwitch("hidden")

scrollView = new PageComponent
	scrollVertical: false
	width: message.width
	height: message.height
	parent: figmaView
	borderRadius: 5
	x: message.x
	y: message.y

scrollView.addPage(message)
scrollView.addPage(message.copy())
scrollView.addPage(message.copy())
scrollView.addPage(message.copy())
scrollView.addPage(message.copy())
scrollView.addPage(message.copy())

# figmaView.center()

scrollView.on "change:currentPage", ->
	currentIndex = -1
	for item, i in scrollView.content.children
		if item == scrollView.currentPage
			currentIndex = i
	
	currentIndex = currentIndex % 3
	for item, i in dots.children
		if i == currentIndex
			item.stateSwitch("shown")
		else
			item.stateSwitch("hidden")

nextStep = () ->
	scrollView.snapToNextPage()
	Utils.delay 2, ->
		nextStep()

nextStep()



screen = new Layer
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "white"

figmaView.parent = screen
figmaView.center()

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 8, topTheme: "light", forceAndroidBar: true  }
# preview.printTree()
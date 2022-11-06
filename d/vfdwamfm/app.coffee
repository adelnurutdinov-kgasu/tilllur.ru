# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	x: 0
	y: 0
	width: 360
	height: 720
	opacity: 1
	image: "images/figma/figmaView.png"


wallpaper = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 720
	opacity: 1
	image: "images/figma/wallpaper.png"


cardsView = new Layer
	parent: figmaView
	x: 0
	y: 302
	width: 360
	opacity: 1
	image: "images/figma/cardsView.png"

cardsView.states =
	"base":
		height: 90
	"swiped":
		height: 169


feedView = new Layer
	parent: figmaView
	width: 360
	height: 228
	opacity: 1
	image: "images/figma/feedView.png"

feedView.states =
	"base":
		x: 0
		y: 392
	"swiped":
		x: -360
		y: 471


newsView = new Layer
	parent: figmaView
	width: 360
	height: 408
	opacity: 1
	image: "images/figma/newsView.png"

newsView.states =
	"base":
		x: 360
		y: 393
	"swiped":
		x: 0
		y: 471


topView = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 302
	opacity: 1
	image: "images/figma/topView.png"


bottomBar = new Layer
	parent: figmaView
	x: 0
	y: 620
	width: 360
	height: 100
	opacity: 1
	image: "images/figma/bottomBar.png"


statusBar = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 32
	opacity: 1
	backgroundColor: "rgba(0,0,0,1.0)"
	# image: "images/figma/statusBar.png"


sceneStates = ["base", "swiped"]
sceneLayers = [figmaView, wallpaper, cardsView, feedView, newsView, topView, bottomBar, statusBar]

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
figmaView.borderRadius = 20

cardsView.image = null
# newsView.states.swiped.y = 481

# cardsView.clip = true

# Cards Masks

cardsView.states =
	"base":
		x: 0
	"swiped":
		x: -168

card1 = new Layer
	width: 160
	height: 90
	parent: cardsView
	x: 16
	borderRadius: 12
	backgroundColor: "white"
	

card2 = new Layer
	width: 328
	height: 90
	parent: cardsView
	x: 16 + 160 + 8
	borderRadius: 12
	backgroundColor: "white"

card2.states =
	"base":
		height: 90
	"swiped":
		height: 169

sceneLayers.push(card2)

card2.clip = true

card_1_content.parent = card1
card_1_content.x = 0
card_1_content.y = 0

card_2_content.parent = card2
card_2_content.x = 0
card_2_content.y = 0

whiter.parent = card2
whiter.x = 0
whiter.y = card2.height - whiter.height

whiter.states =
	"base":
		y: 90-33
	"swiped":
		y: 169-33

sceneLayers.push(whiter)


{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16, statusBar: "light" }
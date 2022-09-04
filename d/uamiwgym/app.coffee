retina = 1

document.body.style.cursor = "auto"

screen = new Layer
	width: 1120, height: 720, backgroundColor: null

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, visible: false }


# View
browser = new Layer
	width: 1120*retina
	height: 720*retina
	x: -10*retina
	y: -3*retina
	image: "images/browser.png"

focus = new Layer
	borderRadius: 2*retina
	backgroundColor: "rgba(252,252,252,1)"
	shadowColor: "rgba(51,51,51,0.29)"

focus.states =
	"base":
		width: 95*retina
		height: 27*retina
		x: 787*retina
		y: 35*retina
		shadowY: 0*retina
		shadowBlur: 0*retina
	"show":
		width: 109*retina
		height: 48*retina
		x: 780*retina
		y: 24*retina
		shadowY: 12*retina
		shadowBlur: 24*retina

focus.stateSwitch("base")

info = new Layer
	width: 82*retina
	height: 16*retina
	x: 794*retina
	y: 40*retina
	image: "images/info.png"


# Model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["base", "show"]
sceneItems = [browser, focus, info]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()


# Custom
nextStateHandler = () ->
	nextState = cycler()
	for item in sceneItems
		try
			item.animate(nextState, curve: "spring(100, 30, 0)")
	
	Utils.delay 0.5, ->
		nextState = cycler()
		for item in sceneItems
			try
				item.animate(nextState, curve: "spring(200, 30, 0)", delay: 0.1)

screen.on Events.Click, ->
	nextStateHandler()

for item in sceneItems
	item.parent = screen
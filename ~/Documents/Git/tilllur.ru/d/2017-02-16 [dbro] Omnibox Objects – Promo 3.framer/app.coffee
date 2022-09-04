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

description = new Layer
	width: 295*retina
	height: 14*retina
	y: 43*retina
	image: "images/description.png"

description.states =
	"init":
		x: 250*retina
	"base":
		x: 408*retina
	"clicked":
		x: 250*retina

description.stateSwitch("init")

address = new Layer
	width: 46*retina
	height: 11*retina
	y: 43*retina
	image: "images/address.png"
	opacity: 0.5

address.states =
	"init":
		x: 195*retina
	"base":
		x: 353*retina
	"clicked":
		x: 195*retina

address.stateSwitch("init")

view = new Layer
	height: 20*retina
	x: 167*retina
	y: 38*retina
	borderRadius: 1*retina
	backgroundColor: "rgba(235,235,235,1)"

view.states =
	"init":
		width: 20*retina
	"base":
		width: 176*retina
	"clicked":
		width: 20*retina

view.stateSwitch("init")

pin = new Layer
	width: 8*retina
	height: 12*retina
	x: 173*retina
	y: 43*retina
	image: "images/pin.png"

info = new Layer
	width: 149*retina
	height: 12*retina
	x: 186*retina
	y: 44*retina
	image: "images/info.png"

info.states =
	"init":
		opacity: 0
	"base":
		opacity: 1
	"clicked":
		opacity: 0

info.stateSwitch("init")

modal = new Layer
	width: 432*retina
	height: 654*retina
	x: -4*retina
	y: 50*retina
	image: "images/modal.png"

modal.states =
	"init":
		opacity: 0
	"clicked":
		opacity: 1
	"closed":
		opacity: 0

modal.stateSwitch("init")


# Model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["init", "base", "clicked", "closed"]
sceneItems = [browser, description, address, view, pin, info, modal]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()


# Custom
nextStateHandler = () ->
	nextState = cycler()
	for item in sceneItems
		try
			if item is info then item.animate(nextState, curve: "spring(400, 30, 40)")
			else if item is modal then item.stateSwitch(nextState)
			else item.animate(nextState, curve: "spring(200, 30, 10)")
		catch error

screen.on Events.Click, ->
	nextStateHandler()

for item in sceneItems
	item.parent = screen
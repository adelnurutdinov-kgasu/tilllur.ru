retina = 1

screen = new Layer
	width: 360, height: 640 + 32
	backgroundColor: "#333"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screen, width: 360, height: 640
	y: 32

# View
bg = new Layer
	width: 360*retina
	height: 44*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(51,51,51,1)"

skip = new Layer
	width: 77*retina
	height: 13*retina
	x: 267*retina
	y: 16*retina
	image: "images/skip.png"
	opacity: 0.7

yandex_step = new Layer
	borderRadius: "100%"
	backgroundColor: "rgba(255,255,255,1)"

yandex_step.states =
	"general":
		width: 10*retina
		height: 10*retina
		x: 167*retina
		y: 17*retina
		opacity: 0
	"appear":
		width: 20*retina
		height: 20*retina
		x: 162*retina
		y: 12*retina
		opacity: 0.9
	"third":
		width: 8*retina
		height: 8*retina
		x: 168*retina
		y: 18*retina
		opacity: 0.2

yandex_step.stateSwitch("general")

letter = new Layer
	image: "images/letter.png"

letter.states =
	"general":
		width: 4*retina
		height: 6*retina
		x: 170*retina
		y: 19*retina
		opacity: 0
	"appear":
		width: 7*retina
		height: 12*retina
		x: 168*retina
		y: 16*retina
		opacity: 1
	"third":
		width: 3*retina
		height: 6*retina
		x: 170*retina
		y: 19*retina
		opacity: 0

letter.stateSwitch("general")

step_1 = new Layer
	width: 8*retina
	height: 8*retina
	y: 18*retina
	borderRadius: "100%"
	backgroundColor: "rgba(255,255,255,1)"

step_1.states =
	"general":
		x: 160*retina
		opacity: 1
	"appear":
		x: 146*retina
		opacity: 0.2
	"third":
		x: 152*retina

step_1.stateSwitch("general")

step_2 = new Layer
	width: 8*retina
	height: 8*retina
	y: 18*retina
	borderRadius: "100%"
	backgroundColor: "rgba(255,255,255,1)"

step_2.states =
	"general":
		x: 176*retina
		opacity: 0.2
	"appear":
		x: 190*retina
	"third":
		x: 184*retina
		opacity: 1

step_2.stateSwitch("general")

step_3 = new Layer
	width: 8*retina
	height: 8*retina
	y: 18*retina
	borderRadius: "100%"
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.2

step_3.states =
	"general":
		x: 192*retina
	"appear":
		x: 206*retina
	"third":
		x: 200*retina

step_3.stateSwitch("general")

close = new Layer
	width: 14*retina
	height: 14*retina
	x: 15*retina
	y: 15*retina
	image: "images/close.png"
	opacity: 0.5


# Model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["general", "appear", "third"]
sceneItems = [bg, skip, yandex_step, letter, step_1, step_2, step_3, close]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()


# Custom

navbar = new Layer
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"



auth = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	image: "images/auth.png"

auth.states =
	"third": { x: -360*retina }
	"shown": { x: 0*retina }
	"hidden": { x: 360*retina }
auth.stateSwitch("hidden")

bgScreen = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	image: "images/bg.png"

bgScreen.states =
	"shown": { x: 0*retina }
	"hidden": { x: -360*retina }
	"third": { x: -720*retina }
bgScreen.stateSwitch("shown")

bookmarks = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	image: "images/bookmarks.png"

bookmarks.states =
	"third": { x: 720*retina }
	"hidden": { x: 360*retina }
	"shown": { x: 0*retina }
bookmarks.stateSwitch("shown")




for item in [auth, bgScreen, bookmarks]
	item.sendToBack()


nextStateHandler = () ->
	nextState = cycler()
	for item in sceneItems
		try
			item.animate(nextState, curve: "spring(200, 30, 0)")
		catch error

Canvas.backgroundColor = "#232323"

flag = 0
screen.on Events.Click, ->
	if flag == 0
		bgScreen.animate("hidden", curve: "spring(200, 30, 0)")
		auth.animate("shown", curve: "spring(200, 30, 0)")
		bookmarks.animate("hidden", curve: "spring(200, 30, 0)")
	else if flag == 1
		bgScreen.animate("third", curve: "spring(200, 30, 0)")
		auth.animate("third", curve: "spring(200, 30, 0)")
		bookmarks.animate("shown", curve: "spring(200, 30, 0)")
	else
		bgScreen.animate("shown", curve: "spring(200, 30, 0)")
		auth.animate("hidden", curve: "spring(200, 30, 0)")
		bookmarks.animate("third", curve: "spring(200, 30, 0)")
		
		flag = -1
	
	nextStateHandler()
	
	flag++


for item in [bookmarks, bgScreen, auth, bg, skip, yandex_step, letter, step_1, step_2, step_3, close, cycleButton, navbar]
	item.parent = tempView
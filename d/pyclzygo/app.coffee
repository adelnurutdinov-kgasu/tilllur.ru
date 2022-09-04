retina = 1

screenView = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(50,50,50,1)"

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }


# view
screen = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(51,51,51,1)"

title_step_2_card = new Layer
	width: 360*retina
	height: 170*retina
	x: 0*retina
	y: 24*retina
	image: "images/title step 2 card.png"

card_shape = new Layer
	width: 113*retina
	height: 164*retina
	x: 52*retina
	y: 262*retina
	image: "images/card shape.png"

card_fill = new Layer
	width: 113*retina
	x: 52*retina
	backgroundColor: "rgba(204,204,204,1)"

card_fill.states =
	"base":
		height: 1*retina
		y: 426*retina
	"done":
		height: 164*retina
		y: 262*retina

card_fill.stateSwitch("base")

cover = new Layer
	width: 360*retina
	height: 220*retina
	x: 0*retina
	y: 240*retina
	image: "images/cover.png"

fill_phone = new Layer
	width: 114*retina
	x: 192*retina
	backgroundColor: "rgba(204,204,204,1)"

fill_phone.states =
	"base":
		height: 165*retina
		y: 263*retina
	"done":
		height: 2*retina
		y: 426*retina

fill_phone.stateSwitch("base")

data_2 = new Layer
	width: 68*retina
	height: 40*retina
	x: 215*retina
	y: 322*retina
	image: "images/data 2.png"

data_1 = new Layer
	width: 68*retina
	height: 40*retina
	x: 74*retina
	y: 321*retina
	image: "images/data 1.png"

top_section = new Layer
	width: 360*retina
	height: 68*retina
	x: 0*retina
	y: 0*retina
	image: "images/top section.png"

bottom_section = new Layer
	width: 360*retina
	height: 174*retina
	x: 0*retina
	y: 466*retina
	image: "images/bottom section.png"

bitmap = new Layer
	width: 18*retina
	height: 18*retina
	x: 60*retina
	y: 492*retina
	image: "images/Bitmap.png"

bitmap.states =
	"base":
		opacity: 0
	"done":
		opacity: 1

bitmap.stateSwitch("base")


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["base", "done"]
sceneItems = [screen, title_step_2_card, card_shape, card_fill, cover, fill_phone, data_2, data_1, top_section, bottom_section, bitmap]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

nextStateHandler = () ->
	nextState = cycler()
	for item in sceneItems
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error

screen.on Events.Click, ->
	nextStateHandler()



# mine logic
Utils.delay 0.5, ->
	nextStateHandler()

for item in sceneItems
	item.parent = screenView

statusBar = new Layer
	parent: screenView, width: screen.width, height: 24, backgroundColor: "333"
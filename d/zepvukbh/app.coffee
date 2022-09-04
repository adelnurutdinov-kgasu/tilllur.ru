
screen = new Layer
	width: 1382, height: 720, backgroundColor: null, clip: true

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, visible: false }


Framer.Defaults.Animation =
	curve: "ease-in-out"

# view
bg = new Layer width: 1285, height: 794, x: 0, y: 0, image: "images/bg.png"

promo = new Layer width: 1286, height: 300, x: -1, image: "images/promo.png"

promo.states.add {
	base: { y: 794}
	shown: { y: 514}
}
promo.states.switchInstant "base"


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["base", "shown"]
items = [bg, promo]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

moveNext = () ->
	nextState = cycler()
	for item in items
		try
			item.states.switch(nextState)
		catch error

screen.on Events.Click, ->
	moveNext()

# Utils.delay 3, ->
moveNext()


for item in [bg, promo, cycleButton]
	item.parent = screen
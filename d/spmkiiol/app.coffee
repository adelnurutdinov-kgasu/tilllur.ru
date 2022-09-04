retina = 1

screen = new Layer
	width: 1440, height: 840, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16,  visible: false }

# view
bg_block = new Layer width: 1440*retina, height: 1000*retina, x: 0*retina, y: 0*retina, image: "images/bg block.png"

slider = new Layer width: 4299*retina, height: 420*retina, y: 166*retina, image: "images/slider.png"

slider.states.add {
	slide_1: { x: 405*retina}
	slide_2: { x: -394*retina}
	slide_3: { x: -1192*retina}
	slide_3f: { x: -1881*retina}
	slide_4: { x: -2573*retina}
	slide_5: { x: -3264*retina}
}
slider.states.switchInstant "slide_1"


# model
# cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["slide_1", "slide_2", "slide_3", "slide_3f", "slide_4", "slide_5"]
items = [bg_block, slider]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screen.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error

for item in items
	item.parent = screen
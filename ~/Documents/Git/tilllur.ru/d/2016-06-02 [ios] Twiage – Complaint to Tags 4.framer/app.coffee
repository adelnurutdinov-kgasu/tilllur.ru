retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


# view
bg = new Layer width: 375*retina, x: 0*retina, image: "images/bg.png"

bg.states.add {
	1: { height: 667*retina, y: 0*retina}
	3: { height: 28*retina, y: 672*retina}
	4: { height: 667*retina, y: 0*retina}
}
bg.states.switchInstant "1"

comp_bg = new Layer width: 375*retina, height: 546.9999999999999*retina, x: 0*retina, y: 120*retina, backgroundColor: "rgba(255,255,255,1)"

tags_1 = new Layer width: 375*retina, height: 483*retina, x: 0*retina, image: "images/tags 1.png"

tags_1.states.add {
	1: { y: 660*retina, opacity: 1}
	2: { y: 189*retina}
	3: { y: 660*retina}
	4: { opacity: 0}
}
tags_1.states.switchInstant "1"

tags_2 = new Layer width: 375*retina, height: 483*retina, x: 0*retina, image: "images/tags 2.png"

tags_2.states.add {
	1: { y: 660*retina, opacity: 1}
	2: { opacity: 0}
	3: { opacity: 1}
	4: { y: 189*retina}
}
tags_2.states.switchInstant "1"

grid = new Layer width: 344*retina, height: 385*retina, x: 16*retina, image: "images/grid.png"

grid.states.add {
	1: { y: 141*retina}
	2: { y: -243*retina}
	3: { y: 141*retina}
	4: { y: -243*retina}
}
grid.states.switchInstant "1"

selected_complaint_done_1 = new Layer width: 375*retina, height: 70*retina, x: 0*retina, image: "images/selected complaint done 1.png"

selected_complaint_done_1.states.add {
	1: { y: 50*retina, opacity: 1}
	2: { y: 120*retina}
	3: { y: 50*retina}
	4: { opacity: 0}
}
selected_complaint_done_1.states.switchInstant "1"

selected_complaint_done_2 = new Layer width: 375*retina, height: 70*retina, x: 0*retina, image: "images/selected complaint done 2.png"

selected_complaint_done_2.states.add {
	1: { y: 50*retina, opacity: 1}
	2: { opacity: 0}
	3: { opacity: 1}
	4: { y: 120*retina}
}
selected_complaint_done_2.states.switchInstant "1"

fixed = new Layer width: 374.99999999999983*retina, height: 120*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(219,219,219,1)"

top_block = new Layer width: 375*retina, height: 154*retina, x: 0*retina, y: -36*retina, image: "images/top block.png"


# model
# cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["1", "2", "3", "4"]
items = [bg, comp_bg, tags_1, tags_2, grid, selected_complaint_done_1, selected_complaint_done_2, fixed, top_block]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screen.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 0.9), time: 0.7)
		catch error

for item in items
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(251,254,254,1)"

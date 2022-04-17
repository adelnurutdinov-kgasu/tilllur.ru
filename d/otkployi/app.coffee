screenView = new Layer
	width: 375, height: 667, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screenView, width: screenView.width * 2, height: screenView.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "black"



# view
color = new Layer width: 750, height: 1334, x: 0, y: 184, image: "images/color.png"

zen = new Layer width: 662, height: 1504, x: 44, image: "images/zen.png"

zen.states.add {
	base: { y: 492}
	read: { y: 286}
	read_scrolled: { y: -94}
}
zen.states.switchInstant "base"

keyboard = new Layer width: 750, height: 432, x: 0, image: "images/keyboard.png"

keyboard.states.add {
	base: { y: 902}
	read: { y: 1334}
}
keyboard.states.switchInstant "base"

breaker = new Layer width: 750, height: 88, x: 0, y: 184, image: "images/breaker.png"

breaker.states.add {
	base: { opacity: 0}
	read: { opacity: 1}
}
breaker.states.switchInstant "base"

tabs = new Layer width: 930, height: 196, x: 48, image: "images/tabs.png"

tabs.states.add {
	base: { y: 232}
	read: { y: -48}
}
tabs.states.switchInstant "base"

screen = new Layer width: 750, height: 184, x: 0, y: 0, image: "images/screen.png"


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["base", "read", "read_scrolled"]
items = [color, zen, keyboard, breaker, tabs, screen]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()



screenView.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error

for item in items
	item.parent = tempView

statusBar = new Layer
	parent: screen, width: screen.width, height: 40, backgroundColor: "black"

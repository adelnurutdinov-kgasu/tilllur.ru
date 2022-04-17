
Framer.Defaults.Animation =
	curve: "spring(200,20,0)"

screenView = new Layer
	width: 375, height: 667, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screenView, width: screenView.width * 2, height: screenView.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "black"


# view
screen = new Layer width: 750, height: 1334, x: 0, y: 0, image: "images/screen.png"
tabs_ui = new Layer width: 682, height: 1236, x: 46, y: 74, image: "images/tabs ui.png"

tabs_ui.states.add {
	face: { opacity: 0}
	tabs: { opacity: 1}
}
tabs_ui.states.switchInstant "face"

new_tab = new Layer borderRadius: 8, backgroundColor: "rgba(250,250,250,0.07999999821186066)", borderWidth: 4, borderColor: "rgba(255,255,255,0.5)"

new_tab.states.add {
	face: { width: 750, height: 1334, x: 0, y: 0, opacity: 0.0}
	tabs: { width: 494, height: 820, x: 128, y: 282, opacity: 1}
}
new_tab.states.switchInstant "face"

logo = new Layer width: 268, height: 104, x: 238, image: "images/logo.png"

logo.states.add {
	face: { y: 248, opacity: 1}
	tabs: { y: 348, opacity: 0.0}
}
logo.states.switchInstant "face"

left = new Layer width: 494, height: 820, x: -382, y: 282, borderRadius: 8, backgroundColor: "rgba(255,255,255,1)"

left.states.add {
	face: { opacity: 0}
	tabs: { opacity: 1}
}
left.states.switchInstant "face"

bar = new Layer width: 750, height: 1450, x: 0, image: "images/bar.png", style: {"-webkit-filter": "drop-shadow(0px 0px 4px rgba(0,0,0,0.2))"}

bar.states.add {
	face: { y: 588 }
	tabs: { y: 1400 }
}
bar.states.switchInstant "face"

status_bar = new Layer width: 728, height: 30, x: 12, y: 6, image: "images/status bar.png"

# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["face", "tabs"]
items = [screen, tabs_ui, new_tab, logo, left, bar, status_bar]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screenView.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.states.switch(nextState)
		catch error

status_bar.opacity = 0

for item in items
	item.parent = tempView
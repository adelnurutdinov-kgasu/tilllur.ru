
screen = new Layer
	width: 375, height: 667, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0.2, backgroundColor: "black"


# view
omni_bg = new Layer width: 750, height: 112, x: 0, y: 0, image: "images/omni bg.png"

search_bar_bg = new Layer width: 240, height: 72, x: 24, y: 20, borderRadius: 4, backgroundColor: "rgba(216,216,216,1)"

search_bar_shape = new Layer width: 402, height: 72, y: 20, image: "images/search bar shape.png"

search_bar_shape.states.add {
	search: { x: 184}
	base: { x: 242}
}
search_bar_shape.states.switchInstant "search"

focustext = new Layer height: 36, y: 38, backgroundColor: "rgba(184,201,219,1)"

focustext.states.add {
	search: { width: 332, x: 40, opacity: 1}
	base: { width: 248, x: 202, opacity: 0}
}
focustext.states.switchInstant "search"

address = new Layer width: 236, height: 34, y: 42, image: "images/address.png"

address.states.add {
	search: { x: 132}
	base: { x: 208}
}
address.states.switchInstant "search"

http = new Layer width: 90, height: 32, y: 42, image: "images/http.png"

http.states.add {
	search: { x: 42, opacity: 1}
	base: { x: 118, opacity: 0}
}
http.states.switchInstant "search"

tabs_icom = new Layer width: 44, height: 54, y: 28, image: "images/tabs icom.png"

tabs_icom.states.add {
	search: { x: 634, opacity: 0}
	base: { x: 674, opacity: 1}
}
tabs_icom.states.switchInstant "search"

cancel = new Layer width: 98, height: 28, y: 40, image: "images/cancel.png"

cancel.states.add {
	search: { x: 618, opacity: 1}
	base: { x: 646, opacity: 0}
}
cancel.states.switchInstant "search"

refresh_icon = new Layer width: 28, height: 34, y: 38, image: "images/refresh icon.png"

refresh_icon.states.add {
	search: { x: 524, opacity: 0}
	base: { x: 582, opacity: 1}
}
refresh_icon.states.switchInstant "search"

clear = new Layer width: 28, height: 28, y: 42, image: "images/clear.png"

clear.states.add {
	search: { x: 526, opacity: 1}
	base: { x: 582, opacity: 0}
}
clear.states.switchInstant "search"

protect_icon = new Layer width: 24, height: 32, x: 48, y: 40, image: "images/protect icon.png"

protect_icon.states.add {
	search: { opacity: 0}
	base: { opacity: 1}
}
protect_icon.states.switchInstant "search"

omni_bar_elems = [omni_bg, search_bar_bg, search_bar_shape, focustext, address, http, tabs_icom, cancel, refresh_icon, clear, protect_icon]



# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["search", "base"]
items = [omni_bg, search_bar_bg, search_bar_shape, focustext, address, http, tabs_icom, cancel, refresh_icon, clear, protect_icon]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screen.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.states.switch(nextState, time: 0.2)
		catch error


for item in items
	item.parent = tempView

tempLayer = new Layer
	parent: tempView
	height: 962
	width: 750
	y: 105
	backgroundColor: "rgba(245,245,245,1)"
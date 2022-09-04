
Framer.Defaults.Animation =
	curve: "spring(200,20,10)"


screen = new Layer
	width: 375, height: 667, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "black"



# view
yandex_bg = new Layer width: 750, height: 1334, x: 0, y: 0, image: "images/yandex bg.png"
darker = new Layer width: 750, height: 1334, x: 0, y: 0, backgroundColor: "rgba(0,0,0,0.4)"
status_bar_bg = new Layer width: 750, height: 40, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1)"

status_bar_bg.states.add {
	site: { opacity: 1}
	tabs: { opacity: 0.0}
}
status_bar_bg.states.switchInstant "site"

status_bar = new Layer width: 728, height: 30, x: 12, y: 6, image: "images/status bar.png"
new_tab = new Layer borderRadius: 8, backgroundColor: "rgba(250,250,250,0.07999999821186066)", borderWidth: 4, borderColor: "rgba(255,255,255,0.5)"

new_tab.states.add {
	site: { width: 494, height: 820, x: 638, y: 282, opacity: 0}
	tabs: { width: 494, height: 820, x: 638, y: 282, opacity: 1}
	tabs_to_new: { width: 494, height: 820, x: 128, y: 282, opacity: 1}
	new_tab: { width: 750, height: 1278, x: 0, y: 0, opacity: 0.0}
}
new_tab.states.switchInstant "site"

logo = new Layer image: "images/logo.png"

logo.states.add {
	site: { width: 268, height: 104, x: 748, y: 370, opacity: 0}
	tabs: { width: 268, height: 104, x: 748, y: 370, opacity: 1}
	tabs_to_new: { width: 268, height: 104, x: 238, y: 370, opacity: 1}
	new_tab: { width: 322, height: 124, x: 212, y: 240, opacity: 1}
}
logo.states.switchInstant "site"

left = new Layer width: 494, height: 820, y: 282, borderRadius: 8, backgroundColor: "rgba(255,255,255,1)"

left.states.add {
	site: { x: -382, opacity: 0}
	tabs: { x: -382, opacity: 1}
	tabs_to_new: { x: -892, opacity: 1}
}
left.states.switchInstant "site"

site_1 = new Layer image: "images/site 1.png"

site_1.states.add {
	site: { width: 750, height: 1240, x: 0, y: 40}
	tabs: { width: 496, height: 816, x: 128, y: 282}
	tabs_to_new: { width: 496, height: 816, x: -382, y: 282}
	new_tab: { width: 496, height: 816, x: -502, y: 282}
}
site_1.states.switchInstant "site"

bar = new Layer width: 750, height: 1450, x: 0, image: "images/bar.png", style: {"-webkit-filter": "drop-shadow(0px 0px 4px rgba(0,0,0,0.2))"}

bar.states.add {
	site: { y: 80}
	tabs: { y: 1228}
	new_tab: { y: 584}
}
bar.states.switchInstant "site"

sites = new Layer width: 1392, height: 370, image: "images/sites.png"

sites.states.add {
	site: { x: 28, y: 240}
	tabs: { x: -168, y: 1388}
	new_tab: { x: -168, y: 744}
}
sites.states.switchInstant "site"


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["site", "tabs", "tabs_to_new", "new_tab"]
items = [yandex_bg, darker, status_bar_bg, status_bar, new_tab, logo, left, site_1, bar, sites]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()






nextStateHandler = (event, layer) ->
	nextState = cycler()
	for item in items
		try
			if nextState == "site" then item.stateSwitch(nextState)
			else
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error

screen.on Events.Click, ->
	if nextState is "site"
		nextStateHandler()
		Utils.delay 0.4, ->
			nextStateHandler()
		Utils.delay 0.6, ->
			nextStateHandler()
	else
		nextStateHandler()

status_bar.opacity = 0

for item in items
	item.parent = tempView


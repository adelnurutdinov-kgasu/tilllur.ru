
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
logo = new Layer width: 322, height: 124, x: 212, y: 240, image: "images/logo.png"

logo.states.add {
	site_selected: { opacity: 0.0}
	new_tab: { opacity: 1}
	site_loading: { opacity: 0.0}
}
logo.states.switchInstant "site_selected"

site_1 = new Layer width: 750, height: 1240, x: 0, y: 40, image: "images/site 1.png"

site_1.states.add {
	site_selected: { y: 40, opacity: 1}
	new_tab: { y: 584, opacity: 0.0 }
	site_loading: { y: 40, opacity: 0.0 }
}
site_1.states.switchInstant "site_selected"

blank_page = new Layer width: 750, height: 1334, x: 0, y: 0, backgroundColor: "rgba(228,229,228,1)"

blank_page.states.add {
	site_selected: { opacity: 0}
	site_loading: { opacity: 1}
}
blank_page.states.switchInstant "site_selected"

site_darker = new Layer width: 750, height: 1334, x: 0, y: 0

site_darker.states.add {
	site_selected: { backgroundColor: "rgba(0,0,0,0)", opacity: 1}
	site: { backgroundColor: "rgba(0,0,0,0.6)", opacity: 1}
	new_tab: { backgroundColor: "rgba(0,0,0,0.6)", opacity: 0.0}
	site_loading: { backgroundColor: "rgba(0,0,0,0)", opacity: 1}
}
site_darker.states.switchInstant "site_selected"

new_tab = new Layer width: 494, height: 820, x: 766, y: 282, borderRadius: 8, backgroundColor: "rgba(250,250,250,0.07999999821186066)", borderWidth: 4, borderColor: "rgba(255,255,255,0.5)"

new_tab.states.add {
	site_selected: { opacity: 1}
	site: { opacity: 0}
	site_loading: { opacity: 1}
}
new_tab.states.switchInstant "site_selected"

status_bar_bg = new Layer width: 750, height: 40, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1)"

status_bar_bg.states.add {
	site_selected: { opacity: 1}
	new_tab: { opacity: 0.0}
}
status_bar_bg.states.switchInstant "site_selected"

status_bar = new Layer width: 728, height: 24, x: 12, y: 12, image: "images/status bar.png"
bar = new Layer width: 750, height: 1450, x: 0, image: "images/bar.png", style: {"-webkit-filter": "drop-shadow(0px 0px 4px rgba(0,0,0,0.2))"}

bar.states.add {
	site_selected: { y: 1224}
	site: { y: 80}
	new_tab: { y: 584}
	site_loading: { y: 1224}
}
bar.states.switchInstant "site_selected"

sites = new Layer width: 1392, height: 370, image: "images/sites.png"

sites.states.add {
	site_selected: { x: 28, y: 1384}
	site: { x: 28, y: 240}
	new_tab: { x: -168, y: 744}
	site_loading: { y: 1384}
}
sites.states.switchInstant "site_selected"


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["site_selected", "site", "new_tab", "site_loading"]
items = [yandex_bg, darker, logo, site_1, blank_page, site_darker, new_tab, status_bar_bg, status_bar, bar, sites]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()


nextStateHandler = (event, layer) ->
	nextState = cycler()
	for item in items
		try
			if item is logo
				if nextState is "new_tab"
					item.states.switch(nextState, delay: 0.2, time: 1)
				else
					item.states.switch(nextState, time: 0)
			
			else if item is site_1
				if nextState is "new_tab"
					item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
				else if nextState is "site_loading"
					item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.1)
				else
					item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
			
			else if item is bar or item is sites
				if nextState is "site_loading"
					item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
				else
					item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
			else
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error



screen.on Events.Click, ->
	if nextState is "new_tab"
		nextStateHandler()
		Utils.delay 0.4, ->
			nextStateHandler()
	else
		nextStateHandler()

status_bar.opacity = 0
for item in items
	item.parent = tempView
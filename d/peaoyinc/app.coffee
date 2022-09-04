retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

# view
scene_bg = new Layer width: 375*retina, height: 667.0000000000001*retina, x: 0*retina, y: 0*retina

scene_bg.states.add {
	prepare: { backgroundColor: "rgba(254,184,70,1)"}
	map_found: { backgroundColor: "rgba(44,185,104,1)"}
}
scene_bg.states.switchInstant "prepare"

button_check_state = new Layer width: 343*retina, height: 48*retina, x: 16*retina, image: "images/button check state.png"

button_check_state.states.add {
	prepare: { y: 589*retina, opacity: 1}
	map_zoom: { y: 649*retina, opacity: 0}
}
button_check_state.states.switchInstant "prepare"

intro_message = new Layer width: 301*retina, height: 64*retina, x: 37*retina, image: "images/intro message.png"

intro_message.states.add {
	prepare: { y: 58*retina, opacity: 1}
	map_zoom: { y: -42*retina, opacity: 0}
}
intro_message.states.switchInstant "prepare"

chechking_state = new Layer width: 119*retina, height: 17*retina, x: 128*retina, y: 606*retina, image: "images/chechking state.png"

chechking_state.states.add {
	prepare: { opacity: 0}
	map_zoom: { opacity: 1}
	map_found: { opacity: 0}
}
chechking_state.states.switchInstant "prepare"

found_actions = new Layer width: 343*retina, height: 167*retina, x: 16*retina, image: "images/found actions.png"

found_actions.states.add {
	prepare: { y: 570*retina, opacity: 0}
	map_found: { y: 470*retina, opacity: 1}
}
found_actions.states.switchInstant "prepare"

map = new Layer image: "images/map.png"

map.states.add {
	prepare: { width: 326*retina, height: 201*retina, x: 25*retina, y: 253*retina, opacity: 1}
	map_zoom: { width: 440*retina, height: 271*retina, x: -32*retina, y: 199*retina}
	map_right: { x: -109*retina}
	map_left: { x: 49*retina, y: 198*retina}
	map_found: { width: 652*retina, height: 401*retina, y: 99*retina, opacity: 0.4}
}
map.states.switchInstant "prepare"

found_section = new Layer image: "images/found section.png"

found_section.states.add {
	prepare: { width: 37*retina, height: 45*retina, x: 80*retina, y: 321*retina, opacity: 0}
	map_left: { width: 50*retina, height: 60*retina, x: 123*retina, y: 290*retina}
	map_found: { width: 73*retina, height: 90*retina, x: 159*retina, y: 234*retina, opacity: 1}
}
found_section.states.switchInstant "prepare"

found_message = new Layer width: 242*retina, height: 74*retina, x: 67*retina, image: "images/found message.png", opacity: 0

found_message.states.add {
	prepare: { y: -35*retina}
	map_found: { y: 45*retina}
}
found_message.states.switchInstant "prepare"

new_modal = new Layer image: "images/new modal.png"

new_modal.states.add {
	prepare: { width: 142*retina, height: 72*retina, x: 117*retina, y: 172*retina, opacity: 0}
	map_found: { width: 283*retina, height: 144*retina, x: 46*retina, y: 70*retina, opacity: 1}
}
new_modal.states.switchInstant "prepare"


# model
# cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["prepare", "map_zoom", "map_right", "map_left", "map_found"]
items = [scene_bg, button_check_state, intro_message, chechking_state, found_actions, map, found_section, found_message, new_modal]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screen.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.8)
		catch error

for item in items
	item.parent = screen
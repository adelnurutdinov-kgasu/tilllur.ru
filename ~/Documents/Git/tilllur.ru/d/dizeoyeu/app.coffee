retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


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

chechking_state = new Layer width: 119*retina, height: 17*retina, x: 128*retina, y: 606*retina, image: "images/chechking state.png", opacity: 0

chechking_state.states.add {
	visible: { opacity: 1}
	map_found : { opacity: 0 }
}

found_actions = new Layer width: 343*retina, height: 167*retina, x: 16*retina, image: "images/found actions.png"

found_actions.states.add {
	map_left: { y: 570*retina, opacity: 0}
	map_found: { y: 470*retina, opacity: 1}
}
found_actions.states.switchInstant "map_left"

map = new Layer image: "images/map.png"

map.states.add {
	prepare: { width: 327*retina, height: 202*retina, x: 24*retina, y: 253*retina, opacity: 1}
	map_zoom: { width: 652*retina, height: 401*retina, x: -139*retina, y: 99*retina, opacity: 1}
	map_right: { width: 652*retina, height: 401*retina, x: -366*retina, y: 99*retina, opacity: 1}
	map_left: { width: 652*retina, height: 401*retina, x: 49*retina, y: 99*retina, opacity: 1}
	map_found: { width: 652*retina, height: 401*retina, x: 49*retina, y: 99*retina, opacity: 0.4}
}
map.states.switchInstant "prepare"

found_section = new Layer width: 73*retina, height: 90*retina, x: 159*retina, y: 234*retina, image: "images/found section.png"
found_section.states.add {
	visible: { opacity: 0}
	map_found: { opacity: 1 }
}
found_section.states.switchInstant "visible"

found_message = new Layer width: 242*retina, height: 74*retina, x: 67*retina, image: "images/found message.png", opacity: 0

found_message.states.add {
	map_left: { y: -35*retina}
	map_found: { y: 45*retina}
}
found_message.states.switchInstant "map_left"

new_modal = new Layer image: "images/new modal.png"

new_modal.states.add {
	map_left: { width: 142*retina, height: 72*retina, x: 117*retina, y: 172*retina, opacity: 0}
	map_found: { width: 283*retina, height: 144*retina, x: 46*retina, y: 70*retina, opacity: 1}
}
new_modal.states.switchInstant "map_left"






introArray = [intro_message, button_check_state]

animationTime = 1
animationTimeSmall = 0.4

# model
button_check_state.on Events.Click, ->
	for item in introArray
		item.states.switch "map_zoom", { curve: 'ease-in', time: animationTimeSmall}
	chechking_state.states.switch "visible", { curve: 'ease-in-out', time: animationTime, delay: animationTimeSmall}
	map.states.switch "map_zoom", { curve: 'ease-in-out', time: animationTime}
	
	Utils.delay animationTime, ->
		animateMap()


animationMapFirst = new Animation
	layer: map
	properties:
		x: 50*retina
	time: animationTime
	curve: "ease-in-out"

animationMapLeft = new Animation
	layer: map
	properties:
		x: 50*retina
	time: animationTime * 2
	curve: "ease-in-out"

animationMapRight = new Animation
	layer: map
	properties:
		x: -320*retina
	time: animationTime * 2
	curve: "ease-in-out"


animationMapFirst.on(Events.AnimationEnd, animationMapRight.start)
animationMapLeft.on(Events.AnimationEnd, animationMapRight.start)
animationMapRight.on(Events.AnimationEnd, animationMapLeft.start)

animateMap = () ->
	animationMapFirst.start()
	
	Utils.delay animationTime * 4.5, ->
		animationMapFirst.off(Events.AnimationEnd, animationMapRight.start)
		animationMapLeft.off(Events.AnimationEnd, animationMapRight.start)
		animationMapRight.off(Events.AnimationEnd, animationMapLeft.start)

		animationMapLeft.on(Events.AnimationEnd, showDetectedSection)



showDetectedSection = (event, layer) ->
	map.states.switch "map_found"
	scene_bg.states.switch "map_found"
	new_modal.states.switch "map_found", { delay: animationTimeSmall, curve: "spring(100, 10, 10)"}
	chechking_state.states.switch "map_found"
	found_actions.states.switch "map_found", { delay: animationTimeSmall * 2 }
	found_section.states.switch "map_found"

for item in [scene_bg, button_check_state, intro_message, chechking_state, found_actions, map, found_section, found_message, new_modal]
	item.parent = screen
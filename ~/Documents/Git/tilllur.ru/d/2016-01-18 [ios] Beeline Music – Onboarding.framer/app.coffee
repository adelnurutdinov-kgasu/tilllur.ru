# Framer.Shortcuts.initialize(sketch)
# Framer.Device.contentScale = 1
retina = 1

screen = new Layer
	width: 320, height: 568, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

bg = new Layer width: 320*retina, height: 568*retina, backgroundColor: "#FFF" 
iphone = new Layer width: 284*retina, height: 547*retina, image: "images/iphone.png", x: 18*retina, y: 172*retina
text_bg = new Layer width: 320*retina, height: 142*retina, backgroundColor: "#FFF"
text = new Layer width: 320*retina, height: 142*retina, image: "images/text1.png"

songs = new Layer width: 196*retina, height: 185*retina, image: "images/songs.png", x: 62*retina, y: 258*retina, opacity: 0, scale: 0.8
query = new Layer width: 140*retina, height: 60*retina, image: "images/query.png", x: 90*retina, y: 205*retina, opacity: 0
cursor = new Layer width: 3*retina, height: 80*retina, backgroundColor: "#DDD", x: 234*retina, y: 198*retina, opacity: 0
info_1 = new Layer width: 240*retina, height: 48*retina, x: 40*retina, y: 323*retina, image: "images/info_1.png", opacity: 0
info_2 = new Layer width: 240*retina, height: 48*retina, x: 40*retina, y: 323*retina, image: "images/info_2.png", opacity: 0
# focus = new Layer width: 80*retina, height: 80*retina, image: "images/focus.png", opacity: 0
focus_next = new Layer width: 80*retina, height: 80*retina, image: "images/focus_next.png", x: 120*retina, y: 477*retina, opacity: 0
focus_search = new Layer width: 80*retina, height: 80*retina, image: "images/focus_search.png", x: 120*retina, y: 327*retina, opacity: 0
focus_next_next = new Layer width: 80*retina, height: 80*retina, image: "images/focus_next_next.png", x: 120*retina, y: 357*retina, opacity: 0
focus_big = new Layer width: 140*retina, height: 140*retina, image: "images/focus_big.png", x: 90*retina, y: 342*retina

button_1 = new Layer width: 200*retina, height: 44*retina, image: "images/button_1.png", x: 60*retina, y: 222*retina, opacity: 0, scale: 0.8
button_2 = new Layer width: 200*retina, height: 44*retina, image: "images/button_2.png", x: 60*retina, y: 286*retina, opacity: 0, scale: 0.8
button_3 = new Layer width: 200*retina, height: 44*retina, image: "images/button_3.png", x: 60*retina, y: 350*retina, opacity: 0, scale: 0.8

iphone.states.add { generating: {y: 70*retina}, tracks: {y: 172*retina}, find: {y: -16*retina}, end: {y: 492*retina}}
iphone.states.animationOptions = {time: 1.2, curve: "ease-in"}

loaderPathLength = 1250
loader = new Layer width: 640, height: 1136, backgroundColor: "rgba(0,0,0,0)"
loader.html = '<svg width="640px" height="1136px" viewBox="0 0 641 1136" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<circle id="svgPath1" fill="none" fill-rule="evenodd" transform="translate(1, 0)" stroke="#CCCCCC" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" sketch:type="MSShapeGroup" transform="translate(1, 0) translate(-90)" cx="320" cy="688" r="180" stroke-dasharray="1250" stroke-dashoffset="1250"></circle>
</svg>'

loader.scale = 0.5
loader.originX = 0
loader.originY = 0


loader_animate = () ->
	svgPath = document.getElementById('svgPath1')
	pathLength = 1250
	svgPath.style.strokeDasharray = pathLength + ' ' + pathLength;
	svgPath.style.strokeDashoffset = pathLength
	svgPath.getBoundingClientRect()
	svgPath.style.transition = svgPath.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out'
	svgPath.style.strokeDashoffset = '0'
loader_animate_reset = () ->
	svgPath = document.getElementById('svgPath1')
	svgPath.style.transition = svgPath.style.WebkitTransition = 'stroke-dashoffset 0s'
	svgPath.style.strokeDashoffset = '1250'

# TEXT SLIDER	
currentTextNumber = 1
nextText = () ->
	textIsHidden = text.animate { properties: {opacity: 0}, time: 0.8}
	textIsHidden.on 'end', ->
		text.image = "images/text" + (++currentTextNumber) + ".png"
		text.animate { properties: {opacity: 1}, time: 0.8}
		
# SHOW INFO 1 AND 2
showInfo1 = () ->
	info_1_is_shown = info_1.animate { properties: {opacity: 1}, time: 0.3}
	info_1_is_shown.on 'end', ->
		info_1.animate { properties: {opacity: 0}, time: 0.3, delay: 2.1}

showInfo2 = () ->
	info_2_is_shown = info_2.animate { properties: {opacity: 1}, time: 0.3}
	info_2_is_shown.on 'end', ->
		info_2.animate { properties: {opacity: 0}, time: 0.3, delay: 2.1}
	
	
# FOCUS PULSE
focus_pulse = (item) ->
	focus_end_small = item.animate {properties: {scale: 0.95}, time: 1}
	focus_end_small.on 'end', ->
		focus_end_big = item.animate {properties: {scale: 1.05}, time: 1}
		focus_end_big.on 'end', ->
			focus_pulse(item)
			
focus_pulse(focus_big)
focus_pulse(focus_next)
focus_pulse(focus_search)
focus_pulse(focus_next_next)

# cursor
cursor_is_animating = true
cursor_pulse = () ->
	if cursor_is_animating
		cursor_end_animation_part_1 = cursor.animate {properties: {opacity: 0}, time: 0.6}
		cursor_end_animation_part_1.on 'end', ->
			if cursor_is_animating
				cursor_end_animation_part_2 = cursor.animate {properties: {opacity: 1}, time: 0.6}
				cursor_end_animation_part_2.on 'end', ->
					cursor_pulse()
	else cursor.animate {properties: {opacity: 0}, time: 0.4}

	
# SCENARIO
focus_big_click_handler = (event, layer) ->
	focus_big.off(Events.Click, focus_big_click_handler)
	iphone.states.next()
	focus_big_animated = focus_big.animate {properties: {opacity: 0}, time: 0.4}
	focus_big_animated.on 'end', ->
		focus_big.destroy()
	Utils.delay 1, ->
		loader_animate()
		showInfo1()
		Utils.delay 2.7, ->
			loader_animate_reset()
			loader_animate()
			showInfo2()
			Utils.delay 2.7, ->
				loader.animate {properties: {opacity: 0}, time: 0.4}
				Utils.delay 1, ->
					iphone.states.next()
					nextText()
					Utils.delay 1, ->
						songs.animate {properties: {opacity: 1, y: 278*retina, scale: 1}, time: 0.6, curve: "spring(200, 10, 15)"}
						focus_next.animate {properties: {opacity: 1}, time: 0.4, delay: 1}
						focus_next.on(Events.Click, focus_next_click_handler)
					

focus_big.on(Events.Click, focus_big_click_handler)

focus_next_click_handler = (event, layer) ->
	focus_next.off(Events.Click, focus_next_click_handler)
	focus_next.destroy()
	songs.animate {properties: {opacity: 0, y: 258*retina, scale: 0.9}, time: 0.4}
	focus_next.animate {properties: {opacity: 0}, time: 0.4}
	iphone.states.next()
	nextText()
	cursor_pulse()
	query.animate {properties: {opacity: 1}, time: 0.4, delay: 0.8}
	focus_search_appeared = focus_search.animate {properties: {opacity: 1}, time: 0.4, delay: 1.3}
	focus_search_appeared.on 'end', ->
		focus_search.on(Events.Click, focus_search_click_handler)
	
focus_search_click_handler = (event, layer) ->
	focus_search.off(Events.Click, focus_search_click_handler)
	focus_search.destroy()
	nextText()
	cursor_is_animating = false
	query_moved = query.animate { properties: {x: 36*retina, y: 152*retina, scale: 0.6}, time: 1} 
	songs_moved = songs.animate {properties: {height: 115*retina, y: 217*retina, scale: 0.9}, time: 0}
	songs_moved.on 'end', ->
		songs_shown = songs.animate {properties: {opacity: 1, scale: 1}, time: 0.4, delay: 1}
		focus_next_next.animate {properties: {opacity: 1}, time: 0.4, delay: 1.4}
		focus_next_next.on(Events.Click, focus_next_next_handler)
	
focus_next_next_handler = (event, layer) ->
	focus_next_next.off(Events.Click, focus_next_next_handler)
	focus_next_next_shown = focus_next_next.animate {properties: {opacity: 0}, time: 0.4}
	focus_next_next_shown.on 'end', ->
		focus_next_next.destroy()
	iphone.states.next()
	nextText()
	query.animate {properties: {opacity: 0}, time: 0.4}
	songs.animate {properties: {opacity: 0}, time: 0.4}
	button_1.animate {properties: {opacity: 1, scale: 1}, time: 0.4, delay: 1.2}
	button_2.animate {properties: {opacity: 1, scale: 1}, time: 0.4, delay: 1.4} 
	button_3.animate {properties: {opacity: 1, scale: 1}, time: 0.4, delay: 1.6} 
	
for item in [bg, iphone, text_bg, text, songs, query, cursor, info_1, info_2, focus_next, focus_search, focus_next_next, focus_big, button_1, button_2, button_3, loader]
	item.parent = screen

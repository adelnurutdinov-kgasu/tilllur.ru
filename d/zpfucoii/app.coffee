# flipCard = require "flipCard"

isReloading = false

retina = 1

screen = new Layer
	width: 414, height: 736, backgroundColor: "000"

temp = new Layer
	parent: screen
	width: 414, height: 736, backgroundColor: "000"
	originX: 0, originY: 0

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

screen_bg = new Layer width: 414*retina, height: 736*retina, x: 0, y: 0, image: "images/screen bg.png"
nav_bar = new Layer width: 414*retina, height: 104*retina, x: -10*retina, y: -6*retina, image: "images/nav bar.png", opacity: 0
layerPath = new Layer width:1242, height:2208, backgroundColor: "transparent"
rounds_bg = new Layer width: 380*retina, height: 360*retina, x: 17*retina, y: 236*retina, image: "images/rounds bg.png"
enemy_round_1 = new Layer width: 163*retina, height: 60*retina, x: 234*retina, y: 256*retina, image: "images/enemy round 1.png"
enemy_round_2 = new Layer width: 163*retina, height: 60*retina, x: 234*retina, y: 326*retina, image: "images/enemy round 2.png"
my_round_2 = new Layer width: 163*retina, height: 60*retina, x: 17*retina, y: 346*retina, image: "images/my round 2.png"
current_state = new Layer width: 382*retina, height: 118*retina, x: 15*retina, y: 104*retina, image: "images/current state.png"
round_1_done = new Layer width: 163*retina, height: 60*retina, x: 234*retina, y: 256*retina, image: "images/round 1 done.png", opacity: 0, scale: 0.7
round_2_done = new Layer width: 163*retina, height: 60*retina, x: 234*retina, y: 326*retina, image: "images/round 2 done.png", opacity: 0, scale: .7

go_round_2_container = new Layer width: 163*retina, height: 60*retina, x: 17*retina, y: 346*retina, opacity: 0, scale: .7, backgroundColor: "transparent"

inside_button = new Layer width: 151*retina, height: 48*retina, x: 6*retina, y: 6*retina, backgroundColor: "transparent", superLayer: go_round_2_container
button_mask = new Layer width: 151*retina, height: 48*retina, x: 0, y: 0, backgroundColor: "rgba(14,30,44,1.00)", superLayer: inside_button, cornerRadius: 40*retina
button_color = new Layer width: 151*retina, height: 48*retina, x: 0, y: 0, image: "images/button color.png", superLayer: button_mask
button_light = new Layer width: 160*retina, height: 160*retina, x: -4*retina, y: -54*retina, image: "images/button light.png", superLayer: button_mask
button_text = new Layer width: 117*retina, height: 12*retina, x: 17*retina, y: 19*retina, image: "images/button text.png", superLayer: button_mask

steps = [round_1_done, round_2_done, go_round_2_container]
for item in steps
	item.states.add {
		start: opacity: 1, scale: 1
	}



ng_time = 1.2
ng_delay = 0
ng_waiting = ng_time + ng_delay
ng_timing = "ease-in-out"
	
button_light.states.add {
	initial: {rotation: -60}
	rotated: {rotation: 60}
}

runLight = (number) ->
	cr = Utils.randomNumber(0, 1) + 2
	if number == 1
		currentNumber = 0
		currentState = "rotated"
	else
		currentNumber = 1
		currentState = "initial"
	
	button_light.states.switch currentState, {time: ng_time*cr, delay: ng_delay*cr, curve: ng_timing}
	Utils.delay ng_waiting*cr, ->
		runLight(currentNumber)

runLight()



button_text.states.add {
	initial: {scale: 1}
	minimazed: {scale: 0.87}
}

runWater = (number) ->
	if number == 1
		currentNumber = 0
		currentState = "minimazed"
	else
		currentNumber = 1
		currentState = "initial"
	
	button_text.states.switch currentState, {time: ng_time, delay: ng_delay, curve: ng_timing}
	Utils.delay ng_waiting, ->
		runWater(currentNumber)

runWater()





layerPath.html = '<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 1242 2208" xml:space="preserve">
<g id="v2-framer-scene" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
		<g id="iPhone-6-Plus"  stroke="#000" stroke-width="15">
			<path d="M294,798 L945,858 L945,1071 L294,1131" id="progress" stroke-dasharray="1520.00 1520.00" stroke-dashoffset="1520.00"></path>
		</g>
	</g>
</svg>'

layerPath.scale = 1/3
layerPath.originX = 0
layerPath.originY = 0


pathLength = 0
	

screen_bg.on Events.Click, ->
	if !isReloading
		animatePath()
		round_1_done.states.switch 'start', {curve: "spring(300, 10, 10)", delay: 1.3}
		round_2_done.states.switch 'start', {curve: "spring(300, 10, 10)", delay: 1.9}
		go_round_2_container.states.switch 'start', {curve: "spring(300, 10, 10)", delay: 2.9}
		isReloading = true
# 	else 
# 		window.location.reload()
	
	
animatePath = () ->
	svgPath = document.getElementById('progress')
	pathLength = svgPath.getTotalLength()
	svgPath.style.strokeDasharray = pathLength + ' ' + pathLength;
	svgPath.style.strokeDashoffset = pathLength
	svgPath.getBoundingClientRect()
	svgPath.style.transition = svgPath.style.WebkitTransition = 'stroke-dashoffset 4s ease-in-out'
	svgPath.style.strokeDashoffset = '0'


# screen_bg.on Events.Click, ->
# 	window.location.reload()

for item in [screen_bg, nav_bar, layerPath, rounds_bg, enemy_round_1, enemy_round_2, my_round_2, current_state, round_1_done, round_2_done, go_round_2_container]
	item.parent = temp

statusBar = new Layer
	parent: screen, height: 20, width: screen.height
	backgroundColor: "black"
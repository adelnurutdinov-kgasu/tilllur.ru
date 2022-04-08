retina = 1

screen = new Layer
	width: 414, height: 736, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

screen_bg = new Layer width: 414*retina, height: 736*retina, x: 0, y: 0, image: "images/screen bg.png"
nav_bar = new Layer width: 434*retina, height: 104*retina, x: -10*retina, y: -6*retina, image: "images/nav bar.png"
tabs_block = new Layer width: 380*retina, height: 22*retina, x: 17*retina, y: 102*retina, image: "images/tabs block.png"
items = new Layer width: 400*retina, height: 520*retina, x: 7*retina, y: 130*retina, image: "images/items.png"
tab_bar_bg = new Layer width: 414*retina, height: 49*retina, x: 0, y: 637*retina, image: "images/tab bar bg.png"
new_game_button_bg = new Layer width: 120*retina, height: 120*retina, x: 147*retina, y: 601*retina, backgroundColor: "rgba(49,132,204,1.00)", shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", borderRadius: '100%'
round_1 = new Layer width: 120*retina, height: 120*retina, x: 147*retina, y: 601*retina, backgroundColor: "rgba(0,0,0,0.20)", borderRadius: '100%'
round_2 = new Layer width: 110*retina, height: 110*retina, x: 152*retina, y: 606*retina, backgroundColor: "rgba(0,0,0,0.20)", borderRadius: '100%'
round_3 = new Layer width: 100*retina, height: 100*retina, x: 157*retina, y: 611*retina, backgroundColor: "rgba(0,0,0,0.20)", borderRadius: '100%'
new_game_button = new Layer width: 90*retina, height: 90*retina, x: 162*retina, y: 616*retina, image: "images/new game button.png"
new_game_text = new Layer width: 55*retina, height: 32*retina, x: 179*retina, y: 646*retina, image: "images/new game text.png"
ads = new Layer width: 414*retina, height: 50*retina, x: 0, y: 686*retina, image: "images/ads.png"




# ROUND STATES
rounds = [round_1, round_2, round_3, new_game_text]

for item in rounds
	item.states.add {
		initial: {scale: 1}
		minimazed: {scale: 0.7}
	}

ng_time = 1.2
ng_delay = 0
ng_waiting = ng_time + ng_delay
ng_timing = "ease-in-out"

runWater = (number) ->
	if number == 1
		currentNumber = 0
		currentState = "minimazed"
	else
		currentNumber = 1
		currentState = "initial"
	
	for item in rounds
		item.states.switch currentState, {time: ng_time, delay: ng_delay, curve: ng_timing}
	Utils.delay ng_waiting, ->
		runWater(currentNumber)

runWater()



# Light

new_game_button.states.add {
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
	
	new_game_button.states.switch currentState, {time: ng_time*cr, delay: ng_delay*cr, curve: ng_timing}
	Utils.delay ng_waiting*cr, ->
		runLight(currentNumber)

runLight()



for item in [screen_bg, nav_bar, tabs_block, items, tab_bar_bg, new_game_button_bg, round_1, round_2, round_3, new_game_button, new_game_text, ads]
	item.parent = screen

statusBar = new Layer
	parent: screen, height: 20, width: screen.height
	backgroundColor: "black"
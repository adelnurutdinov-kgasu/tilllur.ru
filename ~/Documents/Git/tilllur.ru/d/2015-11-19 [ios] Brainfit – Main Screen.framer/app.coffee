
Framer.Defaults.Animation =
	time: 0.6
	curve: "ease-out"

screen = new Layer
	width: 414, height: 736, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }



retina = 1

bg = new Layer width: 414*retina, height: 736*retina, x: 0, y: 0, backgroundColor: "rgba(64,69,100,1.00)"
new_bg = new Layer width: 414*retina, height: 736*retina, x: 0, y: 0, image: "images/new bg.png", opacity: 0
new_game_bg = new Layer width: 414*retina, height: 736*retina, x: 0, y: 0, image: "images/new game bg.png", opacity: 0
bg_round_6 = new Layer width: 292*retina, height: 292*retina, x: 61*retina, y: 222*retina, backgroundColor: "rgba(0,0,0,0.20)", cornerRadius: '100%'
bg_round_5 = new Layer width: 375*retina, height: 375*retina, x: 20*retina, y: 181*retina, backgroundColor: "rgba(0,0,0,0.20)", cornerRadius: '100%'
bg_round_4 = new Layer width: 460*retina, height: 460*retina, x: -23*retina, y: 139*retina, backgroundColor: "rgba(0,0,0,0.20)", cornerRadius: '100%'
bg_round_3 = new Layer width: 549*retina, height: 549*retina, x: -68*retina, y: 95*retina, backgroundColor: "rgba(0,0,0,0.20)", cornerRadius: '100%'
bg_round_2 = new Layer width: 662*retina, height: 662*retina, x: -125*retina, y: 39*retina, backgroundColor: "rgba(0,0,0,0.20)", cornerRadius: '100%'
bg_round_1 = new Layer width: 767*retina, height: 767*retina, x: -178*retina, y: -14*retina, backgroundColor: "rgba(0,0,0,0.20)", cornerRadius: '100%'
profile = new Layer width: 450*retina, height: 136*retina, x: -19*retina, y: 21*retina, image: "images/profile.png"
waiting_bar = new Layer width: 450*retina, height: 136*retina, x: -19*retina, y: 61*retina, image: "images/waiting bar.png", opacity: 0
nav_bar = new Layer width: 403*retina, height: 11*retina, x: 6*retina, y: 5*retina, image: "images/nav bar.png"
tips = new Layer width: 452*retina, height: 212*retina, x: -19*retina, y: 513*retina, image: "images/tips.png"
completed_games = new Layer width: 208*retina, height: 208*retina, x: 199*retina, y: 154*retina, image: "images/completed games.png"
waiting_games = new Layer width: 298*retina, height: 298*retina, x: 58*retina, y: 239*retina, image: "images/waiting games.png"
new_game = new Layer width: 181*retina, height: 181*retina, x: 229*retina, y: 390*retina, image: "images/new game.png"
waiting_items = new Layer width: 472*retina, height: 598*retina, x: -29*retina, y: 677*retina, image: "images/waiting items.png"
top_new_game_bar = new Layer width: 450*retina, height: 136*retina, x: -19*retina, y: 41*retina, image: "images/top new game bar.png", opacity: 0
new_game_layout = new Layer width: 422*retina, height: 570*retina, x: -4*retina, y: 686*retina, image: "images/new game layout.png"
ads = new Layer width: 414*retina, height: 50*retina, x: 0, y: 686*retina, image: "images/ads.png"

bg.states.add {
	game_center: width: 414*retina, height: 736*retina, x: 0, y: 0, backgroundColor: "rgba(64,69,100,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	waiting: width: 414*retina, height: 736*retina, x: 0, y: 0, backgroundColor: "rgba(64,69,100,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	game_back: width: 414*retina, height: 736*retina, x: 0, y: 0, backgroundColor: "rgba(64,69,100,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	new_game: width: 414*retina, height: 736*retina, x: 0, y: 0, backgroundColor: "rgba(64,69,100,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
}
bg.states.switchInstant 'game_center'

new_bg.states.add {
	game_center: width: 414*retina, height: 736*retina, x: 0, y: 0, rotation: 0, opacity: 0
	waiting: width: 414*retina, height: 736*retina, x: 0, y: 0, rotation: 0, opacity: 1
	game_back: width: 414*retina, height: 736*retina, x: 0, y: 0, rotation: 0, opacity: 0
	new_game: width: 414*retina, height: 736*retina, x: 0, y: 0, rotation: 0, opacity: 0
}
new_bg.states.switchInstant 'game_center'

new_game_bg.states.add {
	game_center: width: 414*retina, height: 736*retina, x: 0, y: 0, rotation: 0, opacity: 0
	waiting: width: 414*retina, height: 736*retina, x: 0, y: 0, rotation: 0, opacity: 0
	game_back: width: 414*retina, height: 736*retina, x: 0, y: 0, rotation: 0, opacity: 0
	new_game: width: 414*retina, height: 736*retina, x: 0, y: 0, rotation: 0, opacity: 1
}
new_game_bg.states.switchInstant 'game_center'

bg_round_6.states.add {
	game_center: width: 292*retina, height: 292*retina, x: 61*retina, y: 222*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	waiting: width: 292*retina, height: 292*retina, x: 61*retina, y: 222*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	game_back: width: 292*retina, height: 292*retina, x: 61*retina, y: 222*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	new_game: width: 292*retina, height: 292*retina, x: 61*retina, y: 222*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
}
bg_round_6.states.switchInstant 'game_center'

bg_round_5.states.add {
	game_center: width: 375*retina, height: 375*retina, x: 20*retina, y: 181*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	waiting: width: 375*retina, height: 375*retina, x: 20*retina, y: 181*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	game_back: width: 375*retina, height: 375*retina, x: 20*retina, y: 181*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	new_game: width: 375*retina, height: 375*retina, x: 20*retina, y: 181*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
}
bg_round_5.states.switchInstant 'game_center'

bg_round_4.states.add {
	game_center: width: 460*retina, height: 460*retina, x: -23*retina, y: 139*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	waiting: width: 460*retina, height: 460*retina, x: -23*retina, y: 139*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	game_back: width: 460*retina, height: 460*retina, x: -23*retina, y: 139*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	new_game: width: 460*retina, height: 460*retina, x: -23*retina, y: 139*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
}
bg_round_4.states.switchInstant 'game_center'

bg_round_3.states.add {
	game_center: width: 549*retina, height: 549*retina, x: -68*retina, y: 95*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	waiting: width: 549*retina, height: 549*retina, x: -68*retina, y: 95*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	game_back: width: 549*retina, height: 549*retina, x: -68*retina, y: 95*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	new_game: width: 549*retina, height: 549*retina, x: -68*retina, y: 95*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
}
bg_round_3.states.switchInstant 'game_center'

bg_round_2.states.add {
	game_center: width: 662*retina, height: 662*retina, x: -125*retina, y: 39*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	waiting: width: 662*retina, height: 662*retina, x: -125*retina, y: 39*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	game_back: width: 662*retina, height: 662*retina, x: -125*retina, y: 39*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	new_game: width: 662*retina, height: 662*retina, x: -125*retina, y: 39*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
}
bg_round_2.states.switchInstant 'game_center'

bg_round_1.states.add {
	game_center: width: 767*retina, height: 767*retina, x: -178*retina, y: -14*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	waiting: width: 767*retina, height: 767*retina, x: -178*retina, y: -14*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	game_back: width: 767*retina, height: 767*retina, x: -178*retina, y: -14*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
	new_game: width: 767*retina, height: 767*retina, x: -178*retina, y: -14*retina, backgroundColor: "rgba(0,0,0,0.20)", rotation: 0, opacity: 1
}
bg_round_1.states.switchInstant 'game_center'

profile.states.add {
	game_center: width: 450*retina, height: 136*retina, x: -19*retina, y: 21*retina, rotation: 0, opacity: 1
	waiting: width: 450*retina, height: 136*retina, x: -19*retina, y: 1*retina, rotation: 0, opacity: 0
	game_back: width: 450*retina, height: 136*retina, x: -19*retina, y: 21*retina, rotation: 0, opacity: 1
	new_game: width: 450*retina, height: 136*retina, x: -19*retina, y: 1*retina, rotation: 0, opacity: 0
}
profile.states.switchInstant 'game_center'

waiting_bar.states.add {
	game_center: width: 450*retina, height: 136*retina, x: -19*retina, y: 61*retina, rotation: 0, opacity: 0
	waiting: width: 450*retina, height: 136*retina, x: -19*retina, y: 21*retina, rotation: 0, opacity: 1
	game_back: width: 450*retina, height: 136*retina, x: -19*retina, y: 61*retina, rotation: 0, opacity: 0
	new_game: width: 450*retina, height: 136*retina, x: -19*retina, y: 61*retina, rotation: 0, opacity: 0
}
waiting_bar.states.switchInstant 'game_center'

nav_bar.states.add {
	game_center: width: 403*retina, height: 11*retina, x: 6*retina, y: 5*retina, rotation: 0, opacity: 1
	waiting: width: 403*retina, height: 11*retina, x: 6*retina, y: 5*retina, rotation: 0, opacity: 1
	game_back: width: 403*retina, height: 11*retina, x: 6*retina, y: 5*retina, rotation: 0, opacity: 1
	new_game: width: 403*retina, height: 11*retina, x: 6*retina, y: 5*retina, rotation: 0, opacity: 1
}
nav_bar.states.switchInstant 'game_center'

tips.states.add {
	game_center: width: 452*retina, height: 212*retina, x: -19*retina, y: 513*retina, rotation: 0, opacity: 1
	waiting: width: 452*retina, height: 212*retina, x: -19*retina, y: 513*retina, rotation: 0, opacity: 0
	game_back: width: 452*retina, height: 212*retina, x: -19*retina, y: 513*retina, rotation: 0, opacity: 1
	new_game: width: 452*retina, height: 212*retina, x: -19*retina, y: 513*retina, rotation: 0, opacity: 0
}
tips.states.switchInstant 'game_center'

completed_games.states.add {
	game_center: width: 208*retina, height: 208*retina, x: 199*retina, y: 154*retina, rotation: 0, opacity: 1
	waiting: width: 105*retina, height: 105*retina, x: 268*retina, y: 458*retina, rotation: 0, opacity: 0
	game_back: width: 208*retina, height: 208*retina, x: 199*retina, y: 154*retina, rotation: 0, opacity: 1
	new_game: width: 105*retina, height: 105*retina, x: 41*retina, y: 411*retina, rotation: 0, opacity: 0
}
completed_games.states.switchInstant 'game_center'

waiting_games.states.add {
	game_center: width: 298*retina, height: 298*retina, x: 58*retina, y: 239*retina, rotation: 0, opacity: 1
	waiting: width: 209*retina, height: 209*retina, x: 103*retina, y: 5*retina, rotation: 0, opacity: 0
	game_back: width: 298*retina, height: 298*retina, x: 58*retina, y: 239*retina, rotation: 0, opacity: 1
	new_game: width: 89*retina, height: 89*retina, x: 276*retina, y: 415*retina, rotation: 0, opacity: 0
}
waiting_games.states.switchInstant 'game_center'

new_game.states.add {
	game_center: width: 181*retina, height: 181*retina, x: 229*retina, y: 390*retina, rotation: 0, opacity: 1
	waiting: width: 113*retina, height: 113*retina, x: 37*retina, y: 456*retina, rotation: 0, opacity: 0
	game_back: width: 181*retina, height: 181*retina, x: 229*retina, y: 390*retina, rotation: 0, opacity: 1
	new_game: width: 181*retina, height: 181*retina, x: 117*retina, y: -1*retina, rotation: 0, opacity: 0
}
new_game.states.switchInstant 'game_center'

waiting_items.states.add {
	game_center: width: 472*retina, height: 598*retina, x: -29*retina, y: 677*retina, rotation: 0, opacity: 1
	waiting: width: 414*retina, height: 568*retina, x: 0, y: 118*retina, rotation: 0, opacity: 1
	game_back: width: 472*retina, height: 598*retina, x: -29*retina, y: 677*retina, rotation: 0, opacity: 1
	new_game: width: 472*retina, height: 598*retina, x: -29*retina, y: 677*retina, rotation: 0, opacity: 0
}
waiting_items.states.switchInstant 'game_center'

top_new_game_bar.states.add {
	game_center: width: 450*retina, height: 136*retina, x: -19*retina, y: 41*retina, rotation: 0, opacity: 0
	waiting: width: 450*retina, height: 136*retina, x: -19*retina, y: 41*retina, rotation: 0, opacity: 0
	game_back: width: 450*retina, height: 136*retina, x: -19*retina, y: 41*retina, rotation: 0, opacity: 0
	new_game: width: 450*retina, height: 136*retina, x: -19*retina, y: 21*retina, rotation: 0, opacity: 1
}
top_new_game_bar.states.switchInstant 'game_center'

new_game_layout.states.add {
	game_center: width: 422*retina, height: 570*retina, x: -4*retina, y: 686*retina, rotation: 0, opacity: 0
	waiting: width: 422*retina, height: 570*retina, x: -4*retina, y: 686*retina, rotation: 0, opacity: 0
	game_back: width: 422*retina, height: 570*retina, x: -4*retina, y: 686*retina, rotation: 0, opacity: 1
	new_game: width: 414*retina, height: 568*retina, x: 0, y: 118*retina, rotation: 0, opacity: 1
}
new_game_layout.states.switchInstant 'game_center'

ads.states.add {
	game_center: width: 414*retina, height: 50*retina, x: 0, y: 686*retina, rotation: 0, opacity: 1
	waiting: width: 414*retina, height: 50*retina, x: 0, y: 686*retina, rotation: 0, opacity: 1
	game_back: width: 414*retina, height: 50*retina, x: 0, y: 686*retina, rotation: 0, opacity: 1
	new_game: width: 414*retina, height: 50*retina, x: 0, y: 686*retina, rotation: 0, opacity: 1
}
ads.states.switchInstant 'game_center'


generatedState1 = "game_center"
generatedState2 = "waiting"
generatedState3 = "game_back"
generatedState4 = "new_game"


layers = [bg, new_bg, new_game_bg, bg_round_6, bg_round_5, bg_round_4, bg_round_3, bg_round_2, bg_round_1, profile, waiting_bar, nav_bar, tips, completed_games, waiting_games, new_game, waiting_items, top_new_game_bar, new_game_layout, ads]
generatedStates = [generatedState1, generatedState2, generatedState3, generatedState4]

cycler = Utils.cycle(generatedStates)
generatedButton = new Layer width: Screen.width, height: Screen.height, opacity: 0


generatedButton.on Events.Click, ->
	nextState = cycler()
	for item in layers
		item.states.switch nextState

nav_bar.image = null

for item in layers
	item.parent = screen
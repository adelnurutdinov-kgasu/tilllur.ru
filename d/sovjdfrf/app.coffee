retina = 1

screen = new Layer
	width: 1440, height: 900, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

bg = new Layer width: Screen.width * 2, height: Screen.height*2, backgroundColor: "#222"


content = new Layer width: 1440*retina, height: 1330*retina, image: "images/content.png", x: 0, y: -56*retina
content.states.add {
	main_experimental: width: 1440*retina, height: 1330*retina, x: 0, y: 180*retina, opacity: 1
	artboard_3: width: 1440*retina, height: 1330*retina, x: 0, y: -80*retina, opacity: 1
}
content.states.switchInstant 'main_experimental'


header = new Layer width: 1440*retina, height: 140*retina, image: "images/header.png", x: 0, y: 40*retina
header.states.add {
	main_experimental: width: 1440*retina, height: 140*retina, x: 0, y: 40*retina, opacity: 1
	artboard_3: width: 1440*retina, height: 140*retina, x: 0, y: -56*retina, opacity: 1
}
header.states.switchInstant 'main_experimental'


topper = new Layer width: 1440*retina, height: 40*retina, image: "images/topper.png", x: 0, y: 0
topper.states.add {
	main_experimental: width: 1440*retina, height: 40*retina, x: 0, y: 0, opacity: 1
}
topper.states.switchInstant 'main_experimental'




logo_rubin = new Layer width: 167*retina, height: 180*retina, image: "images/logo rubin.png", x: 109*retina, y: 5*retina
logo_rubin.states.add {
	main_experimental: width: 167*retina, height: 180*retina, x: 109*retina, y: 5*retina, opacity: 1
	artboard_3: width: 54*retina, height: 58*retina, x: 117*retina, y: 20*retina, opacity: 1
}
logo_rubin.states.switchInstant 'main_experimental'


letters = new Layer width: 90*retina, height: 44*retina, image: "images/letters.png", x: 174*retina, y: 40*retina
letters.states.add {
	main_experimental: width: 90*retina, height: 44*retina, x: 174*retina, y: 44*retina, opacity: 0
	artboard_3: width: 90*retina, height: 44*retina, x: 174*retina, y: 40*retina, opacity: 1
}
letters.states.switchInstant 'main_experimental'



states = ["main_experimental", "artboard_3"]
cycler = Utils.cycle(states)

nextState = cycler()
bg.on Events.Click, ->
	nextState = cycler()
	if nextState == "artboard_3"
		lettersdelay = 0.6
		letterstime = 0.6
	else 
		lettersdelay = 0
		letterstime = 0.2
	header.animate nextState, curve: Spring(damping: 1), time: 0.7
	content.animate nextState, curve: Spring(damping: 1), time: 0.7
	logo_rubin.animate nextState, curve: Spring(damping: 1), time: 0.7
	letters.animate nextState, curve: Spring(damping: 1), time: 0.5, delay: lettersdelay

for item in [bg, content, header, topper, logo_rubin, letters, letters]
	item.parent = screen



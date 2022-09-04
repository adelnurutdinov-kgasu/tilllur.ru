
retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

bg_base = new Layer width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(255,188,79,1.00)"
bg_main = new Layer width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(84,187,46,1.00)", opacity: 0
buttons = new Layer width: 343*retina, height: 157*retina, x: -359*retina, y: 477*retina, image: "images/buttons.png"
swiping_area = new Layer width: 234*retina, height: 37*retina, x: 53*retina, y: 578*retina, image: "images/swiping area.png"
logo = new Layer width: 100*retina, height: 164*retina, x: 138*retina, y: 210*retina, image: "images/logo.png"

bg_base.states.add {
	confirm_age: width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(255,188,79,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	welcome: width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(255,188,79,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
}
bg_base.states.switchInstant 'confirm_age'

bg_main.states.add {
	confirm_age: width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(84,187,46,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 0
	welcome: width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(84,187,46,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
}
bg_main.states.switchInstant 'confirm_age'

buttons.states.add {
	confirm_age: width: 343*retina, height: 157*retina, x: -359*retina, y: 477*retina, rotation: 0, opacity: 1
	welcome: width: 343*retina, height: 157*retina, x: 16*retina, y: 477*retina, rotation: 0, opacity: 1
}
buttons.states.switchInstant 'confirm_age'

swiping_area.states.add {
	confirm_age: width: 234*retina, height: 37*retina, x: 53*retina, y: 578*retina, rotation: 0, opacity: 1
	welcome: width: 234*retina, height: 37*retina, x: 428*retina, y: 578*retina, rotation: 0, opacity: 1
}
swiping_area.states.switchInstant 'confirm_age'

logo.states.add {
	confirm_age: width: 100*retina, height: 164*retina, x: 138*retina, y: 210*retina, rotation: 0, opacity: 1
	welcome: width: 100*retina, height: 164*retina, x: 138*retina, y: 70*retina, rotation: 0, opacity: 1
}
logo.states.switchInstant 'confirm_age'


generatedState1 = "confirm_age"
generatedState2 = "welcome"


layers = [bg_base, bg_main, buttons, swiping_area, logo]
generatedStates = [generatedState1, generatedState2]

cycler = Utils.cycle(generatedStates)


nextState = cycler()
screen.on Events.Click, ->
	nextState = cycler()
	for item in layers
		item.animate(nextState, curve: Spring(damping: 1), time: 0.8)

for item in layers
	item.parent = screen

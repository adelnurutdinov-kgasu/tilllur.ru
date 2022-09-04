

retina = 1

Framer.Defaults.animationOptions =
	curve: Spring(damping: 1)
	time: 0.5




# view
screen = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(0,0,0,1)"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


background = new Layer
	image: "images/background.png"

background.states =
	step_1:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
	step_1b:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
	step_2:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 36*retina
	step_3:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
	step_4:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
	step_4b:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
	step_5:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
	step_5b:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
	step_6:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina

background.stateSwitch("step_1")

seach_view = new Layer

	image: "images/seach view.png"

seach_view.states =
	step_1:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 110*retina
		opacity: 1
	step_1b:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 110*retina
		opacity: 1
	step_2:
		width: 297*retina
		height: 102*retina
		x: 34*retina
		y: 133*retina
		opacity: 1
	step_3:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 110*retina
		opacity: 1
	step_4:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 290*retina
		opacity: 0.4
	step_4b:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 290*retina
		opacity: 0.4
	step_5:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 117*retina
		opacity: 0.4
	step_5b:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 117*retina
		opacity: 0.4
	step_6:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 246*retina
		opacity: 1

seach_view.stateSwitch("step_1")

background_2 = new Layer

	image: "images/background 2.png"

background_2.states =
	step_1:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 36*retina
		opacity: 0
	step_2:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 36*retina
		opacity: 0
	step_3:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
		opacity: 1
	step_4:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
		opacity: 1
	step_4b:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
		opacity: 1
	step_5:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
		opacity: 1
	step_5b:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
		opacity: 1
	step_6:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
		opacity: 1

background_2.stateSwitch("step_1")

darker = new Layer

	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(0,0,0,1)"

darker.states =
	step_1:
		opacity: 0
	step_2:
		opacity: 0.2
	step_3:
		opacity: 0

darker.stateSwitch("step_1")

bubble_2 = new Layer

	width: 320*retina
	height: 163*retina
	x: 20*retina
	image: "images/bubble 2.png"

bubble_2.states =
	step_1:
		y: 126*retina
		opacity: 0
	step_4:
		y: 126*retina
		opacity: 0
	step_4b:
		y: 106*retina
		opacity: 1
	step_5:
		y: 106*retina
		opacity: 0

bubble_2.stateSwitch("step_1")

zen_view = new Layer

	width: 330*retina
	height: 413*retina
	x: 16*retina
	image: "images/zen view.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_view.states =
	step_1:
		y: 640*retina
		opacity: 0
	step_4b:
		y: 640*retina
		opacity: 1
	step_5:
		y: 421*retina
		opacity: 1
	step_5b:
		y: 421*retina
		opacity: 1
	step_6:
		y: 459*retina
		opacity: 1

zen_view.stateSwitch("step_1")

bubble = new Layer

	width: 320*retina
	height: 162*retina
	x: 20*retina
	image: "images/bubble.png"

bubble.states =
	step_1:
		y: 233*retina
		opacity: 0
	step_5:
		y: 233*retina
		opacity: 0
	step_5b:
		y: 253*retina
		opacity: 1
	step_6:
		y: 253*retina
		opacity: 0

bubble.stateSwitch("step_1")

table = new Layer

	width: 330*retina
	height: 332*retina
	x: 14*retina
	image: "images/table.png"

table.states =
	step_1:
		y: -400*retina
		opacity: 0
	step_3:
		y: -400*retina
		opacity: 1
	step_4:
		y: -235*retina
		opacity: 1
	step_4b:
		y: -235*retina
		opacity: 1
	step_5:
		y: -255*retina
		opacity: 0.4
	step_5b:
		y: -255*retina
		opacity: 0.4
	step_6:
		y: -166*retina
		opacity: 1

table.stateSwitch("step_1")

change_background = new Layer

	width: 380*retina
	height: 380*retina
	x: -10*retina
	image: "images/change background.png"

change_background.states =
	step_1:
		y: 610*retina
		opacity: 1
	step_1b:
		y: 610*retina
		opacity: 1
	step_2:
		y: 260*retina
		opacity: 1
	step_3:
		y: 610*retina
		opacity: 1
	step_4:
		y: 610*retina
		opacity: 0

change_background.stateSwitch("step_1")

bubble_1 = new Layer

	width: 300*retina
	height: 126*retina
	x: 30*retina
	image: "images/bubble 1.png"

bubble_1.states =
	step_1:
		y: 330*retina
		opacity: 0
	step_1b:
		y: 350*retina
		opacity: 1
	step_2:
		y: 350*retina
		opacity: 0

bubble_1.stateSwitch("step_1")

navbar = new Layer

	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"

action_bg = new Layer

	width: 360*retina
	height: 56*retina
	x: 0*retina
	y: 536*retina
	backgroundColor: "rgba(0,0,0,1)"

action_bg.states =
	step_1:
		opacity: 0.5
	step_1b:
		opacity: 0.5
	step_2:
		opacity: 0.5
	step_3:
		opacity: 0.5
	step_4:
		opacity: 0.5
	step_4b:
		opacity: 0.5
	step_5:
		opacity: 0.5
	step_5b:
		opacity: 0.5
	step_6:
		opacity: 0

action_bg.stateSwitch("step_1")

skip_step = new Layer

	width: 96*retina
	height: 12*retina
	x: 132*retina
	y: 558*retina
	image: "images/skip step.png"

skip_step.states =
	step_1:
		opacity: 1
	step_1b:
		opacity: 1
	step_2:
		opacity: 1
	step_3:
		opacity: 1
	step_4:
		opacity: 1
	step_4b:
		opacity: 1
	step_5:
		opacity: 1
	step_5b:
		opacity: 1
	step_6:
		opacity: 0

skip_step.stateSwitch("step_1")















# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["step_1", "step_1b", "step_2", "step_3", "step_4", "step_4b", "step_5", "step_5b", "step_6"]
items = [screen, background, background_2, darker, bubble_2, zen_view, bubble, table, change_background, bubble_1, navbar, action_bg, skip_step, seach_view]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

seach_view.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "step_1" or toState is "step_3" or toState is "step_4" or toState is "step_5"
		nextState = cycler()
		for item in items
			try
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
			catch error


goNext = () ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error

screen.on Events.Click, ->
	goNext()

seach_view.stateSwitch("step_1")



seach_view.bringToFront()

action_bg.bringToFront()
skip_step.bringToFront()
# complete_step.bringToFront()

navbar.bringToFront()

for item in items
	if item != screen
		item.parent = screen
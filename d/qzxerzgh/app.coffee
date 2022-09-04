
retina = 1

screen = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

# view
background = new Layer

	image: "images/background.png"

background.states =
	step_1:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
		opacity: 1
	step_1b:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
		opacity: 1
	step_2:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 20*retina
		opacity: 1
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
	step_4c:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
		opacity: 0
	step_4e:
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

background.stateSwitch("step_1")

background_2 = new Layer

	image: "images/background 2.png"

background_2.states =
	step_1:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 20*retina
		opacity: 0
	step_2:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 20*retina
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
	step_4c:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 25*retina
		opacity: 1
	step_4d:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 25*retina
		opacity: 1
	step_4e:
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
		y: 117*retina
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
		y: 375*retina
		opacity: 0.4
	step_4b:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 375*retina
		opacity: 0.4
	step_4c:
		width: 297*retina
		height: 101*retina
		x: 34*retina
		y: 358*retina
		opacity: 0.4
	step_4d:
		width: 297*retina
		height: 101*retina
		x: 34*retina
		y: 358*retina
		opacity: 0
	step_4e:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 375*retina
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

bubble_1 = new Layer

	width: 280*retina
	height: 186*retina
	x: 40*retina
	image: "images/bubble 1.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(10px*" + retina + ") calc(20px*" + retina + ") " + "rgba(0,0,0,0.5))"}

bubble_1.states =
	step_1:
		y: 260*retina
		opacity: 0
	step_1b:
		y: 300*retina
		opacity: 1
	step_2:
		y: 300*retina
		opacity: 0

bubble_1.stateSwitch("step_1")

bg_suggest_view = new Layer

	width: 360*retina
	height: 232*retina
	x: 0*retina
	image: "images/bg suggest view.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(-4px*" + retina + ") calc(6px*" + retina + ") " + "rgba(0,0,0,0.3))"}

bg_suggest_view.states =
	step_1:
		y: 536*retina
		opacity: 0
	step_1b:
		y: 536*retina
		opacity: 1
	step_2:
		y: 304*retina
		opacity: 1
	step_3:
		y: 536*retina
		opacity: 1
	step_4:
		y: 536*retina
		opacity: 0

bg_suggest_view.stateSwitch("step_1")

table_empty = new Layer

	image: "images/table empty.png"

table_empty.states =
	step_1:
		width: 332*retina
		height: 156*retina
		x: 14*retina
		y: -156*retina
		opacity: 0
	step_3:
		width: 332*retina
		height: 156*retina
		x: 14*retina
		y: -156*retina
		opacity: 1
	step_4:
		width: 332*retina
		height: 156*retina
		x: 14*retina
		y: 0*retina
		opacity: 1
	step_4b:
		width: 332*retina
		height: 156*retina
		x: 14*retina
		y: 0*retina
		opacity: 1
	step_4c:
		width: 295*retina
		height: 139*retina
		x: 32*retina
		y: 25*retina
		opacity: 1
	step_4d:
		width: 295*retina
		height: 139*retina
		x: 32*retina
		y: 25*retina
		opacity: 1
	step_4e:
		width: 295*retina
		height: 139*retina
		x: 32*retina
		y: 25*retina
		opacity: 0

table_empty.stateSwitch("step_1")

bubble_2 = new Layer

	width: 280*retina
	height: 207*retina
	x: 40*retina
	image: "images/bubble 2.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(10px*" + retina + ") calc(20px*" + retina + ") " + "rgba(0,0,0,0.5))"}

bubble_2.states =
	step_1:
		y: 159*retina
		opacity: 0
	step_4:
		y: 159*retina
		opacity: 0
	step_4b:
		y: 119*retina
		opacity: 1
	step_4c:
		y: 119*retina
		opacity: 0

bubble_2.stateSwitch("step_1")

table_suggest = new Layer

	width: 360*retina
	height: 332*retina
	x: 0*retina
	image: "images/table suggest.png"

table_suggest.states =
	step_1:
		y: 536*retina
		opacity: 0
	step_4b:
		y: 536*retina
		opacity: 1
	step_4c:
		y: 204*retina
		opacity: 1
	step_4d:
		y: 204*retina
		opacity: 1
	step_4e:
		y: 536*retina
		opacity: 1
	step_5:
		y: 536*retina
		opacity: 0

table_suggest.stateSwitch("step_1")

table_done = new Layer

	image: "images/table done.png"

table_done.states =
	step_1:
		width: 295*retina
		height: 140*retina
		x: 32*retina
		y: 25*retina
		opacity: 0
	step_4d:
		width: 295*retina
		height: 140*retina
		x: 32*retina
		y: 25*retina
		opacity: 1
	step_4e:
		width: 332*retina
		height: 166*retina
		x: 14*retina
		y: 0*retina
		opacity: 1
	step_5:
		width: 332*retina
		height: 166*retina
		x: 14*retina
		y: -89*retina
		opacity: 0.4
	step_5b:
		width: 332*retina
		height: 166*retina
		x: 14*retina
		y: -89*retina
		opacity: 0.4
	step_6:
		width: 332*retina
		height: 166*retina
		x: 14*retina
		y: 0*retina
		opacity: 1

table_done.stateSwitch("step_1")

selected_site_1 = new Layer

	width: 180*retina
	height: 83*retina
	x: 0*retina
	y: 204*retina
	backgroundColor: "rgba(0,0,0,1)"

selected_site_1.states =
	step_1:
		opacity: 0
	step_4d:
		opacity: 0.8
	step_4e:
		opacity: 0

selected_site_1.stateSwitch("step_1")

selected_site_2 = new Layer

	width: 180*retina
	height: 83*retina
	x: 180*retina
	y: 287*retina
	backgroundColor: "rgba(0,0,0,1)"

selected_site_2.states =
	step_1:
		opacity: 0
	step_4d:
		opacity: 0.8
	step_4e:
		opacity: 0

selected_site_2.stateSwitch("step_1")

selected_site_3 = new Layer

	width: 180*retina
	height: 83*retina
	x: 180*retina
	y: 370*retina
	backgroundColor: "rgba(0,0,0,1)"

selected_site_3.states =
	step_1:
		opacity: 0
	step_4d:
		opacity: 0.8
	step_4e:
		opacity: 0

selected_site_3.stateSwitch("step_1")

selected_site_4 = new Layer

	width: 180*retina
	height: 83*retina
	x: 0*retina
	y: 370*retina
	backgroundColor: "rgba(0,0,0,1)"

selected_site_4.states =
	step_1:
		opacity: 0
	step_4d:
		opacity: 0.8
	step_4e:
		opacity: 0

selected_site_4.stateSwitch("step_1")

zen_view = new Layer

	width: 330*retina
	height: 413*retina
	image: "images/zen view.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_view.states =
	step_1:
		x: 15*retina
		y: 536*retina
		opacity: 0
	step_4e:
		x: 15*retina
		y: 536*retina
		opacity: 1
	step_5:
		x: 16*retina
		y: 420*retina
		opacity: 1
	step_5b:
		x: 16*retina
		y: 420*retina
		opacity: 1
	step_6:
		x: 16*retina
		y: 459*retina
		opacity: 1

zen_view.stateSwitch("step_1")

bubble_3 = new Layer

	width: 280*retina
	height: 207*retina
	x: 40*retina
	image: "images/bubble 3.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(10px*" + retina + ") calc(20px*" + retina + ") " + "rgba(0,0,0,0.5))"}

bubble_3.states =
	step_1:
		y: 143*retina
		opacity: 0
	step_5:
		y: 143*retina
		opacity: 0
	step_5b:
		y: 223*retina
		opacity: 1
	step_6:
		y: 223*retina
		opacity: 0

bubble_3.stateSwitch("step_1")

action_bg = new Layer

	width: 360*retina
	height: 56*retina
	x: 0*retina
	y: 536*retina
	image: "images/action bg.png"

action_bg.states =
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
	step_4c:
		opacity: 1
	step_4d:
		opacity: 1
	step_4e:
		opacity: 1
	step_5:
		opacity: 1
	step_5b:
		opacity: 1
	step_6:
		opacity: 0

action_bg.stateSwitch("step_1")

action_sites = new Layer

	width: 150*retina
	height: 14*retina
	x: 105*retina
	y: 556*retina
	image: "images/action sites.png"

action_sites.states =
	step_1:
		opacity: 0
	step_4c:
		opacity: 0.4
	step_4d:
		opacity: 0

action_sites.stateSwitch("step_1")

action_change_bg = new Layer

	width: 111*retina
	height: 12*retina
	x: 124*retina
	y: 558*retina
	image: "images/action change bg.png"

action_change_bg.states =
	step_1:
		opacity: 0
	step_2:
		opacity: 0.4
	step_3:
		opacity: 0

action_change_bg.stateSwitch("step_1")

action_skip = new Layer

	width: 96*retina
	height: 12*retina
	x: 132*retina
	y: 558*retina
	image: "images/action skip.png"

action_skip.states =
	step_1:
		opacity: 0
	step_1b:
		opacity: 1
	step_2:
		opacity: 0
	step_4b:
		opacity: 1
	step_4c:
		opacity: 0
	step_4e:
		opacity: 1
	step_5:
		opacity: 1
	step_5b:
		opacity: 1
	step_6:
		opacity: 0

action_skip.stateSwitch("step_1")

navbar = new Layer

	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["step_1", "step_1b", "step_2", "step_3", "step_4", "step_4b", "step_4c", "step_4d", "step_4e", "step_5", "step_5b", "step_6"]
items = [background, background_2, seach_view, bubble_1, bg_suggest_view, table_empty, bubble_2, table_suggest, table_done, selected_site_1, selected_site_2, selected_site_3, selected_site_4, zen_view, bubble_3, action_bg, action_sites, action_change_bg, action_skip, navbar]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

seach_view.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "step_1" or toState is "step_3" or toState is "step_4" or toState is "step_4d" or toState is "step_4e" or toState is "step_5"
		nextState = cycler()
		for item in items
			try
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
			catch error

seach_view.stateSwitch("step_1")

nextStateHandler = () ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error


screen.on Events.Click, ->
	nextStateHandler()

for item in items
	item.parent = screen
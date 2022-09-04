
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
	step_2:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 44*retina
	step_3:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
	step_4c:
		opacity: 0
	step_4e:
		opacity: 1

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
		height: 112*retina
	step_2:
		width: 297*retina
		height: 102*retina
		x: 34*retina
		y: 141*retina
	step_3:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 110*retina
	step_4:
		y: 240*retina
		opacity: 0.4
	step_4c:
		width: 297*retina
		height: 101*retina
		x: 34*retina
		y: 297*retina
	step_4d:
		width: 334*retina
		height: 113*retina
		x: 16*retina
		y: 285*retina
	step_4e:
		y: 250*retina
	step_5:
		y: 146*retina
	step_5с:
		y: -461*retina
	step_6:
		y: 250*retina
	step_6b:
		opacity: 1

seach_view.stateSwitch("step_1")

bg_suggest_view = new Layer

	width: 360*retina
	height: 232*retina
	x: 0*retina
	image: "images/bg suggest view.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(-4px*" + retina + ") calc(6px*" + retina + ") " + "rgba(0,0,0,0.3))"}

bg_suggest_view.states =
	step_1:
		y: 592*retina
		opacity: 0
	step_1b:
		opacity: 1
	step_2:
		y: 357*retina
	step_3:
		y: 592*retina
	step_4:
		opacity: 0

bg_suggest_view.stateSwitch("step_1")

background_2 = new Layer

	image: "images/background 2.png"

background_2.states =
	step_1:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 44*retina
		opacity: 0
	step_3:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina
		opacity: 1
	step_4c:
		width: 320*retina
		height: 569*retina
		x: 20*retina
		y: 44*retina
	step_4e:
		width: 360*retina
		height: 640*retina
		x: 0*retina
		y: 0*retina

background_2.stateSwitch("step_1")

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
		opacity: 1
	step_4:
		y: 24*retina
	step_4c:
		width: 295*retina
		height: 139*retina
		x: 32*retina
		y: 44*retina
	step_4e:
		opacity: 0

table_empty.stateSwitch("step_1")

popup_2 = new Layer

	width: 340*retina
	height: 247*retina
	x: 10*retina
	image: "images/popup 2.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}

popup_2.states =
	step_1:
		y: 206*retina
		opacity: 0
	step_4b:
		y: 166*retina
		opacity: 1
	step_4c:
		opacity: 0

popup_2.stateSwitch("step_1")

table_suggest = new Layer

	width: 360*retina
	height: 332*retina
	x: 0*retina
	image: "images/table suggest.png"

table_suggest.states =
	step_1:
		y: 592*retina
		opacity: 0
	step_4b:
		opacity: 1
	step_4c:
		y: 260*retina
	step_4e:
		y: 592*retina
	step_5:
		opacity: 0

table_suggest.stateSwitch("step_1")

table_done = new Layer

	image: "images/table done.png"

table_done.states =
	step_1:
		width: 295*retina
		height: 140*retina
		x: 32*retina
		y: 44*retina
		opacity: 0
	step_4d:
		opacity: 1
	step_4e:
		width: 332*retina
		height: 166*retina
		x: 14*retina
		y: 24*retina
	step_5:
		y: -80*retina
		opacity: 0.4
	step_5с:
		y: -667*retina
	step_6:
		y: 24*retina
	step_6c:
		opacity: 1

table_done.stateSwitch("step_1")

selected_site_1 = new Layer

	width: 180*retina
	height: 83*retina
	x: 0*retina
	backgroundColor: "rgba(0,0,0,1)"

selected_site_1.states =
	step_1:
		y: 260*retina
		opacity: 0
	step_4d:
		opacity: 0.8
	step_4e:
		y: 592*retina
	step_5:
		opacity: 0

selected_site_1.stateSwitch("step_1")

selected_site_2 = new Layer

	width: 180*retina
	height: 83*retina
	x: 180*retina
	backgroundColor: "rgba(0,0,0,1)"

selected_site_2.states =
	step_1:
		y: 343*retina
		opacity: 0
	step_4d:
		opacity: 0.8
	step_4e:
		y: 675*retina
	step_5:
		opacity: 0

selected_site_2.stateSwitch("step_1")

selected_site_3 = new Layer

	width: 180*retina
	height: 83*retina
	x: 180*retina
	backgroundColor: "rgba(0,0,0,1)"

selected_site_3.states =
	step_1:
		y: 426*retina
		opacity: 0
	step_4d:
		opacity: 0.8
	step_4e:
		y: 758*retina
	step_5:
		opacity: 0

selected_site_3.stateSwitch("step_1")

selected_site_4 = new Layer

	width: 180*retina
	height: 83*retina
	x: 0*retina
	backgroundColor: "rgba(0,0,0,1)"

selected_site_4.states =
	step_1:
		y: 426*retina
		opacity: 0
	step_4d:
		opacity: 0.8
	step_4e:
		y: 758*retina
	step_5:
		opacity: 0

selected_site_4.stateSwitch("step_1")

site_selected_item_1 = new Layer

	width: 44*retina
	height: 44*retina
	x: 68*retina
	image: "images/site selected item 1.png"

site_selected_item_1.states =
	step_1:
		y: 280*retina
		opacity: 0
	step_4d:
		opacity: 1
	step_4e:
		y: 612*retina
	step_5:
		opacity: 0

site_selected_item_1.stateSwitch("step_1")

site_selected_item_2 = new Layer

	width: 44*retina
	height: 44*retina
	x: 248*retina
	image: "images/site selected item 2.png"

site_selected_item_2.states =
	step_1:
		y: 363*retina
		opacity: 0
	step_4d:
		opacity: 1
	step_4e:
		y: 695*retina
	step_5:
		opacity: 0

site_selected_item_2.stateSwitch("step_1")

site_selected_item_3 = new Layer

	width: 44*retina
	height: 44*retina
	x: 248*retina
	image: "images/site selected item 3.png"

site_selected_item_3.states =
	step_1:
		y: 446*retina
		opacity: 0
	step_4d:
		opacity: 1
	step_4e:
		y: 778*retina
	step_5:
		opacity: 0

site_selected_item_3.stateSwitch("step_1")

site_selected_item_4 = new Layer

	width: 44*retina
	height: 44*retina
	x: 68*retina
	image: "images/site selected item 4.png"

site_selected_item_4.states =
	step_1:
		y: 446*retina
		opacity: 0
	step_4d:
		opacity: 1
	step_4e:
		y: 778*retina
	step_5:
		opacity: 0

site_selected_item_4.stateSwitch("step_1")

zen_view = new Layer

	width: 330*retina
	height: 160*retina
	image: "images/zen view.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_view.states =
	step_1:
		x: 15*retina
		y: 592*retina
		opacity: 0
	step_4e:
		opacity: 1
	step_5:
		x: 16*retina
		y: 480*retina
	step_5с:
		y: -158*retina
	step_6:
		y: 480*retina
		opacity: 0.4
	step_6c:
		opacity: 1

zen_view.stateSwitch("step_1")

navbar = new Layer

	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"

zen_static_content = new Layer

	width: 328*retina
	height: 669*retina
	x: 16*retina
	image: "images/zen static content.png"

zen_static_content.states =
	step_1:
		y: 681*retina
		opacity: 0
	step_5b:
		opacity: 1
	step_5с:
		y: 47*retina
	step_6:
		y: 683*retina
	step_6b:
		opacity: 0

zen_static_content.stateSwitch("step_1")

zen_theme_1 = new Layer

	width: 104*retina
	height: 132*retina
	x: 240*retina
	image: "images/zen theme 1.png"

zen_theme_1.states =
	step_1:
		y: 938*retina
		opacity: 0
	step_5b:
		opacity: 1
	step_5с:
		y: 304*retina
	step_5d:
		opacity: 0.3
	step_6:
		y: 940*retina
	step_6b:
		opacity: 0

zen_theme_1.stateSwitch("step_1")

zen_theme_2 = new Layer

	width: 104*retina
	height: 132*retina
	x: 240*retina
	image: "images/zen theme 2.png"

zen_theme_2.states =
	step_1:
		y: 798*retina
		opacity: 0
	step_5b:
		opacity: 1
	step_5с:
		y: 164*retina
	step_5d:
		opacity: 0.3
	step_6:
		y: 800*retina
	step_6b:
		opacity: 0

zen_theme_2.stateSwitch("step_1")

zen_theme_3 = new Layer

	width: 104*retina
	height: 132*retina
	x: 128*retina
	image: "images/zen theme 3.png"

zen_theme_3.states =
	step_1:
		y: 798*retina
		opacity: 0
	step_5b:
		opacity: 1
	step_5с:
		y: 164*retina
	step_5d:
		opacity: 0.3
	step_6:
		y: 800*retina
	step_6b:
		opacity: 0

zen_theme_3.stateSwitch("step_1")

zen_theme_4 = new Layer

	width: 104*retina
	height: 132*retina
	x: 16*retina
	image: "images/zen theme 4.png"

zen_theme_4.states =
	step_1:
		y: 938*retina
		opacity: 0
	step_5b:
		opacity: 1
	step_5с:
		y: 304*retina
	step_5d:
		opacity: 0.3
	step_6:
		y: 940*retina
	step_6b:
		opacity: 0

zen_theme_4.stateSwitch("step_1")

zen_darker = new Layer

	width: 360*retina
	height: 594*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(0,0,0,0.4973958333333333)"

zen_darker.states =
	step_1:
		opacity: 0
	step_5с:
		opacity: 1
	step_6:
		opacity: 0

zen_darker.stateSwitch("step_1")

zen_selected_theme_1 = new Layer

	width: 44*retina
	height: 44*retina
	x: 158*retina
	image: "images/zen selected theme 1.png"

zen_selected_theme_1.states =
	step_1:
		y: 208*retina
		opacity: 0
	step_5d:
		opacity: 1
	step_6:
		y: 844*retina
	step_6b:
		opacity: 0

zen_selected_theme_1.stateSwitch("step_1")

zen_selected_theme_2 = new Layer

	width: 44*retina
	height: 44*retina
	x: 270*retina
	image: "images/zen selected theme 2.png"

zen_selected_theme_2.states =
	step_1:
		y: 208*retina
		opacity: 0
	step_5d:
		opacity: 1
	step_6:
		y: 844*retina
	step_6b:
		opacity: 0

zen_selected_theme_2.stateSwitch("step_1")

zen_selected_theme_3 = new Layer

	width: 44*retina
	height: 44*retina
	x: 46*retina
	image: "images/zen selected theme 3.png"

zen_selected_theme_3.states =
	step_1:
		y: 348*retina
		opacity: 0
	step_5d:
		opacity: 1
	step_6:
		y: 984*retina
	step_6b:
		opacity: 0

zen_selected_theme_3.stateSwitch("step_1")

zen_selected_theme_4 = new Layer

	width: 44*retina
	height: 44*retina
	x: 270*retina
	image: "images/zen selected theme 4.png"

zen_selected_theme_4.states =
	step_1:
		y: 348*retina
		opacity: 0
	step_5d:
		opacity: 1
	step_6:
		y: 984*retina
	step_6b:
		opacity: 0

zen_selected_theme_4.stateSwitch("step_1")

popup_4 = new Layer

	width: 340*retina
	height: 310*retina
	x: 10*retina
	image: "images/popup 4.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}

popup_4.states =
	step_1:
		y: 118*retina
		opacity: 0
	step_6b:
		y: 158*retina
		opacity: 1
	step_6c:
		opacity: 0

popup_4.stateSwitch("step_1")

popup_3 = new Layer

	width: 340*retina
	height: 246*retina
	x: 10*retina
	image: "images/popup 3.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}

popup_3.states =
	step_1:
		y: 206*retina
		opacity: 0
	step_5b:
		y: 246*retina
		opacity: 1
	step_5с:
		y: 186*retina
		opacity: 0

popup_3.stateSwitch("step_1")

popup_1 = new Layer

	width: 340*retina
	height: 208*retina
	x: 10*retina
	image: "images/popup 1.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}

popup_1.states =
	step_1:
		y: 342*retina
		opacity: 0
	step_1b:
		y: 302*retina
		opacity: 1
	step_2:
		opacity: 0

popup_1.stateSwitch("step_1")

status_bar = new Layer

	width: 360*retina
	height: 24*retina
	x: 0*retina
	y: 0*retina
	image: "images/status bar.png"

zen_submit_button = new Layer

	width: 200*retina
	height: 48*retina
	x: 80*retina
	y: 512*retina
	image: "images/zen submit button.png"

zen_submit_button.states =
	step_1:
		opacity: 0
	step_5d:
		opacity: 1
	step_6:
		opacity: 0

zen_submit_button.stateSwitch("step_1")

zen_progress_bar = new Layer

	width: 64*retina
	height: 64*retina
	x: 148*retina
	y: 504*retina
	image: "images/zen progress bar.png"

zen_progress_bar.states =
	step_1:
		opacity: 0
	step_5с:
		opacity: 1
	step_5d:
		opacity: 0

zen_progress_bar.stateSwitch("step_1")





# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["step_1", "step_1b", "step_2", "step_3", "step_4", "step_4b", "step_4c", "step_4d", "step_4e", "step_5", "step_5b", "step_5с", "step_5d", "step_6", "step_6b", "step_6c"]
items = [background, bg_suggest_view, background_2, seach_view, table_empty, popup_2, table_suggest, table_done, selected_site_1, selected_site_2, selected_site_3, selected_site_4, site_selected_item_1, site_selected_item_2, site_selected_item_3, site_selected_item_4, zen_view, popup_3, zen_darker, navbar, popup_1, status_bar, popup_4, zen_static_content, zen_theme_1, zen_theme_2, zen_theme_3, zen_theme_4, zen_selected_theme_1, zen_selected_theme_2, zen_selected_theme_3, zen_selected_theme_4, zen_submit_button, zen_progress_bar]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

seach_view.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "step_1" or toState is "step_3" or toState is "step_4" or toState is "step_4d" or toState is "step_4e" or toState is "step_5" or toState is "step_6"
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



seach_view.placeBefore(background_2)
status_bar.bringToFront()
navbar.bringToFront()
zen_darker.placeBefore(table_done)

for item in items
	item.parent = screen
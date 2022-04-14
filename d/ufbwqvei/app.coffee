retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

# view
bg_screen = new Layer width: 374.99999999999994*retina, height: 667.0000000000005*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(238,238,238,1)"

segmented_control = new Layer width: 375*retina, height: 46*retina, x: 0*retina, image: "images/segmented control.png"

segmented_control.states.add {
	case_chat: { y: 225*retina}
	case_chat_write: { y: 65*retina}
}
segmented_control.states.switchInstant "case_chat"

fixed_part = new Layer width: 375*retina, height: 136*retina, x: 0*retina, image: "images/fixed part.png"

fixed_part.states.add {
	case_chat: { y: 68*retina}
	case_chat_write: { y: -92*retina}
}
fixed_part.states.switchInstant "case_chat"

chat_area = new Layer width: 375*retina, height: 505*retina, x: 0*retina, image: "images/chat area.png"

chat_area.states.add {
	case_chat: { y: 272*retina}
	case_chat_write: { y: 112*retina}
}
chat_area.states.switchInstant "case_chat"

bottom_bar = new Layer width: 375*retina, height: 50*retina, x: 0*retina, image: "images/bottom bar.png"

bottom_bar.states.add {
	case_chat: { y: 617*retina}
	case_chat_write: { y: 400*retina}
}
bottom_bar.states.switchInstant "case_chat"

keyboard = new Layer width: 375*retina, height: 217*retina, x: 0*retina, image: "images/keyboard.png"

keyboard.states.add {
	case_chat: { y: 668*retina}
	case_chat_write: { y: 450*retina}
}
keyboard.states.switchInstant "case_chat"

nav_bar = new Layer width: 375*retina, height: 64*retina, x: 0*retina, y: 0*retina, image: "images/nav bar.png"

cursor = new Layer width: 1*retina, height: 24*retina, x: 27*retina, backgroundColor: "rgba(0,0,0,1)"

cursor.states.add {
	case_chat: { y: 630*retina, opacity: 0}
	case_chat_write: { y: 413*retina, opacity: 1}
}
cursor.states.switchInstant "case_chat"


# model
# cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["case_chat", "case_chat_write"]
items = [bg_screen, segmented_control, fixed_part, chat_area, bottom_bar, keyboard, nav_bar, cursor]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screen.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 0.8), time: 0.5)
		catch error

for item in items
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(251,254,254,1)"
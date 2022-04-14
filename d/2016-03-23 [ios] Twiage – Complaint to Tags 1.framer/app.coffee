retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

# view
bg = new Layer width: 374.99999999999994*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(238,238,238,1)"

bg.states.add {
	case_right: { height: 667.0000000000005*retina}
	case_right_complaints: { height: 667*retina}
}
bg.states.switchInstant "case_right"

comp_bg = new Layer width: 375*retina, height: 546.9999999999999*retina, x: 0*retina, y: 120*retina, backgroundColor: "rgba(255,255,255,1)"

tags = new Layer width: 375*retina, height: 483*retina, x: 0*retina, image: "images/tags.png"

tags.states.add {
	case_right: { y: 650*retina}
	case_right_complaints: { y: 180*retina}
}
tags.states.switchInstant "case_right"

complaints = new Layer width: 344*retina, height: 343*retina, x: 16*retina, image: "images/complaints.png"

complaints.states.add {
	case_right: { y: 141*retina}
	case_right_complaints: { y: -243*retina}
}
complaints.states.switchInstant "case_right"

current_bg = new Layer width: 111*retina, height: 110*retina, x: 132*retina, borderRadius: 10*retina, backgroundColor: "rgba(235,34,58,1)"

current_bg.states.add {
	case_right: { y: 257*retina}
	case_right_complaints: { y: -127*retina}
}
current_bg.states.switchInstant "case_right"

complaint_title_base = new Layer width: 94*retina, height: 36*retina, x: 141*retina, image: "images/complaint title base.png"

complaint_title_base.states.add {
	case_right: { y: 295*retina}
	case_right_complaints: { y: -89*retina}
}
complaint_title_base.states.switchInstant "case_right"

tip = new Layer width: 263*retina, height: 16*retina, x: 56*retina, image: "images/tip.png"

tip.states.add {
	case_right: { y: 510*retina}
	case_right_complaints: { y: 126*retina}
}
tip.states.switchInstant "case_right"

fixed = new Layer width: 374.99999999999983*retina, height: 120*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(219,219,219,1)"

selected_complaint_done = new Layer width: 375*retina, height: 60*retina, x: 0*retina, image: "images/selected complaint done.png"

selected_complaint_done.states.add {
	case_right: { y: 60*retina}
	case_right_complaints: { y: 120*retina}
}
selected_complaint_done.states.switchInstant "case_right"

tabs_top = new Layer width: 375*retina, height: 52*retina, x: 0*retina, y: 66*retina, image: "images/tabs top.png"

information_bar_top = new Layer width: 375*retina, height: 101*retina, x: 0*retina, y: -36*retina, image: "images/information bar top.png"

nav_bar_top = new Layer width: 375*retina, height: 64*retina, x: 0*retina, y: 0*retina, image: "images/nav bar top.png"


# model

statesFromArtboards = ["case_right", "case_right_complaints"]
items = [bg, comp_bg, tags, complaints, current_bg, complaint_title_base, tip, fixed, selected_complaint_done, tabs_top, information_bar_top, nav_bar_top]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screen.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 0.9), time: 0.5)
		catch error

for item in items
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(251,254,254,1)"
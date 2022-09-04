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

next_complaint_title = new Layer width: 375*retina, height: 60*retina, x: 0*retina, image: "images/next complaint title.png"

next_complaint_title.states.add {
	case_right: { y: 180*retina, opacity: 0}
	case_right_complaints: { y: 120*retina, opacity: 1}
}
next_complaint_title.states.switchInstant "case_right"

current_bg = new Layer borderRadius: 10*retina, backgroundColor: "rgba(235,34,58,1)"

current_bg.states.add {
	case_right: { width: 111*retina, height: 110*retina, x: 132*retina, y: 291*retina}
	case_right_complaints: { width: 40*retina, height: 40*retina, x: 15*retina, y: 130*retina}
}
current_bg.states.switchInstant "case_right"

complaints = new Layer width: 344*retina, height: 343*retina, x: 16*retina, image: "images/complaints.png"

complaints.states.add {
	case_right: { y: 175*retina, opacity: 1}
	case_right_complaints: { y: 346*retina, opacity: 0}
}
complaints.states.switchInstant "case_right"

tip = new Layer width: 263*retina, height: 16*retina, x: 56*retina, image: "images/tip.png"

tip.states.add {
	case_right: { y: 135*retina, opacity: 1}
	case_right_complaints: { y: 91*retina, opacity: 0}
}
tip.states.switchInstant "case_right"

tabs_top = new Layer width: 375*retina, height: 52*retina, x: 0*retina, y: 66*retina, image: "images/tabs top.png"

information_bar_top = new Layer width: 375*retina, height: 101*retina, x: 0*retina, y: -36*retina, image: "images/information bar top.png"

nav_bar_top = new Layer width: 375*retina, height: 64*retina, x: 0*retina, y: 0*retina, image: "images/nav bar top.png"

complaint_title_base = new Layer height: 35*retina, image: "images/complaint title base.png"

complaint_title_base.states.add {
	case_right: { width: 99*retina, x: 139*retina, y: 330*retina, opacity: 1}
	case_right_complaints: { width: 100*retina, x: -14*retina, y: 135*retina, opacity: 0}
}
complaint_title_base.states.switchInstant "case_right"

tags = new Layer width: 375*retina, height: 483*retina, x: 0*retina, image: "images/tags.png"

tags.states.add {
	case_right: { y: 663*retina}
	case_right_complaints: { y: 180*retina}
}
tags.states.switchInstant "case_right"


# model
# cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["case_right", "case_right_complaints"]
items = [bg, comp_bg, next_complaint_title, current_bg, complaints, tip, tabs_top, information_bar_top, nav_bar_top, complaint_title_base, tags]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screen.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 0.9), time: 0.7)
		catch error

for item in items
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(251,254,254,1)"

retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


# view
bg_copy = new Layer width: 374.99999999999994*retina, height: 667.0000000000005*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(238,238,238,1)"

bg_copy.states.add {
	case_right: { opacity: 0}
	case_right_copy_next: { opacity: 1}
	case_right_complaints: { opacity: 0}
}
bg_copy.states.switchInstant "case_right"

bg = new Layer x: 0*retina, y: 0*retina

bg.states.add {
	case_right: { width: 374.99999999999994*retina, height: 667.0000000000005*retina, backgroundColor: "rgba(238,238,238,1)"}
	case_right_copy_next: { width: 375*retina, height: 64*retina, backgroundColor: "rgba(250,250,250,1)"}
	case_right_complaints: { width: 374.99999999999994*retina, height: 667*retina, backgroundColor: "rgba(238,238,238,1)"}
}
bg.states.switchInstant "case_right"

comp_bg = new Layer width: 375*retina, height: 446*retina, x: 0*retina, y: 221*retina, backgroundColor: "rgba(255,255,255,1)"

complaints = new Layer width: 344*retina, height: 343*retina, x: 16*retina, image: "images/complaints.png"

complaints.states.add {
	case_right: { y: 276*retina, opacity: 1}
	case_right_complaints: { y: 346*retina, opacity: 0}
}
complaints.states.switchInstant "case_right"

tip_copy = new Layer width: 263*retina, height: 16*retina, x: 56*retina, y: 236*retina, image: "images/tip copy.png"

tip_copy.states.add {
	case_right: { opacity: 0}
	case_right_copy_next: { opacity: 1}
	case_right_complaints: { opacity: 0}
}
tip_copy.states.switchInstant "case_right"

choose_tags_block = new Layer width: 221*retina, height: 72*retina, x: 77*retina, y: 307*retina, image: "images/choose tags block.png"

choose_tags_block.states.add {
	case_right: { opacity: 0}
	case_right_complaints: { opacity: 1}
}
choose_tags_block.states.switchInstant "case_right"

tip = new Layer width: 263*retina, height: 16*retina, x: 56*retina, image: "images/tip.png"

tip.states.add {
	case_right: { y: 236*retina, opacity: 1}
	case_right_copy_next: { opacity: 0}
	case_right_complaints: { y: 191*retina}
}
tip.states.switchInstant "case_right"

top_block = new Layer width: 375*retina, height: 219*retina, x: 0*retina, y: 0*retina, image: "images/top block.png"

next_complaint_title = new Layer width: 375*retina, height: 60*retina, x: 0*retina, image: "images/next complaint title.png"

next_complaint_title.states.add {
	case_right: { y: 274*retina, opacity: 0}
	case_right_complaints: { y: 221*retina, opacity: 1}
}
next_complaint_title.states.switchInstant "case_right"

current_bg = new Layer borderRadius: 10*retina, backgroundColor: "rgba(235,34,58,1)"

current_bg.states.add {
	case_right: { width: 111*retina, height: 110*retina, x: 132*retina, y: 392*retina}
	case_right_complaints: { width: 40*retina, height: 40*retina, x: 15*retina, y: 231*retina}
}
current_bg.states.switchInstant "case_right"

complaint_title_base = new Layer height: 35*retina, image: "images/complaint title base.png"

complaint_title_base.states.add {
	case_right: { width: 99*retina, x: 139*retina, y: 431*retina, opacity: 1}
	case_right_complaints: { width: 100*retina, x: -14*retina, y: 235*retina, opacity: 0}
}
complaint_title_base.states.switchInstant "case_right"

overlay = new Layer width: 375.00000000000006*retina, height: 667.0000000000001*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(0,0,0,0.5)"

overlay.states.add {
	case_right: { opacity: 0}
	case_right_copy_next: { opacity: 1}
	case_right_complaints: { opacity: 0}
}
overlay.states.switchInstant "case_right"

show_modal = new Layer width: 355*retina, height: 483*retina, x: 10*retina, y: 65*retina, image: "images/show modal.png"

show_modal.states.add {
	case_right: { opacity: 0}
	case_right_copy_next: { opacity: 1}
	case_right_complaints: { opacity: 0}
}
show_modal.states.switchInstant "case_right"


# model
# cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["case_right", "case_right_copy_next", "case_right_complaints"]
items = [bg_copy, bg, comp_bg, complaints, tip_copy, choose_tags_block, tip, top_block, next_complaint_title, current_bg, complaint_title_base, overlay, show_modal]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screen.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error

for item in items
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(251,254,254,1)"
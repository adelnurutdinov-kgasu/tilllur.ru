retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

bg = new Layer width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(242,242,242,1.00)"
base = new Layer width: 375*retina, height: 64*retina, x: 0, y: 0, image: "images/base.png"
fix_bg = new Layer width: 375*retina, height: 138*retina, x: 0, y: 236*retina, backgroundColor: "rgba(255,255,255,1.00)"
res2 = new Layer width: 375*retina, height: 88*retina, x: 0, y: 236*retina, image: "images/res2.png"
res2_status = new Layer width: 375*retina, height: 56*retina, x: 0, y: 318*retina, image: "images/res2 status.png"
res_2_status_updated = new Layer width: 375*retina, height: 56*retina, x: 0, y: 318*retina, image: "images/res 2 status updated.png", opacity: 0
res1 = new Layer width: 375*retina, height: 126*retina, x: 0, y: 110*retina, image: "images/res1.png"
res3 = new Layer width: 375*retina, height: 110*retina, x: 0, y: 374*retina, image: "images/res3.png"
segmented_control = new Layer width: 375*retina, height: 46*retina, x: 0, y: 64*retina, image: "images/segmented control.png"

bg.states.add {
	employee_requests_progress_1: width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(242,242,242,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	employee_requests_progress_2: width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(242,242,242,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	employee_requests_progress_3: width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(242,242,242,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	employee_requests_progress_4: width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(242,242,242,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	employee_requests_progress_5: width: 375*retina, height: 667*retina, x: 0, y: 0, backgroundColor: "rgba(242,242,242,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
}
bg.states.switchInstant 'employee_requests_progress_1'

base.states.add {
	employee_requests_progress_1: width: 375*retina, height: 64*retina, x: 0, y: 0, rotation: 0, opacity: 1
	employee_requests_progress_2: width: 375*retina, height: 64*retina, x: 0, y: 0, rotation: 0, opacity: 1
	employee_requests_progress_3: width: 375*retina, height: 64*retina, x: 0, y: 0, rotation: 0, opacity: 1
	employee_requests_progress_4: width: 375*retina, height: 64*retina, x: 0, y: 0, rotation: 0, opacity: 1
	employee_requests_progress_5: width: 375*retina, height: 64*retina, x: 0, y: 0, rotation: 0, opacity: 1
}
base.states.switchInstant 'employee_requests_progress_1'

fix_bg.states.add {
	employee_requests_progress_1: width: 375*retina, height: 138*retina, x: 0, y: 236*retina, backgroundColor: "rgba(255,255,255,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	employee_requests_progress_2: width: 375*retina, height: 138*retina, x: 0, y: 236*retina, backgroundColor: "rgba(255,255,255,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	employee_requests_progress_3: width: 375*retina, height: 138*retina, x: 0, y: 236*retina, backgroundColor: "rgba(255,255,255,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	employee_requests_progress_4: width: 375*retina, height: 138*retina, x: 0, y: 98*retina, backgroundColor: "rgba(255,255,255,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	employee_requests_progress_5: width: 375*retina, height: 138*retina, x: 0, y: 98*retina, backgroundColor: "rgba(255,255,255,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
}
fix_bg.states.switchInstant 'employee_requests_progress_1'

res2.states.add {
	employee_requests_progress_1: width: 375*retina, height: 88*retina, x: 0, y: 236*retina, rotation: 0, opacity: 1
	employee_requests_progress_2: width: 375*retina, height: 88*retina, x: 0, y: 236*retina, rotation: 0, opacity: 1
	employee_requests_progress_3: width: 375*retina, height: 88*retina, x: 375*retina, y: 236*retina, rotation: 0, opacity: 1
	employee_requests_progress_4: width: 375*retina, height: 88*retina, x: 375*retina, y: 236*retina, rotation: 0, opacity: 0
	employee_requests_progress_5: width: 375*retina, height: 88*retina, x: 0, y: 98*retina, rotation: 0, opacity: 1
}
res2.states.switchInstant 'employee_requests_progress_1'

res2_status.states.add {
	employee_requests_progress_1: width: 375*retina, height: 56*retina, x: 0, y: 318*retina, rotation: 0, opacity: 1
	employee_requests_progress_2: width: 375*retina, height: 56*retina, x: 0, y: 318*retina, rotation: 0, opacity: 0
	employee_requests_progress_3: width: 375*retina, height: 56*retina, x: 0, y: 318*retina, rotation: 0, opacity: 0
	employee_requests_progress_4: width: 375*retina, height: 56*retina, x: 0, y: 318*retina, rotation: 0, opacity: 0
	employee_requests_progress_5: width: 375*retina, height: 56*retina, x: 0, y: 318*retina, rotation: 0, opacity: 0
}
res2_status.states.switchInstant 'employee_requests_progress_1'

res_2_status_updated.states.add {
	employee_requests_progress_1: width: 375*retina, height: 56*retina, x: 0, y: 318*retina, rotation: 0, opacity: 0
	employee_requests_progress_2: width: 375*retina, height: 56*retina, x: 0, y: 318*retina, rotation: 0, opacity: 1
	employee_requests_progress_3: width: 375*retina, height: 56*retina, x: 375*retina, y: 318*retina, rotation: 0, opacity: 1
	employee_requests_progress_4: width: 375*retina, height: 56*retina, x: 375*retina, y: 318*retina, rotation: 0, opacity: 0
	employee_requests_progress_5: width: 375*retina, height: 56*retina, x: 375*retina, y: 318*retina, rotation: 0, opacity: 0
}
res_2_status_updated.states.switchInstant 'employee_requests_progress_1'

res1.states.add {
	employee_requests_progress_1: width: 375*retina, height: 126*retina, x: 0, y: 110*retina, rotation: 0, opacity: 1
	employee_requests_progress_2: width: 375*retina, height: 126*retina, x: 0, y: 110*retina, rotation: 0, opacity: 1
	employee_requests_progress_3: width: 375*retina, height: 126*retina, x: 0, y: 110*retina, rotation: 0, opacity: 1
	employee_requests_progress_4: width: 375*retina, height: 126*retina, x: 0, y: 110*retina, rotation: 0, opacity: 1
	employee_requests_progress_5: width: 375*retina, height: 126*retina, x: 0, y: 110*retina, rotation: 0, opacity: 1
}
res1.states.switchInstant 'employee_requests_progress_1'

res3.states.add {
	employee_requests_progress_1: width: 375*retina, height: 110*retina, x: 0, y: 374*retina, rotation: 0, opacity: 1
	employee_requests_progress_2: width: 375*retina, height: 110*retina, x: 0, y: 374*retina, rotation: 0, opacity: 1
	employee_requests_progress_3: width: 375*retina, height: 110*retina, x: 0, y: 374*retina, rotation: 0, opacity: 1
	employee_requests_progress_4: width: 375*retina, height: 110*retina, x: 0, y: 236*retina, rotation: 0, opacity: 1
	employee_requests_progress_5: width: 375*retina, height: 110*retina, x: 0, y: 236*retina, rotation: 0, opacity: 1
}
res3.states.switchInstant 'employee_requests_progress_1'

segmented_control.states.add {
	employee_requests_progress_1: width: 375*retina, height: 46*retina, x: 0, y: 64*retina, rotation: 0, opacity: 1
	employee_requests_progress_2: width: 375*retina, height: 46*retina, x: 0, y: 64*retina, rotation: 0, opacity: 1
	employee_requests_progress_3: width: 375*retina, height: 46*retina, x: 0, y: 64*retina, rotation: 0, opacity: 1
	employee_requests_progress_4: width: 375*retina, height: 46*retina, x: 0, y: 64*retina, rotation: 0, opacity: 1
	employee_requests_progress_5: width: 375*retina, height: 46*retina, x: 0, y: 64*retina, rotation: 0, opacity: 1
}
segmented_control.states.switchInstant 'employee_requests_progress_1'


generatedState1 = "employee_requests_progress_1"
generatedState2 = "employee_requests_progress_2"
generatedState3 = "employee_requests_progress_3"
generatedState4 = "employee_requests_progress_4"
generatedState5 = "employee_requests_progress_5"


layers = [bg, base, fix_bg, res2, res2_status, res_2_status_updated, res1, res3, segmented_control]
generatedStates = [generatedState1, generatedState2, generatedState3, generatedState4, generatedState5]

cycler = Utils.cycle(generatedStates)
# generatedButton = new Layer width: Screen.width, height: Screen.height, opacity: 0


nextState = cycler()
screen.on Events.Click, ->
	nextState = cycler()
	if nextState == "employee_requests_progress_2"
		for item in layers
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
	else if nextState == "employee_requests_progress_3"
		for item in layers
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		Utils.delay 0.3, ->
			nextState = cycler()
			for item in layers
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
	else if nextState == "employee_requests_progress_5"
		for item in layers
			item.animate(nextState, curve: Spring(damping: 1), time: 0.1)
	else
		for item in layers
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)

for item in layers
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(0,197,0,1)"
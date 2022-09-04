retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

bg = new Layer width: 375*retina, height: 800*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(242,242,242,1)"

nav_bar = new Layer width: 375*retina, height: 64*retina, x: 0*retina, y: 0*retina, image: "images/nav bar.png"

content = new Layer width: 375*retina, height: 498*retina, x: 0*retina, y: 64*retina, image: "images/content.png"

reserve_order = new Layer width: 375*retina, height: 150*retina, x: 0*retina, y: Align.bottom, image: "images/reserve order.png"

fix = new Layer width: 200*retina, height: 46*retina, x: 0*retina, y: 230*retina, opacity: 0, image: "images/fix.png"

fix.states.add {
	show_error: { width: 200*retina, height: 46*retina, x: 0*retina, y: 230*retina, opacity: 1}
}


error_message = new Layer width: 375*retina, height: 64*retina, x: 0*retina, y: -70*retina, image: "images/error message.png"

error_message.states.add {
	show_error: { width: 375*retina, height: 64*retina, x: 0*retina, y: 20*retina}
}



show_error_time = 0.5

reserve_order.on Events.Click, ->
	error_message.states.switch "show_error", {time: show_error_time}
	fix.states.switch "show_error", {time: show_error_time}
	Utils.delay show_error_time*3, ->
		error_message.states.switch "default", {time: show_error_time}


for item in [bg, nav_bar, content, reserve_order, fix, error_message]
	item.parent = screen

reserve_order.y = Align.bottom

statusBar = new Layer
	parent: screen, height: 20, width: screen.width
	backgroundColor: "rgba(86,185,75,1)"
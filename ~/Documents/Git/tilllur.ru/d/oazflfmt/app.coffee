retina = 1

screen = new Layer
	width: 1440, height: 900, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light", visible: false }

slider = new Layer width: 1440*retina, height: 900*retina, image: "images/slider.png", x: 0, y: 0
slide_2 = new Layer width: 1440*retina, height: 380*retina, image: "images/slide 2.png", x: 0, y: 204*retina
slide_2.states.add {
	main_slider_a: width: 1440*retina, height: 380*retina, x: 1440*retina, y: 204*retina, opacity: 1
	main_slider_b: width: 1440*retina, height: 380*retina, x: 0, y: 204*retina, opacity: 1
}
slide_2.states.switchInstant 'main_slider_a'

slide_1 = new Layer width: 1440*retina, height: 380*retina, image: "images/slide 1.png", x: 0, y: 204*retina
slide_1.states.add {
	main_slider_a: width: 1440*retina, height: 380*retina, x: 0, y: 204*retina, opacity: 1
	main_slider_b: width: 1440*retina, height: 380*retina, x: -1440*retina, y: 204*retina, opacity: 1
}
slide_1.states.switchInstant 'main_slider_a'

selected_slider = new Layer width: 40*retina, height: 12*retina, image: "images/selected slider.png", x: 645*retina, y: 572*retina
selected_slider.states.add {
	main_slider_a: width: 40*retina, height: 12*retina, x: 438*retina, y: 572*retina, opacity: 1
	main_slider_b: width: 40*retina, height: 12*retina, x: 645*retina, y: 572*retina, opacity: 1
}
selected_slider.states.switchInstant 'main_slider_a'


arrows = new Layer width: 1440*retina, height: 160*retina, image: "images/arrows.png", x: 0, y: 304*retina


layers = [slide_1, slide_2, selected_slider]
states = ["main_slider_a", "main_slider_b"]
cycler = Utils.cycle(states)

slider.on Events.Click, ->
	nextState = cycler()
	for item in layers
		item.states.switch nextState

for item in [slider, slide_2, slide_1, selected_slider, arrows]
	item.parent = screen
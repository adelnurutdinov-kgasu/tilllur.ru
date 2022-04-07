retina = 1

screen = new Layer
	width: 1440, height: 900, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light", visible: false }

mask = new Layer width: 1440*retina, height: 2000*retina, x: 0, y: 0, backgroundColor: "rgba(22,22,22,1.00)"
watch_link_1 = new Layer width: 154*retina, height: 15*retina, x: 381*retina, y: 598*retina, image: "images/watch link 1.png"
watch_link_2 = new Layer width: 157*retina, height: 22*retina, x: 586*retina, y: 594*retina, image: "images/watch link 2.png"
watch_link_3 = new Layer width: 168*retina, height: 22*retina, x: 785*retina, y: 594*retina, image: "images/watch link 3.png"
watch_link_4 = new Layer width: 76*retina, height: 18*retina, x: 994*retina, y: 598*retina, image: "images/watch link 4.png"
topper = new Layer width: 1440*retina, height: 44*retina, x: 0, y: 0, image: "images/topper.png"
ads_wide_block = new Layer width: 1180*retina, height: 120*retina, x: 130*retina, y: 648*retina, image: "images/ads wide block.png"
deep_bg = new Layer width: 1440*retina, height: 380*retina, x: 0, y: 184*retina, image: "images/deep bg.png"
watch_1 = new Layer width: 1180*retina, height: 360*retina, x: 130*retina, y: 184*retina, image: "images/watch 1.png"
position_pannel = new Layer width: 1440*retina, height: 20*retina, x: 0, y: 544*retina, backgroundColor: "rgba(187,19,62,1.00)", shadowX: 0, shadowY: -2*retina, shadowBlur: 5*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)"
position_arrow = new Layer width: 40*retina, height: 12*retina, x: 438*retina, y: 552*retina, image: "images/position arrow.png"
watch_2 = new Layer width: 1180*retina, height: 360*retina, x: 1310*retina, y: 184*retina, image: "images/watch 2.png"
left_arrow = new Layer width: 130*retina, height: 360*retina, x: 0, y: 184*retina, image: "images/left arrow.png"
right_arrow = new Layer width: 130*retina, height: 360*retina, x: 1310*retina, y: 184*retina, image: "images/right arrow.png"
watch_3 = new Layer width: 1180*retina, height: 360*retina, x: 1310*retina, y: 184*retina, image: "images/watch 3.png"
header = new Layer width: 1440*retina, height: 142*retina, x: 0, y: 44*retina, image: "images/header.png"
logo_rubin = new Layer width: 203*retina, height: 217*retina, x: 100*retina, y: -9*retina, image: "images/logo rubin.png"

mask.states.add {
	main_slider_a: width: 1440*retina, height: 2000*retina, x: 0, y: 0, opacity: 1
	main_slider_b: width: 1440*retina, height: 2000*retina, x: 0, y: 0, opacity: 1
	main_slider_c: width: 1440*retina, height: 2000*retina, x: 0, y: 0, opacity: 1
}
mask.states.switchInstant 'main_slider_a'

watch_link_1.states.add {
	main_slider_a: width: 154*retina, height: 15*retina, x: 381*retina, y: 598*retina, opacity: 1
	main_slider_b: width: 154*retina, height: 15*retina, x: 381*retina, y: 598*retina, opacity: 1
	main_slider_c: width: 154*retina, height: 15*retina, x: 381*retina, y: 598*retina, opacity: 1
}
watch_link_1.states.switchInstant 'main_slider_a'

watch_link_2.states.add {
	main_slider_a: width: 157*retina, height: 22*retina, x: 586*retina, y: 594*retina, opacity: 1
	main_slider_b: width: 157*retina, height: 22*retina, x: 586*retina, y: 594*retina, opacity: 1
	main_slider_c: width: 157*retina, height: 22*retina, x: 586*retina, y: 594*retina, opacity: 1
}
watch_link_2.states.switchInstant 'main_slider_a'

watch_link_3.states.add {
	main_slider_a: width: 168*retina, height: 22*retina, x: 785*retina, y: 594*retina, opacity: 1
	main_slider_b: width: 168*retina, height: 22*retina, x: 785*retina, y: 594*retina, opacity: 1
	main_slider_c: width: 168*retina, height: 22*retina, x: 785*retina, y: 594*retina, opacity: 1
}
watch_link_3.states.switchInstant 'main_slider_a'

watch_link_4.states.add {
	main_slider_a: width: 76*retina, height: 18*retina, x: 994*retina, y: 598*retina, opacity: 1
	main_slider_b: width: 76*retina, height: 18*retina, x: 994*retina, y: 598*retina, opacity: 1
	main_slider_c: width: 76*retina, height: 18*retina, x: 994*retina, y: 598*retina, opacity: 1
}
watch_link_4.states.switchInstant 'main_slider_a'

topper.states.add {
	main_slider_a: width: 1440*retina, height: 44*retina, x: 0, y: 0, opacity: 1
	main_slider_b: width: 1440*retina, height: 44*retina, x: 0, y: 0, opacity: 1
	main_slider_c: width: 1440*retina, height: 44*retina, x: 0, y: 0, opacity: 1
}
topper.states.switchInstant 'main_slider_a'

ads_wide_block.states.add {
	main_slider_a: width: 1180*retina, height: 120*retina, x: 130*retina, y: 648*retina, opacity: 1
	main_slider_b: width: 1180*retina, height: 120*retina, x: 130*retina, y: 648*retina, opacity: 1
	main_slider_c: width: 1180*retina, height: 120*retina, x: 130*retina, y: 648*retina, opacity: 1
}
ads_wide_block.states.switchInstant 'main_slider_a'

deep_bg.states.add {
	main_slider_a: width: 1440*retina, height: 380*retina, x: 0, y: 184*retina, opacity: 1
	main_slider_b: width: 1440*retina, height: 380*retina, x: 0, y: 184*retina, opacity: 1
	main_slider_c: width: 1440*retina, height: 380*retina, x: 0, y: 184*retina, opacity: 1
}
deep_bg.states.switchInstant 'main_slider_a'

watch_1.states.add {
	main_slider_a: width: 1180*retina, height: 360*retina, x: 130*retina, y: 184*retina, opacity: 1
	main_slider_b: width: 1180*retina, height: 360*retina, x: -1050*retina, y: 184*retina, opacity: 1
	main_slider_c: width: 1180*retina, height: 360*retina, x: -1050*retina, y: 184*retina, opacity: 1
}
watch_1.states.switchInstant 'main_slider_a'

position_pannel.states.add {
	main_slider_a: width: 1440*retina, height: 20*retina, x: 0, y: 544*retina, opacity: 1
	main_slider_b: width: 1440*retina, height: 20*retina, x: 0, y: 544*retina, opacity: 1
	main_slider_c: width: 1440*retina, height: 20*retina, x: 0, y: 544*retina, opacity: 1
}
position_pannel.states.switchInstant 'main_slider_a'

position_arrow.states.add {
	main_slider_a: width: 40*retina, height: 12*retina, x: 438*retina, y: 552*retina, opacity: 1
	main_slider_b: width: 40*retina, height: 12*retina, x: 645*retina, y: 552*retina, opacity: 1
	main_slider_c: width: 40*retina, height: 12*retina, x: 848*retina, y: 552*retina, opacity: 1
}
position_arrow.states.switchInstant 'main_slider_a'

watch_2.states.add {
	main_slider_a: width: 1180*retina, height: 360*retina, x: 1310*retina, y: 184*retina, opacity: 1
	main_slider_b: width: 1180*retina, height: 360*retina, x: 130*retina, y: 184*retina, opacity: 1
	main_slider_c: width: 1180*retina, height: 360*retina, x: -1050*retina, y: 184*retina, opacity: 1
}
watch_2.states.switchInstant 'main_slider_a'

left_arrow.states.add {
	main_slider_a: width: 130*retina, height: 360*retina, x: 0, y: 184*retina, opacity: 1
	main_slider_b: width: 130*retina, height: 360*retina, x: 0, y: 184*retina, opacity: 1
	main_slider_c: width: 130*retina, height: 360*retina, x: 0, y: 184*retina, opacity: 1
}
left_arrow.states.switchInstant 'main_slider_a'

right_arrow.states.add {
	main_slider_a: width: 130*retina, height: 360*retina, x: 1310*retina, y: 184*retina, opacity: 1
	main_slider_b: width: 130*retina, height: 360*retina, x: 1310*retina, y: 184*retina, opacity: 1
	main_slider_c: width: 130*retina, height: 360*retina, x: 1310*retina, y: 184*retina, opacity: 1
}
right_arrow.states.switchInstant 'main_slider_a'

watch_3.states.add {
	main_slider_a: width: 1180*retina, height: 360*retina, x: 1310*retina, y: 184*retina, opacity: 0
	main_slider_b: width: 1180*retina, height: 360*retina, x: 1310*retina, y: 184*retina, opacity: 1
	main_slider_c: width: 1180*retina, height: 360*retina, x: 130*retina, y: 184*retina, opacity: 1
}
watch_3.states.switchInstant 'main_slider_a'

header.states.add {
	main_slider_a: width: 1440*retina, height: 142*retina, x: 0, y: 44*retina, opacity: 1
	main_slider_b: width: 1440*retina, height: 142*retina, x: 0, y: 44*retina, opacity: 1
	main_slider_c: width: 1440*retina, height: 142*retina, x: 0, y: 44*retina, opacity: 1
}
header.states.switchInstant 'main_slider_a'

logo_rubin.states.add {
	main_slider_a: width: 203*retina, height: 217*retina, x: 100*retina, y: -9*retina, opacity: 1
	main_slider_b: width: 203*retina, height: 217*retina, x: 100*retina, y: -9*retina, opacity: 1
	main_slider_c: width: 203*retina, height: 217*retina, x: 100*retina, y: -9*retina, opacity: 1
}
logo_rubin.states.switchInstant 'main_slider_a'


generatedState1 = "main_slider_a"
generatedState2 = "main_slider_b"
generatedState3 = "main_slider_c"


layers = [mask, watch_link_1, watch_link_2, watch_link_3, watch_link_4, topper, ads_wide_block, deep_bg, watch_1, position_pannel, position_arrow, watch_2, left_arrow, right_arrow, watch_3, header, logo_rubin]
generatedStates = [generatedState1, generatedState2, generatedState3]

cycler = Utils.cycle(generatedStates)
generatedButton = new Layer width: Screen.width, height: Screen.height, opacity: 0


generatedButton.on Events.Click, ->
	nextState = cycler()
	for item in layers
		item.states.switch nextState


for item in layers
	item.parent = screen
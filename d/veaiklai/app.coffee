

screen = new Layer
	width: 360, height: 640
	backgroundColor: "eee"

# Use desktop cursor
document.body.style.cursor = "auto"

# SVG

returnDome = () ->
	dome = new SVGLayer
		width: 24
		height: 24
		svg: """<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M11.6146 2C11.2571 2 10.9493 2.25234 10.8792 2.60291L10.7368 3.31473C10.6499 3.74916 10.3754 4.12296 9.98695 4.33591L9.6867 4.50049C7.94536 5.29358 6.67117 6.95729 6.4476 8.96942L5.90715 13.8335C5.80652 14.7391 5.34401 15.5656 4.62476 16.125L4.27105 16.4001C3.80221 16.7648 3.59269 17.3717 3.73675 17.9479L3.74976 18C3.89669 18.5877 4.42474 19 5.03054 19H18.969C19.5748 19 20.1028 18.5877 20.2498 18L20.2628 17.9479C20.4068 17.3717 20.1973 16.7648 19.7285 16.4001L19.3748 16.125C18.6555 15.5656 18.193 14.7391 18.0924 13.8335L17.5519 8.96942C17.3283 6.95729 16.0542 5.29357 14.3128 4.50049L14.0126 4.33591C13.6241 4.12296 13.3496 3.74916 13.2627 3.31473L13.1203 2.60291C13.0502 2.25234 12.7424 2 12.3849 2H11.6146Z" fill="black"/>
	</svg>
	"""

returnClapper = () ->
	clapper = new SVGLayer
		width: 24
		height: 24
		svg: """<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z" fill="black"/>
	</svg>
	"""

slowFactor = 2
baseDelay = 0.07
Framer.Loop.delta = 1 / (60 * slowFactor)

iconView = new Layer
	parent: screen
	size: 24
	backgroundColor: "transparent"

# iconView.scale = 2
# iconView.center()
iconView.x = Align.center
iconView.y = Align.center(-50)

clapperIcon = returnClapper()
clapperIcon.parent = iconView

domeIcon = returnDome()
domeIcon.parent = iconView


clapperIcon.states =
	"state1": { rotation: 0 }
	"state2": { rotation: -25 }
	"state3": { rotation: 14 }
	"state4": { rotation: -7 }
	"state5": { rotation: 7 }
	"state6": { rotation: 0 }

clapperIcon.animationOptions =
	curve: Bezier.easeOut
	time: 0.95 / 5

clapperIcon.on Events.StateSwitchEnd, (from, to) ->
	if to is "state1" then @animate("state2")
	else if to is "state2" then @animate("state3")
	else if to is "state3" then @animate("state4")
	else if to is "state4" then @animate("state5")
	else if to is "state5" then @animate("state6")


domeIcon.states =
	"state1": { rotation: 8 }
	"state2": { rotation: -28 }
	"state3": { rotation: 14 }
	"state4": { rotation: -7 }
	"state5": { rotation: 8 }

domeIcon.animationOptions =
	curve: Bezier.easeOut
	time: 0.75 / 4

domeIcon.on Events.StateSwitchEnd, (from, to) ->
	if to is "state1" then @animate("state2")
	else if to is "state2" then @animate("state3")
	else if to is "state3" then @animate("state4")
	else if to is "state4" then @animate("state5")



clapperIcon.on Events.StateSwitchEnd, (from, to) ->
	if to is "state1" then @animate("state2")
	else if to is "state2" then @animate("state3")
	else if to is "state3" then @animate("state4")
	else if to is "state4" then @animate("state5")


for item in [domeIcon, clapperIcon]
	item.originY = 0.09


# Slider

slider = new SliderComponent
	parent: screen
	x: Align.center
	y: Align.bottom(-60)

slider.knob.draggable.momentum = false
slider.fill.backgroundColor = "777"

slider.knob.on Events.TouchEnd, (event, layer) ->
# 	print slider.value.toFixed(2)
	
	slowFactor = Utils.modulate(slider.value, [0, 1], [1, 5], true)
	Framer.Loop.delta = 1 / (60 * slowFactor)
	
	for item in [domeIcon, clapperIcon]
		item.animateStop()
		
		if item is clapperIcon
			Utils.delay baseDelay * slowFactor, ->
				clapperIcon.stateSwitch("state1")
		else
			item.stateSwitch("state1")


scaleSlider = new SliderComponent
	parent: screen
	x: Align.center
	y: Align.bottom(-120)

scaleSlider.knob.draggable.momentum = false
scaleSlider.fill.backgroundColor = "777"

scaleSlider.knob.on Events.Move, (event, layer) ->
	iconView.scale = Utils.modulate(scaleSlider.value, [0, 1], [1, 5], true)

# slider.value = 0.5
# scaleSlider.value = 0.5


slider.value = 0.5
scaleSlider.value = 0.5

iconView.scale = 2.5



{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }
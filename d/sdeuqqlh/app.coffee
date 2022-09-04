{SVGLayer} = require 'SVGLayer'


screen = new Layer
	width: 1382, height: 920, backgroundColor: null

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, visible: false }


browser = new Layer width: 1382, height: 894, x: 8, y: 6, image: "images/browser.png"
button_bg = new Layer width: 200, height: 34, x: 399, y: 250, backgroundColor: "rgba(254,206,47,1)"
button_text = new Layer width: 164, height: 16, x: 417, y: 260, image: "images/button text.png"
button_text_updated = new Layer width: 99, height: 13, x: 449, y: 260, image: "images/button text updated.png", opacity: 0

message_intro = new Layer width: 456, height: 92, x: 400, y: 134, image: "images/message intro.png"
message_done = new Layer width: 349, height: 68, x: 399, y: 135, image: "images/message done.png", opacity: 0




tintColor = "#FECE2F"
disabledColor = "#CCC"
strokeColor = disabledColor

path = new SVGLayer
	strokeWidth: 4
	width: 708.6996575136116
	height: 143.90198480301706
	path: '<path d="M0,143.901985 L500.388518,142.728056 C500.388518,142.728056 708.699658,156.182824 708.699658,0"></path>'
	x: 610
	y: 125
	stroke: strokeColor
	dashOffset: 0

arrowEnd = new SVGLayer
	strokeWidth: 0
	width: 13
	height: 12
	path: '<path d="M0,12 L13,12 L6.5,0 L0,12 L0,12 Z"></path>'
	x: 1308.5
	y: 106
	fill: strokeColor
# 	stroke: strokeColor
	opacity: 0
	


animationTime = 0.4
animationDelay = 0.2

button_bg.on Events.Click, ->
	path.animate
		properties: { dashOffset: 1 }
	delay: animationDelay
	time: animationTime

	button_text.opacity = 0
	button_text_updated.opacity = 1
	button_bg.backgroundColor = disabledColor
	
# 	message_done.opacity = 1
# 	message_intro.opacity = 0

	message_done.animate
		opacity: 1
		options:
			time: animationTime / 2
			delay: animationTime / 2
	
	message_intro.animate
		opacity: 0
		options:
			time: animationTime / 2


path.onAnimationEnd ->
	arrowEnd.opacity = 1


for item in [browser, button_bg, button_text, button_text_updated, message_intro, message_done, path, arrowEnd]
	item.parent = screen
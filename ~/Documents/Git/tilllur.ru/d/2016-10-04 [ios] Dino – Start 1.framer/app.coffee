
retina = 1

screen = new Layer
	width: 375, height: 667

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

bg = new Layer width: 375*retina, height: 667*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(255,255,255,1)"

text = new Layer width: 252*retina, height: 73*retina, x: 62*retina, y: 89*retina, image: "images/text.png"

arrow = new Layer width: 80*retina, height: 56*retina, x: 148*retina, y: -20*retina, image: "images/arrow.png"

iphone = new Layer width: 276*retina, height: 562*retina, x: 50*retina, y: 203*retina, image: "images/iphone.png"


back = new Layer width: 54*retina, height: 19*retina, x: 18*retina, y: 29*retina, image: "images/back.png"


preview_tutorial = new VideoLayer
	width: 471 / 2
	height: 832 / 2
	video: "images/preview tutorial.mp4"
	x: 142/  2
	y: 542/ 2
	backgroundColor: null

preview_tutorial.player.play()
preview_tutorial.player.loop = true
preview_tutorial.player.volume = 0

arrow.states.add
	hidden:
		y: -112
# 		x: 295

arrowFlag = false
arrowTime = 0.4

stateMove = () ->
	arrowFlag ^= 1
	
	if !arrowFlag
		arrow.states.switch("default", time: arrowTime*2, curve: "spring(300, 20, 0)")
		Utils.delay arrowTime*4, ->
			stateMove()
	else
		arrow.states.switch("hidden", time: arrowTime*4, curve: "linear")
		Utils.delay arrowTime*4, ->
			stateMove()

stateMove()


for item in [bg, text, arrow, iphone, back, preview_tutorial]
	item.parent = screen
# cp ~/Documents/Git/ControlPanel-for-Framer/ControlPanel.framer/modules/ControlPanel.coffee ~/Documents/Git/Prototyping-Queue/2022-02-18\ \[pp\]\ Fullscreen\ —\ Flow\ 2.framer/modules/

{ Preview } = require "PreviewComponent"

Framer.Extras.Hints.disable()
Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

# Screen

screen = new Layer
	width: 390
	height: 844
	backgroundColor: "white"


new Preview { view: screen }

Framer.Extras.Preloader.setLogo("images/v2.mov")

# Slider

fullScreen = new PageComponent
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "null"
	scrollVertical: false
	scrollHorizontal: false

slide1 = new Layer
	parent: fullScreen.content
	width: screen.width
	height: screen.height
	backgroundColor: "FDF1E6"
	image: "images/slide1.png"

slide2 = new Layer
	parent: fullScreen.content
	x: screen.width
	width: screen.width
	height: screen.height
	backgroundColor: "FDF1E6"
	image: "images/slide2.png"
# 	backgroundColor: "red"


buttonLeft = new Layer
	parent: fullScreen
	width: screen.width / 2
	height: screen.height
	backgroundColor: "null"

buttonRight = new Layer
	parent: fullScreen
	width: screen.width / 2
	height: screen.height
	x: screen.width / 2
	backgroundColor: "null"




# slide1 = new Layer
# 	width: 375
# 	height: 812
# 	image: "images/slide1.png"
# 
# slide2 = new Layer
# 	width: 375
# 	height: 812
# 	image: "images/slide2.png"


# Steps

step1 = new Layer
	parent: fullScreen
	width: 163
	height: 4
	borderRadius: 9
	x: 20
	y: 64

step1progress = new Layer
	height: 4
	borderRadius: 9
	parent: step1
	backgroundColor: "black"

step1progress.states =
	"hidden": { width: 0 }
	"shown": { width: step1.width }
step1progress.stateSwitch("hidden")


step2 = new Layer
	parent: fullScreen
	width: 163
	height: 4
	borderRadius: 9
	x: 192
	y: 64

step2progress = new Layer
	height: 4
	borderRadius: 9
	parent: step2
	backgroundColor: "black"

step2progress.states =
	"hidden": { width: 0 }
	"shown": { width: step1.width }
step2progress.stateSwitch("hidden")

for item in [step1, step2]
	item.backgroundColor = "rgba(0,0,0,0.15)"


timeStep1 = 10
timeStep2 = 10


step1progress.on Events.StateSwitchEnd, (from, to) ->
	@animateStop()
	if to == "shown"
		step2progress.stateSwitch("hidden")
		step2progress.animate("shown", curve: Bezier.linear, time: timeStep2)
		fullScreen.snapToPage(slide2, false)
		try v2.player.pause()
	else
		step1progress.animate("shown", curve: Bezier.linear, time: timeStep1)
		step2progress.stateSwitch("hidden")
		fullScreen.snapToPage(slide1, false)
		try v2.player.currentTime = 0
		try v2.player.play()



buttonLeft.onTap ->
	step1progress.stateSwitch("hidden")

buttonRight.onTap ->
	step1progress.stateSwitch("shown")

step1progress.stateSwitch("hidden")


# Video

v2group = new Layer
	parent: slide1
	width: 390
	height: 288
	y: 360
	clip: true
	backgroundColor: "null"

v2 = new VideoLayer
	parent: v2group
	width: 390
	height: 844
	y: -360
	backgroundColor: "null"
	video: "images/v2.mov"

v2.player.loop = true
v2.player.volume = 0
v2.player.autoplay = true
v2.player.play()


# Set

set = (dataInput, value) ->
	if dataInput == "1" then timeStep1 = value
	else timeStep2 = value
	
	if dataInput == "1" then step1progress.stateSwitch("hidden")
	else step1progress.stateSwitch("shown")
# 	print "#{dataInput} #{value}"

setOne5 = (event, layer, setValue = 5) ->
	set("1", setValue)

setOne10 = (event, layer, setValue = 10) ->
	set("1", setValue)

setOne15 = (event, layer, setValue = 15) ->
	set("1", setValue)



setTwo5 = (event, layer, setValue = 5) ->
	set("2", setValue)

setTwo10 = (event, layer, setValue = 10) ->
	set("2", setValue)

setTwo15 = (event, layer, setValue = 15) ->
	set("2", setValue)

setTwo20 = (event, layer, setValue = 20) ->
	set("2", setValue)



panel = require 'ControlPanel'

panel.header("Первый слайд", "left")
panel.button("5", setOne5, "left", "toggle")
panel.button("10", setOne10, "left", "toggle")
panel.button("15", setOne15, "left", "toggle")

panel.header("Второй слайд", "left")
panel.button("5", setTwo5, "left", "toggle2")
panel.button("10", setTwo10, "left", "toggle2")
panel.button("15", setTwo15, "left", "toggle2")
panel.button("20", setTwo20, "left", "toggle2")


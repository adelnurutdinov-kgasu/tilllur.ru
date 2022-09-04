retina = 1
smallDelay = 0.2

document.body.style.cursor = "auto"

screen = new Layer
	width: 1120, height: 720, backgroundColor: null

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, visible: false }

fornetto = new Layer
	width: 1120*retina
	height: 720*retina
	image: "images/fornetto.png"

view = new Layer
	width: 220*retina
	height: 30*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(255,255,255,1)"

balloon = new Layer
	width: 432*retina
	height: 654*retina
	x: 638*retina
	y: 100*retina
	image: "images/balloon.png"

balloon.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
balloon.stateSwitch("hidden")



view.clip = true
view.parent = fornetto
view.x = 687*retina
view.y = 36*retina

balloon.parent = fornetto
balloon.x = 677*retina
balloon.y = 52*retina



# Inside

placeholder = new Layer
	width: 20*retina
	height: 20*retina
	x: 195*retina
	y: 5*retina
	borderRadius: 1*retina

placeholder.states =
	"init":
		backgroundColor: "rgba(0,120,215,1)"
		opacity: 0
	"appear":
		backgroundColor: "rgba(0,120,215,1)"
		opacity: 1
	"fade":
		backgroundColor: "rgba(170,170,170,1)"
		opacity: 1

placeholder.stateSwitch("init")

bluer = new Layer
	width: 10*retina
	height: 10*retina
	x: 200*retina
	y: 10*retina
	image: "images/bluer.png"
	opacity: 0

title = new Layer
	width: 49*retina
	height: 11*retina
	image: "images/title.png"

title.states =
	"init":
		x: 139*retina
		y: 30*retina
	"appear":
		x: 139*retina
		y: 31*retina
	"base":
		x: 139*retina
		y: 10*retina

title.stateSwitch("init")

pin = new Layer
	image: "images/pin.png"

pin.states =
	"init":
		width: 6*retina
		height: 8*retina
		x: 202*retina
		y: 11*retina
		opacity: 0
	"appear":
		width: 11*retina
		height: 14*retina
		x: 200*retina
		y: 8*retina
		opacity: 1

pin.stateSwitch("init")




pin.on Events.StateSwitchStart, (fromState, toState) ->
	if toState is "appear"
		placeholder.animate("appear", curve: "ease-out", time: 0.3)
		

pin.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "appear"
# 		placeholder.animate("base", curve: "ease-out", time: 0.3, delay: smallDelay)
		title.animate("base", time: 0.24, delay: 0.1 + smallDelay, curve: "ease-out")
# 		bluer.animate("base", time: 0.3, delay: 0.2 + smallDelay, curve: "ease-out")

placeholder.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "base"
		placeholder.animate("fade", curve: "ease-out", time: 0.5, delay: 1)
# 		bluer.stateSwitch("fade", delay: 1)

array = [placeholder, title, pin]
for item in array
	item.parent = view


Utils.delay 0.5, ->
	pin.animate("appear", curve: "ease-out", time: 0.3)

fornetto.on Events.Click, (event, layer)->
	if balloon.states.current.name is "shown" then balloon.stateSwitch("hidden")
	else balloon.stateSwitch("shown")
	event.stopPropagation()


bluer.opacity = 0

for item in [fornetto]
	item.parent = screen

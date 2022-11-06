
Canvas.backgroundColor = "#333"

touch = new Layer
	name: "touch"
	width: 360
	height: 640
	image: "images/touch.png"
	borderRadius: 12

cards = new Layer
	name: "cards"
	parent: touch
	width: 810
	height: 108
	image: "images/cards.png"
	y: 376

cards.states =
	"1":
		x: 0
	"2":
		x: -(295 - 11)
# 		x: -(295-16 - 11)
	"3":
		x: -(450)

cards.stateSwitch("1")

dTime = 1
# cards.animate("2", time: 0.5, curve: Bezier.easeInOut)

getNextStateName = () ->
	stateName = cards.states.current.name
	if stateName == "1" then return "2"
	else if stateName == "2" then return "3"

getPrevStateName = () ->
	stateName = cards.states.current.name
	if stateName == "2" then return "1"
	else if stateName == "3" then return "2"


animateBack = () ->
	stateName = getPrevStateName()
	cards.animate(stateName)
	
	if stateName == "1"
		Utils.delay dTime, ->
			animateNext()
	else
		Utils.delay dTime, ->
			animateBack()

animateNext = () ->
	stateName = getNextStateName()
	cards.animate(stateName)
	
	if stateName == "3"
		Utils.delay dTime, ->
			animateBack()
	else
		Utils.delay dTime, ->
			animateNext()

Utils.delay dTime, ->
	animateNext()




screen = new Layer
	name: "screen"
	width: 360
	height: 640
	backgroundColor: "white"

touch.parent = screen
touch.y = 24

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 8, topTheme: "light", forceAndroidBar: true }

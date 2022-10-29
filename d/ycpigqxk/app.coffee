Canvas.backgroundColor = "222"


screen = new Layer
	borderRadius: 4
	width: 1316
	height: 728
	image: "images/%D0%BC%D0%BE%D1%80%D0%B4%D0%B0%20%D1%88%D0%B8%D1%80%D0%BE%D0%BA%D0%B8%D0%B8%CC%86%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD.png"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 8, visible: false }


fix = new Layer
	parent: screen
	width: 137
	height: 65
	x: 24
	y: 380
	backgroundColor: "white"

colorBox = new Layer
	parent: screen
	width: 100
	height: 100
	x: -6
	y: 360
	backgroundColor: "null"

colorRound = new Layer
	parent: colorBox
	width: 100
	height: 100
	image: "images/colorRound.png"

whiteRound = new Layer
	parent: screen
	size: 120
	x: 22
	y: 350
	backgroundColor: "white"
	borderRadius: "100%"


newLogo = new Layer
	parent: screen
	width: 117
	height: 35
	x: 37
	y: 389
	image: "images/newLogo.png"



colorRound.on Events.StateSwitchEnd, (from, to) ->
	if to is "start"
		@animate("finish", time: 10)
	else if to is "finish"
		@stateSwitch("start")

colorRound.states =
	"start": { rotation: 0 }
	"finish": { rotation: 360 }
colorRound.stateSwitch("start")



colorBox.on Events.StateSwitchEnd, (from, to) ->
	if to is "start"
		@states.finish.y = 360 + Utils.randomChoice([1, 2, 3, 4])
		@animate("finish", time: 5)
	else if to is "finish"
		@states.start.y = 360 + Utils.randomChoice([-1, -2, -3, -4])
		@animate("start", time: 5)

colorBox.states =
	"start": { y: 360 - 4 }
	"finish": { y: 360 + 4 }
colorBox.stateSwitch("start")
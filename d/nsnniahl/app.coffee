


shape = iconView
# shape = icon

shape.states =
	"base":
		scale: 1.0
	"pulse":
		scale: 1.1

shape.on Events.StateSwitchEnd, (from, to) ->
	if to == "base"
		@animate("pulse")
	else if to == "pulse"
		@animate("base")

shape.stateSwitch("base")




bgShape = round
# shape = icon

# bgShape.originY = 0.5

bgShape.states =
	"base":
# 		scale: 1.0
		scaleX: 1.0
		scaleY: 1.0
	"pulse":
# 		scale: 1.5
		scaleX: 2.0
		scaleY: 1.6

bgShape.on Events.StateSwitchEnd, (from, to) ->
	if to == "base"
# 		@fill = Utils.randomChoice(["blue", "red", "green"])
		@originX = Utils.randomChoice([0.1, 0.3, 0.5, .7, 1])
		@originY = Utils.randomChoice([0.1, 0.3, 0.5, .7, 1])
		@states.pulse.scaleX = Utils.randomChoice([2.4, 2.6, 2.7])
		@states.pulse.scaleY = Utils.randomChoice([2.4, 2.6, 2.7])
		@animate("pulse")
	else if to == "pulse"
		@animate("base")

bgShape.stateSwitch("base")



statusBar = new Layer
	parent: shape.parent.parent, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: shape.parent.parent, borderRadius: 8, topTheme: "light", forceAndroidBar: true }


	


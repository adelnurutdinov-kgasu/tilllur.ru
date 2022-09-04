
{ Preview } = require "PreviewComponent"

screen = new Layer { width: 360, height: 760, image: "images/screen.png" }
preview = new Preview { view: screen, borderRadius: 24 }

panel = require 'ControlPanel'


# Tips

tooltipView = new Layer
	width: 360
	height: 100
	image: "images/tooltipView.png"
	parent: screen
	x: Align.right(0)
	y: Align.bottom(0)

tooltipView.states =
	"hidden": { opacity: 0, y: Align.bottom(10) }
	"shown": { opacity: 1, y: Align.bottom(0)}

tooltipView.stateSwitch("hidden")




sideTip = new Layer
	parent: screen
	width: 360
	height: 76
	y: 168
	image: "images/sideTip.png"

sideTip.states =
	"hidden": { opacity: 0, x: Align.right(-10) }
	"shown": { opacity: 1, x: Align.right(0)}
sideTip.stateSwitch("hidden")



cornerTip = new Layer
	parent: screen
	width: 360
	height: 82
	image: "images/cornerTip.png"

cornerTip.states =
	"hidden": { opacity: 0, y: Align.top(434+10), x: Align.left(0+10) }
	"shown": { opacity: 1, y: Align.top(434), x: Align.left(0)}
cornerTip.stateSwitch("hidden")




showTipVertical = () ->
	tooltipView.stateCycle(["shown", "hidden"])

showTipHorizontal = () ->
	sideTip.stateCycle(["shown", "hidden"])

showTipCorner = () ->
	cornerTip.stateCycle(["shown", "hidden"])

panel.header("Show tip", "left")
panel.button("Horizontal", showTipHorizontal, "left", "online")
panel.button("Diagonal", showTipCorner, "left", "online")
panel.button("Vertical", showTipVertical, "left", "online")


for item in [tooltipView, sideTip, cornerTip]
	item.animationOptions =
# 		curve: Bezier(0.4, 0, 0.2, 1)
		curve: Spring(damping: 1)
		time: 0.5

topBarFix = new Layer
	parent: screen, width: screen.width, height: 32
	backgroundColor: "white"

avatarFix = new Layer
	parent: screen
	x: Align.right(-30), y: Align.bottom(-10)
	size: 28, borderRadius: 100
	backgroundColor: "white"
	image: "https://tilllur.ru/shared/avatars/tilllur.png"


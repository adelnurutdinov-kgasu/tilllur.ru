require "animateOnSpline"

Screen.backgroundColor = "#222"

screen = new Layer
	width: 360
	height: 640
# 	clip: true
# 	x: Align.center
# 	y: Align.center
	image: "images/%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D0%B0%D1%8F%20%D0%B2%D0%B5%D1%80%D1%82%D0%B8%D0%BA%D0%B0%D0%BB%D1%8C%20(2).png"
# 	borderRadius: 8

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 24 }


statusBar = new Layer
	parent: screen
	width: screen.width
	height: 32
	backgroundColor: "white"

avatar = new Layer
	parent: screen
	x: 306, y: 38
	image: "https://tilllur.ru/shared/avatars/tilllur.png"
	borderRadius: "100%"
	width: 28, height: 28

darker = new Layer
	width: screen.width
	height: screen.height
	parent: screen
	backgroundColor: "white"

darker.states =
	"shown": { opacity: 0.7 }
	"hidden": { opacity: 0 }
darker.stateSwitch("shown")


round = new Layer
	parent: screen
	size: 40 * 4
	backgroundColor: "#FBDD60"
	x: Align.center
	y: Align.center
	borderRadius: "100%"
# 	originX: 0
# 	originY: .7

roundOrigin =
	x: round.x
	y: round.y

round.states =
	"shown": { scale: 16, x: roundOrigin.x, y: roundOrigin.y }
	"min": { scale: 1, x: roundOrigin.x, y: roundOrigin.y + 160 }
	"hidden": { scale: .25 }
	"wave": { scale: .33 }
	"null": { scale: .1, opacity: 0 }



round.on Events.StateSwitchEnd, (from, to) ->
	if to is "shown"
		@animate("min", curve: Spring(damping: 1), time: 0.6)
		image.animate("hidden", curve: Spring(damping: 1), time: 0.6)
	
	else if to is "min"
		@animate("hidden", time: 0.4)
		darker.animate("hidden", time: 0.4)
		
		@animateOnSpline
# 			editor: true
			from: 0
			to: 1
			animationOptions:
				time: 1.2
				curve: Spring(damping: .9)
				delay: 0.1
			points:
				start: {midX: @midX, midY: @midY}
				controlPoint1: {midX: 24.5, midY: 245.5}, controlPoint2: {midX: 114.5, midY: 2.5}, end: {midX: 260.5, midY: 90.5}
	
	else if to is "hidden"
		@animate("wave", time: 0.4, delay: 0.8)
	
	else if to is "wave"
		@animate("null", time: 0.2)






image = new Layer
	width: 360
	height: 640
	image: "images/preview_iOS_8.png"
	parent: screen
	originY: .8

image.states =
	"shown": { scale: 1, opacity: 1 }
	"hidden": { scale: 0.25, opacity: 0 }
image.stateSwitch("shown")




started = false
screen.onTap ->
	if !started
		round.stateSwitch("shown")
		started = !started


# Init

Framer.Extras.Hints.disable()

roundDelayReference = null
longTapDelayReference = null

longTapDetected = false
dragDetected = false
longTapStarted = false

delay = (time, fn, args...) ->
	setTimeout fn, time, args...

# Globals

# Screen.backgroundColor = "#222"

screenView = new Layer
	width: 375
	height: 812
	backgroundColor: "white"
# 	image: "images/site.png"
# 	clip: true

# screenView.center()


feedView = new Layer
	parent: screenView
	width: 375
	height: 812
	image: "images/re.png"
	clip: true


blurView = new Layer
	parent: screenView
	width: 375
	height: 812

blurView.states =
	"hidden":
		opacity: 0
	"shown":
		opacity: 1

blurView.stateSwitch("hidden")

blurView.style =
	"-webkit-backdrop-filter": "blur(17px)"


button = new Layer
	parent: feedView
	size: 48
	x: 27
	y: 231
	borderRadius: 20
	backgroundColor: "rgba(153,121,101,1)"
	opacity: 0
	height: 160
	width: 161

button.on Events.Tap, ->
	openApp()



{ Preview } = require "PreviewComponent"
new Preview { view: screenView }

# View

viewGuard = new Layer
	opacity: 0
	x: -2000
	y: -2000

viewGuard.states =
	"close": { opacity: 0 }
	"app": { opacity: 0 }
	"carousel": { opacity: 0 }

viewGuard.stateSwitch("close")


view = new Layer
	parent: screenView
	width: 375
	height: 812
	backgroundColor: "EBF5FF"
	image: "images/site.png"

view.states =
	"shown": { y: 0 }
	"hidden": { y: 812 }
	"small": { scale: 0.6 }
	"normal": { scale: 1.0 }

view.stateSwitch("hidden")
view.stateSwitch("small")




viewGuard.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		
		if to == "close"
			currentTabGhost.ignoreEvents = true
			tabClose.stateSwitch("hidden")
			tabNumber.stateSwitch("shown")
			
			view.animate(y: view.states.hidden.y, options: { curve: Spring(damping: 1), time: 0.5 })
			view.animate(scale: view.states.small.scale, options: { curve: Spring(damping: 1), time: 0.5 })
			blurView.animate("hidden", curve: Spring(damping: 1), time: 0.5)
		
		else if to == "app"
			tabClose.stateSwitch("shown")
			tabNumber.stateSwitch("hidden")
			currentTabGhost.ignoreEvents = true
			
			view.animate(y: view.states.shown.y, options: { curve: Spring(damping: 1), time: 0.5 })
			view.animate(scale: view.states.normal.scale, options: { curve: Spring(damping: 1), time: 0.5 })
			blurView.animate("shown", curve: Spring(damping: 1), time: 0.5)
		
		else if to == "carousel"
			currentTabGhost.ignoreEvents = false
			tabClose.stateSwitch("shown")
			tabNumber.stateSwitch("hidden")
			
			view.animate(y: view.states.shown.y, options: { curve: Spring(damping: 1), time: 0.5 })
			view.animate(scale: view.states.small.scale, options: { curve: Spring(damping: 1), time: 0.5 })
			blurView.animate("shown", curve: Spring(damping: 1), time: 0.5)



openApp = () ->
	viewGuard.stateSwitch("app")

performTap = () ->
	switch viewGuard.states.current.name
		when "close" then viewGuard.stateSwitch("carousel")
		when "app" then viewGuard.stateSwitch("close")
		when "carousel" then viewGuard.stateSwitch("close")


performLong = () ->
	switch viewGuard.states.current.name
		when "close" then viewGuard.stateSwitch("app")
		when "app" then viewGuard.stateSwitch("carousel")
		when "carousel" then viewGuard.stateSwitch("app")
	


currentTabGhost = new Layer
	parent: screenView
	width: 375
	height: 812
	scale: 0.6
	opacity: 0

currentTabGhost.on Events.Tap, ->
	openApp()

currentTabGhost.ignoreEvents = true



# RoundView

roundView = new Layer
	parent: screenView
	size: 54
	backgroundColor: "null"

round = new Layer
	parent: roundView
	size: 54
	borderRadius: 20
	backgroundColor: "null"
	clip: true
	originY: 0.9

round.states =
	"normal": { scaleY: 1.0, scaleX: 1.0 }
	"scaled": { scaleY: 1.8, scaleX: 1.3 }

round.stateSwitch("normal")


roundColor = new Layer
	parent: round
	size: round.size
	backgroundColor: "black"

roundColor.states =
	"hidden": { opacity: 0.2 }
	"shown": { opacity: 0.7 }

roundColor.stateSwitch("hidden")


roundScaleGuard = new Layer
	opacity: 0
	x: -2000
	y: -2000

roundScaleGuard.states =
	"normal": { opacity: 0 }
	"scaled": { opacity: 0 }
roundScaleGuard.stateSwitch("normal")


backY = { curve: Spring(damping: 0.6), time: 0.4 }
backOpacity = { curve: Spring(damping: 0.6), time: 0.2 }

forwardY = { curve: Bezier.easeInOut, time: 0.8 }
forwardOpacity = { curve: Bezier.easeInOut, time: 0.4 }
forwardOpacityD = { curve: Bezier.easeInOut, time: 0.4, delay: 0.4 }

roundScaleGuard.on Events.StateSwitchEnd, (from, to) ->
# 	temp.text = temp.text + " #{to}"
	if from != to
		for item in [round, roundIconView, roundIconViewLongTap]
			try item.animateStop()
		
		if to == "normal"
			round.animate(to, backY)
			
			roundIconView.animate(y: roundIconView.states[to].y, options: backY)
			roundIconView.animate(opacity: roundIconView.states[to].opacity, options: backOpacity)
			
			roundIconViewLongTap.animate(y: roundIconViewLongTap.states[to].y, options: backY)
			roundIconViewLongTap.animate(opacity: roundIconViewLongTap.states[to].opacity, options: backOpacity)
			
			
		else if to == "scaled"
			
			if viewGuard.states.current.name == "close"
				quickTabJump.stateSwitch("hidden")
				quickCarouselJump.stateSwitch("shown")
			else if viewGuard.states.current.name == "app"
				quickTabJump.stateSwitch("shown")
				quickCarouselJump.stateSwitch("hidden")
			else if viewGuard.states.current.name == "carousel"
				quickTabJump.stateSwitch("hidden")
				quickCarouselJump.stateSwitch("shown")
			
			round.animate(to, forwardY)
			
			roundIconView.animate(y: roundIconView.states[to].y, options: forwardY)
			roundIconView.animate(opacity: roundIconView.states[to].opacity, options: forwardOpacity)
			
			roundIconViewLongTap.animate(y: roundIconViewLongTap.states[to].y, options: forwardY)
			roundIconViewLongTap.animate(opacity: roundIconViewLongTap.states[to].opacity, options: forwardOpacity)
			
			
			



roundView.draggable.enabled = true
roundView.draggable.constraints =
	x: 0
	y: 0
	width: 375
	height: 812

roundView.states =
	"left": { x: 16 }
	"right": { x: 375 - 16 - roundView.width }
	"top": { y: 16 }
	"bottom": { y: 812 - 32 - 16 - roundView.height }


roundView.stateSwitch("right")
roundView.stateSwitch("bottom")






roundIconView = new Layer
	size: 48
	parent: roundView
	backgroundColor: "null"

roundIconView.center()

roundIconView.states =
	"normal": { y: 3, opacity: 1 }
	"scaled": { y: -32, opacity: 0 }

roundIconView.stateSwitch("normal")


tabNumber = new Layer
	parent: roundIconView
	width: 48
	height: 48
	image: "images/tabNumber.png"

tabClose = new Layer
	parent: roundIconView
	width: 48
	height: 48
	image: "images/tabClose.png"




roundIconViewLongTap = new Layer
	size: 48
	parent: roundView
	backgroundColor: "null"

roundIconViewLongTap.center()

roundIconViewLongTap.states =
	"normal": { y: 3, opacity: 0 }
	"scaled": { y: -32, opacity: 1 }
roundIconViewLongTap.stateSwitch("normal")


quickTabJump = new Layer
	parent: roundIconViewLongTap
	width: 48
	height: 48
	image: "images/tabNumber.png"

quickCarouselJump = new Layer
	parent: roundIconViewLongTap
	width: 48
	height: 48
	image: "images/tabClose.png"




for item in [tabClose, tabNumber, quickTabJump, quickCarouselJump]
	item.center()
	item.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	
	if item is tabClose then item.stateSwitch("hidden")
	else if item is tabNumber then item.stateSwitch("shown")
	else if item is quickTabJump then item.stateSwitch("hidden")
	else if item is quickCarouselJump then item.stateSwitch("hidden")


# roundIconViewLongTap.children[0].image = null
# roundIconViewLongTap.children[0].backgroundColor = "orange"

roundIconViewLongTap.children[1].image = null
roundIconViewLongTap.children[1].borderRadius = 8
roundIconViewLongTap.children[1].backgroundColor = view.backgroundColor
roundIconViewLongTap.children[1].originY = 0.4
roundIconViewLongTap.children[1].scale = 0.6





roundView.on Events.TouchStart, (event, layer) ->
	longTapStarted = false
	longTapDetected = false
	clearTimeout(roundDelayReference)
	
	roundColor.animate("shown", time: 0.1)
	roundScaleGuard.stateSwitch("scaled")
	
	startLongDelayReference = delay 100, ->
		longTapStarted = true
	
	longTapDelayReference = delay 800, ->
		if !dragDetected
			roundScaleGuard.stateSwitch("normal")
			longTapDetected = true
# 			temp.text = "LONG"
			performLong()


roundView.on Events.TouchEnd, (event, layer) ->
	clearTimeout(longTapDelayReference)
	roundScaleGuard.stateSwitch("normal")
	
	roundDelayReference = delay 800, ->
		roundScaleGuard.stateSwitch("normal")
		roundColor.animate("hidden", time: 0.3)


roundView.on Events.TapEnd, ->
	roundScaleGuard.stateSwitch("normal")
	
	if !longTapDetected and !dragDetected and !longTapStarted
# 		temp.text = "TAP"
		performTap()


roundView.on Events.DragStart, ->
	dragDetected = true
# 	longTapStarted = false
# 	longTapDetected = false
	roundScaleGuard.stateSwitch("normal")
# 	startLongDelayReference

roundView.on Events.DragEnd, ->
	Utils.delay 0.0, -> 
		dragDetected = false


# minAbsVelocity
MAV = 0.5

roundView.on Events.DragEnd, (event, layer) ->
	roundView.animateStop()
# 	temp.text = "#{roundView.draggable.velocity.x}"
	
	xVelocity = roundView.draggable.velocity.x
	if xVelocity >= MAV then nextX = roundView.states.right.x
	else if xVelocity <= -MAV then nextX = roundView.states.left.x
	else
		if roundView.midX >= screenView.width / 2 then nextX = roundView.states.right.x
		else nextX = roundView.states.left.x
	
	roundView.animate(x: nextX, options: { curve: Spring(tension: 400, friction: 40, velocity: xVelocity) })
	
	

	yVelocity = roundView.draggable.velocity.y
	if roundView.y < 10 then nextY = roundView.states.top.y
	else if roundView.y > screenView.height - roundView.height - 10
		nextY = roundView.states.bottom.y
	
# 	if yVelocity >= 0 then nextY = roundView.states.bottom.y
# 	else nextY = roundView.states.top.y
# 	
	roundView.animate(y: nextY, options: { curve: Spring(tension: 400, friction: 40, velocity: xVelocity) })



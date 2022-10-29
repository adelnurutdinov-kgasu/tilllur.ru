panel = require 'ControlPanel'

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "F5F6F8"

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 24 }

feed = new Layer
	y: 24
	parent: screen
	width: 360
	height: 352
	image: "images/feed%20(2).png"

geoView = new Layer
	parent: screen
	width: 360
	height: 102
	y: 274
	backgroundColor: "white"
	borderRadius: 24
	clip: true

mainView = new Layer
	parent: geoView
	width: 360
	height: 102
	image: "images/view%20(1).png"


zen = new Layer
	parent: screen
	width: 360
	height: 258
	y: 382
	image: "images/zen.png"


# Text

locationView = new Layer
	parent: mainView
	x: 20
	y: 28
	width: 245
	height: 16
	image: "images/locationView.png"

locationView.states =
	"normal": { opacity: 1 }
	"promo": { opacity: 0 }
locationView.stateSwitch('normal')


promoTextView = new Layer
	parent: mainView
	x: 20
	y: 28
	width: 164
	height: 16
	image: "images/promoTextView.png"

promoTextView.states =
	"normal": { opacity: 0 }
	"promo": { opacity: 1 }
promoTextView.stateSwitch('normal')

# Arrow View

promoShape = new Layer
	parent: mainView
	x: 286
	y: 8
	width: 62
	height: 36
	borderRadius: 18
	backgroundColor: "f5f5f5"
	backgroundColor: "#E8E3F4"

promoShape.states =
	"normal": { opacity: 0, x: 286, width: 62, scale: 0.7, backgroundColor: "E8E3F4" }
	"promo": { opacity: 1, x: 286, width: 62, scale: 1, backgroundColor: "E8E3F4" }
	"promoLess": { backgroundColor: "f5f5f5" }
# 	"shown": { opacity: 1, x: 286, width: 62, scale: 1 }
promoShape.stateSwitch("normal")





promoIcon = new Layer
	parent: mainView
	width: 24
	height: 24
	x: 6 + 286
	y: 6 + 8
	image: "images/promoIcon%20(1).png"

promoIcon.states =
	"normal": { opacity: 0, scale: 0.7 }
	"promo": { opacity: 1, scale: 1 }
promoIcon.stateSwitch("normal")






arrowView = new Layer
	parent: mainView
	x: Align.right
	width: 360
	height: 50
	backgroundColor: "null"



arrow_short_bottom_1 = new Layer
	parent: arrowView
	width: 24
	height: 24
	x: 316
	y: 14
	image: "images/arrow%20short%20bottom%20(1).png"

arrow_view_down_4 = new Layer
	parent: arrowView
	width: 24
	height: 24
	x: 316
	y: 14
	image: "images/arrow%20short%20bottom%20(1).png"

for item in [arrow_short_bottom_1, arrow_view_down_4]
	item.states =
		"hidden": { opacity: if item == arrow_short_bottom_1 then 0 else 1 }
		"shown": { opacity: if item == arrow_view_down_4 then 0 else 1 }
	item.stateSwitch("hidden")






# States

delayReference = null

delay = (time, fn, args...) ->
	setTimeout fn, time, args...



stateGuard = new Layer { opacity: 0, x: -1000 }
stateGuard.states =
	"normal": { opacity: 0 }
	"promo": { opacity: 0 }
	"promoLess": { opacity: 0 }
stateGuard.stateSwitch("normal")


stateGuard.on Events.StateSwitchEnd, (from, to) ->
	if to is "promo"
		clearTimeout(delayReference)
		delayReference = delay 3000, ->
			stateGuard.stateSwitch("promoLess")
	
	
	if to is "normal"
		for item in [locationView, promoTextView, promoShape, promoIcon]
			item.animate("normal", curve: Spring(damping: 0.7), time: 0.8)
	
	else if to is "promo"
		locationView.stateSwitch("promo", curve: Spring(damping: 0.7), time: 0.8)
		promoTextView.stateSwitch("promo", curve: Spring(damping: 0.7), time: 0.8)
		
		promoIcon.animate("promo", curve: Spring(damping: 0.7), time: 0.8, delay: 0.2)
		promoShape.animate("promo", curve: Spring(damping: 0.7), time: 0.8, delay: 0.2)
	
	else if to is "promoLess"
		promoShape.animate("promoLess", curve: Spring(damping: 0.7), time: 0.8)
		locationView.animate("normal", curve: Spring(damping: 0.7), time: 0.8, delay: 0.1)
		promoTextView.animate("normal", curve: Spring(damping: 0.7), time: 0.8)



bottomBar = new Layer
	width: 360
	height: 68
	image: "images/bottomBar.png"
	parent: screen
	y: Align.bottom()
	

statusBar = new Layer
	width: 360
	height: 24
# 	image: "images/statusBar.png"
	parent: screen
	backgroundColor: "white"
	y: Align.top()

startPromoHandler = () ->
	stateGuard.stateSwitch("promo")

clearPromoHandler = () ->
	stateGuard.stateSwitch("normal")





preview.addSection("Tutorial", [
	{ title: "Run", handler: startPromoHandler },
	{ title: "Clear", handler: clearPromoHandler },
])

# if !Utils.isMobile()
# 	panel.header("Промо", "left")
# 	panel.button("Start", startPromoHandler, "left", "toggle")
# 	panel.button("Clear", clearPromoHandler, "left", "toggle")


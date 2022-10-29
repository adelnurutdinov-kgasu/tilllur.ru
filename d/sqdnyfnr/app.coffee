# cp ~/Documents/Git/ControlPanel-for-Framer/ControlPanel.framer/modules/ControlPanel.coffee ~/Documents/Git/Prototyping-Queue/01220\ geoview\ arrow\ fix.framer/modules/

Framer.Extras.Hints.disable()
Canvas.backgroundColor = "222"
panel = require 'ControlPanel'

presentationMode = true

# Screen

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "FAF9F8"


mordaView = new Layer
	width: 360
	height: 640
	parent: screen
	backgroundColor: "null"


head = new Layer
	width: 360
	height: 242
	image: "images/head.png"
	y: 24
	parent: mordaView


geoView = new Layer
	width: 360
	backgroundColor: "white"
	borderRadius: 24
	y: 282 - 10
	clip: true
	parent: mordaView

geoView.states =
	"hidden": { height: 94 + 10 }
	"hidden-promo": { height: 94 + 10 }
	"shown": { height: 240 + 10 }
	"shown-promo": { height: 240 + 10 }
geoView.stateSwitch("hidden")


zen = new Layer
	width: 360
	height: 502
	backgroundColor: "null"
	parent: mordaView

zen.states =
	"hidden": { y: 372 + 10 }
	"hidden-promo": { y: 372 + 10 }
	"shown": { y: 518 + 10 }
	"shown-promo": { y: 518 + 10 }
zen.stateSwitch("hidden")



bottomBar = new Layer
	width: 360
	height: 56
	image: "images/bottomBar.png"
	parent: screen
	y: Align.bottom

statusBar = new Layer
	width: 360
	height: 24
# 	image: "images/statusBar.png"
	backgroundColor: "white"
	parent: screen


{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 24 }

# Feed Content

weatherNowcast = new Layer
	width: 360
	height: 56
	image: "images/weather%20%E2%80%93%20nowcast.png"
	parent: zen

weatherNowcast.states =
	"alert": { height: 56 }
	"base": { height: 0 }

zenCard = new Layer
	width: 360
	height: 502
	image: "images/zen.png"
	parent: zen

zenCard.states =
	"alert": { y: 56 + 6 }
	"base": { y: 0 }

for item in [weatherNowcast, zenCard]
	item.stateSwitch("alert")







delayReference = null
freezeDelay = false

smallDelay = 2000
longDelay = 1000 * 60

tipDelay = () ->
	if freezeDelay then return longDelay
	return smallDelay

toggleDelayDuration = (event, layer) ->
	freezeDelay = !freezeDelay

delay = (time, fn, args...) ->
	setTimeout fn, time, args...


tipView = new Layer
	width: 360
	height: 79
	image: "images/promoView%20(1).png"
	parent: mordaView
	y: 243
	originX: 0.85
	originY: 0.5

tipView.states =
	"init": { x: 0, y: 243+10, opacity: 0.00 }
	"base": { x: 0, y: 243, opacity: 1.00 }
tipView.stateSwitch("init")

# tipView.animate("base", curve: Spring(damping: 1), time: 0.5)

tipView.on Events.StateSwitchEnd, (from, to, event, layer) ->
	if to != from
		if to is "base"
			delayReference = delay tipDelay(), ->
				toggleTip()

toggleTip = (event, layer) ->
	clearTimeout(delayReference)
	if tipView.states.current.name == "init"
		nextState = "base"
	else nextState = "init"
	
	tipView.animate(nextState, curve: Spring(damping: 1), time: 0.5)

tipView.ignoreEvents = true

# Geo

informerView = new Layer
	parent: geoView
	width: 360
	height: geoView.states.hidden.height
	backgroundColor: "white"



informers_winter = new Layer
	parent: informerView
	width: 360
	height: 36
	y: 56
	image: "images/informers%20winter.png"

geoHeader = new Layer
	parent: informerView
	width: 360
	height: 56
	image: "images/geoHeader.png"




weather_hourly = new Layer
	parent: geoView
	width: 360
	height: 85
	image: "images/weather%20%E2%80%93%20hourly.png"

weather_hourly.states =
	"shown": { y: 104 }
	"shown-promo": { y: 104 }
	"hidden": { y: 104 - (240 - 104) }
	"hidden-promo": { y: 104 - (240 - 104) }
weather_hourly.stateSwitch("hidden")


maps_road_home = new Layer
	parent: geoView
	width: 360
	height: 57
	image: "images/maps%20%E2%80%93%20road%20home.png"

maps_road_home.states =
	"shown": { y: 104 + 85 }
	"shown-promo": { y: 104 + 85 }
	"hidden": { y: 104 - (240 - 104) + 85 }
	"hidden-promo": { y: 104 - (240 - 104) + 85 }
maps_road_home.stateSwitch("hidden")




# Arrow

colorView = new Layer
	parent: informerView
	width: 40
	height: 36
	x: Align.right(-12)
	y: Align.top(10)
	backgroundColor: "F5F5F5"
	borderRadius: 14

colorView.states =
	"shown":
		backgroundColor: "D9D9D9"
		width: 40
		x: 308
	"hidden":
		backgroundColor: "F5F5F5"
		width: 40
		x: 308
	"shown-promo":
		backgroundColor: "D9D9D9"
		width: 66
		x: 282
	"hidden-promo":
		backgroundColor: "F5F5F5"
		width: 66
		x: 282
colorView.stateSwitch("hidden")



colorViewBox = new Layer
	parent: informerView
	width: colorView.width
	height: colorView.height
	x: colorView.x
	y: colorView.y
	backgroundColor: "null"
	# backgroundColor: "red"


promoIconView = new Layer
	parent: informerView
	size: 24
	borderRadius: 8
	x: Align.right(-48)
	y: Align.top(16)
	backgroundColor: "white"

promoIconView.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 0 }
	"hidden-promo": { opacity: 1 }
	"shown-promo": { opacity: 1 }
promoIconView.stateSwitch("hidden")


servicePromoAsset = new Layer
	parent: promoIconView
	size: 20
	x: Align.center
	y: Align.center

servicePromoAsset.states =
	"maps": { image: "images/maps.png" }
	"rain": { image: "images/rain.png" }
	"weather": { image: "images/weather.png" }
servicePromoAsset.stateSwitch("maps")



listIcon = new Layer
	parent: colorViewBox
	width: 24
	height: 24
	x: Align.center
	y: Align.center
	image: "images/arrow bot.png"

closeIcon = new Layer
	parent: colorViewBox
	width: 24
	height: 24
	x: Align.center
	y: Align.center
	image: "images/arrow top.png"

for item in [listIcon, closeIcon]
	if item == listIcon
		firstOpacity = 1
		secondOpacity = 0
	else
		firstOpacity = 0
		secondOpacity = 1
	
	item.states =
		"hidden": { opacity: firstOpacity }
		"hidden-promo": { opacity: firstOpacity }
		"shown": { opacity: secondOpacity }
		"shown-promo": { opacity: secondOpacity }
	
	item.stateSwitch("hidden")




informerView.bringToFront()

# Handlers


togglePromo = () ->
	cState = colorView.states.current.name
	if cState == "shown" then nextState = "shown-promo"
	else if cState == "hidden" then nextState = "hidden-promo"
	else if cState == "shown-promo" then nextState = "shown"
	else if cState == "hidden-promo" then nextState = "hidden"
	
	animateToggle(nextState, false)


toggleView = (withAnimation = true, nextState = null) ->
	cState = colorView.states.current.name
	if cState == "shown" then nextState = "hidden"
	else if cState == "hidden" then nextState = "shown"
	else if cState == "shown-promo" then nextState = "hidden-promo"
	else if cState == "hidden-promo" then nextState = "shown-promo"
	
	animateToggle(nextState, withAnimation)


animateToggle = (nextState = null, withAnimation = true) ->
	if withAnimation then lTime = 0.5 else lTime = 0.2
	
	colorView.animate(nextState, curve: Spring(damping: 1), time: lTime)
	promoIconView.animate(nextState, curve: Spring(damping: 1), time: lTime)
	
	for item in [zen, geoView, weather_hourly, maps_road_home]
		item.animate(nextState, curve: Spring(damping: 1), time: lTime)
	
	changeIcons(closeIcon, listIcon, nextState, withAnimation)


animateAlertToggle = (nextState = null, withAnimation = false) ->
	for item in [weatherNowcast, zenCard]
		try item.stateSwitch(nextState)

toggleAlert = (event, layer) ->
	if weatherNowcast.states.current.name == "alert"
		nextState = "base"
	else nextState = "alert"
	animateAlertToggle(nextState)




changeIcons = (layerA, layerB, nextState, withAnimation = true) ->
	if withAnimation then lTime = 0.3 else lTime = 0
	
	if nextState == "shown" or nextState == "shown-promo"
		temp = layerA
		layerA = layerB
		layerB = temp
	
	layerA.stateSwitch(nextState)
	layerB.animate(nextState, curve: Bezier.linear, time: lTime)



setPromoAsset = (nextState = "maps") ->
	servicePromoAsset.stateSwitch(nextState)

promoWeatherHandler = () ->
	setPromoAsset("weather")

promoRainHandler = () ->
	setPromoAsset("rain")

promoMapsHandler = () ->
	setPromoAsset("maps")

colorView.on(Events.Tap, toggleView)








# panel.header("Геоблок", "left")
# panel.button("Toggle", toggleView, "left", "toggle")

# panel.header("Промо у стрелки", "left")
# panel.button("Toggle", togglePromo, "left", "promo")

# panel.button("Weather", promoWeatherHandler, "left", "promoType")
# panel.button("Maps", promoMapsHandler, "left", "promoType")
# panel.button("Rain", promoRainHandler, "left", "promoType")

# panel.header("Новый алерт", "left")
# panel.button("Toggle", toggleAlert, "left", "toggleAlert")

# panel.header("Обучение геоблоку", "left")
# panel.button("Show", toggleTip, "left", "toggleTip")
# panel.button("F", toggleDelayDuration, "left", "toggleTip")


preview.addSection("Geoview", [
	{ title: "Toggle", handler: toggleView },
])

preview.addSection("Show Promo", [
	{ title: "Toggle", handler: togglePromo },
])

preview.addSection("Promo Type", [
	{ title: "Weather", handler: promoWeatherHandler },
	{ title: "Maps", handler: promoMapsHandler },
	{ title: "Rain", handler: promoRainHandler },
])

preview.addSection("New Alert", [
	{ title: "Toggle", handler: toggleAlert },
])

preview.addSection("Tutorial", [
	{ title: "Show & Hide", handler: toggleTip },
	{ title: "Inf Time", handler: toggleDelayDuration },
])




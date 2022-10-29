Framer.Extras.Hints.disable()

# Layers

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "#F5F6F8"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, forceAndroidBar: true }

fix = new Layer
	width: 360
	height: 240
	backgroundColor: "white"
# 	backgroundColor: "blue"
	parent: screen

feedOverlayTop = new Layer
	parent: screen
	width: 360
	height: 216 + 48
	backgroundColor: "white"

feedOverlayTop.states =
	"newTab": { opacity: 0, y: 0 }
	"feed": { opacity: 1, y: 0 - 216 + 24 }
feedOverlayTop.stateSwitch("newTab")



feedOverlayBottom = new Layer
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "#F0F1F5"

feedOverlayBottom.states =
	"newTab": { opacity: 0, y: 216 + 48 }
	"feed": { opacity: 1, y: 24 + 48 }
feedOverlayBottom.stateSwitch("newTab")


scrollView = new PageComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: true
	scrollHorizontal: false
	originY: 0

# Scroll

pageTop = new Layer
	width: screen.width
	height: 262

pageMid = new Layer
	width: screen.width
	height: 640-142-pageTop.height+20
	y: pageTop.height



pageBot = new ScrollComponent
	width: screen.width
	height: screen.height - 24
	scrollVertical: false
	scrollHorizontal: false
	y: pageTop.height + pageMid.height
	contentInset: 
		top: 6
		bottom: 100

scrollView.on "change:currentPage", ->
	
	if scrollView.currentPage == pageBot
		pageBot.content.scrollVertical = true
		pageBot.scrollVertical = true
		scrollView.content.scrollVertical = false
		scrollView.scrollVertical = false
	
# 	else if scrollView.currentPage == pageTop
# 		panelScrollView.content.scrollVertical = true
# 		panelScrollView.scrollVertical = true
# 		scrollView.content.scrollVertical = false
# 		scrollView.scrollVertical = false



guardFeedReturn = false


pageBot.content.on Events.DragStart, (event, layer) ->
	guardFeedReturn = false
	
	if pageBot.scrollY <= 0 and pageBot.content.draggable.direction == "down"
		guardFeedReturn = true



returnToStart = Utils.throttle 0.5, (event, layer) ->
	pageBot.content.scrollVertical = false
	pageBot.scrollVertical = false
	scrollView.content.scrollVertical = true
	scrollView.scrollVertical = true
	
# 	if pageBot.content.draggable.direction == "null" then localVelocity = 0
# 	else localVelocity = layer.draggable.velocity.y
	localVelocity = 0
	
# 	pageBot.scrollToPoint({ x: 0, y: 0 }, true, { curve: Spring(tension: 400, friction: 40, velocity: localVelocity) })
# 	scrollView.snapToPage(pageMid, true, { curve: Spring(tension: 400, friction: 40, velocity: localVelocity) })
	pageBot.content.animateStop()
	scrollView.content.animateStop()
	pageBot.content.animate(y: 6, options: { time: 0.3 })
	scrollView.content.animate(y: -pageMid.y, { time: 0.3 })



pageBot.content.on Events.DragEnd, (event, layer) ->
# 	consoleLayer.text = "33 #{guardFeedReturn} #{pageBot.content.draggable.direction}"
	if guardFeedReturn and (pageBot.content.draggable.direction == "down" or
							pageBot.content.draggable.direction == "null")
		returnToStart(event, layer)


pageBot.content.on "change:y", ->
	if pageBot.content.draggable.direction == "up"
		omniGuard.stateSwitch("hidden")
	else
		omniGuard.stateSwitch("shown")

# Pages Init

for item, i in [pageTop, pageMid, pageBot]
	item.parent = scrollView.content
# 	item.backgroundColor = Utils.randomColor()
	item.backgroundColor = null


pageBot.originY = 0
pageBot.states =
	"newTab":
		scale: 344/360
	"feed":
		scale: 1
pageBot.stateSwitch("feed")

scrollView.snapToPage(pageMid, false)
pageBot.bringToFront()






# Cards

card09 = new Layer
	width: 360
	height: 374
	image: "images/card09.jpg"

card08 = new Layer
	width: 360
	height: 506
	image: "images/card08.jpg"

card07 = new Layer
	width: 360
	height: 502
	image: "images/card07.jpg"

card06 = new Layer
	width: 360
	height: 359
	image: "images/card06.jpg"

card05 = new Layer
	width: 360
	height: 434
	image: "images/card05.jpg"

card04 = new Layer
	width: 360
	height: 562
	image: "images/card04.jpg"

card03 = new Layer
	width: 360
	height: 488
	image: "images/card03.jpg"

card02 = new Layer
	width: 360
	height: 502
	image: "images/card02.jpg"


card01 = new Layer
	width: 360
	height: 68 + 32 + 16
	backgroundColor: "white"
	clip: true

card01.states =
	"shown": { height: 106 + 216 }
	"hidden": { height: 106 }
card01.stateSwitch("hidden")

# title = new Layer
# 	width: 360
# 	height: 36
# 	image: "images/title.png"
# 	parent: card01




sumY = 0
deltaY = card01.states.shown.height - card01.states.hidden.height
pageBot.content.backgroundColor = "F5F6F8"

for item in [card01, card02, card03, card04, card05, card06, card07, card08, card09]
	item.parent = pageBot.content
	
	if item is card01 then item.borderRadius = 16
	else item.borderRadius = 24
	
	if item == card01
	else
		item.states =
			"shown": { y: sumY + deltaY }
			"hidden": { y: sumY }
		item.stateSwitch("hidden")
		
	sumY += (item.height + 6)


offerScroll = new ScrollComponent
	width: 360
	height: 374
	scrollVertical: false
	parent: card05
	directionLock: true
	y: 56
	contentInset: 
		right: 4

offerScroll.content.propagateEvents = false
offerScroll.propagateEvents = false

offer01 = new Layer
	width: 232
	height: 374
	image: "images/offer01.png"

offer02 = new Layer
	width: 232
	height: 374
	image: "images/offer02.png"

offer03 = new Layer
	width: 232
	height: 374
	image: "images/offer03.png"

offer04 = new Layer
	width: 232
	height: 374
	image: "images/offer04.png"

offer05 = new Layer
	width: 232
	height: 374
	image: "images/offer05.png"

for item, i in [offer01, offer02, offer03, offer04, offer05]
	item.parent = offerScroll.content
	item.x = 4 + (232 + 4) * i

offerScroll.updateContent()




toggleCards = (nextState) ->
	for item in [card01, card02, card03, card04, card05, card06, card07, card08, card09]
		item.animate(nextState, { curve: Spring(damping: 1), time: 0.4})

showReadView = (contentLayer, topIndex) ->
	for item, i in read_top.children
		if i == topIndex then item.stateSwitch("shown")
		else item.stateSwitch("hidden")
	
	for item in readView.content.children
		if item != contentLayer then item.opacity = 0
		else item.opacity = 1
	
	read_footer.opacity = 0
	
	read_content_whiter.opacity = 1
	readView.scrollToPoint( { x: 0, y: 0 }, false)
	readView.animate("shown", curve: Spring(tension: 300, friction: 40, velocity: 0))

# Widgets


header = new Layer
	width: 360
	height: 42
	image: "images/header%20(1).png"
	parent: card01


buttonMore = new Layer
	width: 360/2
	height: header.height
	parent: card01
	x: Align.right
	backgroundColor: "null"

buttonMore.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 0 }
buttonMore.stateSwitch("hidden")

buttonMoreHandler = Utils.throttle 0.4, (event, layer)->
	if layer.states.current.name == "hidden" then layer.stateSwitch("shown")
	else layer.stateSwitch("hidden")

buttonMore.on Events.StateSwitchEnd, (from, to) ->
	if from != toFgap
		toggleCards(to)
		open_arrow.animate(from, { curve: Spring(damping: 1), time: 0.3} )
		close_arrow.animate(to, { curve: Spring(damping: 1), time: 0.3} )

buttonMore.on(Events.Tap, buttonMoreHandler)



trafficW = new Layer
	width: 174
	height: 60
	image: "images/traffic.png"

weatherW = new Layer
	width: 174
	height: 60
	image: "images/weather.png"

for item in [weatherW, trafficW]
	item.parent = card01
	item.y = 42
	if item == trafficW then item.x = 182
	else item.x = 4


homeW = new Layer
	width: 114
	height: 104
	image: "images/home.png"

mapW = new Layer
	width: 115
	height: 104
	image: "images/map.png"

taxiW = new Layer
	width: 115
	height: 104
	image: "images/taxi.png"

for item in [mapW, homeW, taxiW]
	item.parent = card01
	item.y = 106
	if item == mapW then item.x = 4
	else if item == homeW then item.x = 123
	else item.x = 241



bridgesW = new Layer
	width: 115
	height: 104
	image: "images/bridges.png"

trainsW = new Layer
	width: 233
	height: 104
	image: "images/trains.png"

for item in [trainsW, bridgesW]
	item.parent = card01
	item.y = 214
	if item == trainsW then item.x = 4
	else item.x = 241




close_arrow = new Layer
	width: 180
	height: 42
	image: "images/close%20arrow.png"

open_arrow = new Layer
	width: 180
	height: 42
	image: "images/open%20arrow.png"

for item in [close_arrow, open_arrow]
	item.parent = card01
	item.x = Align.right
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	if item is open_arrow then item.stateSwitch("shown")
	else item.stateSwitch("hidden")


# Omnibox

omniGuard = new Layer
	opacity: 0

omniGuard.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 0 }
omniGuard.stateSwitch("shown")



omnibox = new Layer
	width: 360
	height: 56
	image: "images/omnibox.png"
	parent: screen
	y: 640 - 56
	animationOptions:
		curve: Spring(damping: 1)
		time: 0.2

omnibox.states =
	"shown": { y: 640 - 56 }
	"hidden": { y: 640 - 56 + 28 }




omni_arrow = new Layer
	width: 360
	height: 20
	image: "images/omni%20arrow.png"

omni_buttons = new Layer
	width: 360
	height: 48
	image: "images/omni%20buttons.png"


for item in [omni_arrow, omni_buttons]
	item.parent = omnibox
	item.y = 8
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	item.animationOptions =
		curve: Spring(damping: 1)
		time: 0.2

omniGuard.on Events.StateSwitchStart, (from, to) ->
	if to != from
		omnibox.animate(to)
		omni_arrow.animate(from)
		omni_buttons.animate(to)

header = new Layer
	width: 360
	height: 176
	parent: screen
	image: "images/header.png"

avatar = new Layer
	parent: header
	x: 316, y: 28
	image: "https://tilllur.ru/shared/avatars/tilllur.png"
	borderRadius: "100%"
	width: 28, height: 28

statusBar = new Layer
	width: 360
	height: 24
	parent: screen
	backgroundColor: "white"

statusBar.onTap ->
	returnToStart("null", pageBot.content)

# Read

readDarker = new Layer
	width: 360
	height: 640
	parent: screen
	backgroundColor: "rgba(0,0,0,0.4)"

readDarker.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
readDarker.stateSwitch("hidden")


readView = new ScrollComponent
	width: 360
	height: 640
	parent: screen
	scrollHorizontal: false

readView.states =
	"hidden":
		y: 640
	"shown":
		y: 0
readView.stateSwitch("hidden")




readColor = new Layer
	width: 360
	height: 1000
	backgroundColor: "white"
	borderRadius: 16
	parent: readView
	y: 24

readColor.sendToBack()


read_footer = new Layer
	width: 360
	height: 56
	image: "images/read%20footer.png"
	parent: readView
	y: 640 - 56

read_content_whiter = new Layer
	width: 360
	height: 1788
	backgroundColor: "white"
	parent: readView.content
	y: 90

read_content = new Layer
	width: 360
	height: 1788
	image: "images/read%20content.png"
	parent: readView.content
	y: 90

read_top = new Layer
	width: 360
	height: 56
	parent: readView
	backgroundColor: "null"

read_top.states =
	"start":
		y: 34
	"scroll":
		y: 24
read_top.stateSwitch("start")


read_fix = new Layer
	width: 360
	height: 56
	image: "images/read%20fix.png"
	parent: readView
	y: 34
# 	backgroundColor: "blue"

read_fix.placeBefore(readView.content)




readView.content.on "change:y", ->
	v = readView.scrollY
	
	readColor.y = Utils.modulate(v, [0, 100], [34, -100 + 34])
	
	if v >= 0
		read_top.y = Utils.modulate(v, [0, 10], [34, 24], true)
		read_fix.y = Utils.modulate(v, [0, 34], [34, 0], true)
		read_fix.height = Utils.modulate(v, [0, 34], [56, 56 + 24], true)
	else
		read_top.y = Utils.modulate(v, [-100, -200], [100 + 34, 200 + 34])
		read_fix.y = Utils.modulate(v, [-100, -200], [100 + 34, 200 + 34])


readView.content.on Events.DragEnd, (event, layer) ->
	if readView.scrollY < 10
		readView.animate("hidden", curve: Spring(tension: 300, friction: 40, velocity: layer.draggable.velocity.y))

read_top.on Events.Tap, ->
	readView.animate("hidden", curve: Spring(tension: 300, friction: 40))


readView.on Events.StateSwitchStart, (from, to) ->
	readDarker.animate(to, time: 0.2)






maps = new Layer
	width: 360
	height: 630
	image: "images/maps.jpg"
	parent: readView.content
	y: read_content.y

weather = new Layer
	width: 360
	height: 630
	image: "images/weather.jpg"
	parent: readView.content
	y: read_content.y

tv = new Layer
	width: 360
	height: 735
	image: "images/tv.png"
	parent: readView.content
	y: read_content.y

rain = new Layer
	width: 360
	height: 662
	image: "images/rain.png"
	parent: readView.content
	y: read_content.y

tickets = new Layer
	width: 360
	height: 534
	image: "images/tickets.jpg"
	parent: readView.content
	y: read_content.y

taxi = new Layer
	width: 360
	height: 626
	image: "images/taxi.jpg"
	parent: readView.content
	y: read_content.y

bridges = new Layer
	width: 360
	height: 626
	image: "images/bridges.jpg"
	parent: readView.content
	y: read_content.y

# maps_top = new Layer
# 	width: 360
# 	height: 56
# 	image: "images/maps%20top.png"
# 
# weather_top = new Layer
# 	width: 360
# 	height: 56
# 	image: "images/weather%20top.png"

# tv_top = new Layer
# 	width: 360
# 	height: 56
# 	image: "images/tv%20top.png"














pageMid.clip = true
pageMid.borderRadius = 24

navPanel = new Layer
	width: 360
	height: 305
	image: "images/nav%20panel.png"
	parent: pageMid
	y: Align.bottom(5)
	borderRadius: 24


# 262 / 426
toFgap = [262, 426]


scrollView.content.on "change:y", ->
	v = scrollView.scrollY
	fix.y = Utils.modulate(v, [0, 100], [100, -10])
	
	if v >= 262
		header.y = Utils.modulate(v, toFgap, [0, -204+40])


omnibox.on Events.Tap, ->
	pageBot.scrollToPoint( {x: 0, y: 0 }, false)
	scrollView.snapToPage(pageMid)


# Fix load

loadImages = [
	"images/weather top.png",
	"images/maps top.png",
	"images/tickets%20top.png",
	"images/maps top.png",
	"images/taxi%20top.png",
	"images/bridges%20top.png"
]

for item in loadImages
	headerLayer = new Layer
		width: 360
		height: 56
		parent: read_top
		image: item
	
	headerLayer.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	headerLayer.stateSwitch("hidden")


weatherW.onTap ->
# 	read_top.image = "images/weather top.png"
	showReadView(weather, 0)

trafficW.onTap ->
# 	read_top.image = "images/maps top.png"
	showReadView(maps, 1)

homeW.onTap ->
# 	read_top.image = "images/maps top.png"
	showReadView(maps, 1)
	
trainsW.onTap ->
# 	read_top.image = "images/tickets%20top.png"
	showReadView(tickets, 2)

mapW.on Events.Tap, ->
# 	read_top.image = "images/maps top.png"
	showReadView(rain, 3)

taxiW.on Events.Tap, ->
# 	read_top.image = "images/taxi%20top.png"
	showReadView(taxi, 4)

bridgesW.on Events.Tap, ->
# 	read_top.image = "images/bridges%20top.png"
	showReadView(bridges, 5)


consoleLayer = new TextLayer
	parent: statusBar
	fontSize: 14
	x: 50
	y: 2
	opacity: 0

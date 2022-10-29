#

GState =
	metro: 0


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



GState.metro = 1

# if Screen.width > 1000 then screen.scale = 1.5

# selectedGlobalState = GState.market_old

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
	height: 222

pageMid = new Layer
	width: screen.width
	height: 640-142-pageTop.height-10
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



pageBot.content.on Events.DragEnd, (event, layer) ->
	if guardFeedReturn and pageBot.content.draggable.direction == "down"
		pageBot.content.scrollVertical = false
		pageBot.scrollVertical = false
		scrollView.content.scrollVertical = true
		scrollView.scrollVertical = true
		
		pageBot.scrollToPoint({ x: 0, y: 0 }, true, { curve: Spring(tension: 400, friction: 40, velocity: layer.draggable.velocity.y) })
		scrollView.snapToPage(pageMid, true, { curve: Spring(tension: 400, friction: 40, velocity: layer.draggable.velocity.y) })


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

complexCard = new Layer
	width: 360
	height: 94
	backgroundColor: "white"
	borderRadius: 24
	clip: true

topFix = new Layer
	height: 8
	y: -2
	backgroundColor: "white"
	width: 360
	parent: complexCard

infoImage = new Layer
	width: 360
	height: 88
	parent: complexCard
	y: 2
	image: "images/top.png"


close = new Layer
	width: 132
	height: 44
	image: "images/close.png"
	parent: infoImage
	x: Align.right()
	y: Align.top(-2)

close.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
close.stateSwitch("hidden")


open = new Layer
	width: 132
	height: 44
	image: "images/open.png"
	parent: infoImage
	x: Align.right()
	y: Align.top(-2)

open.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 1 }
open.stateSwitch("hidden")




metro = new Layer
	width: 360
	height: 56
	image: "images/metro.png"
	parent: complexCard
	y: complexCard.height - 2

complexCard.height = complexCard.height + metro.height



sumY = 0
pageBot.content.backgroundColor = "F5F6F8"

mainCardArray = [complexCard, card02, card03, card04, card05, card06, card07, card08, card09]

for item in mainCardArray
	item.parent = pageBot.content
	item.y = sumY
	sumY += (item.height + 6)
	if item is complexCard then item.borderRadius = 16
	else item.borderRadius = 24


card08.on Events.Tap, ->
	readView.animate("shown", { curve: Spring(damping: 1), time: 0.5 })


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










# Data

card_united_image = new Layer
	width: 360
	height: 88
# 	image: "images/top.png"

# arrow = new Layer
# 	width: 24
# 	height: 24
# 	image: "images/arrow.png"
# 	parent: card_united_image
# 	x: Align.right(-20)
# 	y: Align.top(9)
# 
# arrow.states =
# 	"hidden": { rotation: 180 }
# 	"shown": { rotation: 0 }
# arrow.stateSwitch("hidden")


maps_auto = new Layer
	width: 360
	height: 44
	image: "images/maps%20auto.png"

weather_static = new Layer
	width: 360
	height: 56
	image: "images/weather%20static.png"


staticArray = [card_united_image, weather_static, maps_auto]




staticGap = 2
for item in staticArray
	item.parent = complexCard
	
	currentY = staticGap
	
	if item == card_united_image
		nextY = currentY
	
	else
		nextY = staticGap
	
	item.states = 
		"hidden": { y: currentY }
		"shown": { y: nextY }
	item.stateSwitch("shown")
	
	staticGap += (item.height)
	item.sendToBack()


staticGap = staticGap - card_united_image.height

for item in staticArray
	item.states.hidden.y = item.states.hidden.y - staticGap
	item.stateSwitch("hidden")









for item in pageBot.content.children
	currentY = item.y
	
	if item == complexCard
		nextY = currentY
		
		item.states = 
			"hidden": { y: currentY, height: 94 + metro.height }
			"shown": { y: nextY, height: 94 + staticGap + metro.height }
		item.stateSwitch("hidden")
	
	else 
		nextY = item.y + staticGap
	
		item.states = 
			"hidden": { y: nextY - staticGap }
			"shown": { y: nextY }
		item.stateSwitch("hidden")


metro.states =
	"hidden": { y: complexCard.height - metro.height - 4 }
	"shown": { y: complexCard.height - metro.height - 4 + staticGap }
metro.stateSwitch("hidden")


complexCard.onTap ->
	if @states.current.name == "hidden" then nextState = "shown"
	else nextState = "hidden"
	
	open.stateSwitch(nextState)
	close.stateSwitch(nextState)
	
	for item in pageBot.content.children
		item.animate(nextState, time: 0.3)
	
	for item in complexCard.children
		try item.animate(nextState, time: 0.3)

# 
# maps_auto = new Layer
# 	width: 360
# 	height: 44
# 	image: "images/maps%20auto.png"
# 
# weather_static = new Layer
# 	width: 360
# 	height: 56
# 	image: "images/weather%20static.png"
# 
# top = new Layer
# 	width: 360
# 	height: 88
# 	image: "images/top.png"




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
# 	borderRadius: 24

avatar = new Layer
	parent: header
	x: 316, y: 28
	image: "https://tilllur.ru/shared/avatars/tilllur.png"
	borderRadius: "100%"
	width: 28, height: 28

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

read_content = new Layer
	width: 360
	height: 1788
	image: "images/read%20content.png"
	parent: readView.content
	y: 90

read_top = new Layer
	width: 360
	height: 56
	image: "images/read%20top.png"
	parent: readView
# 	backgroundColor: "white"

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

readView.on Events.Tap, ->
	readView.animate("hidden", curve: Spring(tension: 300, friction: 40))


readView.on Events.StateSwitchStart, (from, to) ->
	readDarker.animate(to, time: 0.2)


navPanel = new Layer
	width: 360
	height: 305
	image: "images/nav%20panel.png"
	parent: pageMid
	y: Align.bottom()
	borderRadius: 24


# 222 / 426
toFgap = [222, 426]


scrollView.content.on "change:y", ->
	v = scrollView.scrollY
	fix.y = Utils.modulate(v, [0, 100], [0, -100])
	
	if v >= 222
		header.y = Utils.modulate(v, toFgap, [0, -204])
	

statusBar = new Layer
	width: 360
	height: 24
	parent: screen
	backgroundColor: "white"


omnibox.on Events.Tap, ->
	pageBot.scrollToPoint( {x: 0, y: 0 }, false)
	scrollView.snapToPage(pageMid)


# Code

Events.wrap(window).addEventListener "keydown", (event) ->
	if event.keyCode is 65
		GState.metro = 1
		
# 		for item in 





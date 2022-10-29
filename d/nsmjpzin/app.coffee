# Framer.Extras.Hints.disable()

panel = require 'ControlPanel'

# Layers

screen = new Layer
	width: 360, height: 640
	backgroundColor: "#F5F6F8"

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 16, forceAndroidBar: true }


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

card01 = new Layer
	width: 360
	height: 68 + 32
	backgroundColor: "white"

title = new Layer
	width: 360
	height: 36
	image: "images/title.png"
	parent: card01



sumY = 0
pageBot.content.backgroundColor = "F5F6F8"
for item in [card01, card02, card03, card04, card05, card06, card07, card08, card09]
	item.parent = pageBot.content
	item.y = sumY
	sumY += (item.height + 6)
	if item is card01 then item.borderRadius = 16
	else item.borderRadius = 24



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




leftScroll = new PageComponent
	x: 4
	width: 174
	height: 68
	parent: card01
	scrollVertical: true
	scrollHorizontal: false
	propagateEvents: false
	originY: 0
	y: 32
	contentInset: 
		top: 4
		right: 0
		bottom: 4
		left: 0

rightScroll = new PageComponent
	x: 182
	width: 174
	height: 68
	parent: card01
	scrollVertical: true
	scrollHorizontal: false
	propagateEvents: false
	originY: 0
	y: 32
	contentInset: 
		top: 4
		bottom: 4


left01 = new Layer
	width: 174
	height: 60
	image: "images/left01.png"

left02 = new Layer
	width: 174
	height: 60
	image: "images/left02.png"

for item, i in [left01, left02]
	item.parent = leftScroll.content
	item.y = (4 + 60) * i

temp = new Layer { height: 4, width: 40, parent: leftScroll.content, y: (4 + 60) * 2-4, backgroundColor: "null" }
leftScroll.updateContent()



right03 = new Layer
	width: 174
	height: 60
	image: "images/right03.png"

right02 = new Layer
	width: 174
	height: 60
	image: "images/right02.png"

right01 = new Layer
	width: 174
	height: 60
	image: "images/right01.png"

for item, i in [right01, right02, right03]
	item.parent = rightScroll.content
	item.y = (4 + 60) * i

temp = new Layer { height: 4, width: 40, parent: rightScroll.content, y: (4 + 60) * 2-4, backgroundColor: "null" }
rightScroll.updateContent()



leftRoundView = new Layer
	height: (8 + 2) * 2 - 2
	width: 2
	parent: leftScroll
	y: Align.center
	x: Align.right(-4)
	backgroundColor: "null"

for item, i in [left01, left02]
	round = new Layer
		width: 2
		height: 8
		backgroundColor: "black"
		borderRadius: 2
		parent: leftRoundView
		y: (8 + 2) * i
	
	round.states =
		"shown": { opacity: 0.5 }
		"hidden": { opacity: 0.1 }
	
	if i == 0 then round.stateSwitch("shown")
	else round.stateSwitch("hidden")



rightRoundView = new Layer
	height: (8 + 2) * 3 - 2
	width: 2
	parent: rightScroll
	y: Align.center
	x: Align.right(-4)
	backgroundColor: "null"

for item, i in [right01, right02, right03]
	round = new Layer
		width: 2
		height: 8
		backgroundColor: "black"
		borderRadius: 2
		parent: rightRoundView
		y: (8 + 2) * i
	
	round.states =
		"shown": { opacity: 0.5 }
		"hidden": { opacity: 0.1 }
	
	if i == 0 then round.stateSwitch("shown")
	else round.stateSwitch("hidden")



leftScroll.on "change:currentPage", ->
	if leftScroll.currentPage == leftScroll.content.children[0]
		leftRoundView.children[0].animate("shown", time: 0.2)
		leftRoundView.children[1].animate("hidden", time: 0.2)
	else if leftScroll.currentPage == leftScroll.content.children[1]
		leftRoundView.children[0].animate("hidden", time: 0.2)
		leftRoundView.children[1].animate("shown", time: 0.2)

rightScroll.on "change:currentPage", ->
	if rightScroll.currentPage == rightScroll.content.children[0]
		rightRoundView.children[0].animate("shown", time: 0.2)
		rightRoundView.children[1].animate("hidden", time: 0.2)
		rightRoundView.children[2].animate("hidden", time: 0.2)
	else if rightScroll.currentPage == rightScroll.content.children[1]
		rightRoundView.children[0].animate("hidden", time: 0.2)
		rightRoundView.children[1].animate("shown", time: 0.2)
		rightRoundView.children[2].animate("hidden", time: 0.2)
	else if rightScroll.currentPage == rightScroll.content.children[2]
		rightRoundView.children[0].animate("hidden", time: 0.2)
		rightRoundView.children[1].animate("hidden", time: 0.2)
		rightRoundView.children[2].animate("shown", time: 0.2)





# Omnibox

omniGuard = new Layer
	opacity: 0
	x: -1000

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

statusBar = new Layer
	width: 360
	height: 24
	parent: screen
	backgroundColor: "white"

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







# Handlers


handleWeather = (event, layer) ->
	if leftScroll.currentPage != leftScroll.content.children[1]
		leftScroll.snapToPage(leftScroll.content.children[1])
	else
		leftScroll.snapToPage(leftScroll.content.children[0])



handleTraffic = (event, layer) ->
	if rightScroll.currentPage != rightScroll.content.children[1]
		rightScroll.snapToPage(rightScroll.content.children[1])
	else
		rightScroll.snapToPage(rightScroll.content.children[0])



preview.addSection("Change Alerts", [
	{ title: "Slot 1", handler: handleWeather },
	{ title: "Slot 2", handler: handleTraffic },
])

# panel.header("Change Alerts", "left")
# panel.button("Weather", handleWeather, "left", "online")
# panel.button("Traffic", handleTraffic, "left", "online")







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


omnibox.on Events.Tap, ->
	pageBot.scrollToPoint( {x: 0, y: 0 }, false)
	scrollView.snapToPage(pageMid)




left01.onTap ->
	weather.bringToFront()
	readView.scrollToPoint( { x: 0, y: 0 }, false)
	read_top.image = "images/weather top.png"
	readView.animate("shown", curve: Spring(tension: 300, friction: 40, velocity: 0))

left02.onTap ->
	rain.bringToFront()
	readView.scrollToPoint( { x: 0, y: 0 }, false)
	read_top.image = "images/weather top.png"
	readView.animate("shown", curve: Spring(tension: 300, friction: 40, velocity: 0))

right01.onTap ->
	maps.bringToFront()
	readView.scrollToPoint( { x: 0, y: 0 }, false)
	read_top.image = "images/maps top.png"
	readView.animate("shown", curve: Spring(tension: 300, friction: 40, velocity: 0))

right03.onTap ->
	tv.bringToFront()
	readView.scrollToPoint( { x: 0, y: 0 }, false)
	read_top.image = "images/tv top.png"
	readView.animate("shown", curve: Spring(tension: 300, friction: 40, velocity: 0))

card08.on Events.Tap, ->
	maps.sendToBack()
	readView.scrollToPoint( { x: 0, y: 0 }, false)
	weather.sendToBack()
	readView.animate("shown", { curve: Spring(damping: 1), time: 0.5 })


Utils.delay 2, ->
	leftScroll.snapToPage(leftScroll.content.children[1])


Utils.delay 7, ->
	rightScroll.snapToPage(rightScroll.content.children[1])

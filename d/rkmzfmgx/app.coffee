

# Screen

screen = new Layer
	width: 360
	height: 640
	clip: true
	borderRadius: 8
	backgroundColor: "#F5F6F8"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


podScroll = new PageComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true

# podScroll.velocityThreshold = 1


header = new Layer
	width: 360
	height: 184
	parent: screen
	backgroundColor: "white"
	parent: podScroll.content

avatar = new Layer
	parent: header
	x: 306, y: 38
	image: "https://tilllur.ru/shared/avatars/tilllur.png"
	borderRadius: "100%"
	width: 28, height: 28



verticals = new PageComponent
	parent: podScroll.content
	y: header.height
	width: screen.width
	height: screen.height - 24
	scrollVertical: false
	directionLock: true


page0 = new ScrollComponent
	width: screen.width
	height: verticals.height
	parent: verticals.content
	backgroundColor: "white"
	scrollHorizontal: false
	directionLock: true

page1 = new ScrollComponent
	width: screen.width
	height: verticals.height
	x: (screen.width + 16)
	parent: verticals.content
	backgroundColor: "rgba(0,255,0,0.5)"
	scrollHorizontal: false
	directionLock: true

page2 = new ScrollComponent
	width: screen.width
	height: verticals.height
	x: (screen.width + 16) * 2
	parent: verticals.content
	backgroundColor: "rgba(0,0,255,0.5)"
	scrollHorizontal: false
	directionLock: true

for item, i in verticals.content.children
	item.name = "page#{i}"
	item.backgroundColor = "white"

# Guard

globalGuard = new Layer
	opacity: 0

globalGuard.states =
	"header": { opacity: 0 }
	"feed": { opacity: 0 }

globalGuard.on Events.StateSwitchEnd, (from, to) ->
	if from != to
# 		print "State changed to -----> #{to}"
		
		if to == "feed"
			podScroll.velocityThreshold = 1000
# 			podScroll.content.draggable.speedY = 0
			podScroll.ignoreEvents = true
			podScroll.content.ignoreEvents = true
		
			for item in verticals.content.children
				item.ignoreEvents = false
				item.content.ignoreEvents = false
			
			
			
		
		else if to == "header"
			podScroll.velocityThreshold = 0.5
			for item in verticals.content.children
				item.ignoreEvents = true
				item.content.ignoreEvents = true
		
# 			podScroll.content.draggable.speedY = 1
			podScroll.ignoreEvents = false
			podScroll.content.ignoreEvents = false




headerViewDradStarted = false
podScroll.originY = 0





# Header

titleView = new Layer
	height: 48
	width: 360
	parent: header
	y: 48 + 24
	backgroundColor: "white"

titleYandex = new Layer
	name: "titleYandex"
	parent: header
	width: 62
	height: 48
	image: "images/titleYandex.png"

titleVideo = new Layer
	name: "titleVideo"
	parent: header
	width: 54
	height: 48
	image: "images/titleVideo.png"

titleMarket = new Layer
	name: "titleMarket"
	parent: header
	width: 65
	height: 48
	opacity: 1
	image: "images/titleMarket.png"


titleArray = [titleYandex, titleMarket, titleVideo]
titleSumX = 0
titleOpacity = 0.32

for item, i in titleArray
	item.parent = titleView
	item.x = titleSumX
	titleSumX += (20 + item.width)
	
	item.states =
		"page0": { opacity: if item == titleArray[0] then 1 else titleOpacity }
		"page1": { opacity: if item == titleArray[1] then 1 else titleOpacity }
		"page2": { opacity: if item == titleArray[2] then 1 else titleOpacity }
	item.stateSwitch("page0")

titleSumX -= 20
titleView.width = titleSumX

titleView.states = 
	"page0": { x: 360 / 2 - titleArray[0].width / 2 }
	"page1": { x: 360 / 2 - titleArray[0].width - 20 - titleArray[1].width / 2 }
	"page2": { x: 360 / 2 - titleArray[0].width - 20 - titleArray[1].width - 20 - titleArray[2].width / 2 }

titleView.stateSwitch("page0")



# screen.scale = 1.7


# Back Omnibox

backOmniboxGuard = new Layer
	opacity: 0

backOmniboxGuard.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 0 }

backOmniboxGuard.on Events.StateSwitchEnd, (from, to) ->
	if from != to and globalGuard.states.current.name == "feed"
# 		print "omni to #{to}"
		
		if to == "shown"
			backOmniboxView.animate("shown", time: 0.3)
		else if to == "hidden"
			backOmniboxView.animate("hidden", time: 0.3)

backOmniboxGuard.stateSwitch("shown")


backOmniboxView = new Layer
	width: 360
	height: 56
	parent: screen
	backgroundColor: "white"

backOmniboxView.states =
	"shown": { y: 24 }
	"hidden": { y: 24 - 56 }
	"header": { y: 120 }
backOmniboxView.stateSwitch("header")





# Omnibox

searchYandex = new Layer
	width: 360
	height: 56
	image: "images/searchYandex.png"

searchVideo = new Layer
	width: 360
	height: 56
	image: "images/searchVideo.png"

searchMarket = new Layer
	width: 360
	height: 56
	image: "images/searchMarket.png"


omniboxArray = [searchYandex, searchVideo, searchMarket]
omniboxOpacity = 0

for item in omniboxArray
	item.parent = backOmniboxView
	
	item.states =
		"page0": { opacity: if item == searchYandex then 1 else omniboxOpacity }
		"page1": { opacity: if item == searchVideo then 1 else omniboxOpacity }
		"page2": { opacity: if item == searchMarket then 1 else omniboxOpacity }
	item.stateSwitch("page0")


# Logo


logoYandex = new Layer
	width: 44
	height: 44
	image: "images/iconYandex.png"

logoVideo = new Layer
	width: 44
	height: 44
	image: "images/iconVideo.png"

logoMarket = new Layer
	width: 44
	height: 44
	image: "images/iconMarket.png"


logoArray = [logoYandex, logoMarket, logoVideo]
logoOpacity = 0

for item in logoArray
	item.parent = header
	item.y = 4 + 24
	item.x = Align.center()
	
	item.states =
		"page0": { opacity: if item == logoArray[0] then 1 else logoOpacity }
		"page1": { opacity: if item == logoArray[1] then 1 else logoOpacity }
		"page2": { opacity: if item == logoArray[2] then 1 else logoOpacity }
	item.stateSwitch("page0")


# Content

test11 = new Layer
	parent: page1.content
	width: 360
	height: 1576
	image: "images/test11.png"

test12 = new Layer
	parent: page2.content
	width: 360
	height: 1576
	image: "images/test11.png"

# feedTest3 = new Layer
# 	parent: page1.content
# 	width: 360
# 	height: 1096
# 	image: "images/feedTest3.png"




test = new Layer
	parent: page0.content
	width: 360
	height: 1731
	image: "images/test.png"




bottomBar = new Layer
	width: 360
	height: 56
	image: "images/bottomBar.png"
	parent: screen
	y: Align.bottom()

statusBar = new Layer
	width: 360
	height: 24
	backgroundColor: "white"
	parent: screen


podScroll.content.on Events.DragStart, ->
	headerViewDradStarted = true


podScroll.content.on "change:y", ->
	v = podScroll.scrollY
	f = parseInt(v.toFixed())
	
	if f < 0 then backOmniboxView.y = Utils.modulate(f, [0, 96], [96 + 24, 24], false)
	else backOmniboxView.y = Utils.modulate(f, [0, 96], [96 + 24, 24], true) 
	
# 	print f
	
	if f >= header.height - 2
		globalGuard.stateSwitch("feed")


podScroll.content.on Events.DragEnd, ->
	headerViewDradStarted = false





globalGuard.stateSwitch("feed")
globalGuard.stateSwitch("header")
podScroll.content.draggable.enabled = true


verticals.on "change:currentPage", ->
	market_tip.animate("hidden", time: 0.2)
	nextState = verticals.currentPage.name
	
	titleView.animate(nextState, time: 0.3)
	item.animate(nextState, time: 0.3) for item in titleArray
	item.animate(nextState, time: 0.3) for item in omniboxArray
	item.animate(nextState, time: 0.3) for item in logoArray



for item in verticals.content.children
	
	item.content.on Events.DragStart, ->
		if globalGuard.states.current.name == "feed"
			podScroll.ignoreEvents = true
			podScroll.content.ignoreEvents = true
			podScroll.content.draggable.enabled = false
	
	item.content.on Events.DragEnd, ->
		podScroll.content.draggable.enabled = true
	
	item.content.on Events.Drag, ->
# 		print @draggable.velocity.y
		if @draggable.velocity.y > 0.5
			backOmniboxGuard.stateSwitch("shown")
		else if @draggable.velocity.y < 0
			backOmniboxGuard.stateSwitch("hidden")
	
	item.content.on "change:y", ->
		page = @parent
		v = page.scrollY
		f = parseInt(v.toFixed())
# 		print f
		
		if f <= 0
			globalGuard.stateSwitch("header")
			










require "animateOnSpline"


market_tip = new Layer
	width: 360
	height: 122
	image: "images/market%20tip.png"
	parent: screen

market_tip.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
market_tip.stateSwitch("hidden")





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

round.stateSwitch("shown")



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
		market_tip.animate("shown", time: 0.2)






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


fix1 = new Layer
	parent: image
	size: 32
	x: Align.right(-20)
	y: Align.top(44)
	backgroundColor: "#F7DD75"







started = 0
screen.onTap ->
	if started == 0 then round.stateSwitch("shown")
	else if started == 1
		verticals.snapToNextPage()
		market_tip.animate("hidden", time: 0.2)
	started++

fix = new Layer
	width: 360
	height: 718
	image: "images/fix.png"
	parent: test11
	backgroundColor: "#F5F6F8"




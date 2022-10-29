Framer.Extras.Hints.disable()

Utils.insertCSS('@import url(css/project.css)')
Screen.backgroundColor = "222"

globalTipShown = false
dark = false

# Pages

pages = new PageComponent
	width: 360
	height: 640
	scrollVertical: false
	directionLock: true
	backgroundColor: "#F5F6F8"

{ Preview } = require "PreviewComponent"
new Preview { view: pages, borderRadius: 16, forceAndroidBar: true }

# pages.center()

page0 = new ScrollComponent
	width: pages.width
	height: pages.height
	parent: pages.content
	scrollHorizontal: false
	directionLock: true
	contentInset: 
		bottom: 64

page1 = new ScrollComponent
	width: pages.width
	height: pages.height
	parent: pages.content
	x: 360 + 16
	scrollHorizontal: false
	directionLock: true



bottomBarGuard = new Layer
	opacity: 0

bottomBarGuard.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0 }
bottomBarGuard.stateSwitch("shown")


bottomBarGuard.on Events.StateSwitchEnd, (from, to) ->
	if to != from
		if to == "shown"
			for item in [home, arrow]
				item.animate(y: item.states.top.y, options: { time: 0.3 })
				item.animate(opacity: item.states.top.opacity, options: { time: 0.15 })
		else if to == "hidden"
# 			item.animate("feed", time: 0.3) for item in [home, arrow]
			for item in [home, arrow]
				item.animate(y: item.states.feed.y, options: { time: 0.3 })
				item.animate(opacity: item.states.feed.opacity, options: { time: 0.15 })



bottomBar = new Layer
	width: 360
	height: 56
	image: "images/bottomBar.png"
	parent: pages
	y: Align.bottom()

bottomBar.states =
	"hidden": { y: 640 }
	"shown": { y: 640 - 56 }
bottomBar.stateSwitch("shown")


omniView = new Layer
	width: 360
	height: 60
	backgroundColor: "white"
	parent: pages

omniView.states =
	"hidden": { y: 24 - 60 }
	"shown": { y: 24 }
omniView.stateSwitch("hidden")


statusBar = new Layer
	width: 360
	height: 24
# 	image: "images/statusBar.png"
	backgroundColor: "white"
	parent: pages








omniMarket = new Layer
	width: 360
	height: 60
	image: "images/omniMarket.png"
	parent: omniView

omniYandex = new Layer
	width: 360
	height: 60
	image: "images/omniYandex.png"
	parent: omniView

omniboxArray = [omniYandex, omniMarket]
for item in omniboxArray
	item.states =
		"yandex": { opacity: if item == omniboxArray[0] then 1 else 0 }
		"market": { opacity: if item == omniboxArray[1] then 1 else 0 }
	item.stateSwitch("yandex")

buttonFixColor = new Layer
	width: 64
	height: 44
	backgroundColor: "white"
	parent: bottomBar
	x: 10
	y: 10



# Button Wide


bSize = 26
bWidth = 202-6

if dark then bColor = "rgba(255,255,255,0.9)" else bColor = "rgba(37,40,49,0.8)"
if dark then bTextColor = "rgba(0,0,0,1)" else bTextColor = "white" 

createButton = (parentLayer) ->

	buttonWide = new Layer
		width: bSize
		height: bSize
		backgroundColor: bColor
		parent: parentLayer
		y: 284
		x: 16
		borderRadius: 9
		name: "button"
	
	buttonWide.states =
		"hidden": { opacity: 0, scale: 0 }
		"shown": { opacity: 1, scale: 1 }
		"short": { width: bSize }
		"long": { width: bWidth + bSize/2 + 3 }
	buttonWide.stateSwitch("hidden")
	
	buttonWide.propagateEvents = false
	
	buttonWide.onTap ->
		pages.snapToPage(page1)
	
	
	buttonWide.on Events.StateSwitchStart, (from, to) ->
		if to is "long"
			globalTipShown = true
	
	localDelay = 3
	buttonWide.on Events.StateSwitchEnd, (from, to) ->
		if to is "shown" and !globalTipShown 
			@animate("long", curve: Spring(damping: 1), time: 0.5, delay: 0.6)
			@children[0].animate("shown", curve: Spring(damping: 1), time: 0.5, delay: 0.7)
		else if to is "long"
			@animate("short", curve: Spring(damping: 1), time: 0.4, delay: localDelay)
			@children[0].animate("hidden", curve: Spring(damping: 1), time: 0.4, delay: localDelay-0.2)
	
	
	textTip = new TextLayer
		fontFamily: "YS Web Regular"
		parent: buttonWide
		fontSize: 13
		color: bTextColor
		height: bSize
		padding: 
			top: 6
			left: 26
		text: "Откроется в разделе Маркет"
	
	textTip.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	textTip.stateSwitch("hidden")
	
	
	
	marketIcon = new Layer
		width: bSize
		height: bSize
		image: "images/tip%20(1).png"
		parent: buttonWide
# 		y: -1
	
	return buttonWide


# Market Cards

fButton = (layerNode) ->
	for item in layerNode.children
		if item.name == "button" then return item
	return null


marketArticle = new Layer
	width: 360
	height: 506
	image: "images/marketArticle.png"
	name: "article"

marketVideo = new Layer
	width: 360
	height: 658
	image: "images/marketVideo.png"
	name: "video"

videoCrop = new Layer
	parent: marketVideo
	width: 352
	height: 352
	x: 4
	y: 56
	borderRadius: 24
	clip: true
	backgroundColor: "null"

mainVideo = new VideoLayer
	width: 352
	height: 264
	video: "images/things.mov"
	parent: videoCrop

videoPatch = new Layer
	width: 352
	height: 264
	image: "images/videoPatch.png"
	parent: videoCrop



marketReview = new Layer
	width: 360
	height: 506
	image: "images/marketReview.png"
	name: "review"




headerOther = new Layer
	width: 360
	height: 56
	image: "images/headerOther.png"
	parent: marketArticle
	backgroundColor: "white"
	borderRadius: 24


# headerMarket = new Layer
# 	width: 360
# 	height: 56
# 	image: "images/headerMarket.png"









findMirrorCard = (cardName) ->
	for item in page1.content.children
		if item.name == cardName
			return item
	
	return null



marketCardArray = [marketVideo, marketArticle, marketReview]
for item in marketCardArray
	createButton(item)
	
	if item is marketArticle
		item.onTap ->
			
			page1.scrollToPoint(
				x: 0, y: findMirrorCard(@name).y - 100,
				false)
			
			pages.snapToPage(page1)
			darker.animate("shown", curve: Spring(damping: 1), time: 0.5, delay: 0.5)
			sideView.animate("shown", curve: Spring(damping: 1), time: 0.5, delay: 0.5)
	else
		item.onTap ->
			page1.scrollToPoint(
				x: 0, y: findMirrorCard(@name).y - 100,
				false)
			
			pages.snapToPage(page1)


mainVideo.player.play()
mainVideo.player.loop = true


timeLayer = new TextLayer
	fontFamily: "YS Web Regular"
	parent: videoCrop
	fontSize: 13
	color: "white"
	height: bSize
	x: 282
	y: 229
	padding:
		top: 6
		left: 26
	text: "2:40"
	width: 200
	textAlign: "left"

# timeLayer.states.add 





# Content

content = new Layer
	width: 360
	height: 1348
	y: 24
	image: "images/content.png"

lastCard = new Layer
	width: 360
	height: 466
	image: "images/lastCard.png"

card_temp = new Layer
	width: 360
	height: 2011
	image: "images/card%20temp.png"

# card0 = new Layer
# 	width: 360
# 	height: 426
# 	image: "images/card0.png"

card1 = new Layer
	width: 360
	height: 506
	image: "images/card1.png"

card2 = new Layer
	width: 360
	height: 374
	image: "images/card2.png"


# yandexContentArray = [content, marketCard, lastCard]
yandexContentArray = [content, card_temp]
yandexContentArray.push marketVideo
yandexContentArray.push card1
yandexContentArray.push marketArticle
yandexContentArray.push card2
yandexContentArray.push marketReview
yandexContentArray.push lastCard

yandexContentY = 24

for item in yandexContentArray
	item.parent = page0.content
	item.y = yandexContentY
	yandexContentY += item.height + 6

page0.updateContent()







contentMarket = new Layer
	width: 360
	height: 221
	image: "images/marketHead.png"
	y: 24

marketCarousel = new Layer
	width: 360
	height: 466
	image: "images/marketCarousel.png"



marketContentArray = [contentMarket]
marketContentArray.push item.copy() for item in marketCardArray
marketContentArray.push marketCarousel


marketContentY = 24

for item in marketContentArray
	item.parent = page1.content
	item.y = marketContentY
	marketContentY += item.height + 6

page1.updateContent()






# Side View


darker = new Layer
	width: 360
	height: 640
	backgroundColor: "000"
	parent: pages

darker.states =
	"shown": { opacity: 0.5 }
	"hidden": { opacity: 0 }
darker.stateSwitch("shown")

sideView = new Layer
	width: 360
	height: 591
	image: "images/sideView.png"
	parent: pages

sideView.states =
	"shown": { y: 640 - 591 }
	"hidden": { y: 640 }
sideView.stateSwitch("shown")



pages.borderRadius = 8

# page0.scrollToLayer(marketArticle, 0, 0.5, false) 

# Handlers



sideView.onTap ->
	darker.animate("hidden", { curve: Spring(damping: 1), time: 0.5 })
	sideView.animate("hidden", { curve: Spring(damping: 1), time: 0.5 })

# page1.scrollToPoint({x: 0, y: 188}, false)
# buttonWide.animate("shown", time: 0.6, delay: 0.4)


page0.content.on "change:y", ->
	v = @parent.scrollY
	checkBars(v, @)
	
	button = fButton(marketArticle)
	if v > marketArticle.y - 200 and button.states.current.name == "hidden"
		button.animate("shown", time: 0.3)
	
	button = fButton(marketVideo)
	if v > marketVideo.y - 240 and button.states.current.name == "hidden"
		button.animate("shown", time: 0.3)
	
	if v > 40 and bottomBarGuard.states.current.name == "shown"
		bottomBarGuard.stateSwitch("hidden")
	else if v <= 40 and bottomBarGuard.states.current.name == "hidden"
		bottomBarGuard.stateSwitch("shown")






page1.content.on "change:y", ->
	v = @parent.scrollY
	checkBars(v, @)


checkBars = (v, lC) ->
	if v > 140 and omniView.states.current.name == "hidden"
		omniView.animate("shown", time: 0.3)
	else if v < 140 and omniView.states.current.name == "shown"
		omniView.animate("hidden", time: 0.3)
	
# 	if lC.draggable.direction == "up" and Math.abs(lC.draggable.velocity.y) > 1
# 		bottomBarGuard.stateSwitch("hidden")
# 	else if lC.draggable.direction == "down" and Math.abs(lC.draggable.velocity.y) > 1
# 		bottomBarGuard.stateSwitch("shown")



pages.on "change:currentPage", ->
	if pages.currentPage == page0
		item.animate("yandex", time: 0.5) for item in omniboxArray
		
		videoLayer = marketVideo.children[0].children[0]
		mirrorCard = findMirrorCard(marketVideo.name)
		mirrorVideoLayer = mirrorCard.children[0].children[0]
		
		mirrorVideoLayer.player.pause()
		videoLayer.player.currentTime = mirrorVideoLayer.player.currentTime
		videoLayer.player.play()
	else
		item.animate("market", time: 0.5) for item in omniboxArray
		
		videoLayer = marketVideo.children[0].children[0]
		mirrorCard = findMirrorCard(marketVideo.name)
		mirrorVideoLayer = mirrorCard.children[0].children[0]
		
		# kek
		mirrorVideoLayer.player.loop = true
		
		videoLayer.player.pause()
		mirrorVideoLayer.player.currentTime = videoLayer.player.currentTime
		mirrorVideoLayer.player.play()
		
		



darker.stateSwitch("hidden", { curve: Spring(damping: 1), time: 0.5 })
sideView.stateSwitch("hidden", { curve: Spring(damping: 1), time: 0.5 })


# pages.scale = (Screen.height - 60) / 640
# pages.center()




bottomBarView = new Layer
	parent: bottomBar
	clip: true
	y: 8
	width: 360
	height: 48
	backgroundColor: "null"



arrow = new Layer
	width: 26
	height: 26
	image: "images/arrow.png"
	parent: bottomBarView
	x: 27


arrow.states =
	"top": { y: 11 + 26, opacity: 0 }
	"feed": { y: 11, opacity: 1 }

home = new Layer
	width: 26
	height: 26
	image: "images/home.png"
	parent: bottomBarView
	x: 27
	scale: 1.07

home.states =
	"top": { y: 11, opacity: 1 }
	"feed": { y: 11 - 26, opacity: 0 }

for item in [arrow, home]
	item.stateSwitch("top")
	item.onTap ->
		
		if page0.scrollY > 640
			page0.scrollToPoint(
				x:0, y: 640,
				false
			)
		
		page0.scrollToPoint(
			x:0, y: 0,
			true,
			curve: Spring(damping: 1), time: 0.5
		)
		
		bottomBarGuard.stateSwitch("shown")
# 	item.animate("feed", curve: Spring(damping: 1), time: 0.4)

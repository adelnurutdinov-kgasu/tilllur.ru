RADIUS_CARD = 16
SHOW_OFFER_DELAY_MS = 3000
Framer.Extras.Hints.disable()
Gist = require "Gist"


# Data Import

appsURL = "json/apps-v1.json"
groupsURL = "json/groups-v1.json"

appsData = JSON.parse Utils.domLoadDataSync decodeURIComponent(appsURL)
groupsData = JSON.parse Utils.domLoadDataSync decodeURIComponent(groupsURL)

appsKeys = []
for k,v of appsData
	appsKeys.push(k)

groupKeys = []
for k,v of groupsData
	groupKeys.push(k)




delayReference = null

delay = (time, fn, args...) ->
	setTimeout fn, time, args...


# Icon

ICON_VIEW_HEIGHT = 80

getURL = (iconName) ->
	return "json/images/v1/" + iconName

updateIcon = (iconView, iconKey) ->
	iconData = appsData[iconKey]
	
	iconView.name = iconKey
	for child in iconView.children
		if child.name == "image"
			child.image = getURL(iconData.image)
		if child.name == "name"
			child.text = iconData.name



longTapDelay = null

getIcon = (iconKey, dragStateIcon = true) ->
	iconData = appsData[iconKey]
	if iconData is undefined
		print "Warning: undefined key was found: #{iconKey}"
		iconKey = "panel empty"
		iconData = appsData[iconKey]
	
	
	iconView = new Layer
		backgroundColor: "null"
		width: 64
		height: ICON_VIEW_HEIGHT
		name: "#{iconKey}"
	
	iconView.states["shown"] = { opacity: 1 }
	if dragStateIcon then iconView.states["drag"] = { opacity: 1 }
	else iconView.states["static"] = { opacity: 0.5 }
	
	iconView.stateSwitch("shown")
	
	iconView.on Events.StateSwitchEnd, (from, to) ->
		# for Draggable Icons
		if @states["drag"] != undefined
			for child in @children
				if child.name == "image"
					child.children[0].stateSwitch(to)
# 					else if preState == "drag" then child.children[0].stateSwitch("hidden")
	
	iconView.on Events.TouchStart, (event, layer)->
		longTapDelay = Utils.delay 1, =>
			dragModeSwitch(layer)
	
	iconView.on Events.TouchEnd, ->
		clearTimeout(longTapDelay)
	
	iconView.on Events.Tap, (event, layer) ->
		if @name.includes(".") then return
		if @states.current.name == "drag" then return
		
		if @name == "beru"
			beruReset()
			beruWebViewModal.stateSwitch("shown")
		
		modalView.name = @name
		modalTitle.text = appsData[@name].name
		modalPageComponent.content.ignoreEvents = false
		modalPageComponent.snapToPage(modalPage2, time: 0.2)
		
		
	
	
	
	iconLayer = new Layer
		name: "image"
		parent: iconView
		size: 48
		borderRadius: 16
		image: getURL(iconData.image)
		x: 8
		backgroundColor: "rgba(0,0,0,0.05)"
	
	iconLayer.states =
		"touch":
			scale: 0.9
		"shown":
			scale: 1
		"hidden":
			scale: 0.7
	
	iconLayer.on Events.TouchStart, ->
		@animate("touch", time: 0.2)
	
	iconLayer.on Events.TouchEnd, ->
		@animate("shown", time: 0.2)

	
	
	
	iconTitle = new TextLayer
		name: "name"
		fontSize: 12
		lineHeight: 1.1666
		parent: iconView
		width: 64
		height: 28
		y: 48 + 4
		height: 32
		text: iconData.name
		textAlign: "center"
		color: "black"
	
	darkerView = new Layer
		parent: iconLayer
		borderRadius: iconLayer.borderRadius
		size: iconLayer.size
		backgroundColor: "rgba(0,0,0,0.07)"
	
	darkerView.states =
		"drag": { opacity: 1 }
		"shown": { opacity: 0 }
	darkerView.stateSwitch("shown")
	
	deleteView = new SVGLayer
		parent: darkerView
		backgroundColor: "white"
		size: 20
		x: -8
		y: -8
		svg: Gist.deleteSvg
		borderRadius: "100%"
		borderColor: "#E4E4E4"
		borderWidth: 1
	
	return iconView

# Get Five Tuple

getFiveTuple = (appArray, dragStateIcon = true) ->
	appIconArray = []
	fiveAppViewArray = []
	fiveAppPageCount = appArray.length / 5
	
	for i in [0...fiveAppPageCount]
		fiveAppViewArray.push new Layer
			width: 64 * 5
			height: ICON_VIEW_HEIGHT
			backgroundColor: "null"
			name: ".five: #{i}"
	
	for currentAppKey, i in appArray
		xIndex = i % 5
		yIndex = (i - i % 5) / 5
		tempIcon = getIcon(currentAppKey, dragStateIcon)
		tempIcon.parent = fiveAppViewArray[yIndex]
		tempIcon.x = xIndex * 64
		appIconArray.push(tempIcon)
	
	return { "group": fiveAppViewArray, "array": appIconArray } 






keyAdd = "panel plus"
keyEmptyCell = "panel empty"

myViewData = groupsData["panel start v1"]
myViewData.push(keyAdd)

recentKeySize = 15
allRecentViewData = groupsData["apps only"]
recentViewData = allRecentViewData.slice(0, recentKeySize - 1);
Gist.shuffle(recentViewData)
recentViewData = ["beru"].concat(recentViewData)

myAppData = getFiveTuple(myViewData)
recentAppData = getFiveTuple(recentViewData, false)

# Update Data

isDataKeysUpdated = false

getDataKeys = () ->
	localkeys = []
	for roundItem in roundArray
		if roundItem.states.current.name == "shown"
			localkeys.push(roundItem.name)
	
	return localkeys



addDataKeys = (keysArray = []) ->
	if keysArray.length == 0 then keysArray = getDataKeys()
	
	localData = myViewData
	keysArray = keysArray.filter (x) -> myViewData.indexOf(x) == -1
	
	localData = localData.filter (x) -> x != keyAdd
	localData = localData.concat(keysArray)
	localData.push(keyAdd)
	
	myViewData = localData
	updateData()



updateData = () ->
	myAppData = getFiveTuple(myViewData)
	shuffle(recentViewData)
	recentAppData = getFiveTuple(recentViewData, false)
	
	for roundItem in roundArray
		if myViewData.indexOf(roundItem.name) != -1 then roundItem.stateSwitch("shown") else roundItem.stateSwitch("hidden")
	
	
	myAppView.height = (myAppData.group.length) * (ICON_VIEW_HEIGHT + 8) - 8
	
	localMyAppViewY = 0
	for item in appScrollView.content.children
		item.y = localMyAppViewY
		localMyAppViewY += item.height
	
	for item in myAppView.children
		item.destroy()
	
	for item, i in myAppData.group
		item.parent = myAppView
		item.y = (myAppData.group.length - i - 1) * (ICON_VIEW_HEIGHT + 8)
		item.x = 20
	
	appScrollView.updateContent()
	appScrollView.scrollToPoint({x: 0, y: localMyAppViewY}, false)
	
	
	for item in recentAppView.content.children
		item.destroy()
	
	for item, i in recentAppData.group
		item.parent = recentAppView.content
		item.x = (64 * 5) * i
	
	recentAppView.updateContent()
	recentAppView.scrollToPoint({x: 0, y: 0}, false)


# Pages

screen = new Layer
	width: 360
	height: 720
	backgroundColor: "#eee"
# 	borderRadius: 12
	clip: true

# screen.center()
# if Utils.isMobile()
# 	screen.scale = Screen.width / 360



pages = new PageComponent
	parent: screen
	width: 360
	height: 720
	scrollHorizontal: false
	scrollVertical: true
	directionLock: true
	originY: 1
	

page1 = new Layer
	width: 360
	height: 544
	clip: true
	parent: pages.content
	backgroundColor: "white"
	borderRadius: RADIUS_CARD

page2 = new Layer
	width: 360
	height: 424 + 80
	y: page1.height
	parent: pages.content
	backgroundColor: "eee"

page2ScrollView = new ScrollComponent
	scrollVertical: false
	scrollHorizontal: false
	parent: page2
	height: 720
	width: 360
	contentInset:
		bottom: 400
	

page3 = new Layer
	width: 360
	height: 720 - 424 - 20 - 80
	y: page1.height + page2.height
	parent: pages.content
	backgroundColor: "eee"
	
pages.updateContent()
pages.snapToPage(page2, false)
page2.bringToFront()



pages.content.on "change:y", ->
	value = pages.scrollY
	header.y = Utils.modulate(value, [328, 544], [header.states.shown.y, header.states.hidden.y], true)


pages.on "change:currentPage", ->
	if pages.currentPage == page1
		appScrollView.scrollVertical = true
		appScrollView.propagateEvents = false
		
		arrowImage.stateSwitch("less")
		topScrollGuard.stateSwitch("shown")
		
		topScrollGuard.stateSwitch("shown")
		botScrollGuard.stateSwitch("hidden")
	
	else if pages.currentPage == page2
		pages.scrollVertical = true
		appScrollView.scrollVertical = false
		appScrollView.propagateEvents = true
		appScrollView.scrollToPoint({x: 0, y: appScrollView.content.height}, false, time: 0.1)
		
		arrowImage.stateSwitch("more")
		dragModeOff()
		
		topScrollGuard.stateSwitch("hidden")
		botScrollGuard.stateSwitch("hidden")
		
		page2ScrollView.scrollVertical = false
		page2ScrollView.propagateEvents = true
		page2ScrollView.scrollToPoint({x: 0, y: 0}, true, time: 0.2)
	
	else if pages.currentPage == page3
		page2ScrollView.scrollVertical = true
		page2ScrollView.propagateEvents = false



page2ScrollView.content.on Events.DragStart, ->
	clearTimeout(delayReference)


page2ScrollView.content.on Events.DragEnd, (event, layer) ->
	# Exit to Top
	if event.velocity.y >= 0 and page2ScrollView.scrollY < 0
		pages.snapToPage(page2, true, curve: Spring(tension: 500, friction: 50, velocity: Math.abs(event.velocity.y)))
	
# 	print "#{page2ScrollView.scrollY} + #{card3complex.y}"
	# Show Offer
	delayReference = delay SHOW_OFFER_DELAY_MS, ->
		if page2ScrollView.scrollY > card3complex.y - 720 and page2ScrollView.scrollY < card3complex.y
			if card3complex.states.current.name == "hidden"
				card3complex.animate("shown", curve: Spring(damping: 1), time: 0.5)



page2ScrollView.content.on "change:y", ->
	value = page2ScrollView.scrollY
	if value > card3complex.y - 720 and wylsacom.player.paused == true
		wylsacom.player.play()


# Header Views


header = new Layer
	parent: screen
	width: 360
	height: 120
	backgroundColor: "white"
# 	image: "images/header.png"

header.states =
	"shown": { y: 0 }
	"hidden": { y: -220 }
	"drag": { y: -40 + 16 }
header.stateSwitch("shown")


statusBar = new Layer
	width: 360
	height: 24
	image: "images/status bar.png"
	parent: screen
	backgroundColor: "white"

# statusBar.states =
# 	"feed": { backgroundColor: "white" }
# 	"app": { backgroundColor: "#f2f2f2" }


searchHeaderImage = new Layer
	parent: header
	width: 360
	height: 120
	image: "images/header.png"

searchHeaderImage.states =
	"shown": { opacity: 1 }
	"drag": { opacity: 0 }
searchHeaderImage.stateSwitch("shown")


editHeaderImage = new Layer
	parent: header
	width: 360
	y: header.height - 56
	height: 56
	image: "images/edit%20header.png"

editHeaderImage.states =
	"shown": { opacity: 0 }
	"drag": { opacity: 1 }
editHeaderImage.stateSwitch("shown")


editHeaderImage.on Events.Tap, ->
	dragModeOff()

header.on Events.StateSwitchStart, (from, to) ->
	if to == "drag"
		searchHeaderImage.animate(to, curve: Spring(damping: 1), time: 0.4)	
		editHeaderImage.animate(to, curve: Spring(damping: 1), time: 0.4)
	else
		searchHeaderImage.animate(to, curve: Spring(damping: 1), time: 0.4)	
		editHeaderImage.stateSwitch(to)



topScrollGuard = Gist.createBreakerFull(1)
topScrollGuard.parent = header
topScrollGuard.y = header.height
topScrollGuard.states =
	"shown": { opacity: 0.1 }
	"hidden": { opacity: 0 }
topScrollGuard.stateSwitch("hidden")



# Cards

currentCardY = 12

card1 = new Layer
	width: 360
	height: 542
	image: "images/card1.png"



cardGT = new Layer
	width: 360
	height: 436
	image: "images/card gt.png"
	backgroundColor: "white"
	borderRadius: 24

card2 = new Layer
	width: 360
	height: 548
	image: "images/card2.png"


card3_bottom = new Layer
	width: 360
	height: 52
	image: "images/card3%20bottom.png"

card3_offer = new Layer
	width: 360
	height: 120
	image: "images/card3%20offer.png"

card3_top = new Layer
	width: 360
	height: 350
	image: "images/card3%20top.png"

card3complex = new Layer
	width: 360
	backgroundColor: "white"
	clip: true
	borderRadius: 24
	height: card3_top.height + card3_bottom.height

card3complex.states =
	"hidden":
		height: card3_top.height + card3_bottom.height
	"shown":
		height: card3_top.height + card3_bottom.height + card3_offer.height
card3complex.stateSwitch("hidden")


for item in [card3_top, card3_offer, card3_bottom]
	item.parent = card3complex
	if item is card3_offer
		item.states =
			"hidden":
				y: card3_top.height - 20
				scale: 1
				opacity: 0
			"shown":
				y: card3_top.height
				scale: 1
				opacity: 1
		item.stateSwitch("hidden")
	else if item is card3_bottom
		item.states =
			"hidden":
				y: card3_top.height
			"shown":
				y: card3_top.height + card3_offer.height
		item.stateSwitch("hidden")

card3_top.bringToFront()
card3complex.on Events.StateSwitchStart, (from, to) ->
	for item in [card3_offer, card3_bottom, cardGroup]
		try item.animate(to, curve: Spring(damping: 1), time: 0.5)


wylsaCrop = new Layer
	parent: card3_top
	width: 352
	height: 198 + 40
	y: 59
	x: 4
	borderRadius: 20
	backgroundColor: "null"
	clip: true

wylsacom = new VideoLayer
	parent: wylsaCrop
	width: 352
	height: 198
	scale: 1
	video: "images/wylsacom.mp4"

wylsacom.player.autoplay = false
wylsacom.player.loop = true
wylsacom.player.volume = 0

muteButton.parent = wylsaCrop
muteButton.x = 20
muteButton.y = 12








# 200 for offer in card3
cardGroup = new Layer
	width: 360
	height: 8 + 200
	backgroundColor: "null"


for card in [card1, 
cardGT, card2, card3complex, cardGroup]
	card.parent = page2ScrollView.content
	card.y = currentCardY
	currentCardY += card.height + 8
	
	if card == cardGroup
		card.states =
			"hidden": { y: card.y }
			"shown": { y: card.y + card3_offer.height }



cardGT.on Events.Tap, ->
# 	beruReset()
	modalView.name = "webview"
	modalTitle.text = "webview"
	gtWebViewModal.stateSwitch("shown")
	modalPageComponent.content.ignoreEvents = false
	modalPageComponent.snapToPage(modalPage2, time: 0.2)

card3_offer.on Events.Tap, ->
	beruReset()
	modalView.name = "webview"
	modalTitle.text = "webview"
	beruWebViewModal.stateSwitch("shown")
	modalPageComponent.content.ignoreEvents = false
	modalPageComponent.snapToPage(modalPage2, time: 0.2)


cardGroupY = 0
cardPrelast = new Layer
	width: 360
	height: 334
	image: "images/card pre last.png"

cardLast = new Layer
	width: 360
	height: 532
	image: "images/card last.png"

for item in [cardPrelast, cardLast]
	item.parent = cardGroup
	item.y = cardGroupY
	item.backgroundColor = "white"
	item.borderRadius = 24
	
	cardGroup.height += item.height + 8
	cardGroupY += item.height + 8


page2ScrollView.updateContent()



# Modal View

darker = new Layer
	width: 360
	height: 720
	parent: screen
	backgroundColor: "#F2F2F2"

darker.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

darker.stateSwitch("hidden")


modalPageComponent = new PageComponent
	width: 360
	height: 720
	scrollVertical: true
	scrollHorizontal: false
	parent: screen

modalPage1 = new Layer
	width: 360
	height: 720
	backgroundColor: "null"
	parent: modalPageComponent.content

modalPage2 = new Layer
	width: 360
	height: 720
	y: modalPage1.height
	backgroundColor: "null"
	parent: modalPageComponent.content

modalPageComponent.content.ignoreEvents = true



modalGuard = new Layer
	opacity: 0
	size: 1

modalGuard.states =
	"shown":
		y: 0
	"hidden":
		y: 0

modalGuard.stateSwitch("hidden")

modalGuard.on Events.StateSwitchEnd, (from, to) ->
	if to is "shown" and from is "hidden"
		try
			temp = 1
# 			updateRecents(modalView.name)


modalView = new Layer
	parent: modalPage2
	width: 360
	height: 720 - 44
	backgroundColor: "white"
	borderRadius: 20
	shadowY: -4
	shadowBlur: 20
	shadowColor: "rgba(112,112,112, 0.2)"
	clip: true

modalView.states =
	"shown":
		y: 44
	"hidden":
		y: 720 + 44

modalView.stateSwitch("shown")

modalPageComponent.content.draggable.overdrag = 0



modalPageComponent.on "change:currentPage", ->
	if modalPageComponent.currentPage == modalPage1
		modalPageComponent.content.ignoreEvents = true
		beruWebViewModal.stateSwitch("hidden")
		gtWebViewModal.stateSwitch("hidden")


modalPageComponent.content.on "change:y", ->
	value = modalPageComponent.scrollY
	darker.opacity = Utils.modulate(value, [0, 720/4*3], [0, 1], true)
	
	modalPipka.y = Utils.modulate(value, [0, 720], [720+32, 32])
	modalPipka.opacity = Utils.modulate(value, [720/2, 720], [0, 1])
	
	cV = Utils.modulate(value, [0, 720], [255, 242]).toFixed()
	statusBar.backgroundColor = "rgba(#{cV},#{cV},#{cV},1)"
	
	if value > 580 then modalGuard.stateSwitch("shown")
	else modalGuard.stateSwitch("hidden")




modalPipka = new Layer
	parent: modalPageComponent
	width: 48
	height: 4
	x: Align.center
	backgroundColor: "rgba(0,0,0,0.1)"
	y: 720+32
	opacity: 1
	borderRadius: 2
	

modalTitle = new TextLayer
	fontSize: 28
	parent: modalView
	fontWeight: "medium"
	text: ""
	x: 24
	y: 32
	color: "black"


# Beru Layers

# Import from Figma
# Generated with Framer Inventory

beruImportedView = new Layer
	name: "beruImportedView"
	x: 0
	y: 0
	width: 360
	height: 1752
	opacity: 1
	backgroundColor: "transparent"


stationView = new Layer
	name: "stationView"
	parent: beruImportedView
	x: 0
	y: 0
	width: 360
	height: 1752
	opacity: 1
	image: "images/figma/stationView.png"


beruHeader = new Layer
	name: "beruHeader"
	parent: beruImportedView
	x: 0
	y: 0
	width: 360
	height: 113
	opacity: 1
	image: "images/figma/beruHeader.png"


cartButton = new Layer
	name: "cartButton"
	parent: beruImportedView
	x: 0
	y: 0
	width: 132
	height: 53
	opacity: 1
	image: "images/figma/cartButton.png"


checkoutView = new Layer
	name: "checkoutView"
	parent: beruImportedView
	x: 0
	y: 0
	width: 360
	height: 574
	opacity: 1
	image: "images/figma/checkoutView.png"


checkoutHeader = new Layer
	name: "checkoutHeader"
	parent: beruImportedView
	x: 0
	y: 0
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/checkoutHeader.png"


cartView = new Layer
	name: "cartView"
	parent: beruImportedView
	x: 0
	y: 0
	width: 360
	height: 1075
	opacity: 1
	image: "images/figma/cartView.png"


sceneStates = ["frame1"]
sceneLayers = [beruImportedView, stationView, beruHeader, cartButton, checkoutView, checkoutHeader, cartView]



beruPages = new PageComponent
	scrollVertical: false
	scrollHorizontal: false
	propagateEvents: true
	width: 360
	height: 720 - 44
	parent: beruImportedView
# 	borderRadius: 20

beruWhiter = new Layer
	width: 360
	height: beruPages.height
	parent: beruPages
	backgroundColor: "white"

beruWhiter.sendToBack()

beruHeader.parent = beruPages

beruHeaderCartAdded = new Layer
	parent: beruHeader
	x: 360 - 58
	width: 58
	height: 58
	image: "images/beru%20header%20cart%20added.png"

beruHeaderCartAdded.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
beruHeaderCartAdded.stateSwitch("hidden")

beruHeaderCartAdded.on Events.Tap, ->
	beruPages.snapToPage(cartLayer)




stationLayer = new ScrollComponent
	scrollVertical: true
	scrollHorizontal: false
	propagateEvents: false
	width: 360
	height: beruPages.height
	parent: beruPages.content

stationView.parent = stationLayer.content
stationView.y = beruHeader.height

cartButton.parent = stationView
cartButton.x = 204
cartButton.y = 624

cartButton.states["hidden"] = { opacity: 0 }
cartButton.states["shown"] = { opacity: 1 }
cartButton.stateSwitch("hidden")

cartButton.on Events.Tap, ->
	if @states.current.name == "hidden"
		@stateSwitch("shown")
		beruCounter.stateSwitch("shown")
	else
		beruPages.snapToPage(cartLayer)

cartButton.on Events.StateSwitchEnd, (from, to) ->
	try beruHeaderCartAdded.stateSwitch(to)





cartLayer = new ScrollComponent
	scrollVertical: true
	scrollHorizontal: false
	propagateEvents: false
	width: 360
	height: beruPages.height
	x: 360 + 16
	parent: beruPages.content

cartView.parent = cartLayer.content
cartView.y = beruHeader.height






checkoutLayer = new ScrollComponent
	scrollVertical: true
	scrollHorizontal: false
	propagateEvents: false
	width: 360
	height: beruPages.height
	parent: beruPages

checkoutLayer.states =
	"hidden": { y: 720 }
	"shown": { y: 0 }
checkoutLayer.stateSwitch("hidden")

checkoutWhiter = new Layer
	width: 360
	height: checkoutLayer.height
	parent: checkoutLayer
	backgroundColor: "white"

checkoutWhiter.sendToBack()


checkoutView.parent = checkoutLayer.content
checkoutView.y = 48
checkoutHeader.parent = checkoutLayer


checkoutButton = new Layer
	parent: cartView
	width: 288
	x: 36
	y: 931
	backgroundColor: "null"

checkoutButton.on Events.Tap, ->
	checkoutLayer.animate("shown", curve: Spring(damping: 1), time: 0.5)

checkoutHeader.on Events.Tap, ->
	checkoutLayer.animate("hidden", curve: Spring(damping: 1), time: 0.5)


for item in [beruPages, cartLayer, stationLayer]
	item.updateContent()




# Beru View

beruWebViewModal = new Layer
	width: 360
	height: modalView.height
	parent: modalView
	backgroundColor: "white"
	borderRadius: 0

beruWebViewModal.states =
	"shown": { y: 0 }
	"hidden": { y: 720 }

beruWebViewModal.stateSwitch("hidden")


beruImportedView.parent = beruWebViewModal
beruReset = () ->
	checkoutLayer.stateSwitch("hidden")
	for item in [beruPages, stationLayer, cartLayer]
		item.scrollToPoint({ x: 0, y: 0 }, false )




# GT View


gtWebViewModal = new Layer
	width: 360
	height: modalView.height
	parent: modalView
	backgroundColor: "white"
	borderRadius: 0

gtWebViewModal.states =
	"shown": { y: 0 }
	"hidden": { y: 720 }

gtWebViewModal.stateSwitch("hidden")



gtLayer = new ScrollComponent
	parent: gtWebViewModal
	width: 360
	height: gtWebViewModal.height
	scrollVertical: true
	scrollHorizontal: false
	propagateEvents: false


gtContent = new Layer
	parent: gtLayer.content
	width: 360
	height: 1907
	image: "images/gtContent.png"

gtFooter = new Layer
	parent: gtLayer
	width: 360
	height: 132
	y: gtWebViewModal.height - 132
	image: "images/gtFooter.png"

gtHeader = new Layer
	parent: gtLayer
	width: 360
	height: 56
	image: "images/gtHeader.png"








# Drag Mode

dragModeSwitch = (longTappedIconView) ->
# 	print item
# 	print "Drag #{Utils.randomNumber()}"
	restoreIcon(longTappedIconView)
	
	preState = longTappedIconView.states.current.name
	
	if preState == "shown" and pages.currentPage == page2 then pages.snapToPage(page1)
	
	for item, i in myAppData.array
		# Fix for Store Icon
		if item.name == keyAdd then item.states.drag.opacity = 0
		# General
		if preState == "shown" then item.stateSwitch("drag") else item.stateSwitch("shown")
	
	for item in recentAppData.array
		if preState == "shown" then item.stateSwitch("static") else item.stateSwitch("shown")
	
	if preState == "shown" then nextState = "drag" else nextState = "shown"
	header.animate(nextState, curve: Spring(damping: 1), time: 0.4)
	




dragModeOff = () ->
	myAppData.array[0].stateSwitch("drag")
	dragModeSwitch(myAppData.array[0])


# Top View: Views

# — Gap
# — ScrollView if rows > X
# — — My Apps
# — — Recents
# — Arrow

magicHeight = 540
appScrollViewCurrentY = 0
topViewCurrentY = 0



topView = new Layer
	parent: page1
	width: 360
	opacity: 1
	height: 520 + 24
	backgroundColor: "white"



appScrollView = new ScrollComponent
	parent: topView
	width: 360
	height: 520
	directionLock: true
	scrollVertical: false
	scrollHorizontal: false
	originY: 1
	backgroundColor: "null"


appScrollView.content.on Events.Move, ->
	if @parent.propagateEvents then return
# 	print appScrollView.scrollY
	
	if appScrollView.scrollY < 336 - header.height
		topScrollGuard.stateSwitch("hidden")
	else if appScrollView.scrollY >= appScrollView.contentInset.top
		topScrollGuard.stateSwitch("shown")
	
	maxValue = appScrollView.content.height - appScrollView.height + appScrollView.contentInset.top
	if appScrollView.scrollY < maxValue
		botScrollGuard.stateSwitch("shown")
	else
		botScrollGuard.stateSwitch("hidden")


appScrollView.content.on Events.DragEnd, (event, layer) ->
	if event.velocity.y <= 0 and appScrollView.scrollY > 164 + 16
		pages.snapToPage(page2, true, curve: Spring(tension: 500, friction: 50, velocity: Math.abs(event.velocity.y)))



addToAppScrollView = (layer) ->
	layer.parent = appScrollView.content
	layer.y = appScrollViewCurrentY
	appScrollViewCurrentY += layer.height
	appScrollView.updateContent()



myAppView = new Layer
	width: 360
	height: (myAppData.group.length) * (ICON_VIEW_HEIGHT + 8) - 8
	backgroundColor: "null"


for item, i in myAppData.group
	item.parent = myAppView
	item.y = (myAppData.group.length - i - 1) * (ICON_VIEW_HEIGHT + 8)
	item.x = 20



recentAppView = new PageComponent
	directionLock: true
	width: 360
	height: 68
	scrollVertical: false
	scrollHorizontal: true
	originX: 0
	originY: 0
	contentInset:
		left: 20
		right: 20

for item, i in recentAppData.group
	item.parent = recentAppView.content
	item.x = (64 * 5) * i

recentAppView.content.on "change:x", ->
	value = recentAppView.scrollX
	try
		beruCounter.x = -value + 28 + 48 - 12

recentAppView.clip = false


bottomFixedView = new Layer
	parent: topView
	width: 360
	height: 24
	y: 520
	backgroundColor: "white"

arrowView = new Layer
	parent: bottomFixedView
	width: 360
	height: 16
	y: 4
	backgroundColor: "white"

arrowImage = new Layer
	parent: arrowView
	height: 16
	width: 360
	image: "images/arrow.png"

arrowImage.states =
	"more":
		rotation: 0
	"less":
		rotation: 180

arrowImage.on Events.Tap, ->
	if @states.current.name == "more"
		pages.snapToPage(page1)
	else
		pages.snapToPage(page2)

botScrollGuard = Gist.createBreakerFull(1)
botScrollGuard.parent = arrowView
botScrollGuard.y = -4
botScrollGuard.states =
	"shown": { opacity: 0.1 }
	"hidden": { opacity: 0 }
botScrollGuard.stateSwitch("hidden")


# Top View: Composition


addToAppScrollView(Gist.createGap(336))
addToAppScrollView(myAppView) # 408
addToAppScrollView(Gist.createGap(12))
addToAppScrollView(Gist.createBreaker(1))
addToAppScrollView(Gist.createGap(12))
addToAppScrollView(recentAppView) # 68

recentAppView.updateContent()
appScrollView.updateContent()
appScrollView.scrollToPoint({x: 0, y: appScrollView.content.height}, false)



# Icon for Beru
beruCounter.x = 28 + 48 - 12
beruCounter.y = -6
beruCounter.parent = recentAppView

beruCounter.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
beruCounter.stateSwitch("hidden")



# Restore Touches
restoreIcon = (item) ->
	clearTimeout(longTapDelay)
	for child in item.children
		if child.name == "image" and child.scale != 1
			child.animate("shown", time: 0.2)

stopTouches = () ->
	for item in recentAppData.array
		restoreIcon(item)
	for item in myAppData.array
		restoreIcon(item)



screen.on Events.TouchEnd, ->
	stopTouches()

recentAppView.content.on Events.DragStart, ->
	stopTouches()

pages.content.on Events.DragStart, ->
	stopTouches()

appScrollView.content.on Events.DragStart, ->
	stopTouches()

recentAppView.on Events.DragEnd, ->
	pages.snapToPage(page1)

statusBar.bringToFront()



statusBar.image = null


{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light", forceAndroidBar: true }
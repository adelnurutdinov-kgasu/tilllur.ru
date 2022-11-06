RADIUS_CARD = 16
Framer.Extras.Hints.disable()
# Screen.backgroundColor = "black"


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

# SVG

deleteSVGRoundColor = "#FFF"

deleteSvg = """<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.6 7.2C13.8209 6.97909 13.8209 6.62091 13.6 6.4V6.4C13.3791 6.17909 13.0209 6.17909 12.8 6.4L10 9.2L7.2 6.4C6.97909 6.17909 6.62091 6.17909 6.4 6.4V6.4C6.17909 6.62091 6.17909 6.97909 6.4 7.2L9.2 10L6.4 12.8C6.17909 13.0209 6.17909 13.3791 6.4 13.6V13.6C6.62091 13.8209 6.97909 13.8209 7.2 13.6L10 10.8L12.8 13.6C13.0209 13.8209 13.3791 13.8209 13.6 13.6V13.6C13.8209 13.3791 13.8209 13.0209 13.6 12.8L10.8 10L13.6 7.2Z" fill="black"/>
</svg>
"""





plusSvgColor = "rgba(0,0,0,0.8)"

plusSvg = """<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C15.4477 8 15 8.44772 15 9V15H9C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H15V23C15 23.5523 15.4477 24 16 24C16.5523 24 17 23.5523 17 23V17H23C23.5523 17 24 16.5523 24 16C24 15.4477 23.5523 15 23 15H17V9C17 8.44772 16.5523 8 16 8Z" fill="none"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C15.4477 8 15 8.44772 15 9V15H9C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H15V23C15 23.5523 15.4477 24 16 24C16.5523 24 17 23.5523 17 23V17H23C23.5523 17 24 16.5523 24 16C24 15.4477 23.5523 15 23 15H17V9C17 8.44772 16.5523 8 16 8Z" fill="#{plusSvgColor}"/>
</svg>
"""

tickSvg = """<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.4559 10.0013C23.1367 9.72243 22.7198 9.58161 22.2968 9.60981C21.8739 9.63801 21.4793 9.83292 21.1999 10.1517L13.9727 18.4045L10.7792 14.9197C10.4886 14.6238 10.0945 14.4523 9.67989 14.4413C9.26531 14.4303 8.86266 14.5807 8.55683 14.8608C8.25099 15.1409 8.06586 15.5288 8.04048 15.9428C8.01509 16.3567 8.15143 16.7644 8.42075 17.0797L12.2175 21.2237C12.6472 21.6932 13.2458 21.9728 13.8816 22.001C14.5174 22.0292 15.1384 21.8037 15.6079 21.3741L15.7039 21.2813L15.7919 21.1853L23.6063 12.2589C23.8855 11.9399 24.0265 11.5231 23.9986 11.1002C23.9707 10.6772 23.7761 10.2826 23.4575 10.0029L23.4559 10.0013Z" fill="#999"/>
</svg>
"""

doneSvg = """<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 28L25.5 33.5L36 23" stroke="#45474C" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
"""

# Gists

shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	return source


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
# 		print @states["drag"]
		if @name.includes(".") then return
		if @states.current.name == "drag" then return
		
		if @name == keyAdd
			storeModal.stateSwitch("shown")
		else
			storeModal.stateSwitch("hidden")
		
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
		svg: deleteSvg
		borderRadius: "100%"
		borderColor: "#E4E4E4"
		borderWidth: 1
	
	return iconView



# Create Blocks

createGap = (gapHeight = 8) ->
	return new Layer
		width: 360
		height: gapHeight
		opacity: 0
		name: "gap: #{gapHeight}"
		backgroundColor: "null"
# 		backgroundColor: Utils.randomColor()

createBreakerFull = (gapHeight = 8) ->
	return new Layer
		width: 360
		height: gapHeight
		opacity: 0.1
		backgroundColor: "grey"
		name: "bf: #{gapHeight}"

createBreaker = (gapHeight = 8) ->
	return new Layer
		width: 360 - 28*2
		height: gapHeight
		opacity: 0.1
		x: 28
		backgroundColor: "grey"
		name: "b: #{gapHeight}"

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
# 			backgroundColor: Utils.randomColor()
	
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
recentViewData = allRecentViewData.slice(0, recentKeySize);
shuffle(recentViewData)

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
	height: 640
	backgroundColor: "#eee"
	borderRadius: 12
	clip: true



# screen.center()
# screen.scale = Screen.width / 360



pages = new PageComponent
	parent: screen
	width: 360
	height: 640
	scrollHorizontal: false
	scrollVertical: true
	directionLock: true

page1 = new Layer
	width: 360
	height: 544
	clip: true
	parent: pages.content
	backgroundColor: "white"
	borderRadius: RADIUS_CARD

page2 = new Layer
	width: 360
	height: 424
	y: page1.height
	parent: pages.content
	backgroundColor: "eee"

pages.updateContent()
pages.snapToPage(page2, false)
page2.bringToFront()



pages.on "change:currentPage", ->
# 	print pages.currentPage
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


# Header Views


header = new Layer
	parent: screen
	width: 360
	height: 120
	backgroundColor: "white"
# 	image: "images/header.png"

header.states =
	"shown": { y: 0 }
	"drag": { y: -40 + 16 }
header.stateSwitch("shown")



navBar = new Layer
	width: 360
	height: 24
	# image: "images/navBar.png"
	backgroundColor: "white"
	parent: screen


searchHeaderImage = new Layer
	parent: header
	width: 360
	height: 120
	image: "images/header.png"
	backgroundColor: "blue"

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



topScrollGuard = createBreakerFull(1)
topScrollGuard.parent = header
topScrollGuard.y = header.height
topScrollGuard.states =
	"shown": { opacity: 0.1 }
	"hidden": { opacity: 0 }
topScrollGuard.stateSwitch("hidden")


# newsView = new Layer
# 	parent: page2
# 	y: 8
# 	backgroundColor: "white"
# 	borderRadius: RADIUS_CARD
# 	width: 360
# 	height: 468
# 	image: "images/news%20view.png"
# 
# newsFix = new Layer
# 	parent: newsView
# 	backgroundColor: "white"
# 	width: 120
# 	x: 220
# 	height: 44

card = new Layer
	parent: page2
	y: 12
	width: 360
	height: 568
	image: "images/card.png"

bottomBar = new Layer
	parent: screen
	width: 360
	height: 56
	y: screen.height - 56
	image: "images/bottomBar.png"








# Modal View

darker = new Layer
	width: 360
	height: 640
	parent: screen
	backgroundColor: "rgba(0,0,0,0.7)"

darker.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

darker.stateSwitch("hidden")


modalPageComponent = new PageComponent
	width: 360
	height: 640
	scrollVertical: true
	scrollHorizontal: false
	parent: screen

modalPage1 = new Layer
	width: 360
	height: 640
	backgroundColor: "null"
	parent: modalPageComponent.content

modalPage2 = new Layer
	width: 360
	height: 640
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
	height: 640
	backgroundColor: "white"
	borderRadius: 16

modalView.states =
	"shown":
		y: 36
	"hidden":
		y: 680

modalView.stateSwitch("shown")

modalPageComponent.content.draggable.overdrag = 0



modalPageComponent.on "change:currentPage", ->
	if modalPageComponent.currentPage == modalPage1
		modalPageComponent.content.ignoreEvents = true
		
		if storeModal.states.current.name == "shown" and isDataKeysUpdated then addDataKeys()


modalPageComponent.content.on "change:y", ->
	value = modalPageComponent.scrollY
	darker.opacity = Utils.modulate(value, [0, 640], [0, 1], true)
	
	if value > 580 then modalGuard.stateSwitch("shown")
	else modalGuard.stateSwitch("hidden") 



modalTitle = new TextLayer
	fontSize: 28
	parent: modalView
	fontWeight: "medium"
	text: ""
	x: 24
	y: 32
	color: "black"


# Store: Create

appDescriptionCycler = Utils.cycle(["Билеты по России и зарубежом"])


createCards = () ->
	currentCardY = 120
	for dataItem in cardTitles
		cardLayer = createPromoCard(dataItem)
		cardLayer.parent = storeModal.content
		cardLayer.y = currentCardY
		currentCardY += (cardLayer.height + 8)
		
		for item in cardLayer.children
			item.name = "."
	
	storeModal.updateContent()


createPromoCard = (cardData) ->
	
	cardView = new Layer
		width: 360
		height: 48 + 8 + 4 + 16
		backgroundColor: "null"
	
	cardTitleView = new Layer
		parent: cardView
		width: 360
		height: 48
		y: 8
		backgroundColor: "white"
	
	cardTitle = new TextLayer
		parent: cardTitleView
		text: cardData.title
		width: 360
		height: 48
		textAlign: 'left'
		color: "black"
		fontWeight: "bold"
		fontSize: 16
		padding:
			left: 28
			top: 16 + 4
	
	cardMore = new TextLayer
		parent: cardTitleView
		text: cardData.more
		width: 360
		height: 48
		textAlign: 'right'
		color: "rgba(0,0,0,.4)"
		fontWeight: "bold"
		fontSize: 14
		padding:
			right: 28
			top: 18 + 4
	
	
	insideView = new Layer
		parent: cardView
		width: 352
		height: 16
		y: 48 + 8 + 4
		x: 4
		backgroundColor: "#f1f1f1"
		borderRadius: 20
	
	for currentAppKey, i in cardData.keys
		appView = createAppPromoView(currentAppKey)
		appView.parent = insideView
		appView.y = appView.height * i + 8
		
		cardView.height += appView.height
		insideView.height += appView.height
	
	return cardView



roundArray = []

createAppPromoView = (iconKey) ->
	view = new Layer
		width: 352
		height: 64
		backgroundColor: "null"
	
	icon = getIcon(iconKey)
	icon.parent = view
	icon.x = 8
	icon.y = 8
	icon.ignoreEvents = true
	
	currentName = ""
	for child in icon.children
		if child.name == "name"
			child.opacity = 0
			currentName = child.text
		else if child.name == "image"
			child.backgroundColor = "white"
	
	cardTitle = new TextLayer
		parent: view
		text: currentName
		width: 212
		height: 20
		y: 14
		x: 76
		textAlign: 'left'
		color: "black"
		fontWeight: "medium"
		fontSize: 16
	
	cardMore = new TextLayer
		parent: view
		text: appDescriptionCycler()
		width: 212
		x: 76
		y: cardTitle.height + cardTitle.y
		textAlign: 'left'
		color: "rgba(0,0,0,0.5)"
		fontWeight: "medium"
		fontSize: 13
	
	round = new SVGLayer
		name: "#{iconKey}"
		parent: view
		size: 32
		x: 296
		y: 16
		borderWidth: 1
		borderRadius: "100%"
	
	round.on Events.StateSwitchEnd, (from, to) ->
		if to is "shown" then @svg = tickSvg
		else @svg = plusSvg
	
	round.on Events.Tap, (event, layer) ->
		isDataKeysUpdated = true
		if @states.current.name == "hidden"
			@stateSwitch("shown")
		else if @states.current.name == "shown"
			@stateSwitch("hidden")
	
	round.states =
		"hidden": { backgroundColor: "#FFF", borderColor: "#FFF" }
		"shown": { backgroundColor: "#F1F1F1", borderColor: "#DDDDDD" }
	round.stateSwitch("hidden")
	
	if myViewData.indexOf(iconKey) != -1 then round.stateSwitch("shown")
	roundArray.push(round)
	
	return view

# Store: Modal View

storeModal = new ScrollComponent
	scrollVertical: true
	scrollHorizontal: false
	propagateEvents: false
	width: 360
	height: modalView.height
	parent: modalView
	backgroundColor: "white"
	borderRadius: RADIUS_CARD
	contentInset:
		bottom: 64

storeModal.states =
	"shown": { y: 0 }
	"hidden": { y: 640 }

storeModal.stateSwitch("hidden")

storeModal.on Events.StateSwitchEnd, (from, to) ->
	if to is "shown"
		storeModal.scrollToTop(false)



storeTitle = new Layer
	width: 360
	height: 56
	image: "images/add app panel.png"
	parent: storeModal

storeTitle.on Events.Tap, ->
	modalPageComponent.snapToPage(modalPage1)

storeTitleBreaker = createBreakerFull(1)
storeTitleBreaker.parent = storeTitle
storeTitleBreaker.y = storeTitle.height - 1
storeTitleBreaker.states["shown"] = { opacity: .1 }
storeTitleBreaker.states["hidden"] = { opacity: 0 }
storeTitleBreaker.stateSwitch("hidden")


storeModal.content.on "change:y", ->
	value = storeModal.scrollY
	if value > 8 then storeTitleBreaker.stateSwitch("shown")
	else storeTitleBreaker.stateSwitch("hidden")


storeSearch = new Layer
	width: 360
	height: 68
	image: "images/store%20search.png"
	parent: storeModal.content
	y: storeTitle.height


getRecentUninstalledKeys = () ->
	localKeys = recentViewData
	localKeys = localKeys.filter (x) -> myViewData.indexOf(x) == -1
	return localKeys.slice(0, 3)

cardTitles = [
	{ title: "Недавние", more: "Все недавние", keys: getRecentUninstalledKeys() },
	{ title: "Рекомендуем", more: "7 приложений", keys: ["edadeal", "disk", "efir", "games", "video"] },
	{ title: "Ваш город", more: "Еще 4 приложения", keys: ["drive", "trains", "afisha"] }
]

titleCycler = Utils.cycle(cardTitles)
createCards()





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

botScrollGuard = createBreakerFull(1)
botScrollGuard.parent = arrowView
botScrollGuard.y = -4
botScrollGuard.states =
	"shown": { opacity: 0.1 }
	"hidden": { opacity: 0 }
botScrollGuard.stateSwitch("hidden")


# Top View: Composition


addToAppScrollView(createGap(336))
addToAppScrollView(myAppView) # 408
addToAppScrollView(createGap(12))
addToAppScrollView(createBreaker(1))
addToAppScrollView(createGap(12))
addToAppScrollView(recentAppView) # 68

recentAppView.updateContent()
appScrollView.updateContent()
appScrollView.scrollToPoint({x: 0, y: appScrollView.content.height}, false)








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




{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 8, topTheme: "light", forceAndroidBar: true }

# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Timur Nurutdinov"
	twitter: ""
	description: ""


retina = 1

{Site} = require "site"
{TextLayer} = require 'TextLayer'
{Input} = require 'input'


screen = new Layer
	width: 360, height: 640, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

# tempView = new Layer
# 	parent: screen, width: screen.width * 2, height: screen.height * 2
# 	scale: 0.5, originX: 0, originY: 0, backgroundColor: "black"


tightSpring = "spring(200, 20, 11)"
currentLink = "http://music.yandex.ru"

search_bar_shape = null

screenWidth = 360*retina
screenHeight = 640*retina

tabHeight = 434*retina
tabWidth = 244*retina
tabMarginTop = 121*retina
tabMarginLeft = 58*retina
tabSpacing = 8*retina


barView = null
darker = null

contentView = null
staticView = null
zenView = null
tabsView = null

openedSite = null
homeSite = null
blankPageRight = null
homeScreen = null
fakeTab = null

input = null
suggestView = null
textOutputsLayers = []
textOutputsSuggestPhrase = [
	["почта", "", "", "", "", ""],
	["погода -1С", "погода", "погода в москве", "переводчик онлайн", "", ""],
	["погода в москве", "погода в москве на 14 дней", "почта росии отслеживание", "", "", ""],
	["погода в москве", "погода в москве на 14 дней", "погода на неделю", "погода на завтра", "погода на месяц", "погода в москве на 3 дня"]
]

weatherSuggestArray = [
	["почта", "", "", "", "", ""],
	["погода -1С", "погода", "погода в москве", "переводчик онлайн", "", ""],
	["погода в москве", "погода в москве на 14 дней", "почта росии отслеживание", "", "", ""],
	["погода в москве", "погода в москве на 14 дней", "погода на неделю", "погода на завтра", "погода на месяц", "погода в москве на 3 дня"]
]

musicSuggestArray = [
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""],
	[currentLink, "", "", "", "", ""]
]

# State Machine


# 0 - Uninitialised
# 1 - Site
# 2 - Tabs with site only
# 3 - New Tab
# 4 - Tabs with site & new tab

browserMode = 0

getMode = () ->
	return browserMode



isModeSite = () ->
	if browserMode is 1 then return true
	return false

isModeTabsGeneral = () ->
	if browserMode is 2 then return true
	return false

isModeNewTab = () ->
	if browserMode is 3 then return true
	return false

isModeTabsMore = () ->
	if browserMode is 4 then return true
	return false



setModeSite = () ->
	browserMode = 1

setModeTabsGeneral = () ->
	browserMode = 2

setModeNewTab = () ->
	browserMode = 3

setModeTabsMore = () ->
	browserMode = 4



positionBackgroundView = new Layer
	backgroundColor: "transparent"

music_site = new Layer
	width: 375*retina
	height: 667*retina
	x: 0*retina
	y: 0*retina
	image: "images/music site.png"


# Keyboard

keyboard_fake = new Layer
	width: 364*retina
	height: 230*retina
	x: -2*retina
	image: "images/keyboard dark.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(-2px*" + retina + ") calc(4px*" + retina + ") " + "rgba(0,0,0,0.062443387681159424))"}

# keyboard_fake.states.animationOptions = 
keyboard_fake.states =
	"shown":
		y: (366+48)*retina
	"hidden":
		y: 640*retina

keyboard_fake.stateSwitch("hidden")

keyboard_fake.animationOptions =
	curve: tightSpring

# Create Home Screen

homeScreenButtonsArray = []

createHomeScreen = () ->
	homeScreen = new Layer
		width: 360*retina
		height: 640*retina
		x: 0
		y: 0
		image: "images/home screen.png"
	
	incognito_button = new Layer
		width: 80*retina
		height: 13*retina
		x: 24*retina
		y: 603*retina
		image: "images/incognito button.png"
		parent: homeScreen
	
	history_button = new Layer
		width: 63*retina
		height: 15*retina
		x: 24*retina
		y: 40*retina
		image: "images/history button.png"
		parent: homeScreen
	
	user_button = new Layer
		width: 85*retina
		height: 14*retina
		x: 251*retina
		y: 39*retina
		image: "images/user button.png"
		parent: homeScreen

	open_new_tab_button = new Layer
		width: 36*retina
		height: 36*retina
		x: 162*retina
		y: 592*retina
		image: "images/open new tab button.png"
		parent: homeScreen

	
	hide_tabs_button = new Layer
		width: 22*retina
		height: 27*retina
		x: 322*retina
		y: 598*retina
		image: "images/hide tabs button.png"
		parent: homeScreen
	
	hide_tabs_button.on(Events.Click, hideTabsHander)
	open_new_tab_button.on(Events.Click, createNewTabFromTabsHandler)
	
	homeScreenButtonsArray.push(incognito_button)
	homeScreenButtonsArray.push(history_button)
	homeScreenButtonsArray.push(user_button)
	homeScreenButtonsArray.push(open_new_tab_button)
	homeScreenButtonsArray.push(hide_tabs_button)
	
	for item in homeScreenButtonsArray
		item.states = 
			"shown": { opacity: 1 }
			"hidden": { opacity: 0 }
		item.stateSwitch("shown")


showHomeScreenButtons = () ->
	for item in homeScreenButtonsArray
		item.animate("shown", curve: tightSpring)
	
hideHomeScreenButtons = () ->
	for item in homeScreenButtonsArray
		item.animate("hidden", curve: tightSpring)

# Logic

sites = []
activePage = null
listeningPages = true


getActiveSite = () ->
	return activePage

isListeningPages = () ->
	return false

stopListeningPages = () ->
	listeningPages = false

startListeningPages = () ->
	listeningPages = true




showTabsHandler = (event, layer) ->
	if isListeningPages()
		tabsView.stateSwitch("shown")
		currentLayer = getActiveSite()
		
		if currentLayer.siteID is homeSiteID
			createFakeTab()
			tabsView.snapToPage(fakeTab, false, { })
		
		currentLayer.animate("site-tabs")
		barView.animate("tabs")
		
		showHomeScreenButtons()

hideTabsHander = (event, layer) ->
	if isListeningPages()
		currentLayer = getActiveSite()
		removeSiteFromTabs(currentLayer)
		barView.animate("hidden")
		hideHomeScreenButtons()



createFakeTab = () ->
	if fakeTab != null
		return fakeTab
	
	fakeTab = new Site
		width: tabWidth
		height: tabHeight
		siteID: homeSiteID
		opacity: 0
	
	insertFakeTabToTabs(fakeTab)





createNewTabFromBarHandler = (event, layer) ->
	barView.animate("search")
# 	zenView.scrollY = 0
	currentLayer = getActiveSite()
	
	if currentLayer && currentLayer.siteID != homeSiteID
		currentLayer.stateSwitch("site-tabs")
	try tabsView.stateSwitch("hidden")
	
	stopListeningPages()
	if homeSite == null
		homeSite = createHomeSite()
		sites.push(homeSite)
	homeSite.stateSwitch("site-global")
	activePage = homeSite
	startListeningPages()
	
	hideHomeScreenButtons()
	
	

createNewTabFromTabsHandler = (event, layer) ->
	stopListeningPages()
	if homeSite == null
		homeSite = createHomeSite()
		sites.push(homeSite)
	# 	homeSite.stateSwitch("site-global")
		homeSite.stateSwitch("site-tabs")
		activePage = homeSite
	startListeningPages()
	
	updateRightBlankSite()
	scrollDistance = homeSite.x - tabsView.currentPage.x
	localDelay = Utils.modulate(scrollDistance, [0, 1100*retina], [0, 0.5], false)
	if localDelay > 0 and localDelay < 0.2
		localDelay = 0.2
	tabsView.snapToPage(homeSite, true, { time: localDelay })
	
	Utils.delay localDelay, ->
		barView.animate("search")
		homeSite.stateSwitch("site-tabs")
		tabsView.stateSwitch("hidden")
		hideHomeScreenButtons()
		
# 		stopListeningPages()
		if homeSite == null
			homeSite = createHomeSite()
			sites.push(homeSite)
		homeSite.animate("site-global")
		activePage = homeSite
# 		startListeningPages()
		
# 		createNewTabFromBarHandler()
# 		homeSite.animate("site-global")
	
	


insertFakeTabToTabs = (fakeLayer) ->
	fakeLayer.parent = tabsView.content
	fakeLayer.x = fakeLayer.siteID * (tabWidth + tabSpacing) + tabMarginLeft
	updateRightBlankSite()

insertSiteToTabs = (siteLayer) ->
	siteLayer.stateSwitch("tabs-normal")
	siteLayer.parent = tabsView.content
	siteLayer.x = siteLayer.siteID * (tabWidth + tabSpacing) + tabMarginLeft
	updateRightBlankSite()

removeSiteFromTabs = (siteLayer) ->
	siteLayer.parent = null
	siteLayer.placeBefore(positionBackgroundView)
	siteLayer.x = tabMarginLeft
	siteLayer.y = tabMarginTop
	siteLayer.animate("site-global")
	updateRightBlankSite()


updateRightBlankSite = () ->
	blankPageRight.x = sites.length * (tabWidth + tabSpacing) + tabMarginLeft
	tabsView.updateContent()
	








# scrollTabsToPageIndex = (index, isAnimating) ->
# 	if !isAnimating then tabsView.snapToPage(sites[index], false, { })
# 	else tabsView.snapToPage(sites[index], true, { curve: tightSpring })

# Create Opened Site

createOpenedSite = (localSiteID) ->
	openedSite = new Site
		width: tabWidth
		height: tabHeight
		x: tabMarginLeft
		siteID: localSiteID
		originX: 0.5
		originY: 0.5
	
	openedSiteContent = new Layer
		width: 1288*retina
		height: 745*retina
		image: "images/site#{localSiteID}.png"
		parent: openedSite.content
	
# 	openedSiteContent.pinchable.enabled = true
# 	openedSiteContent.pinchable.rotate = false
# 	openedSiteContent.pinchable.scaleIncrements = 0.1
# 	openedSiteContent.pinchable.minScale = 0.2
# 	openedSiteContent.pinchable.maxScale = 1
	
	openedSite.states =
		"site-tabs": { scale: 1, y: tabMarginTop, borderRadius: 4*retina}
		"tabs-normal": { scale: 1, y: 0, borderRadius: 4*retina}
		"site-global": { scale: 1.48, y: tabMarginTop-18*retina, borderRadius: 0}
	
	openedSite.stateSwitch("tabs-normal")
	
	openedSite.animationOptions = 
		curve: "spring(200, 20, 0)"
	
	
	
	siteChangeStartHandler = (fromState, toState, event, layer) ->
		if fromState is "tabs-normal" and toState is "site-tabs"
			removeSiteFromTabs(layer)
		
		if toState is "site-global"
			layer.scrollVertical = true
			layer.scrollHorizontal = true
		else
			layer.scrollVertical = false
			layer.scrollHorizontal = false
			
	
	siteChangeEndHander = (fromState, toState, event, layer) ->
		if fromState is "site-global" and toState is "site-tabs"
			insertSiteToTabs(layer)
		
		if toState is "site-global" and homeSite != null
			sites.pop()
			homeSite.destroy()
			homeSite = null
			updateRightBlankSite()
	
	
	openedSite.on(Events.StateSwitchEnd, siteChangeEndHander)
	openedSite.on(Events.StateSwitchStart, siteChangeStartHandler)
	openedSite.on(Events.Click, backSiteHandler)
	
	return openedSite



backSiteHandler = (event, layer) ->
		if layer.states.current.name is "tabs-normal"
			hideTabsHander(event, layer)





createTabsView = () ->
	if tabsView != null
		return tabsView
	
	tabsView = new PageComponent
		width: screenWidth
		height: tabHeight
		y: tabMarginTop
		scrollVertical: false
		opacity: 1
	
	tabsView.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	
	tabsView.states.animationOptions =
		curve: tightSpring
	
	tabsView.stateSwitch("shown")
	tabsView.placeBehind(positionBackgroundView)
	
	tabsView.on Events.Scroll, ->
		if tabsView.currentPage.siteID != undefined
			activePage = tabsView.closestPage


createSites = () ->
	
	blankPageLeft = new Layer
		width: tabMarginLeft
		height: tabHeight
		parent: tabsView.content
		backgroundColor: "null"
	
	blankPageRight = new Layer
		width: tabMarginLeft
		height: tabHeight
		x: sites.length * (tabWidth + tabSpacing) + tabMarginLeft
		parent: tabsView.content
		backgroundColor: "null"
	
	for i in [0...4]
		localSite = createOpenedSite(i)
		localSite.placeBehind(positionBackgroundView)
		sites.push(localSite)
		insertSiteToTabs(localSite)
	
	activePage = sites[0]


# Create Home Site

homeSiteID = 4

createHomeSite = () ->
	if homeSite != null
		return homeSite
	
	homeSite = new Layer
		parent: screen
		width: tabWidth
		height: tabHeight
		x: tabMarginLeft
		backgroundColor: "rgba(250,250,250,0.08)"
		borderColor: "rgba(255,255,255,0.5)"
		borderRadius: 4*retina
		siteID: homeSiteID
	
	homeSite.states =
		"site-tabs": { scale: 1, y: tabMarginTop, borderRadius: 4*retina, borderColor: "rgba(255,255,255,0.5)" }
		"tabs-normal": { scale: 1, y: 0, borderRadius: 4*retina, borderColor: "rgba(255,255,255,0.5)" }
		"site-global": { scale: 1.48, y: tabMarginTop-18*retina, borderRadius: 0, borderColor: "rgba(255,255,255,0)" }
	
	homeSite.stateSwitch("site-global")
	homeSite.placeBehind(positionBackgroundView)
	homeSite.animationOptions = 
		curve: tightSpring
	
	logo = new Layer
		width: 134*retina
		height: 52*retina
		y: 50*retina
		image: "images/logo.png"
		parent: homeSite
	
	logo.centerX()
	
	logo.states = 
		"home": { scale: 1 / 1.48 }
		"tabs": { scale: 0.66 / 1.48 }
	logo.stateSwitch("home")

	
	homeSiteChangeStartHandler = (fromState, toState, event, layer) ->
		if fromState is "tabs-normal" and toState is "site-tabs"
			removeSiteFromTabs(layer)
		
		# Additional logic for logo
		if toState is "site-tabs"
			logo.animate("tabs", curve: tightSpring)
		else if toState is "site-global"
			logo.animate("home", curve: tightSpring)
			
		# Additional logic for home sites
		if toState is "site-global"
			try tabsView.animate("hidden")
		else if toState is "site-tabs"
			try tabsView.animate("shown")
	
	homeSiteChangeEndHander = (fromState, toState, event, layer) ->
		if fromState is "site-global" and toState is "site-tabs"
			insertSiteToTabs(layer)
		
		if toState is "tabs-normal" and fakeTab != null
			fakeTab.destroy()
			fakeTab = null
	
	homeSite.on(Events.StateSwitchStart, homeSiteChangeStartHandler)
	homeSite.on(Events.StateSwitchEnd, homeSiteChangeEndHander)
	homeSite.on(Events.Click, backSiteHandler)
	
	return homeSite
	


# Create Darker

createDarker = () ->
	darker = new Layer
		width: screenWidth
		height: screenHeight
		opacity: 1
		backgroundColor: "rgba(0,0,0,0)"
	
	darker.placeBehind(barView)

# Create Bar View

barViewPositionOpened = 40*retina
barViewPositionSearch = 294*retina
barViewPositionHidden = 584*retina
barViewPositionTabs = 660*retina

createBarView = () ->
	if barView != null
		return barView
	
	barView = new Layer
		y: 40*retina
		width: screenWidth
		height: screenHeight+50*retina
# 		backgroundColor: "rgba(255,255,255,0.4)"
		backgroundColor: "transparent"
		borderRadius: 8*retina
		clip: true
		style:
			"-webkit-filter": "drop-shadow(0 0 calc(2px*" + retina + ") " + "rgba(0,0,0,0.2))"
		
	barView.placeBefore(positionBackgroundView)
	
	contentView = new Layer
		parent: barView
		width: screenWidth
		height: 544*retina
		y: 56*retina
		backgroundColor: "#EEE"
		clip: true
	
	createZenView()
	createBookmarkView()
	createOmniBox()
	
	barView.on(Events.DragEnd, barViewDragEndHandler)
	barView.on(Events.StateSwitchStart, barViewStateSwitchStartHandler)
	barView.on(Events.StateSwitchEnd, barViewStateSwitchEndHandler)
	
	barView.draggable.enabled = true
	barView.draggable.speedX = 0
	barView.draggable.momentum = false
	
	barView.draggable.constraints =
		y: 40*retina
		x: 0
		width: screenWidth
		height: screenHeight+610*retina+10*retina
	
	barView.states = 
		"opened": { y: barViewPositionOpened }
		"search": { y: barViewPositionSearch }
		"hidden": { y: barViewPositionHidden }
		"tabs": { y: barViewPositionTabs }
	barView.stateSwitch("hidden")
	
	barView.animationOptions =
		curve: tightSpring
	
	barView.on "change:y", ->
		if darker != null
			localOpacity = Utils.modulate(barView.y, [barViewPositionHidden, barViewPositionOpened], [0, 0.5])
			darker.backgroundColor = "rgba(0, 0, 0, #{localOpacity})"
	
# 	barView.on Events.Click, ->
# 		print barView.y
	
# 	barView.on Events.DragMove, ->
	# 	bar.draggable.momentum = true
	
# 	barView.on Events.DragMove, ->
	# 	bar.draggable.momentum = true
	# 	print bar.draggable.direction




barViewStateSwitchStartHandler = (fromState, toState) ->
# 	if fromState is not toState
		if toState is "opened"
			showNewTabBar()
			showContextButtons()
			destroySuggestInput()
			keyboard_fake.animate("hidden")
			
		else if toState is "search"
			showSearchOmniBar()
			showContextButtons()
			keyboard_fake.animate("shown")
			
		else if toState is "hidden"
			showBaseOmniBar()
			if input
				input.value = ""
				destroySuggestInput()
			keyboard_fake.animate("hidden")


barViewStateSwitchEndHandler = (fromState, toState) ->
	if toState is "opened"
		zenView.scrollVertical = true
	else if toState is "hidden"
		zenView.scrollVertical = false
	
	if toState is "search" and activePage is homeSite
		initSuggestInput(currentLink)



barViewDragEndHandler = (event, layer) ->
	if barView.y < 65*retina
			barView.animate("opened")
		if barView.y > 65*retina and barView.draggable.direction == "down"
			barView.animate("hidden")
		else if barView.y < 475*retina and barView.draggable.direction == "up"
			barView.animate("opened")
		else if barView.y < 584*retina
			barView.animate("opened")
		else
			print "alarm"
			barView.animate("hidden")

# Create Bookmark View
zenView = null
under_new_button = null
under_others = null

createBookmarkView = () ->
	staticView = new Layer
		width: screenWidth
		height: 274*retina
		parent: contentView
		backgroundColor: "transparent"
	
	bookmarkView = new ScrollComponent
		width: screenWidth
		height: 200*retina
		parent: staticView
		y: 47*retina
		scrollVertical: false
		propagateEvents: false
		contentInset:
			top: 0
			right: 0
			bottom: 0
		
	bookmark_4 = new Layer width: 167*retina, height: 200*retina, x: 525*retina, y: 0, image: "images/bookmark 4.png"
	bookmark_3 = new Layer width: 167*retina, height: 200*retina, x: 350*retina, y: 0, image: "images/bookmark 3.png"
	bookmark_2 = new Layer width: 167*retina, height: 200*retina, x: 175*retina, y: 0, image: "images/bookmark 2.png"
	bookmark_1 = new Layer width: 167*retina, height: 200*retina, x: 0, y: 0, image: "images/bookmark 1.png"

	bookmark_blank = new Layer width: 16*retina, height: 200*retina, x: 747*retina-294167*retina+16*retina+143*retina, backgroundColor: "transparent", parent: bookmarkView.content
	
	bookmarks = [bookmark_1, bookmark_2, bookmark_3, bookmark_4]
	for item in bookmarks
		item.x = item.x + 16*retina
		item.parent = bookmarkView.content
		item.on Events.Click, ->
# 			globalNavigation.snapToPage(blankPage)

	under_others = new Layer width: 147*retina, height: 32*retina, x: 150*retina, y: 263*retina, image: "images/under others.png", parent: staticView
	under_others.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	under_others.stateSwitch("shown")
	
	under_new_button = new Layer width: 126*retina, height: 32*retina, x: 16*retina, y: 263*retina, image: "images/under new button.png", parent: staticView
	under_new_button.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	under_new_button.stateSwitch("shown")
	under_new_button.on(Events.Click, createNewTabFromBarHandler)

	fixLocalHeights = [under_new_button, under_others, bookmarkView]
	for item in fixLocalHeights
		item.y = item.y - 38*retina
	
	
# 	bookmarkView.on Events.Click, ->
# 		print "ksd"


showContextButtons = () ->
	under_others.stateSwitch("shown")
	under_new_button.stateSwitch("shown")
# 	under_new_button.on(Events.Click, createNewTabFromBarHandler)
	zenView.stateSwitch("base")

hideContextButtons = () ->
	under_others.stateSwitch("hidden")
	under_new_button.stateSwitch("hidden")
# 	under_new_button.off(Events.Click, createNewTabFromBarHandler)
	zenView.stateSwitch("compact")


# Create Zen View

zenScrollBoundsTop = [0, 150*retina]
zenScrollTopOutput = [0, -150*retina]
zenScrollTopOutputTop = [0, -150*retina]
isZenScrollDone = false

createZenView = () ->
	localZenAdder = 38*retina
	
	zenView = new ScrollComponent
		parent: contentView
		height: 544*retina
		width: 343*retina
		x: 16*retina
		scrollHorizontal: false
		scrollVertical: false
		contentInset:
			top: 314*retina - localZenAdder
		propagateEvents: false
	
	zenView.states = 
		"base": { y: 0, height: 544*retina }
		"compact": { y: -48*retina, height: 544*retina+48*retina }
	
	zenView.on(Events.Move, zenMoveHandler)
	zenView.on(Events.Scroll, zenScrollHandler)
# 	zenView.placeBehind(contentView)
	
	
# 	zenBlank = new Layer width: 686, height: 200, parent: zenView.content, 
	titletwo = new Layer width: 343*retina, height: 38*retina, x: 16*retina, y: 0, image: "images/titleTwo.png", parent: zenView.content
	zen_item_1 = new Layer width: 343*retina, height: 412*retina, x: 0, y: 0 + localZenAdder, image: "images/zen item 1.png", parent: zenView.content
	zen_item_2 = new Layer width: 343*retina, height: 410*retina, x: 0, y: 428*retina + localZenAdder, image: "images/zen item 2.png", parent: zenView.content
	zen_item_3 = new Layer width: 343*retina, height: 412*retina, x: 0, y: 854*retina + localZenAdder, image: "images/zen item 3.png", parent: zenView.content

	zen_item_blank = new Layer width: 343*retina, height: 70*retina, x: 0, y: 856*retina+383*retina+16*retina, backgroundColor: "transparent", parent: zenView.content


zenScrollHandler = (event, layer) ->
	if !isZenScrollDone
		cancelInputHanler()
	isZenScrollDone = true
	
zenMoveHandler = (event, layer) ->
	if zenView.scrollY <= 0
		staticView.y = Utils.modulate(zenView.scrollY, zenScrollBoundsTop, zenScrollTopOutput, false)
	else
		staticView.y = Utils.modulate(zenView.scrollY, zenScrollBoundsTop, zenScrollTopOutputTop, true)
		staticView.opacity = Utils.modulate(zenView.scrollY, zenScrollBoundsTop, [1, 0], true)
	
	

# Create Input

initSuggestInput = (textValue) ->
	if input != null
		Utils.delay 0.07, ->
			if input != null 
				input.focus()
		return input
	
	input = new Input
		width: 248*retina
		height: 32*retina
		x: 18*retina
		y: 10*retina
		borderRadius: 2*retina
		backgroundColor: "rgba(215,215,215,1)"
		virtualKeyboard: true
		placeholder: "Найти в Яндексе"
		goButton: true
		type: "search"
		parent: omni_bg
	
	if textValue != null
		input.value = textValue
	
	input.style = 
		fontSize: "#{16*retina}px"
		lineHeight: "#{19*retina}px"
		padding: "#{0.1*retina}px"
		color: "#000"
	
	input.updatePlaceholderColor("#7A797B")
	input.focus()
# 	input.select()
	
	input.onFocus ->
		checkSuggestView()
		barView.animate("search", time: 0.1)
# 		input.value = ""
	
	input.focus()
	
	input.onBlur ->
		if input.value == ""
			input.placeholder = "Найти в Яндексе"
		checkSuggestView()
	
	input.form.addEventListener "input", ->
		barView.animate("search", time: 0.1)
		checkSuggestView()
		
		currentDigitNumber = input.value.length
		if currentDigitNumber > 3
			currentDigitNumber = 3
		
# 		print "locally" + logCounter++
# 		print suggestView.opacity
		for item, i in textOutputsSuggestPhrase[currentDigitNumber]
# 			print item
			textOutputsLayers[i].text = item
# 			print textOutputsLayers[i].text
	
	input.form.addEventListener "submit", ->
		input.value = ""
		checkSuggestView()
	
	return input


checkSuggestView = () ->
	if input.value == currentLink
		return
	
	if input.value[0] == "h"
		textOutputsSuggestPhrase = musicSuggestArray
	else
		textOutputsSuggestPhrase = weatherSuggestArray
		
	
	if input.value.length > 1
		suggestView.opacity = 1
	else
		suggestView.opacity = 0


destroySuggestInput = () ->
	suggestView.opacity = 0
	if input != null
		input.destroy()
		input = null



# Create Omnibox
omni_bg = null
omni_bar_elems = []

omniMargin = 15*retina

createOmniBox = () ->
	if barView == null
		print "barView is null"
		return
	
	omni_bg = new Layer width: screenWidth, height: 56*retina, x: 0, y: 0, image: "images/omni bg.png", parent: barView
	search_bar_bg = new Layer width: 120*retina, height: 36*retina, x: 12*retina, y: 10*retina, borderRadius: 2*retina, backgroundColor: "rgba(216,216,216,1)"

	search_bar_shape = new Layer width: 200*retina, height: 36*retina, y: 10*retina, image: "images/search bar shape.png"
	search_bar_shape.states.add {
		base: { x: 121*retina-omniMargin }
		search: { x: 92*retina-omniMargin }
		new_tab: { x: 121*retina-omniMargin }
		suggest: { x: 92*retina-omniMargin }
	}
	search_bar_shape.states.switchInstant "base"
	
	clear = new Layer width: 14*retina, height: 14*retina, y: 21*retina, image: "images/clear.png"
	
	clear.states.add {
		base: { x: 291*retina-omniMargin, opacity: 0}
		search: { x: 263*retina-omniMargin, opacity: 1}
		new_tab: { x: 263*retina-omniMargin, opacity: 0}
		suggest: { x: 263*retina-omniMargin, opacity: 1}
	}
	clear.states.switchInstant "base"
	
	refresh_icon = new Layer width: 14*retina, height: 17*retina, y: 18*retina, image: "images/refresh icon.png"
	
	refresh_icon.states.add {
		base: { x: 291*retina-omniMargin, opacity: 1}
		search: { x: 262*retina-omniMargin, opacity: 0}
		new_tab: { x: 262*retina-omniMargin, opacity: 0}
		suggest: { x: 262*retina-omniMargin, opacity: 0}
	}
	refresh_icon.states.switchInstant "base"
	
	cancel = new Layer width: 49*retina, height: 14*retina, y: 20*retina, image: "images/cancel.png"
	
	cancel.states.add {
		search: { x: 309*retina-omniMargin, opacity: 1}
		base: { x: 323*retina-omniMargin, opacity: 0}
		new_tab: { x: 309*retina-omniMargin, opacity: 0}
		suggest: { x: 309*retina-omniMargin, opacity: 1}
	}
	cancel.states.switchInstant "base"
	
	tabs_icom = new Layer width: 23*retina, height: 27*retina, y: 14*retina, image: "images/tabs icom.png"
	
	tabs_icom.states.add {
		base: { x: 337*retina-omniMargin, opacity: 1}
		search: { x: 317*retina-omniMargin, opacity: 0}
		new_tab: { x: 337*retina-omniMargin, opacity: 1}
		suggest: { x: 317*retina-omniMargin, opacity: 0}
	}
	tabs_icom.states.switchInstant "base"
	
	focustext = new Layer height: 18*retina, y: 19*retina, backgroundColor: "rgba(184,201,219,1)"
	
	focustext.states.add {
		base: { width: 124*retina, x: 101*retina, opacity: 0}
		search: { width: 166*retina, x: 20*retina, opacity: 1}
		new_tab: { width: 166*retina, x: 58*retina, opacity: 0.0}
		suggest: { width: 166*retina, x: 20*retina, opacity: 0}
	}
	focustext.states.switchInstant "base"
	
	address = new Layer width: 118*retina, height: 17*retina, y: 21*retina, image: "images/address.png"
	
	address.states.add {
		base: { x: 104*retina, opacity: 1}
		search: { x: 66*retina, opacity: 1}
		new_tab: { x: 104*retina, opacity: 0.0}
		suggest: { x: 66*retina, opacity: 0}
	}
	address.states.switchInstant "base"

	
	ready_for_search = new Layer width: 135*retina, height: 14*retina, y: 22*retina, image: "images/ready for search.png"
	
	ready_for_search.states.add {
		base: { x: 97*retina-omniMargin, opacity: 0}
		search: { x: 77*retina-omniMargin, opacity: 0}
		new_tab: { x: 97*retina-omniMargin, opacity: 1}
		suggest: { x: 77*retina-omniMargin, opacity: 0}
	}
	ready_for_search.states.switchInstant "base"
	
	http = new Layer width: 45*retina, height: 16*retina, y: 21*retina, image: "images/http.png"	
	http.states.add {
		base: { x: 59*retina, opacity: 0}
		search: { x: 21*retina, opacity: 1}
		new_tab: { x: 59*retina, opacity: 0.0}
		suggest: { x: 21*retina, opacity: 0}
	}
	http.states.switchInstant "base"
	
	
	protect_icon = new Layer width: 12*retina, height: 16*retina, x: 24*retina, y: 20*retina, image: "images/protect icon.png"
	
	protect_icon.states.add {
		base: { opacity: 1}
		search: { opacity: 0}
		new_tab: { opacity: 0}
		suggest: { opacity: 0}
	}
	protect_icon.states.switchInstant "base"
	
	
	
	# Tabs button
	tabs_button = new Layer x: 319*retina, height: 55*retina, width: 56*retina, backgroundColor: "transparent"
	tabs_button.states.add {
		search: { x: screenWidth }
		base: { x: 319*retina-omniMargin }
		new_tab: { x: 319*retina-omniMargin }
		suggest: { x: screenWidth }
	}
	tabs_button.states.switchInstant "search"
	
	tabs_button.on(Events.Click, showTabsHandler)
	cancel.on(Events.Click, cancelInputHanler)
	search_bar_bg.on(Events.Click, focusOnField)
	search_bar_shape.on(Events.Click, focusOnField)
	clear.on(Events.Click, clearInputField)
	
# 	omni_bg.on(Events.DragEnd, barViewDragEndHandler)
	
	
	omni_bar_elems = [search_bar_bg, search_bar_shape, focustext, address, http, cancel, tabs_button, tabs_icom, refresh_icon, clear, protect_icon, ready_for_search]

	for item in omni_bar_elems
		item.parent = omni_bg
		try
			if isCurrentGlobalModeSite
				item.stateSwitch("base")
			else
				item.stateSwitch("new_tab")
		catch error
	
	
	
	textOutputsLayers = []
	suggestView = new Layer
		width: screenWidth
		height: 544*retina
		backgroundColor: "#F0F0F0"
		y: 0*retina
		opacity: 0
	
	suggestView.placeBehind(barView)
	
	for item, i in [0, 1, 2, 3, 4, 5]
		outputLayer = new TextLayer
			text: ""
			color: "#000"
			textAlign: "left"
			fontSize: 18*retina
			width: screenWidth-28**retina
			height: 56*retina
			y: 56*retina*(5-i) - 56*retina + 16*retina
			x: 28*retina
			parent: suggestView
			paddingTop: 14*retina
		
		textOutputsLayers.push(outputLayer)



clearInputField = () ->
	if input and input != null
		input.value = ""
		input.focus()

cancelInputHanler = () ->
	showBaseOmniBar()
	destroySuggestInput()
	
	if barView.states.current.name is "search" 
		barView.animate("hidden")


focusOnField = () ->
	if barView.states.current.name is "search"
		initSuggestInput(currentLink)
		showSuggestBar()
	else if barView.states.current.name is "opened"
		initSuggestInput(currentLink)
	else
		showNewTabBar()
	
	if barView.states.current.name is "hidden" or barView.states.current.name is "opened"
		barView.animate("search")



showSearchOmniBar = () ->
# 	print "Search Omni"
	isZenScrollDone = false
	for item in omni_bar_elems
		try
			item.animate("search", time: 0.2)
		catch error

showBaseOmniBar = () ->
# 	print "Base Omni"
	for item in omni_bar_elems
		try
			item.animate("base", time: 0.2)
		catch error

showNewTabBar = () ->
# 	print "New Tab Omni"
	for item in omni_bar_elems
		try
			item.animate("new_tab", time: 0.2)
		catch error

showSuggestBar = () ->
# 	print "New Tab Omni"
	isZenScrollDone = false
	for item in omni_bar_elems
		try
			item.states.switch("suggest", time: 0.2)
		catch error


# 
# 
# 
# createHomeScreen()
# homeScreen.placeBehind(positionBackgroundView)

# createTabsView()
# createSites()
createBarView()
# createDarker()


 
barView.stateSwitch("hidden")
music_site.sendToBack()
# showTabsHandler()


for item in [music_site, positionBackgroundView, suggestView, barView, keyboard_fake]
	item.parent = screen

search_bar_shape.emit Events.Click